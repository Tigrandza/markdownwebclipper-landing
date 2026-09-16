## User

I'm building a small time-series smoothing library. Start with a Python function for a simple moving average over a list of floats.

## ChatGPT

```python
def moving_average(values: list[float], window: int) -> list[float]:
    if window <= 0:
        raise ValueError("window must be positive")
    if window > len(values):
        return []

    return [
        sum(values[i:i + window]) / window
        for i in range(len(values) - window + 1)
    ]
```

## User

Now add an exponential moving average. Give me the recurrence in display math first, then the Python.

## ChatGPT

The exponential moving average (EMA) recurrence is:

$$
\operatorname{EMA}_t = \alpha x_t + (1-\alpha)\operatorname{EMA}_{t-1},
\qquad 0 < \alpha \le 1
$$

```python
def exponential_moving_average(
    values: list[float], alpha: float
) -> list[float]:
    if not 0 < alpha <= 1:
        raise ValueError("alpha must be in (0, 1]")

    if not values:
        return []

    ema = [values[0]]
    for x in values[1:]:
        ema.append(alpha * x + (1 - alpha) * ema[-1])

    return ema
```

## User

What does the smoothing factor alpha work out to for a window of N? Show the derivation.

## ChatGPT

For an EMA intended to correspond roughly to an SMA window of $N$, the standard choice is:

$$
\boxed{\alpha = \frac{2}{N+1}}
$$

#### Derivation

An $N$ -point simple moving average gives each of its $N$ observations equal weight:

$$
\frac{1}{N}
$$

For an EMA, the weight on the current observation is $\alpha$, while older observations have geometrically decreasing weights:

$$
\alpha,\quad
\alpha(1-\alpha),\quad
\alpha(1-\alpha)^2,\quad \ldots
$$

A common way to match the EMA's effective lag to an $N$ -period SMA is to equate their **center of mass**.

For the SMA, the average age of an observation is:

$$
\frac{0+1+\cdots+(N-1)}{N}
= \frac{N-1}{2}
$$

For the EMA, the average age is:

$$
\sum_{k=0}^{\infty} k\,\alpha(1-\alpha)^k
= \frac{1-\alpha}{\alpha}
$$

Set these equal:

$$
\frac{1-\alpha}{\alpha}
=
\frac{N-1}{2}
$$

Multiply through by $2\alpha$:

$$
2(1-\alpha)=\alpha(N-1)
$$

 

$$
2-2\alpha=\alpha N-\alpha
$$

 

$$
2=\alpha(N+1)
$$

Therefore:

$$
\boxed{\alpha=\frac{2}{N+1}}
$$

So, for example, a 7-period EMA uses

$$
\alpha=\frac{2}{8}=0.25.
$$

## User

Compare simple, exponential and weighted moving averages in a table: lag, responsiveness, memory cost, and when each is the wrong choice.

## ChatGPT

| Method | Lag | Responsiveness | Memory cost | When it’s the wrong choice |
| --- | --- | --- | --- | --- |
| **Simple Moving Average (SMA)** | Moderate; roughly $(N-1)/2$ periods | Moderate; changes abruptly when an observation enters/leaves the window | **O(N)** | When you need fast reaction to recent changes or don't want old observations to have an abrupt cutoff |
| **Exponential Moving Average (EMA)** | Lower than an SMA with a comparable smoothing level | **High**; recent observations receive much more weight | **O(1)** | When a hard finite window is important, or when the long exponential tail makes historical data matter too much |
| **Weighted Moving Average (WMA)** | Usually lower than SMA, depending on weights | **Adjustable**; can emphasize recent observations strongly | **O(N)** | When you don't have a principled weighting scheme, or when maintaining a window is undesirable |

**Rule of thumb:** SMA is simplest and most predictable, EMA is usually the best default for streaming data, and WMA is useful when you have a deliberate reason to choose custom finite-window weights.

## User

Port the EMA to TypeScript, using a generator so it streams.

## ChatGPT

```typescript
function* exponentialMovingAverage(
  values: Iterable<number>,
  alpha: number
): Generator<number> {
  if (alpha <= 0 || alpha > 1) {
    throw new Error("alpha must be in (0, 1]");
  }

  let ema: number | undefined;

  for (const value of values) {
    ema = ema === undefined
      ? value
      : alpha * value + (1 - alpha) * ema;

    yield ema;
  }
}
```

## User

How do I pick a window size from the data instead of guessing? Explain the autocorrelation approach in full.

## ChatGPT

If you want to choose the smoothing window **from the data**, autocorrelation is a useful approach when the series has meaningful temporal structure.

The key idea is:

> Pick a window based on how long observations remain correlated, rather than choosing $N$ arbitrarily.

#### 1\. Compute the autocorrelation function

Given observations $x_1,\ldots,x_T$, first subtract the mean:

$$
y_t=x_t-\bar{x}
$$

The sample autocorrelation at lag $k$ is approximately

$$
\rho(k)
=
\frac{
\sum_{t=k+1}^{T} y_t y_{t-k}
}{
\sum_{t=1}^{T} y_t^2
}.
$$

Interpretation:

- $\rho(k)\approx 1$: values $k$ periods apart are strongly similar.
    
- $\rho(k)\approx 0$: little linear relationship.
    
- $\rho(k)<0$: values $k$ periods apart tend to move oppositely.
    

Plotting $\rho(k)$ against $k$ gives the **ACF**.

#### 2\. Look for the correlation horizon

For smoothing, you're generally interested in the point where autocorrelation has substantially decayed.

A simple rule is to find the first lag $k$ where the ACF falls below a threshold such as

$$
\rho(k) < e^{-1}\approx0.368.
$$

You can then use

$$
\boxed{N\approx k}
$$

as an initial SMA window.

This isn't a universal optimum; it's a data-driven estimate of the series' **correlation length**.

#### 3\. Why this makes sense

Suppose the series behaves approximately like an exponentially correlated process:

$$
\rho(k)=e^{-k/\tau},
$$

where $\tau$ is the correlation time.

At $k=\tau$,

$$
\rho(\tau)=e^{-1}.
$$

So the $1/e$ crossing gives an estimate of $\tau$.

For example, suppose your ACF looks roughly like:

| Lag | ACF |
| --- | --- |
| 1   | 0.91 |
| 2   | 0.82 |
| 3   | 0.73 |
| 4   | 0.65 |
| 5   | 0.57 |
| 6   | 0.49 |
| 7   | 0.42 |
| 8   | 0.36 |
| 9   | 0.31 |

The $1/e$ threshold is crossed around lag 8, so **$N\approx8$** would be a reasonable starting window.

#### 4\. For an EMA, convert the window to \\alpha

If you use the conventional correspondence

$$
\alpha=\frac{2}{N+1},
$$

then $N=8$ gives

$$
\alpha=\frac{2}{9}\approx0.222.
$$

So the workflow becomes:

$$
\boxed{
\text{data}
\rightarrow
\text{ACF}
\rightarrow
\text{correlation length }N
\rightarrow
\text{EMA }\alpha
}
$$

#### 5\. Watch out for seasonality

This is where blindly using the first ACF crossing can go wrong.

If the data has a seasonal period—say, daily observations with weekly seasonality—the ACF might look like:

$$
\rho(1),\rho(2),\ldots,\rho(6)\downarrow
\quad\text{but}\quad
\rho(7)\uparrow.
$$

That peak at lag 7 indicates a repeating weekly pattern.

In that situation, **don't necessarily choose $N=7$** just because the ACF crosses a threshold there. The ACF is telling you that there are _two different structures_: short-term persistence and a seasonal cycle.

You may want to:

1.  model/remove the seasonal component first, then estimate the smoothing scale;
    
2.  use a window related to the seasonal period if your goal is seasonal smoothing;
    
3.  use cross-validation to decide which window gives the best forecasting performance.
    

#### 6\. A better practical procedure

For a smoothing library, I'd use autocorrelation as a **candidate generator**, not as the final decision rule:

1.  Remove obvious trend if necessary.
    
2.  Compute the ACF for lags up to some reasonable maximum.
    
3.  Identify the first meaningful decay/correlation scale.
    
4.  Generate candidate windows around that scale.
    
5.  Evaluate those candidates on a downstream objective—forecast error, noise reduction, or another metric relevant to your application.
    
6.  Choose the smallest amount of smoothing that achieves the desired objective.
    

That's important because **autocorrelation measures dependence, not optimal smoothness**. A highly autocorrelated series doesn't automatically mean that a large moving-average window will produce the best result.

For a production implementation, I'd also prefer estimating the ACF with a confidence interval and distinguishing statistically meaningful correlation from sampling noise, especially when the series is short.

## User

Write the SQL to do a 7-day moving average over a daily metrics table, for both Postgres and BigQuery.

## ChatGPT

Assuming a table like `daily_metrics(metric_date, metric_value)`:

#### PostgreSQL

```sql
SELECT
    metric_date,
    metric_value,
    AVG(metric_value) OVER (
        ORDER BY metric_date
        ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
    ) AS moving_avg_7d
FROM daily_metrics
ORDER BY metric_date;
```

#### BigQuery

```sql
SELECT
    metric_date,
    metric_value,
    AVG(metric_value) OVER (
        ORDER BY metric_date
        ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
    ) AS moving_avg_7d
FROM `project.dataset.daily_metrics`
ORDER BY metric_date;
```

Both calculate the average of the **current row plus the previous 6 rows**.

One important caveat: `ROWS` means **7 records**, not necessarily 7 calendar days. If your table can have missing dates, a true calendar-day window should first fill the date gaps or use a date/range-based approach.

## User

What breaks when the series has gaps? Walk through the options in detail.

## ChatGPT

The important distinction is between a **7-row window** and a **7-calendar-day window**. With gaps, they are no longer the same thing.

Suppose your data is:

| date | value |
| --- | --- |
| Mon | 10  |
| Tue | 12  |
| **Wed missing** |     |
| **Thu missing** |     |
| Fri | 20  |
| Sat | 22  |
| Sun | 24  |

A query using:

```sql
ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
```

doesn't know that Wednesday and Thursday are missing. It simply counts rows.

### Option 1: Keep ROWS — treat observations as the clock

Your existing query:

```sql
AVG(metric_value) OVER (
    ORDER BY metric_date
    ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
)
```

means:

> "Average the most recent 7 observations."

It does **not** mean:

> "Average observations occurring during the previous 7 calendar days."

This is perfectly reasonable if the series is fundamentally **event/observation based**.

For example, if measurements arrive irregularly and each measurement represents one meaningful observation, a 7-observation moving average may actually be what you want.

**Problem:** if your metric is explicitly daily, the amount of elapsed time represented by the window changes.

* * *

### Option 2: Fill the missing dates

For a genuinely daily metric, this is often the cleanest solution.

Create a complete calendar:

```
Mon  10
Tue  12
Wed  NULL
Thu  NULL
Fri  20
Sat  22
Sun  24
```

Then decide what `NULL` means.

#### Missing means "no measurement"

Keep it `NULL`.

Your moving average can then ignore missing values:

```sql
AVG(metric_value) OVER (
    ORDER BY metric_date
    ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
)
```

This gives you a **7-day calendar window**, but only averages the observations that actually exist.

That's often appropriate for metrics such as:

- sales when a store was closed,
    
- sensor readings that failed,
    
- API measurements that weren't collected.
    

But it changes the interpretation: a 7-day average might be based on only 5 observations.

#### Missing means zero

If a missing day genuinely means zero activity, fill it with `0` instead.

For example:

```
Mon  10
Tue  12
Wed   0
Thu   0
Fri  20
Sat  22
Sun  24
```

Now the 7-day average includes those zeros.

**Do not do this merely because the data is missing.** "No data" and "zero" are different statements.

* * *

### Option 3: Use a time-based window

Instead of counting rows, define the window using the timestamp itself.

Conceptually, you want:

$$
\text{average at }t
=
\operatorname{mean}\{x_s:t-6\text{ days}\le s\le t\}.
$$

That means gaps don't change the duration of the window.

For example, in PostgreSQL you can use a `RANGE` frame with a timestamp/orderable numeric representation appropriate to your schema.

The advantage is that the database asks:

> "Which observations occurred during this period?"

rather than:

> "Which six rows came before this one?"

This is usually the right conceptual model for irregularly sampled time series.

* * *

### Option 4: Use a calendar table

For production analytics, I often prefer an explicit calendar/date dimension.

You might have:

```
calendar_date
-------------
2026-08-01
2026-08-02
2026-08-03
...
```

Then:

```sql
calendar
    LEFT JOIN daily_metrics
      ON calendar.date = daily_metrics.metric_date
```

This gives you a guaranteed continuous daily axis.

You can then distinguish:

- date exists + value = 0 → actual zero
    
- date exists + value is NULL → missing measurement
    
- date doesn't exist → data-generation problem
    

This is particularly useful when multiple metrics need identical date handling.

* * *

### Option 5: Interpolate the gaps

Sometimes a missing value should be estimated rather than ignored.

Suppose:

```
Mon  10
Tue  12
Wed  ?
Thu  ?
Fri  20
```

You could interpolate:

```
Mon  10
Tue  12
Wed  ~14.67
Thu  ~17.33
Fri  20
```

Now every day contributes to the smoothing calculation.

This can make sense for continuously evolving physical quantities, but it's dangerous for metrics such as:

- transactions,
    
- errors,
    
- user signups,
    
- revenue.
    

You don't want to manufacture observations simply to make a moving average convenient.

* * *

### Option 6: Require a minimum amount of coverage

This is one of the most useful approaches when missing data is common.

Suppose you're calculating a 7-day average. You can require at least 5 actual observations:

```sql
CASE
    WHEN COUNT(metric_value) OVER (
        ORDER BY metric_date
        ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
    ) >= 5
    THEN AVG(metric_value) OVER (
        ORDER BY metric_date
        ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
    )
END AS moving_avg_7d
```

Conceptually:

$$
\text{MA}_t =
\begin{cases}
\operatorname{mean}(x), & \text{if coverage}\ge5/7\\
\text{NULL}, & \text{otherwise}.
\end{cases}
$$

This prevents a "7-day average" based on one or two observations from looking deceptively precise.

* * *

### The bigger issue: gaps can change the meaning of smoothing

Imagine:

```
Day:    1   2   3   4   5   6   7
Value: 10  10  10  10  10  10  10
```

A 7-day SMA clearly means "average over one week."

Now remove days 3–6:

```
Day:    1   2           7
Value: 10  10           10
```

A 7-row window can't even be formed yet, despite the fact that you have observations spanning a week.

Conversely, if you have observations every hour, a 7-row window represents only seven hours—not seven days.

So **the first design decision for your library should be whether `window=7` means seven observations or seven units of elapsed time.**

#### My recommendation

For a time-series smoothing library, expose the distinction explicitly:

```
window=7, mode="observations"
window=7, mode="calendar"
```

Then use:

- **observations** → `ROWS`
    
- **elapsed time** → time-based/range window
    
- **daily series with expected dates** → generate a calendar first
    
- **missing ≠ zero** → preserve `NULL`
    
- **missing = zero** → explicitly fill with zero
    
- **unreliable coverage** → add a minimum-observation/coverage requirement
    

That prevents one of the most subtle time-series bugs: a function called `moving_average(7)` silently producing different statistical meanings depending on how many rows happen to be missing.

## User

Give me the variance of the EMA estimator, with the derivation written out.

## ChatGPT

Assume the observations are

$$
X_t=\mu+\varepsilon_t,
\qquad
E[\varepsilon_t]=0,
\qquad
\operatorname{Var}(\varepsilon_t)=\sigma^2,
$$

with the $\varepsilon_t$ independent over time.

The EMA is

$$
S_t=\alpha X_t+(1-\alpha)S_{t-1},
\qquad 0<\alpha\le1.
$$

#### 1\. Expand the recurrence

Repeated substitution gives

$$
S_t
=
\alpha X_t
+\alpha(1-\alpha)X_{t-1}
+\alpha(1-\alpha)^2X_{t-2}
+\cdots.
$$

After the initial transient, we can write

$$
S_t
=
\sum_{k=0}^{\infty}
\alpha(1-\alpha)^k X_{t-k}.
$$

Thus the EMA is a weighted sum with weights

$$
w_k=\alpha(1-\alpha)^k.
$$

Notice that the weights sum to one:

$$
\sum_{k=0}^{\infty}w_k
=
\alpha\sum_{k=0}^{\infty}(1-\alpha)^k
=
\alpha\frac{1}{\alpha}
=1.
$$

#### 2\. Compute the variance

Because the observations are independent,

$$
\operatorname{Var}\left(\sum_k w_kX_{t-k}\right)
=
\sum_k w_k^2\operatorname{Var}(X_{t-k}).
$$

Therefore,

$$
\operatorname{Var}(S_t)
=
\sigma^2
\sum_{k=0}^{\infty}
\left[\alpha(1-\alpha)^k\right]^2.
$$

Pull out $\alpha^2$:

$$
\operatorname{Var}(S_t)
=
\sigma^2\alpha^2
\sum_{k=0}^{\infty}(1-\alpha)^{2k}.
$$

The remaining sum is geometric:

$$
\sum_{k=0}^{\infty}(1-\alpha)^{2k}
=
\frac{1}{1-(1-\alpha)^2}.
$$

Simplify the denominator:

$$
1-(1-\alpha)^2
=
1-(1-2\alpha+\alpha^2)
=
2\alpha-\alpha^2
=
\alpha(2-\alpha).
$$

Hence

$$
\boxed{
\operatorname{Var}(S_t)
=
\frac{\alpha}{2-\alpha}\sigma^2
}
$$

for the steady-state EMA.

#### 3\. Finite-sample version

If the EMA starts at $S_0$ with $S_0$ treated as fixed, then after $t$ updates,

$$
S_t
=
(1-\alpha)^tS_0
+
\sum_{k=0}^{t-1}
\alpha(1-\alpha)^kX_{t-k}.
$$

Only the observations contribute random variance, giving

$$
\operatorname{Var}(S_t)
=
\sigma^2\alpha^2
\sum_{k=0}^{t-1}(1-\alpha)^{2k}.
$$

Therefore,

$$
\boxed{
\operatorname{Var}(S_t)
=
\sigma^2
\frac{\alpha\left[1-(1-\alpha)^{2t}\right]}
{2-\alpha}
}
$$

which converges to the steady-state result as $t\to\infty$.

#### 4\. Interpretation

The EMA therefore reduces white-noise variance by the factor

$$
\boxed{\frac{\alpha}{2-\alpha}}.
$$

Equivalently, its **effective sample size** is

$$
\boxed{
N_{\mathrm{eff}}
=
\frac{2-\alpha}{\alpha}
=
\frac{2}{\alpha}-1
}.
$$

Using the conventional relationship

$$
\alpha=\frac{2}{N+1},
$$

we get

$$
N_{\mathrm{eff}}
=
\frac{2}{2/(N+1)}-1
=
N.
$$

So under independent, equal-variance noise, the usual $N$ -period EMA has the same **effective sample size** as an $N$ -point SMA, even though their weighting and lag characteristics differ.

## User

Write a property-based test suite for the Python implementation.

## ChatGPT

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

The most valuable properties here are **recurrence correctness**, **range preservation**, **constant-series invariance**, and the boundary case $\alpha=1$. Hypothesis will generate many edge cases—including negative values, very small/large values, and unusual list lengths—that fixed example tests tend to miss.

## User

Summarise everything so far as a decision table: input shape, chosen method, window, why.

## ChatGPT

| Input shape / situation | Chosen method | Window / parameter | Why |
| --- | --- | --- | --- |
| Regular daily data, no major gaps | **SMA** | $N=7$ | Simple, interpretable 7-day smoothing |
| Regular data, need more responsiveness | **EMA** | $\alpha=\frac{2}{N+1}$ | Reacts faster while retaining a comparable effective window |
| Streaming / memory-constrained data | **EMA** | Choose $\alpha$ directly | Requires only $O(1)$ state |
| Irregular observations where each observation matters equally | **SMA** | $N$ observations | `ROWS` naturally represents the most recent $N$ observations |
| Irregular observations where elapsed time matters | **Time-based average** | e.g. 7 calendar days | A row-based window does not represent a fixed time interval |
| Daily series with missing dates | **Calendar-based SMA** | 7 calendar days | Fill the date axis first so gaps don't shrink the time window |
| Missing value means "no measurement" | **SMA/EMA with missing values preserved** | 7 days or corresponding $\alpha$ | Avoids incorrectly treating missing data as zero |
| Missing value genuinely means zero | **SMA/EMA with zeros filled** | 7 days or corresponding $\alpha$ | Zero is part of the actual signal |
| Many gaps / unreliable coverage | **SMA with coverage threshold** | 7 days, e.g. ≥5 observations | Prevents an apparently precise average based on too little data |
| Smoothness should be inferred from the series | **SMA or EMA** | Estimate $N$ from ACF | Uses the data's correlation length instead of guessing |
| Strong seasonality | **Seasonality-aware smoothing** | Based on seasonal period | ACF peaks can represent cycles rather than smoothing scale |
| Need custom finite weights | **WMA** | $N$ + explicit weights | Lets recent observations receive deliberately chosen weights |
| Independent noise with variance $\sigma^2$ | **EMA** | $\alpha$ | Steady-state estimator variance is $\frac{\alpha}{2-\alpha}\sigma^2$ |
| Want EMA effective sample size $N$ | **EMA** | $\alpha=\frac{2}{N+1}$ | Gives $N_{\rm eff}=\frac{2-\alpha}{\alpha}=N$ |

**Default choice:** for a regular daily series, use a **7-day SMA** when interpretability matters; use a **7-period EMA with $\alpha=0.25$** when responsiveness and streaming efficiency matter. For gaps, decide explicitly whether your window is measured in **observations** or **elapsed time** before choosing the SQL/window semantics.

## User

What did we get wrong in this design? Be specific and go into detail.

## ChatGPT

There are several things I would change. The biggest issue is that we gradually treated several **rules of thumb as if they were equivalent statistical definitions**. That can make a small smoothing library look more principled than it actually is.

#### 1\. We conflated "7 observations" with "7 days"

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

* * *

#### 2\. Our EMA implementation silently assumes a particular initialization

We defined:

```python
ema[0] = values[0]
```

That's common, but it is **not neutral**.

For the recurrence

$$
S_t=\alpha X_t+(1-\alpha)S_{t-1},
$$

the choice of $S_0$ affects the early estimates. Starting with $X_0$ gives the first observation disproportionately important influence.

For example, another legitimate initialization is the mean of the first $N$ observations, or a prior estimate of the underlying level.

This matters particularly when $\alpha$ is small: initialization bias can persist for many observations.

We should therefore have made initialization an explicit design decision rather than burying it in the implementation.

* * *

#### 3\. We overstated the EMA/SMA equivalence

We derived

$$
\alpha=\frac{2}{N+1}
$$

by matching the **average lag / center of mass**.

That's a legitimate convention, but it does **not** mean an $N$ -period EMA and $N$ -period SMA are generally equivalent.

They differ in:

- impulse response,
    
- frequency response,
    
- startup behavior,
    
- tail behavior,
    
- phase/lag,
    
- response to sudden changes.
    

The formula should have been described as:

> the conventional EMA parameterization corresponding to an $N$ -period SMA in terms of average lag,

not "the" mathematically correct conversion.

* * *

#### 4\. The ACF method for choosing N was too simplistic

This was probably our biggest statistical overreach.

We suggested:

$$
\rho(k)<e^{-1}
$$

as a correlation-length threshold and then

$$
N\approx k.
$$

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

1.  detrend/difference when appropriate;
    
2.  inspect ACF/PACF and seasonality;
    
3.  generate candidate smoothing parameters;
    
4.  evaluate them using **out-of-sample validation** against the actual objective.
    

ACF is useful for proposing candidate scales, not selecting the final one by itself.

* * *

#### 5\. Our EMA variance derivation assumes IID noise

We derived

$$
\operatorname{Var}(S_t)
=
\frac{\alpha}{2-\alpha}\sigma^2.
$$

That's correct under the assumptions we explicitly made:

$$
X_t=\mu+\epsilon_t,
\qquad
E[\epsilon_t]=0,
\qquad
\operatorname{Var}(\epsilon_t)=\sigma^2,
$$

with independent errors.

But real time series often have **autocorrelated errors**.

For correlated observations,

$$
\operatorname{Var}(S_t)
=
\sum_{i,j}w_iw_j
\operatorname{Cov}(X_{t-i},X_{t-j}),
$$

so the cross-covariance terms don't disappear.

That means the neat

$$
\frac{\alpha}{2-\alpha}
$$

factor is not generally valid for a time-series signal just because we're applying an EMA to it.

* * *

#### 6\. "Effective sample size = N" needs qualification

We observed that with

$$
\alpha=\frac{2}{N+1},
$$

the EMA's IID-noise effective sample size is

$$
N_{\text{eff}}
=
\frac{2-\alpha}{\alpha}
=N.
$$

That's a useful result, but it is specifically an **IID-noise variance equivalence**.

It does not mean:

> an EMA with parameter $N$ contains the same information as an $N$ -point SMA.

The weighting schemes remain very different.

For correlated time-series observations, the effective sample size also changes.

* * *

#### 7\. We didn't distinguish smoothing from forecasting

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

* * *

#### 8\. We didn't address boundary behavior for SMA

Our Python SMA returns:

```python
[]
```

when `window > len(values)`.

But more fundamentally, what should happen during the first $N-1$ observations?

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

* * *

#### 9\. We didn't establish NaN/missing-value semantics in Python

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

* * *

#### 10\. Our property-based tests missed important properties

The tests were useful, but they weren't really a comprehensive property-based suite.

We should have tested properties such as:

**Translation equivariance**

If every input is shifted by $c$,

$$
EMA(x_t+c)=EMA(x_t)+c.
$$

**Scale equivariance**

$$
EMA(cx_t)=c\,EMA(x_t).
$$

**Monotonicity**

For positive weights, if $x_t\le y_t$ everywhere, then

$$
EMA(x)_t\le EMA(y)_t.
$$

**Constant input**

Already tested, and important.

**Bounds**

Already tested, also important.

**Streaming equivalence**

Processing a sequence all at once should equal processing it incrementally.

That's particularly important because we described the library as supporting streaming.

* * *

#### 11\. The Python API isn't actually designed around streaming

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

* * *

#### 12\. We didn't separate the mathematical estimator from the policy

This is the architectural lesson I'd take from all of this.

There are really three layers:

**Estimator**

$$
S_t=\alpha X_t+(1-\alpha)S_{t-1}
$$

**Parameter selection**

How did we get $\alpha$?

- user supplied it,
    
- $N$ -period convention,
    
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

* * *

### What I'd change

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

Most importantly, I'd document that **ACF-derived windows and the $2/(N+1)$ EMA conversion are heuristics/conventions, not universally optimal statistical choices**.

That would turn what we have now from a collection of reasonable snippets into a much more defensible time-series smoothing library.