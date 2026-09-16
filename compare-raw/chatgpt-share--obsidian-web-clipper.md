---
title: "Write Moving Average Function"
source: "https://chatgpt.com/share/6a89a133-27ec-83eb-808d-19ee6f6dfd99"
author:
published:
created: 2026-09-16
description: "ChatGPT conversation with 5 messages"
tags:
  - "clippings"
---
**ChatGPT said**

Assuming **Hypothesis** and the EMA implementation from above, this tests the core invariants rather than a handful of fixed examples:

```python
import math

from hypothesis import given, strategies as st

from smoothing import exponential_moving_average

finite_floats = st.floats(
    min_value=-1e6,
    max_value=1e6,
    allow_nan=False,
    allow_infinity=False,
)

@given(st.lists(finite_floats, max_size=100))
def test_empty_and_length(values):
    result = exponential_moving_average(values, 0.5)

    assert len(result) == len(values)
    assert result == [] if not values else True

@given(
    st.lists(finite_floats, min_size=1, max_size=100),
    st.floats(min_value=0.001, max_value=1.0),
)
def test_first_value_is_initial_ema(values, alpha):
    result = exponential_moving_average(values, alpha)

    assert result[0] == values[0]

@given(
    st.lists(finite_floats, min_size=1, max_size=100),
    st.floats(min_value=0.001, max_value=1.0),
)
def test_output_length_matches_input(values, alpha):
    result = exponential_moving_average(values, alpha)

    assert len(result) == len(values)

@given(
    st.lists(finite_floats, min_size=1, max_size=100),
    st.floats(min_value=0.001, max_value=1.0),
)
def test_ema_stays_within_observed_range(values, alpha):
    result = exponential_moving_average(values, alpha)

    lo = min(values)
    hi = max(values)

    for ema in result:
        assert lo <= ema <= hi

@given(
    st.lists(finite_floats, min_size=1, max_size=100),
    st.floats(min_value=0.001, max_value=1.0),
)
def test_constant_series_remains_constant(values, alpha):
    if not values:
        return

    value = values[0]
    values = [value] * len(values)

    result = exponential_moving_average(values, alpha)

    assert all(x == value for x in result)

@given(
    st.lists(finite_floats, min_size=1, max_size=100),
)
def test_alpha_one_returns_input(values):
    result = exponential_moving_average(values, 1.0)

    assert result == values

@given(
    st.lists(finite_floats, min_size=1, max_size=100),
    st.floats(min_value=0.001, max_value=1.0),
)
def test_matches_recurrence(values, alpha):
    result = exponential_moving_average(values, alpha)

    expected = [values[0]]
    for value in values[1:]:
        expected.append(
            alpha * value + (1 - alpha) * expected[-1]
        )

    for actual, expected_value in zip(result, expected):
        assert math.isclose(
            actual,
            expected_value,
            rel_tol=1e-12,
            abs_tol=1e-12,
        )

@given(st.lists(finite_floats, max_size=100))
def test_invalid_alpha_rejected(values):
    for alpha in (-1.0, 0.0, 1.000001, 2.0):
        try:
            exponential_moving_average(values, alpha)
        except ValueError:
            pass
        else:
            raise AssertionError(f"alpha={alpha} should be rejected")
```

The most valuable properties here are **recurrence correctness**, **range preservation**, **constant-series invariance**, and the boundary case . Hypothesis will generate many edge cases—including negative values, very small/large values, and unusual list lengths—that fixed example tests tend to miss.

---

**You said**

Summarise everything so far as a decision table: input shape, chosen method, window, why.

---

**ChatGPT said**

| Input shape / situation | Chosen method | Window / parameter | Why |
| --- | --- | --- | --- |
| Regular daily data, no major gaps | **SMA** |  | Simple, interpretable 7-day smoothing |
| Regular data, need more responsiveness | **EMA** |  | Reacts faster while retaining a comparable effective window |
| Streaming / memory-constrained data | **EMA** | Choose directly | Requires only state |
| Irregular observations where each observation matters equally | **SMA** | observations | `ROWS` naturally represents the most recent observations |
| Irregular observations where elapsed time matters | **Time-based average** | e.g. 7 calendar days | A row-based window does not represent a fixed time interval |
| Daily series with missing dates | **Calendar-based SMA** | 7 calendar days | Fill the date axis first so gaps don't shrink the time window |
| Missing value means "no measurement" | **SMA/EMA with missing values preserved** | 7 days or corresponding | Avoids incorrectly treating missing data as zero |
| Missing value genuinely means zero | **SMA/EMA with zeros filled** | 7 days or corresponding | Zero is part of the actual signal |
| Many gaps / unreliable coverage | **SMA with coverage threshold** | 7 days, e.g. ≥5 observations | Prevents an apparently precise average based on too little data |
| Smoothness should be inferred from the series | **SMA or EMA** | Estimate from ACF | Uses the data's correlation length instead of guessing |
| Strong seasonality | **Seasonality-aware smoothing** | Based on seasonal period | ACF peaks can represent cycles rather than smoothing scale |
| Need custom finite weights | **WMA** | \+ explicit weights | Lets recent observations receive deliberately chosen weights |
| Independent noise with variance | **EMA** |  | Steady-state estimator variance is |
| Want EMA effective sample size | **EMA** |  | Gives |

**Default choice:** for a regular daily series, use a **7-day SMA** when interpretability matters; use a **7-period EMA with** when responsiveness and streaming efficiency matter. For gaps, decide explicitly whether your window is measured in **observations** or **elapsed time** before choosing the SQL/window semantics.

---

**You said**

What did we get wrong in this design? Be specific and go into detail.

---

**ChatGPT said**

There are several things I would change. The biggest issue is that we gradually treated several **rules of thumb as if they were equivalent statistical definitions**. That can make a small smoothing library look more principled than it actually is.

### 1\. We conflated "7 observations" with "7 days"

Our SQL used:

```sql
ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
```

and called it a 7-day moving average.

That's only true if there is **exactly one row per day with no gaps**.

If dates are missing, this is a 7-observation average, not a 7-calendar-day average. We did catch this later, but the original API/design should have made the distinction explicit from the beginning.

A better API would distinguish:

```
window = 7, unit = "observations"
```

from:

```
window = 7, unit = "days"
```

---

### 2\. Our EMA implementation silently assumes a particular initialization

We defined:

```python
ema[0] = values[0]
```

That's common, but it is **not neutral**.

For the recurrence

the choice of affects the early estimates. Starting with gives the first observation disproportionately important influence.

For example, another legitimate initialization is the mean of the first observations, or a prior estimate of the underlying level.

This matters particularly when is small: initialization bias can persist for many observations.

We should therefore have made initialization an explicit design decision rather than burying it in the implementation.

---

### 3\. We overstated the EMA/SMA equivalence

We derived

by matching the **average lag / center of mass**.

That's a legitimate convention, but it does **not** mean an -period EMA and -period SMA are generally equivalent.

They differ in:

- impulse response,
- frequency response,
- startup behavior,
- tail behavior,
- phase/lag,
- response to sudden changes.

The formula should have been described as:

> the conventional EMA parameterization corresponding to an -period SMA in terms of average lag,

not "the" mathematically correct conversion.

---

### 4\. The ACF method for choosing was too simplistic

This was probably our biggest statistical overreach.

We suggested:

as a correlation-length threshold and then

That's reasonable for an approximately exponentially correlated process, but it is **not a general method for choosing an optimal smoothing window**.

The ACF can be affected by:

- trend,
- seasonality,
- nonstationarity,
- changing variance,
- structural breaks,
- measurement noise.

And even if the correlation length is estimated perfectly, the window that best describes the correlation structure isn't necessarily the window that minimizes forecasting error or produces the desired denoising.

A better approach is:

1. detrend/difference when appropriate;
2. inspect ACF/PACF and seasonality;
3. generate candidate smoothing parameters;
4. evaluate them using **out-of-sample validation** against the actual objective.

ACF is useful for proposing candidate scales, not selecting the final one by itself.

---

### 5\. Our EMA variance derivation assumes IID noise

We derived

That's correct under the assumptions we explicitly made:

with independent errors.

But real time series often have **autocorrelated errors**.

For correlated observations,

so the cross-covariance terms don't disappear.

That means the neat

factor is not generally valid for a time-series signal just because we're applying an EMA to it.

---

### 6\. "Effective sample size = N" needs qualification

We observed that with

the EMA's IID-noise effective sample size is

That's a useful result, but it is specifically an **IID-noise variance equivalence**.

It does not mean:

> an EMA with parameter contains the same information as an -point SMA.

The weighting schemes remain very different.

For correlated time-series observations, the effective sample size also changes.

---

### 7\. We didn't distinguish smoothing from forecasting

This is an architectural issue.

A moving average is often used for:

- noise reduction,
- visualization,
- feature construction,
- estimating a latent level,
- forecasting.

Those are different objectives.

For example, a centered moving average can be excellent for visualization but is unusable for real-time forecasting because it uses future observations.

Our library should explicitly distinguish:

```
trailing smoothing
centered smoothing
forecasting / causal smoothing
```

The EMA is causal by construction; a centered SMA isn't.

---

### 8\. We didn't address boundary behavior for SMA

Our Python SMA returns:

```python
[]
```

when `window > len(values)`.

But more fundamentally, what should happen during the first observations?

Possible semantics include:

- return no values until a full window exists;
- return progressively larger averages;
- pad with `NaN`;
- pad with `None`;
- require a minimum number of observations.

The current function chooses one behavior implicitly by shortening the output.

That makes composition with the original time index awkward.

For a time-series library, preserving alignment is usually more useful:

```
date    value    sma
day 1     10     NaN
day 2     12     NaN
...
day 7     15     12.3
```

---

### 9\. We didn't establish NaN/missing-value semantics in Python

The SQL discussion handled missing dates conceptually, but the Python API doesn't specify what happens with:

```python
[1.0, float("nan"), 3.0]
```

Should the result:

- propagate NaN?
- skip NaN?
- treat it as zero?
- reset the EMA?
- raise an exception?

Those are materially different behaviors.

A smoothing library needs an explicit missing-data policy.

---

### 10\. Our property-based tests missed important properties

The tests were useful, but they weren't really a comprehensive property-based suite.

We should have tested properties such as:

**Translation equivariance**

If every input is shifted by ,

**Scale equivariance**

**Monotonicity**

For positive weights, if everywhere, then

**Constant input**

Already tested, and important.

**Bounds**

Already tested, also important.

**Streaming equivalence**

Processing a sequence all at once should equal processing it incrementally.

That's particularly important because we described the library as supporting streaming.

---

### 11\. The Python API isn't actually designed around streaming

The EMA implementation accepts:

```python
values: list[float]
```

and returns a list.

That's fine as a batch implementation, but if the library's goal is streaming, the natural abstraction is closer to:

```python
ema = EMA(alpha=0.25)

for value in stream:
    smoothed = ema.update(value)
```

or an iterator/generator interface.

Our later TypeScript implementation was streaming, but we didn't carry that design back into the Python API.

---

### 12\. We didn't separate the mathematical estimator from the policy

This is the architectural lesson I'd take from all of this.

There are really three layers:

**Estimator**

**Parameter selection**

How did we get ?

- user supplied it,
- \-period convention,
- cross-validation,
- domain-specific choice.

**Data policy**

What happens with:

- missing timestamps,
- missing values,
- duplicate timestamps,
- irregular sampling,
- startup,
- outliers?

We mixed these layers together.

A cleaner library would make them explicit.

---

## What I'd change

I'd redesign the core around something like:

```
SMA
  window: int
  min_periods: int
  missing: "skip" | "propagate"

EMA
  alpha: float
  initialization: "first" | "mean" | "explicit"
  missing: "skip" | "propagate" | "reset"
```

And keep **time semantics outside the mathematical estimator**:

```
observation window
    vs.
time-duration window
```

Then parameter selection becomes a separate module:

```
heuristics.acf(...)
validation.select_window(...)
```

Most importantly, I'd document that **ACF-derived windows and the EMA conversion are heuristics/conventions, not universally optimal statistical choices**.

That would turn what we have now from a collection of reasonable snippets into a much more defensible time-series smoothing library.