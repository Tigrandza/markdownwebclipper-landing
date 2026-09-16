On GPT-3: meta-learning, scaling, implications, and deep theory. The scaling hypothesis: neural nets absorb data & compute, generalizing and becoming more Bayesian as problems get harder, manifesting new abilities even at trivial-by-global-standards-scale. The deep learning revolution has begun as foretold.

> GPT-3, announced by OpenAI in May 2020, is the largest neural network ever trained, by over an order of magnitude. Trained on Internet text data, it is the successor to GPT-2, which had surprised everyone by its natural language understanding & generation ability. To the surprise of most (including myself), this vast increase in size did not run into diminishing or negative returns, as many expected, but the benefits of scale continued to happen as forecasted by OpenAI. These benefits were not merely learning more facts & text than GPT-2, but qualitatively distinct & even more surprising in showing [_⁠meta-learning_⁠](https://gwern.net/scaling-hypothesis#meta-learning): while GPT-2 learned how to do common natural language tasks like text summarization, GPT-3 instead learned how to follow directions and learn new tasks from a few examples. (As a result, GPT-3 outputs & interaction are more fascinating & human-like than GPT-2.)
> 
> While the immediate applications of GPT-3, like my poetry or humor writings, are nice, the short-term implications of GPT-3 are much more important.
> 
> First, while GPT-3 is expensive by conventional DL standards, it is cheap by scientific/commercial/military/government budget standards, and the results indicate that models could be made much larger. Second, models can also be made much more powerful, as GPT is an old approach known to be flawed in both minor & major ways, and far from an ‘ideal’ Transformer. Third, GPT-3’s capabilities come from learning on raw (unsupervised) data; that has long been one of the weakest areas of DL, holding back progress in other areas like reinforcement learning or robotics. Models like GPT-3 suggest that large unsupervised models will be vital components of future DL systems, as they can be ‘plugged into’ systems to immediately provide understanding of the world, humans, natural language, and reasoning.
> 
> The meta-learning has a longer-term implication: it is a demonstration of the [_⁠blessings of scale_⁠](https://gwern.net/scaling-hypothesis#blessings-of-scale), where problems with simple neural networks vanish, and they become more powerful, more generalizable, more human-like when simply made very large & trained on very large datasets with very large compute—even though those properties are believed to require complicated architectures & fancy algorithms (and this perceived need drives much research). Unsupervised models benefit from this, as training on large corpuses like Internet-scale text present a myriad of difficult problems to solve; this is enough to drive meta-learning despite GPT not being designed for meta-learning in any way. (This family of phenomena is perhaps driven by neural networks functioning as [ensembles](https://en.wikipedia.org/wiki/Ensemble_learning) of many sub-networks with them all averaging out to an Occam’s razor, which for small data & models, learn superficial or memorized parts of the data, but can be forced into true learning by making the problems hard & rich enough; as [⁠meta-learners learn amortized Bayesian inference⁠](https://gwern.net/backstop#deep-bayes), they build in informative priors when trained over many tasks, and become dramatically more sample-efficient and better at generalization.)
> 
> The blessings of scale in turn support a radical theory: an old AI paradigm held by a few pioneers in connectionism (early artificial neural network research) and by more recent deep learning researchers, the [_⁠scaling hypothesis_⁠](https://gwern.net/scaling-hypothesis#scaling-hypothesis). The scaling hypothesis regards the blessings of scale as the secret of AGI: intelligence is ‘just’ simple neural units & learning algorithms applied to diverse experiences at a (currently) unreachable scale. As increasing computational resources permit running such algorithms at the necessary scale, the neural networks will get ever more intelligent.
> 
> When? Estimates of Moore’s law-like progress curves decades ago by pioneers like Hans Moravec indicated that it would take until the 2010s for the sufficiently-cheap compute for tiny insect-level prototype systems to be available, and the 2020s for the first sub-human systems to become feasible, and these forecasts are holding up. (Despite this vindication, the scaling hypothesis is so unpopular an idea, and difficult to prove in advance rather than as a _fait accompli_, that while the GPT-3 results finally drew some public notice after OpenAI enabled limited public access & people could experiment with it live, it is unlikely that many entities will modify their research philosophies, much less kick off an ‘arms race’.)
> 
> More concerningly, GPT-3’s scaling curves, unpredicted meta-learning, and success on various anti-AI challenges suggests that in terms of futurology, AI researchers’ forecasts are an emperor sans garments: they have no coherent model of how AI progress happens or why GPT-3 was possible or what specific achievements should cause alarm, where intelligence comes from, and do not learn from any falsified predictions. Their primary concerns appear to be supporting the status quo, placating public concern, and remaining respectable. As such, their comments on AI risk are meaningless: they would make the same public statements if the scaling hypothesis were true or not.
> 
> Depending on what investments are made into scaling DL, and how fast compute grows, the 2020s should be quite interesting—sigmoid or singularity?
> 
> For more ML scaling research, follow the [/r/MLScaling⁠](https://www.reddit.com/r/mlscaling/) subreddit. For a fiction treatment as SF short story, see [“It Looks Like You’re Trying To Take Over The World”⁠](https://gwern.net/fiction/clippy). For my May 2022 followup 2 years later, see [⁠“Scaling Hypothesis Revisited”⁠](https://gwern.net/scaling-hypothesis-revisited); see also [_⁠Situational Awareness_](https://situational-awareness.ai/) & [_⁠AI 2027_](https://ai-2027.com/). For more speculation on how and why DL scaling works, see [“Human-like Neural Nets by Catapulting”⁠](https://gwern.net/llm-catapult).

Read The Samples

On [“GPT-3: Language Models are Few-Shot Learners”, Brown et al 2020⁠](https://arxiv.org/abs/2005.14165#openai) ([poems⁠](https://arxiv.org/pdf/2005.14165.pdf&org=openai#page=48) & my followup [“GPT-3 Creative Writing”⁠](https://gwern.net/gpt-3), compare [my old finetuned GPT-2 poetry⁠](https://gwern.net/gpt-2); [⁠random samples](https://justpaste.it/7eovk); [“OpenAI API”⁠](https://openai.com/blog/openai-api/) with real-world demos)

I strongly encourage anyone interested in GPT-3 to also at least skim OA’s [⁠random samples](https://justpaste.it/7eovk), or better yet, my samples in “GPT-3 Creative Writing”—reading the paper & looking at some standard benchmark graphs does not give a good feel for what working with GPT-3 is like or the diversity of things it can do which are missed by benchmarks.

# [Meta-Learning](https://gwern.net/scaling-hypothesis#meta-learning "Link to section: § 'Meta-Learning'")

Learning to learn

Learning to learn. In May 2020, OA released—to remarkably little interest from researchers, no blog post, no media blitz, and little public discussion beyond the snidely dismissive—the long-awaited followup to [GPT-2⁠](https://openai.com/index/better-language-models/), one model to rule them all: a 117× larger 175b-parameter model with far more powerful language generation, which lets it solve a wide variety of problems from arithmetic⁠[<sup>⁠1⁠</sup>](https://gwern.net/scaling-hypothesis#fn1) to English translation to unscrambling anagrams to SAT analogies—purely from being prompted with text examples, without any specialized training or finetuning whatsoever, merely next-word prediction training on a big Internet text corpus. This implies GPT-3’s attention mechanisms serve as [“fast weights”⁠](https://arxiv.org/abs/1610.06258#deepmind) that have “learned to learn” by training on sufficiently varied data⁠[<sup>⁠2⁠</sup>](https://gwern.net/scaling-hypothesis#fn2), forcing it to do more than just learn ordinary textual relationships. Like OpenAI’s [Jukebox⁠](https://openai.com/research/jukebox) just weeks ago (itself a remarkable demonstration of scaling in synthesizing _raw audio_ music complete with remarkably realistic voices/instruments), the announcement of GPT-3 appears to have sunk almost without a trace, so I will go into more depth than usual.

Click to expandClick to expand

**[Backlinks (3)⁠](https://gwern.net/design#backlink) for [⁠“Meta-Learning”⁠](https://gwern.net/scaling-hypothesis#meta-learning):**

-   [The Scaling Hypothesis⁠](https://gwern.net/scaling-hypothesis) ([context⁠](https://gwern.net/scaling-hypothesis#gwern-2161575011)):
    
    > [⁠\[backlink context\]](https://gwern.net/scaling-hypothesis)
    
-   [The Scaling Hypothesis⁠](https://gwern.net/scaling-hypothesis) ([context⁠](https://gwern.net/scaling-hypothesis#gwern-2565333923)):
    
    > [⁠\[backlink context\]](https://gwern.net/scaling-hypothesis)
    
-   [GPT-3 Creative Fiction⁠](https://gwern.net/gpt-3) ([⁠full context⁠](https://gwern.net/gpt-3#gwern-scaling-hypothesis--meta-learning)):
    
    > [⁠\[backlink context\]](https://gwern.net/gpt-3)
    

# [Flexing GPT](https://gwern.net/scaling-hypothesis#flexing-gpt "Link to section: § 'Flexing GPT'")

> ‘“They are absolutely reasonable. I think that is their distinguishing characteristic. Yes, Mr. Erskine, an absolutely reasonable people. I assure you there is no nonsense about the Americans.” “How dreadful!” cried Lord Henry. “I can stand brute force, but brute reason is quite unbearable. There is something unfair about its use. It is hitting below the intellect.”’
> 
> _The Picture of Dorian Gray_, Oscar Wilde

“Attacks only get better.”

“Attacks only get better.” 2 years ago, [GPT-1⁠](https://openai.com/research/language-unsupervised) was interestingly useful pretraining and adorable with its “sentiment neuron”. 1 year ago, GPT-2 was impressive with its excellent text generation & finetuning capabilities. This year, GPT-3 is scary because it’s a magnificently obsolete architecture from early 2018 (used mostly for software engineering convenience as the infrastructure has been debugged), which is small & shallow compared to what’s possible⁠[<sup>⁠3⁠</sup>](https://gwern.net/scaling-hypothesis#fn3)⁠[<sup>⁠4⁠</sup>](https://gwern.net/scaling-hypothesis#fn4), with a simple uniform architecture⁠[<sup>⁠5⁠</sup>](https://gwern.net/scaling-hypothesis#fn5) trained in the dumbest way possible (unidirectional prediction of next text token) on a single impoverished modality (random Internet HTML text dumps⁠[<sup>⁠6⁠</sup>](https://gwern.net/scaling-hypothesis#fn6)) on tiny data (fits on a laptop), sampled in a dumb way⁠[<sup>⁠7⁠</sup>](https://gwern.net/scaling-hypothesis#fn7), its benchmark performance sabotaged by bad prompts & data tokenization problems (especially arithmetic & commonsense reasoning), and yet, the first version already manifests crazy runtime meta-learning—and the scaling curves _still_ are not bending! The samples are also better than ever, whether it’s GPT-3 inventing new penis jokes⁠[<sup>⁠8⁠</sup>](https://gwern.net/scaling-hypothesis#fn8) or writing (mostly working) [JavaScript tutorials](https://justpaste.it/7eovk#javascript) about rotating arrays.

It’s odd that this qualitative leap appears to be largely missed by the standard NLP benchmarks. Nothing in the raw metrics reported on, say, Penn Tree Bank or LAMBADA or WinoGrande would lead you to expect all of this hilarious and creative output; the meta-learning results might, but only if you already thought meta-learning was important. This suggests to me that a useful post-GPT-3 contribution would be figuring out how to benchmark these sorts of flexible text generation capabilities (possibly something along the lines of Chollet’s image-based [Abstraction and Reasoning Corpus (ARC)⁠](https://arxiv.org/abs/1911.01547#google)).

# [Baking The Cake](https://gwern.net/scaling-hypothesis#baking-the-cake "Link to section: § 'Baking The Cake'")

Not the whole picture, but a big partScaling still workingAnti-scaling: penny-wise, pound-foolish

![Is GPT actually part of AGI—or is the cake a lie? (LeCun 2019)](https://gwern.net/doc/ai/nn/2019-lecun-isscctalk-cake.png)

Is GPT actually part of AGI—or is the cake a lie? ([⁠LeCun 2019⁠](https://gwern.net/doc/ai/scaling/2019-02-18-lecun-isscc-talk-deeplearninghardwarepastpresentandfuture.pdf#page=60))

Not the whole picture, but a big part. Does it set SOTA on every task? No, of course not. But the question is not whether we can lawyerly find any way in which it might not work, but [whether there is any way which it might work⁠](https://gwern.net/forking-path). And there are many ways it might work better (see the [⁠“Limitations” section⁠](https://arxiv.org/pdf/2005.14165.pdf&org=openai#page=34) for just a few). Does GPT-3 _do_ anything like steer a robot around SF shooting lasers and rockets at humans⸮ No, of course not. It is ‘just’ a text prediction model, an idiot savant of text; but an idiot savant, we should remember, is only a genetic mutation or bit of brain damage away from a normal human. If RL is the cherry on the top of the supervised learning frosting, and supervised learning is the frosting on top of the unsupervised learning cake, well, it looks like the cake layers are finally rising.

![GPT-3’s implications in the ‘money printer go brr’ meme format: the head of Rich Sutton says ‘GPUs go bitter’, referencing his ‘bitter lesson’ that most clever AI innovations are ultimately useless as they hamstring AI performance and are surpassed by methods that make fewer assumptions & use more compute/data, while the personification of AI academia, where cleverness is rewarded and heavy use of compute is considered cheating and ugly, sheds tears and complains about approaches like GPT-3 beating decades of clever academic systems.](https://gwern.net/doc/ai/nn/cnn/2020-07-24-gwern-meme-moneyprinter-bitterlesson-gpt3.png "GPT-3's implications in the 'money printer go brr' meme format: the head of Rich Sutton says 'GPUs go bitter', referencing his 'bitter lesson' that most clever AI innovations are ultimately useless as they hamstring AI performance and are surpassed by methods that make fewer assumptions & use more compute/data, while the personification of AI academia, where cleverness is rewarded and heavy use of compute is considered cheating and ugly, sheds tears and complains about approaches like GPT-3 beating decades of clever academic systems.")

A better GPT-3 lesson.

Scaling still working. I was surprised, as I had expected closer to 100b parameters, and I thought that the performance of [CTRL⁠](https://arxiv.org/abs/1909.05858#salesforce)/[Meena⁠](https://arxiv.org/abs/2001.09977#google)/[MegatronLM⁠](https://nv-adlr.github.io/MegatronLM)/[T5⁠](https://arxiv.org/abs/1910.10683#google)/[Turing-NLG⁠](https://www.microsoft.com/en-us/research/blog/turing-nlg-a-17-billion-parameter-language-model-by-microsoft/)/[GPipe⁠](https://arxiv.org/abs/1811.06965#google) suggested that, [the scaling papers⁠](https://en.wikipedia.org/wiki/Neural_scaling_law)⁠[<sup>⁠9⁠</sup>](https://gwern.net/scaling-hypothesis#fn9) notwithstanding, the scaling curves had started to bend and by 100b, it might be hard to justify further scaling. However, in the latest version of [“the unreasonable effectiveness of data”⁠](https://gwern.net/doc/ai/scaling/2009-halevy.pdf) where “the curves cross”/“scissor effect” and the neural method eventually wins (eg. [Banko & Brill 2001⁠](https://gwern.net/doc/ai/scaling/2001-banko.pdf#microsoft), [Brants et al 2007⁠](https://gwern.net/doc/ai/scaling/2007-brants.pdf#google), [⁠Koehn & Knowles 2017⁠](https://gwern.net/doc/ai/scaling/2017-koehn-figure3-bleuscoreswithvaryingamountsoftrainingdata.png)), GPT-3 hits twice that without noticeable change in scaling factors: its scaling continues to be roughly logarithmic/power-law, as it was for much smaller models & as forecast, and it has not hit a regime where gains effectively halt or start to require increases vastly beyond feasibility. That suggests that it would be both possible and useful to head to trillions of parameters (which are still well within available compute & budgets, requiring merely thousands of GPUs & perhaps $13<sup>$10</sup><sub>2020</sub>–$126<sup>$100</sup><sub>2020</sub>m budgets assuming no improvements which of course there will be, see [⁠Hernandez & Brown 2020⁠](https://gwern.net/scaling-hypothesis#hernandez-brown-2020-paper) etc.), and eyeballing the graphs, many benchmarks like the [Winograd schema⁠](https://en.wikipedia.org/wiki/Winograd_schema_challenge) [WinoGrande⁠](https://arxiv.org/abs/1907.10641#allen) would fall by 10t parameters. The predictability of scaling is striking, and makes scaling models more like statistics than AI. (AI is statistics which does what we want it to but doesn’t work; and statistics is AI which works but doesn’t do what we want.)

![GPT-3: not even that much compute—3640 petaflop/s-day, only 2× their estimate for AlphaGo Zero, 1860166ya. (Historical graph modified by myself from “AI and Compute”, Amodei et al 2018.)](https://gwern.net/doc/ai/nn/transformer/gpt/3/2019-11-07-amodei-aiandcompute-twodistincteras-gpt3modified.jpg)

GPT-3: not even that much compute—[⁠3640 petaflop/s-day⁠](https://arxiv.org/pdf/2005.14165.pdf#page=46&org=openai), only 2× their estimate for AlphaGo Zero, 1860<sub><span title="1860 was 166 years ago.">166ya</span></sub>. (Historical graph modified by myself from [“AI and Compute”, Amodei et al 2018⁠](https://openai.com/research/ai-and-compute).)

Anti-scaling: penny-wise, pound-foolish. GPT-3 is an extraordinarily expensive model by the standards of machine learning: it is estimated that training it may require the annual cost of more machine learning researchers than you can count on one hand (~$6.29<sup>$5</sup><sub>2020</sub>m⁠[<sup>⁠10⁠</sup>](https://gwern.net/scaling-hypothesis#fn10)), up to $38<sup>$30</sup><sub>2020</sub> of hard drive space to store the model (500–800GB), and multiple pennies of electricity per 100 pages of output (0.4 kWH). Researchers are concerned about the prospects for scaling: can ML afford to run projects which cost more than 0.1 milli-Manhattan-Projects⸮⁠[<sup>⁠11⁠</sup>](https://gwern.net/scaling-hypothesis#fn11) Surely it would be too expensive, even if it represented another large leap in AI capabilities, to spend up to 10 milli-Manhattan-Projects to scale GPT-3 100× to a trivial thing like human-like performance in many domains⸮ Many researchers feel that such a suggestion is absurd and refutes the entire idea of scaling machine learning research further; they asseverate that their favored approaches (you know, the ones which don’t work⁠[<sup>⁠12⁠</sup>](https://gwern.net/scaling-hypothesis#fn12)) will run far more efficiently, and that the field would be more productive if it instead focused on research which can be conducted by an impoverished goatherder on an old laptop running off solar panels.⁠[<sup>⁠13⁠</sup>](https://gwern.net/scaling-hypothesis#fn13) Nonetheless, I think we can expect further scaling. (10×? No, 10× isn’t cool. You know what’s cool? [⁠100–1000×⁠](https://www.reddit.com/r/slatestarcodex/comments/hys565/are_we_in_an_ai_overhang/fzezi7d/), trained on a [fancy new supercomputer⁠](https://news.microsoft.com/source/features/ai/openai-azure-supercomputer/).) It is, after all, easier to make something efficient after it exists than before.

Click to expandClick to expand

**[Backlinks (1)⁠](https://gwern.net/design#backlink) for [⁠“Baking The Cake”⁠](https://gwern.net/scaling-hypothesis#baking-the-cake):**

-   [The Scaling Hypothesis⁠](https://gwern.net/scaling-hypothesis) ([context⁠](https://gwern.net/scaling-hypothesis#gwern-2715940138)):
    
    > [⁠\[backlink context\]](https://gwern.net/scaling-hypothesis)
    

# [Scaling](https://gwern.net/scaling-hypothesis#scaling "Link to section: § 'Scaling'")

How far will scaling go?

How far will scaling go? The scaling papers suggest that the leaps we have seen over the past few years are not even half way there in terms of absolute likelihood loss, never mind what real-world capabilities each additional decrement translates into. The scaling curves are clean; from [“Scaling Laws for Neural Language Models”, Kaplan et al 2020⁠](https://arxiv.org/abs/2001.08361#openai):

![Figure 1: Language modeling performance improves smoothly as we increase the model size, dataset size, and amount of compute used for training. For optimal performance all three factors must be scaled up in tandem. Empirical performance has a power-law relationship with each individual factor when not bottlenecked by the other two. (Kaplan et al 2020)](https://gwern.net/doc/ai/nn/transformer/gpt/2020-kaplan-figure1-dlscaling.jpg "Figure 1: Language modeling performance improves smoothly as we increase the model size, dataset size, and amount of compute used for training. For optimal performance all three factors must be scaled up in tandem. Empirical performance has a power-law relationship with each individual factor when not bottlenecked by the other two. (Kaplan et al 2020)")

DL scaling laws: compute, data, model parameters. ([⁠Figure 1⁠](https://arxiv.org/pdf/2001.08361.pdf#page=3&org=openai))

GPT-3 represents ~10<sup>3</sup> on this chart, leaving plenty of room for further loss decreases—especially given the [⁠uncertainty in extrapolation⁠](https://arxiv.org/pdf/2001.08361.pdf#page=17&org=openai):

![Figure 15: Far beyond the model sizes we study empirically, we find a contradiction between our equations for _L(C~min~)_ and _L(D)_ due to the slow growth of data needed for compute-efficient training. The intersection marks the point before which we expect our predictions to break down. The location of this point is highly sensitive to the precise exponents from our power-law fits. (Kaplan et al 2020)](https://gwern.net/doc/ai/nn/transformer/gpt/2020-kaplan-figure15-projectingscaling.png "Figure 15: Far beyond the model sizes we study empirically, we find a contradiction between our equations for _L(C~min~)_ and _L(D)_ due to the slow growth of data needed for compute-efficient training. The intersection marks the point before which we expect our predictions to break down. The location of this point is highly sensitive to the precise exponents from our power-law fits. (Kaplan et al 2020)")

Projecting DL power laws: still room beyond GPT-3.

Lo and behold, the scaling laws continue for GPT-3 models for several orders past [⁠Kaplan et al 2020⁠](https://gwern.net/scaling-hypothesis#kaplan-et-al-2020); from [⁠Brown et al 2020⁠](https://arxiv.org/pdf/2005.14165.pdf#page=11&org=openai):

![Brown et al 2020: Figure 3.1: Smooth scaling of performance with compute. Performance (measured in terms of cross-entropy validation loss) follows a power-law trend with the amount of compute used for training. The power-law behavior observed in Kaplan et al 2020 continues for an additional two orders of magnitude with only small deviations from the predicted curve. For this figure, we exclude embedding parameters from compute and parameter counts. (Brown et al 2020). Cross-validation loss extrapolation: $L(oss) = 2.57 ⋅ C(ompute in petaflop-s/days) ^ −0.048$](https://gwern.net/doc/ai/nn/transformer/gpt/2020-brown-figure31-gpt3scaling.png "Brown et al 2020: Figure 3.1: Smooth scaling of performance with compute. Performance (measured in terms of cross-entropy validation loss) follows a power-law trend with the amount of compute used for training. The power-law behavior observed in Kaplan et al 2020 continues for an additional two orders of magnitude with only small deviations from the predicted curve. For this figure, we exclude embedding parameters from compute and parameter counts. (Brown et al 2020). Cross-validation loss extrapolation: $L(oss) = 2.57 ⋅ C(ompute in petaflop-s/days) ^ −0.048$")

GPT-3 continues to scale as predicted. (Note GPT-3’s curve has not ‘bounced’, and it trained only ~0.5 epochs, see [⁠Table 2.2⁠](https://arxiv.org/pdf/2005.14165.pdf#page=9&org=openai))

If we see such striking gains in halving the validation loss but with so far left to go, what is left to emerge as we third or halve again? How far does this go, exactly? How do we predict what emerges when? Bueller? Bueller? (See also [⁠Meena’s perplexity vs human-ness chatbot ratings⁠](https://gwern.net/doc/ai/2020-adiwardana-meena-figure1-humanratingsvslikelihood.png), GPT-3-written news articles’ [⁠probability of fooling humans by parameter count⁠](https://gwern.net/doc/ai/nn/transformer/gpt/2020-brown-figure313-humanabilitytodetectmodelgeneratednewsstories.jpg), and [⁠GPT-3 model size vs Q&A⁠](https://gwern.net/doc/ai/nn/transformer/gpt/2020-hendrycks-figure1b-gpt3-qascaling.png) from [Hendrycks et al 2020⁠](https://arxiv.org/abs/2009.03300).)

## [Blessings Of Scale](https://gwern.net/scaling-hypothesis#blessings-of-scale "Link to section: § 'Blessings Of Scale'")

> Extrapolating the spectacular performance of GPT-3 into the future suggests that the answer to life, the universe and everything is just 4.398 trillion parameters.
> 
> [Geoff Hinton⁠](https://x.com/geoffreyhinton/status/1270814602931187715)

We don’t know how to train NNsBlessings of scale: stability → generalization → meta-learning

We don’t know how to train NNs. The _blessings of scale_ is the observation that for deep learning, hard problems are easier to solve than easy problems—everything gets better as it gets larger (in contrast to the usual outcome in research, where small things are hard and large things impossible). The bigger the neural net/compute/data/problem, the faster it learns, the better it learns, the stabler it learns, and so on. A problem we can’t solve at all at small _n_ may suddenly become straightforward with millions or billions of _n_. “NNs are lazy”: they can do far more than we make them do when we push them beyond easy answers & cheap shortcuts. The [bitter lesson](http://www.incompleteideas.net/IncIdeas/BitterLesson.html) is the harder and bigger, the better. (Besides GPT-3, one could mention recent progress in semi-supervised learning & the model-based DRL renaissance.)

![Humorous description of the simplicity of the AlphaGo Zero architecture compared to AlphaGo Master](https://gwern.net/doc/reinforcement-learning/2017-12-24-gwern-meme-nnlayers-alphagozero.jpg "Humorous description of the simplicity of the AlphaGo Zero architecture compared to AlphaGo Master")

AlphaGo Zero: ‘just stack moar layers lol!’

Blessings of scale: stability → generalization → meta-learning. GPT-3 is hamstrung by its training & data, but DL enjoys an unreasonably effective [blessing of dimensionality⁠](https://en.wikipedia.org/wiki/Curse_of_dimensionality#Blessing_of_dimensionality)—just simply training a _big_ model on a _lot_ of data induces better properties like meta-learning without even the slightest bit of that architecture being built in; and in general, training on more and harder tasks creates ever more human-like performance, generalization, and robustness. The GPT natural-language & programming language models, [iGPT⁠](https://openai.com/index/image-gpt/)/[Vision Transformer⁠](https://arxiv.org/abs/2010.11929#google) for images (and to some degree [GPT-f⁠](https://arxiv.org/abs/2009.03393#openai)), show that simply scaling up models & datasets without any supervision produces results competitive with the best (and most complex) alternatives, using the same simple architecture, gradually passing from superficial surface correlations to more human-like brain activity ([Schrimpf et al 2020⁠](https://www.biorxiv.org/content/10.1101/2020.06.26.174482.full)) and linguistic biases as data increases (eg. [Warstadt et al 2020⁠](https://arxiv.org/abs/2010.05358)). In fact, one may not even need complicated attention mechanisms at scale, as fully-connected networks—hard to get much simpler than them!—[work surprisingly well⁠](https://gwern.net/doc/ai/nn/fully-connected/index) for many tasks. One typically trains such large models with simple optimizers like Adam—because the complicated ones lose their advantages as batch sizes increase and [the simple optimizers work fine⁠](https://arxiv.org/abs/2102.06356) and are more memory-efficient anyway. [⁠OA5⁠](https://arxiv.org/pdf/1912.06680.pdf&org=openai#page=13) does not just scale to, but [⁠stabilizes at⁠](https://gwern.net/scaling-hypothesis#ppo-dota2), minibatches of millions due to [gradient noise⁠](https://openai.com/research/how-ai-training-scales). OA5-like, [BigGAN⁠](https://arxiv.org/pdf/1809.11096#page=8&org=deepmind) stabilizes at large-scale image datasets like JFT-300M & benefits from unusually large minibatches and VAEs (long an also-ran to GANs or autoregressive models in terms of sharp image generation) catch up if you make them very deep ([Child 2020⁠](https://arxiv.org/abs/2011.10650#openai), [Vahdat & Kautz 2020⁠](https://arxiv.org/abs/2007.03898#nvidia)); while classifier CNNs like [BiT⁠](https://arxiv.org/abs/1912.11370#google)⁠[<sup>⁠14⁠</sup>](https://gwern.net/scaling-hypothesis#fn14)/[Dojolonga et al 2020⁠](https://arxiv.org/abs/2007.08558#google) or [ResNeXt⁠](https://arxiv.org/abs/1907.07640) or [Noisy Student⁠](https://arxiv.org/abs/1911.04252#google) transfer & [robustify⁠](https://arxiv.org/abs/2007.00644) [with⁠](https://arxiv.org/abs/2103.14586#google) human-like errors⁠[<sup>⁠15⁠</sup>](https://gwern.net/scaling-hypothesis#fn15), multimodal learning produces better representations on fewer data (eg. [ViLBERT⁠](https://arxiv.org/abs/1912.02315#facebook)/[VideoBERT⁠](https://arxiv.org/abs/1904.01766#google), motivating [OA’s interest in big multimodal models⁠](https://www.technologyreview.com/2020/02/17/844721/ai-openai-moonshot-elon-musk-sam-altman-greg-brockman-messy-secretive-reality/)), and RNNs can [predict videos⁠](https://arxiv.org/abs/1911.01655#google). [AlphaStar⁠](https://gwern.net/doc/reinforcement-learning/model-free/alphastar/2019-vinyals.pdf#deepmind) reaches human-level with hundreds of competing self-players to cover possible strategies. Imitation learning DRL like [MetaMimic⁠](https://arxiv.org/abs/1810.05017#deepmind) generalizes at hundreds of tasks to train a deep net. Disentanglement emerges in [StyleGAN⁠](https://arxiv.org/abs/1812.04948#nvidia) with sufficiently deep _w_ embeddings, with enough parameters to train raw audio in the aforementioned Jukebox, or in [relational networks⁠](https://arxiv.org/abs/1706.01427#deepmind)/[GQN⁠](https://gwern.net/doc/reinforcement-learning/model/2018-eslami.pdf#deepmind)/[Transformers⁠](https://arxiv.org/abs/2002.05867) with enough samples to force factorization. (See also [Hill et al 2019⁠](https://arxiv.org/abs/1910.00571#deepmind)/[Chaplot et al 2017⁠](https://arxiv.org/abs/1706.07230)/[Yu et al 2018⁠](https://arxiv.org/abs/1802.01433#baidu)/[Lake 2019⁠](https://arxiv.org/abs/1906.05381)/[Interactive Agents Group 2020⁠](https://arxiv.org/abs/2012.05672#deepmind).) Training [Dactyl⁠](https://arxiv.org/abs/1910.07113#openai) (or [humanoid robots⁠](https://arxiv.org/abs/2304.13653#deepmind)) on millions of domain randomizations induced similar implicit meta-learning where during each runtime invocation, the RNN probes its environment and encodes its understanding of robot hand control into its hidden state; and [DD-PPO⁠](https://arxiv.org/abs/1911.00357#facebook) outperforms classical robot planners by scaling 2 orders. Or in [Procgen⁠](https://openai.com/research/procgen-benchmark) or [CoinRun⁠](https://distill.pub/2020/understanding-rl-vision/#diversity-hypothesis), training on hundreds of levels trains agents to solve levels individually and worsens performance on other levels, but at thousands of levels, they begin to generalize to unseen levels. (Similarly, [language model pretraining-finetuning⁠](https://arxiv.org/abs/2101.11038#facebook) overfits at small numbers of datasets but improves markedly with enough diversity.) [AlphaZero⁠](https://gwern.net/doc/reinforcement-learning/model/alphago/2018-silver.pdf#deepmind) demonstrated truly superhuman Go without ‘delusions’ just by training a bigger model on a richer signal & pro-level play without any search—and [MuZero⁠](https://arxiv.org/abs/1911.08265#deepmind), for that matter, demonstrated that just training an RNN end-to-end to predict a reward on enough data is enough to obsolete even AlphaZero and learn tree search implicitly (but better). And on and on. DM researcher [⁠Matthew Botvinick⁠](https://gwern.net/scaling-hypothesis#scholl-2020), discussing their meta-reinforcement learning work where they were surprised to discover meta-learning emerging, and that it did so regardless of which specific architecture they used:

> …it’s something that just happens. In a sense, you can’t avoid this happening. If you have a system that has memory, and the function of that memory is shaped by reinforcement learning, and this system is trained on a series of interrelated tasks, this is going to happen. You can’t stop it.

Pace [Breiman⁠](https://gwern.net/doc/ai/scaling/1995-breiman.pdf), **why**? Why do they transfer and generalize? Why do these blessings of scale exist? Why do we need to train large models when small models provably exist with the same performance? Why do larger models not overfit (though they [can⁠](https://arxiv.org/abs/1611.03530#google)) and generalize better than smaller models? What’s up with the whole [‘double descent’⁠](https://openai.com/research/deep-double-descent) anyway?

These are all, ahem, deep questions about neural networks and heavily debated, but right now, I would suggest that the answer lies in some mix of the model compression/distillation, [‘lottery ticket hypothesis’⁠](https://ai.meta.com/blog/understanding-the-generalization-of-lottery-tickets-in-neural-networks/), [Bayesian neural network⁠](https://arxiv.org/abs/2002.08791), and [learned representation⁠](https://arxiv.org/abs/2007.00810#google) (like [circuits⁠](https://distill.pub/2020/circuits/zoom-in/#openai)) literatures.

Big models work because they encode a dizzyingly vast number of sub-models in an extremely [high-dimensional](https://colah.github.io/posts/2014-03-NN-Manifolds-Topology/) abstract space, representing countless small sub-models ([Orseau et al 2020⁠](https://arxiv.org/abs/2006.12156#deepmind)) [interpolating over data⁠](https://gwern.net/doc/ai/scaling/2020-hasson.pdf), one of which is likely to solve the problem well, and so ensures the problem is soluble by the overall model. They function as an ensemble: even though there are countless overfit sub-models inside the single big model, they all average out, leading to a preference for simple solutions. This Occam’s razor biases the model towards simple solutions which are flexible enough to gradually expand in complexity to match the data.

However, “neural nets are lazy”: sub-models which memorize pieces of the data, or latch onto superficial features, learn quickest and are the easiest to represent internally. If the model & data & compute are not big or varied enough, the optimization, by the end of the cursory training, will have only led to a sub-model which achieves a low loss but missed important pieces of the desired solution.

On the other hand, for a model like GPT-3, it is sufficiently powerful a model that its sub-models can do anything from poetry to arithmetic, and it is trained on so much data that those superficial models may do well early on, but gradually fall behind more abstract models; a sub-model which memorizes some of the data is indeed much simpler than a sub-model which encodes genuine arithmetic (a NN can probably memorize tens of thousands of lookup table entries storing examples of addition in the space it would take to encode an abstract algorithm like ‘addition’), but it can’t possibly memorize _all_ the instances of arithmetic (implicit or explicit) in GPT-3’s Internet-scale dataset. If a memorizing sub-model tried to do so, it would become extremely large and penalized. Eventually, after enough examples and enough updates, there may be a phase transition ([⁠Viering & Loog 2021⁠](https://arxiv.org/pdf/2103.10948.pdf#page=22)), and the simplest ‘arithmetic’ model which accurately predicts the data just _is_ arithmetic. And then the meta-learning, after seeing enough instances of algorithms which vary slightly within each sample, making it hard to learn each task separately, just _is_ learning of more generic algorithms, yielding sub-models which achieve lower loss than the rival sub-models, which either fail to predict well or bloat unacceptably. (GPT-2-1.5b apparently was too small or shallow to ensemble easily over sub-models encoding meta-learning algorithms, or perhaps not trained long enough on enough data to locate the meta-learner models; GPT-3 was.)

So, the larger the model, the better, if there is enough data & compute to push it past the easy convenient sub-models and into the sub-models which express desirable traits like generalizing, factorizing perception into meaningful latent dimensions, meta-learning tasks based on descriptions, learning causal reasoning & logic, and so on. If the ingredients are there, it’s going to happen.

Click to expandClick to expand

**[Backlinks (18)⁠](https://gwern.net/design#backlink) for [⁠“Blessings Of Scale”⁠](https://gwern.net/scaling-hypothesis#blessings-of-scale):**

-   [The Scaling Hypothesis⁠](https://gwern.net/scaling-hypothesis) ([context⁠](https://gwern.net/scaling-hypothesis#gwern-824612077)):
    
    > [⁠\[backlink context\]](https://gwern.net/scaling-hypothesis)
    
-   [The Scaling Hypothesis⁠](https://gwern.net/scaling-hypothesis) ([context⁠](https://gwern.net/scaling-hypothesis#gwern-3759858838)):
    
    > [⁠\[backlink context\]](https://gwern.net/scaling-hypothesis)
    
-   [Towards Benchmarking LLM Diversity & Creativity⁠](https://gwern.net/creative-benchmark) ([⁠full context⁠](https://gwern.net/creative-benchmark#gwern-scaling-hypothesis--blessings-of-scale)):
    
    > [⁠\[backlink context\]](https://gwern.net/creative-benchmark)
    
-   [Absolute Unit NNs: Regression-Based MLPs for Everything⁠](https://gwern.net/aunn) ([⁠full context⁠](https://gwern.net/aunn#gwern-scaling-hypothesis--blessings-of-scale)):
    
    > [⁠\[backlink context\]](https://gwern.net/aunn)
    
-   [Scaling MLPs: A Tale of Inductive Bias⁠](https://arxiv.org/abs/2306.13575):
    
    > [\[backlink context\]⁠](https://arxiv.org/abs/2306.13575)
    
-   [Modular Brain AUNNs for Uploads⁠](https://gwern.net/aunn-brain) ([⁠full context⁠](https://gwern.net/aunn-brain#gwern-scaling-hypothesis--blessings-of-scale)):
    
    > [⁠\[backlink context\]](https://gwern.net/aunn-brain)
    
-   [Free-Play Periods for RL Agents⁠](https://gwern.net/free-play) ([⁠full context⁠](https://gwern.net/free-play#gwern-scaling-hypothesis--blessings-of-scale)):
    
    > [⁠\[backlink context\]](https://gwern.net/free-play)
    
-   [GANs Didn’t Fail, They Were Abandoned⁠](https://gwern.net/gan) ([⁠full context⁠](https://gwern.net/gan#gwern-scaling-hypothesis--blessings-of-scale)):
    
    > [⁠\[backlink context\]](https://gwern.net/gan)
    
-   [Gato: A Generalist Agent⁠](https://arxiv.org/abs/2205.06175#deepmind):
    
    > [\[backlink context\]⁠](https://arxiv.org/abs/2205.06175#deepmind)
    
-   [Chain-of-Thought Prompting Elicits Reasoning in Large Language Models⁠](https://arxiv.org/abs/2201.11903#google):
    
    > [\[backlink context\]⁠](https://arxiv.org/abs/2201.11903#google)
    
-   [Reward is enough⁠](https://www.sciencedirect.com/science/article/pii/S0004370221000862#deepmind):
    
    > [\[backlink context\]⁠](https://www.sciencedirect.com/science/article/pii/S0004370221000862#deepmind)
    
-   [Grokking: Generalization Beyond Overfitting On Small Algorithmic Datasets⁠](https://gwern.net/doc/ai/nn/fully-connected/2021-power.pdf#openai):
    
    > [\[backlink context\]⁠](https://gwern.net/doc/ai/nn/fully-connected/2021-power.pdf#openai)
    
-   [‘LaMDA’ directory⁠](https://gwern.net/doc/ai/nn/transformer/gpt/lamda/index) ([⁠full context⁠](https://gwern.net/doc/ai/nn/transformer/gpt/lamda/index#gwern-scaling-hypothesis--blessings-of-scale)):
    
    > [⁠\[backlink context\]](https://gwern.net/doc/ai/nn/transformer/gpt/lamda/index)
    
-   [GPT-2 Preference Learning for Music Generation⁠](https://gwern.net/gpt-2-preference-learning) ([⁠full context⁠](https://gwern.net/gpt-2-preference-learning#gwern-scaling-hypothesis--blessings-of-scale)):
    
    > [⁠\[backlink context\]](https://gwern.net/gpt-2-preference-learning)
    
-   [‘NN sparsity’ directory⁠](https://gwern.net/doc/ai/nn/sparsity/index) ([⁠full context⁠](https://gwern.net/doc/ai/nn/sparsity/index#gwern-scaling-hypothesis--blessings-of-scale)):
    
    > [⁠\[backlink context\]](https://gwern.net/doc/ai/nn/sparsity/index)
    
-   [‘AI scaling’ directory⁠](https://gwern.net/doc/ai/scaling/index) ([⁠full context⁠](https://gwern.net/doc/ai/scaling/index#gwern-scaling-hypothesis--blessings-of-scale)):
    
    > [⁠\[backlink context\]](https://gwern.net/doc/ai/scaling/index)
    
-   [ARPA and SCI: Surfing AI⁠](https://gwern.net/review/arpa) ([⁠full context⁠](https://gwern.net/review/arpa#gwern-scaling-hypothesis--blessings-of-scale)):
    
    > [⁠\[backlink context\]](https://gwern.net/review/arpa)
    
-   [Research Ideas⁠](https://gwern.net/idea) ([⁠full context⁠](https://gwern.net/idea#gwern-scaling-hypothesis--blessings-of-scale)):
    
    > [⁠\[backlink context\]](https://gwern.net/idea)
    

## [Scaling Hypothesis](https://gwern.net/scaling-hypothesis#scaling-hypothesis "Link to section: § 'Scaling Hypothesis'")

The strong _scaling hypothesis_ is that, once we find a scalable architecture like self-attention or convolutions, which like the brain can be applied fairly uniformly (eg. [“The Brain as a Universal Learning Machine”⁠](https://www.lesswrong.com/posts/9Yc7Pp7szcjPgPsjf/the-brain-as-a-universal-learning-machine) or Hawkins), we can simply train ever larger NNs and ever more sophisticated behavior will emerge naturally as the easiest way to optimize for all the tasks & data. More powerful NNs are ‘just’ scaled-up weak NNs, in much the same way that human brains look much like [scaled-up primate brains⁠](https://gwern.net/doc/psychology/neuroscience/2012-herculanohouzel.pdf).

While I was highly skeptical of scaling hypothesis advocates when I first became interested in AI 2004<sup>–</sup><sub>6</sub>2010<sub><span title="2010 was 16 years ago.">16ya</span></sub> (back when AI was stuck in the doldrums of hopelessly narrow tools and dates like 2028 seemed impossibly far away), which smacked of numerology and “if you build it they will come” logic (at the time, we certainly didn’t have general algorithms that you could just throw compute at), in 2020, I have to admit, I was wrong and they were right. We built the compute, and the algorithms _did_ come, and the scaling hypothesis has only looked more and more plausible every year since 2010<sub><span title="2010 was 16 years ago.">16ya</span></sub>.

Click to expandClick to expand

**[Backlinks (2)⁠](https://gwern.net/design#backlink) for [⁠“Scaling Hypothesis”⁠](https://gwern.net/scaling-hypothesis#scaling-hypothesis):**

-   [The Scaling Hypothesis⁠](https://gwern.net/scaling-hypothesis) ([context⁠](https://gwern.net/scaling-hypothesis#gwern-2344146394)):
    
    > [⁠\[backlink context\]](https://gwern.net/scaling-hypothesis)
    
-   [Reward is enough⁠](https://www.sciencedirect.com/science/article/pii/S0004370221000862#deepmind):
    
    > [\[backlink context\]⁠](https://www.sciencedirect.com/science/article/pii/S0004370221000862#deepmind)
    

# [Why Does Pretraining Work?](https://gwern.net/scaling-hypothesis#why-does-pretraining-work "Link to section: § 'Why Does Pretraining Work?'")

The last bits are deepestReasons for doubt

The pretraining thesis goes something like this:

![“Figure 1: Envisioned evolution of NLP research through three different eras or curves” (the hypothetical S-curves & progress in natural language modeling; from Cambria & White 2014)](https://gwern.net/doc/ai/scaling/2014-cambria-figure1-hypotheticalnlpprogresscurves.png)

“Figure 1: Envisioned evolution of NLP research through three different eras or curves” (the hypothetical S-curves & progress in natural language modeling; from [Cambria & White 2014⁠](https://gwern.net/doc/ai/scaling/2014-cambria.pdf))

Humans, one might say, are the [cyanobacteria of AI⁠](https://en.wikipedia.org/wiki/Great_Oxidation_Event): we constantly emit large amounts of structured data, which implicitly rely on logic, causality, object permanence, history—all of that good stuff. All of that is implicit and encoded into our writings and videos and ‘data exhaust’. A model learning to predict must learn to understand all of that to get the best performance; as it predicts the easy things which are mere statistical pattern-matching, what’s left are the hard things. AI critics often say that the long tail of scenarios for tasks like self-driving cars or natural language can only be solved by true generalization & reasoning; it follows then that if models solve the long tail, they must learn to generalize & reason.

Early on in training, a model learns the crudest levels: that some letters like ‘e’ are more frequent than others like ‘z’, that every 5 characters or so there is a space, and so on. It goes from predicted uniformly-distributed bytes to what looks like Base-60 encoding—alphanumeric gibberish. As crude as this may be, it’s enough to make quite a bit of absolute progress: a random predictor needs 8 bits to ‘predict’ a byte/character, but just by at least matching letter and space frequencies, it can almost halve its error to around 5 bits.⁠[<sup>⁠16⁠</sup>](https://gwern.net/scaling-hypothesis#fn16) Because it is learning so much from every character, and because the learned frequencies are simple, it can happen so fast that if one is not logging samples frequently, one might not even observe the improvement.

As training progresses, the task becomes more difficult. Now it begins to learn what words actually exist and do not exist. It doesn’t know anything about meaning, but at least now when it’s asked to predict the second half of a word, it can actually do that to some degree, saving it a few more bits. This takes a while because any specific instance will show up only occasionally: a word may not appear in a dozen samples, and there are many thousands of words to learn. With some more work, it has learned that punctuation, pluralization, possessives are all things that exist. Put that together, and it may have progressed again, all the way down to 3–4 bits error per character! (While the progress is gratifyingly fast, it’s still all gibberish, though, makes no mistake: a sample may be spelled correctly, but it doesn’t make even a bit of sense.)

But once a model has learned a good English vocabulary and correct formatting/spelling, what’s next? There’s not much juice left in predicting within-words. The next thing is picking up associations among words. What words tend to come first? What words ‘cluster’ and are often used nearby each other? Nautical terms tend to get used a lot with each other in sea stories, and likewise Bible passages, or American history Wikipedia article, and so on. If the word “Jefferson” is the last word, then “Washington” may not be far away, and it should hedge its bets on predicting that ‘W’ is the next character, and then if it shows up, go all-in on “ashington”. Such bag-of-words approaches still predict badly, but now we’re down to perhaps <3 bits per character.

What next? Does it stop there? Not if there is enough data and the earlier stuff like learning English vocab doesn’t hem the model in by using up its learning ability. Gradually, other words like “President” or “general” or “after” begin to show the model subtle correlations: “Jefferson was President after…” With many such passages, the word “after” begins to serve a use in predicting the next word, and then the use can be broadened.

By this point, the loss is perhaps 2 bits: every additional 0.1 bit decrease comes at a steeper cost and takes more time. However, now the sentences have started to make sense. A sentence like “Jefferson was President after Washington” does in fact mean something (and if occasionally we sample “Washington was President after Jefferson”, well, what do you expect from such an un-converged model). Jarring errors will immediately jostle us out of any illusion about the model’s understanding, and so training continues. (Around here, Markov chain & _n_\-gram models start to fall behind; they can memorize increasingly large chunks of the training corpus, but they can’t solve increasingly critical syntactic tasks like balancing parentheses or quotes, much less start to ascend from syntax to semantics.)

Now training is hard. Even subtler aspects of language must be modeled, such as keeping pronouns consistent. This is hard in part because the model’s errors are becoming rare, and because the relevant pieces of text are increasingly distant and ‘long-range’. As it makes progress, the absolute size of errors shrinks dramatically. Consider the case of associating names with gender pronouns: the difference between “Janelle ate some ice cream, because he likes sweet things like ice cream” and “Janelle ate some ice cream, because she likes sweet things like ice cream” is one no human could fail to notice, and yet, it is a difference of a single letter. If we compared two models, one of which didn’t understand gender pronouns at all and guessed ‘he’/‘she’ purely at random, and one which understood them perfectly and always guessed ‘she’, the second model would attain a lower average error of barely <0.02 bits per character!

Nevertheless, as training continues, these problems and more, like imitating genres, get solved, and eventually at a loss of 1–2 (where a small char-RNN might converge on a small corpus like Shakespeare or some Project Gutenberg ebooks), we will finally get samples that sound human—at least, for a few sentences. These final samples may convince us briefly, but, aside from issues like repetition loops, even with good samples, the errors accumulate: a sample will state that someone is “alive” and then 10 sentences later, use the word “dead”, or it will digress into an irrelevant argument instead of the expected next argument, or someone will do something physically improbable, or it may just continue for a while without seeming to _get_ anywhere.

All of these errors are far less than <0.02 bits per character; we are now talking not hundredths of bits per characters but less than ten-thousandths.

The pretraining thesis argues that this can go even further: we can compare this performance directly with humans doing the same objective task, who can achieve closer to [⁠0.7 bits per character⁠](https://gwern.net/difference#efficient-natural-languages). What is in that missing >0.4?

![https://qwantz.com/index.php?comic=354](https://gwern.net/doc/cs/algorithm/information/compression/2004-ryannorth-dinosaurcomics-391.png "https://qwantz.com/index.php?comic=354")

“Yeah, but there’s more to being smart than knowing compression schemes!” “No there’s not!” “Shoot—he knows the secret!!”

Well—_everything_! Everything that the model misses. While just babbling random words was good enough at the beginning, at the end, it needs to be able to reason our way through the most difficult textual scenarios requiring causality or commonsense reasoning. Every error where the model predicts that ice cream put in a freezer will “melt” rather than “freeze”, every case where the model can’t keep straight whether a person is alive or dead, every time that the model chooses a word that doesn’t help build somehow towards the ultimate conclusion of an ‘essay’, every time that it lacks the theory of mind to compress novel scenes describing the Machiavellian scheming of a dozen individuals at dinner jockeying for power as they talk, every use of logic or abstraction or instructions or Q&A where the model is befuddled and needs more bits to cover up for its mistake where a human would think, understand, and predict. For a language model, the truth is that which keeps on predicting well—because truth is one and error many. Each of these cognitive breakthroughs allows ever so slightly better prediction of a few relevant texts; nothing less than true understanding will suffice for ideal prediction.

If we trained a model which reached that loss of <0.7, which could predict text indistinguishable from a human, whether in a dialogue or quizzed about ice cream or being tested on SAT analogies or tutored in mathematics, if for every string the model did just as good a job of predicting the next character as you could do, how could we say that it doesn’t _truly_ understand everything? (If nothing else, we could, by definition, replace humans in any kind of text-writing job!)

The last bits are deepest. The implication here is that the final few bits are the most valuable bits, which require the most of what we think of as intelligence. [Collobert et al 2011⁠](https://gwern.net/doc/psychology/linguistics/2011-collobert.pdf):

> [Shannon 1951](https://www.princeton.edu/~wbialek/rome/refs/shannon_51.pdf) has estimated the [entropy](https://en.wikipedia.org/wiki/Entropy_(information_theory)) of the English language 0.6–1.3 bits per character by asking human subjects to guess upcoming characters….[⁠Teahan & Cleary 1996](https://gwern.net/doc/cs/algorithm/information/compression/1996-teahan.pdf) obtain entropies as low as 1.46 bits per character using variable length character _n_\-grams. The human subjects rely of course on all their knowledge of the language and of the world.
> 
> Can we learn the grammatical structure of the English language and the nature of the world by leveraging the 0.2 bits per character that separate human subjects from simple _n_\-gram models?

A helpful analogy here might be our actions: for the most part, all humans execute actions equally well. We all pick up a tea mug without dropping, and can lift our legs to walk down thousands of steps without falling even once. For everyday actions (the sort which make up most of a corpus), anybody, of any intelligence, can get enough practice & feedback to do them quite well, learning individual algorithms to solve each class of problems extremely well, in isolation.⁠[<sup>⁠17⁠</sup>](https://gwern.net/scaling-hypothesis#fn17) Meanwhile for rare problems, there may be too few instances to do any better than memorize the answer. In the middle of the spectrum are problems which are similar but not _too_ similar to other problems; these are the sorts of problem which reward flexible meta-learning and generalization, and many intermediate problems may be necessary to [elicit those capabilities⁠](https://arxiv.org/abs/2205.05055#deepmind) (“neural nets are lazy”).

Where individuals differ is when they start running into the long tail of novel choices, rare choices, choices that take seconds but unfold over a lifetime, choices where we will never get any feedback (like after our death). One only has to make a single bad decision, out of a lifetime of millions of discrete decisions, to wind up in jail or dead. A small absolute average improvement in decision quality, if it is in _those_ decisions, may be far more important than its quantity indicates, and give us some intuition for why those last bits are the hardest/deepest. (Why do humans have such large brains, when animals like chimpanzees do so many ordinary activities seemingly as well with a fraction of the expense? Why is language worthwhile? Perhaps because of considerations like these. We may be at our most human while filling out the paperwork for life insurance.)

Reasons for doubt. The pretraining thesis, while logically impeccable—how is a model supposed to solve all possible trick questions without understanding, just _guessing_?—never struck me as convincing, an argument admitting neither confutation nor conviction. It feels too much like a magic trick: “here’s some information theory, here’s a human benchmark, here’s how we can encode all tasks as a sequence prediction problem, hey presto—Intelligence!” There are lots of algorithms which are Turing-complete or ‘universal’ in some sense; there are lots of algorithms like AIXI which solve AI in some theoretical sense (Schmidhuber & company have many of these cute algorithms such as ‘the fastest possible algorithm for all problems’, with the minor catch of some constant factors which require computers bigger than the universe).

Why think pretraining or sequence modeling is not another one of them? Sure, _if_ the model got a low enough loss, it’d have to be intelligent, but how could you prove that would happen in practice? (Training char-RNNs was fun, but they hadn’t exactly revolutionized deep learning.) It might require more text than exists, countless petabytes of data for all of those subtle factors like logical reasoning to represent enough training signal, amidst all the noise and distractors, to train a model. Or maybe your models are too small to do more than absorb the simple surface-level signals, and you would have to scale them 100 orders of magnitude for it to work, because the scaling curves didn’t cooperate. Or maybe your models are fundamentally broken, and stuff like abstraction require an entirely different architecture to work at all, and whatever you do, your current models will saturate at poor performance. Or it’ll train, but it’ll spend all its time trying to improve the surface-level modeling, absorbing more and more literal data and facts without ever ascending to the higher planes of cognition as planned. Or…

> ‘The possibilities of developing an atomic weapon and the desirability of doing it secretly were discussed at a Princeton University conference in which I participated in March 1939<sub><span title="1939 was 87 years ago.">87ya</span></sub>…[Bohr⁠](https://en.wikipedia.org/wiki/Niels_Bohr) said this rare variety could not be separated from common uranium except by turning the country into a gigantic factory. Bohr was worried that this could be done and that an atomic bomb could be developed—but he hoped that neither could be accomplished. Years later, when Bohr came to Los Alamos, I was prepared to say, “You see . . .” But before I could open my mouth, he said: **“You see, I told you it couldn’t be done without turning the whole country into a factory. You have done just that.”**’
> 
> [Edward Teller⁠](https://en.wikipedia.org/wiki/Edward_Teller)⁠[<sup>⁠18⁠</sup>](https://gwern.net/scaling-hypothesis#fn18)

But apparently, it would’ve worked fine. Even RNNs probably would’ve worked—Transformers are nice, but they seem mostly be about efficiency.⁠[<sup>⁠19⁠</sup>](https://gwern.net/scaling-hypothesis#fn19) (Training large RNNs is much more expensive, and doing BPTT over multiple nodes is much harder engineering-wise.) It just required more compute & data than anyone was willing to risk on it until a few true-believers were able to get their hands on a few million dollars of compute.

-   **Q:** Did anyone predict, quantitatively, that this would happen where it did?
    
-   **A:** Not that I know of.
    

___

-   **Q:** What would future scaled-up models learn?
    
    GPT-2-1.5b had a cross-entropy WebText validation loss of ~3.3 (based on the perplexity of ~10 in [⁠Figure 4⁠](https://gwern.net/doc/ai/nn/transformer/gpt/2019-radford-figure4-gpt2validationloss.jpg), and log<sub>2</sub>(10) = 3.32). GPT-3 halved that loss to ~1.73 judging from [⁠Brown et al 2020⁠](https://gwern.net/doc/ai/nn/transformer/gpt/2020-brown-figure31-gpt3scaling.png) and using the scaling formula (2.57 × (3.64 × 10<sup>3</sup>)<sup>−0.048</sup>). For a hypothetical GPT-4, if the scaling curve continues for another 3 orders or so of compute (100–1000×) before crossing over and hitting harder diminishing returns, the cross-entropy loss will drop to ~1.24 (2.57 × (3.64 × (10<sup>3</sup> × 10<sup>3</sup>))<sup>−0.048</sup>).
    
    If GPT-3 gained so much meta-learning and world knowledge by dropping its absolute loss ~50% when starting from GPT-2’s level, what capabilities would another ~30% improvement over GPT-3 gain? (Cutting the loss that much would still not reach human-level, as far as I can tell.⁠[<sup>⁠20⁠</sup>](https://gwern.net/scaling-hypothesis#fn20)) What would a drop to ≤1, perhaps using wider context windows or recurrency, gain?
    
-   **A:** I don’t know.
    

___

-   **Q:** Does anyone?
    
-   **A:** Not that I know of.⁠[<sup>⁠21⁠</sup>](https://gwern.net/scaling-hypothesis#fn21)
    

Click to expandClick to expand

**[Backlinks (2)⁠](https://gwern.net/design#backlink) for [⁠“Why Does Pretraining Work?”⁠](https://gwern.net/scaling-hypothesis#why-does-pretraining-work):**

-   [The Scaling Hypothesis⁠](https://gwern.net/scaling-hypothesis) ([context⁠](https://gwern.net/scaling-hypothesis#gwern-503989678)):
    
    > [⁠\[backlink context\]](https://gwern.net/scaling-hypothesis)
    
-   [Reward is enough⁠](https://www.sciencedirect.com/science/article/pii/S0004370221000862#deepmind):
    
    > [\[backlink context\]⁠](https://www.sciencedirect.com/science/article/pii/S0004370221000862#deepmind)
    

# [Prospects](https://gwern.net/scaling-hypothesis#prospects "Link to section: § 'Prospects'")

> In the problem of decoding, the most important information which we can possess is the knowledge that the message which we are reading is not gibberish…In a similar way, when we consider a problem of nature such as that of atomic reactions and atomic explosives, the largest single item of information which we can make public is that they exist. Once a scientist attacks a problem which he knows to have an answer, his entire attitude is changed. He is already some 50% of his way toward that answer…**the one secret concerning the atomic bomb which might have been kept and which was given to the public and to all potential enemies without the least inhibition, was that of the possibility on its construction.** Take a problem of this importance and assure the scientific world that it has an answer; then both the intellectual ability of the scientists and the existing laboratory facilities are so widely distributed that the quasi-independent realization of the task will be a matter of merely a few years anywhere in the world.
> 
> [Norbert Wiener⁠](https://en.wikipedia.org/wiki/Norbert_Wiener), pg124–125, _[The Human Use of Human Beings⁠](https://en.wikipedia.org/wiki/The_Human_Use_of_Human_Beings)_ (emphasis added)

> People who work in machine learning simply didn’t think that neural networks could do much. People didn’t believe large neural networks could be trained…The ideas were all there, the thing that was missing was a lot of supervised data and a lot of compute. Once you have \[those two\], then there is a third thing is that is needed—and that is _conviction_. Conviction that if you take the right stuff, which already exists, and apply and mix it with a lot of data and a lot of compute, that it will in fact work. And so that was the missing piece.
> 
> [⁠Ilya Sutskever⁠](https://www.youtube.com/watch?v=13CZPWmke6A&t=950#openai)⁠[<sup>⁠22⁠</sup>](https://gwern.net/scaling-hypothesis#fn22)

What can we expect from future DL work? Will GPT-3 kickstart an arms race where soon we will be discussing, blasé, what would seem now like ludicrously farfetched schemes like bidirectional multimodal Transformer 100× the size trained on 100× the data (video/text/PDFs-as-images/photo/robotics) with supplementary supervised learning as the backbone of a MuZero-like learning+planning DRL agent running on thousands of tasks (such as coding) simultaneously? \[Roughly, yes. —Editor 2025-10-19\]

The existence of [the hardware overhang⁠](https://www.lesswrong.com/posts/N6vZEnCn6A95Xn39p/are-we-in-an-ai-overhang) implies that the limiting factor here is less hardware than human: will any organization treat GPT-3 as a Sputnik moment and invest aggressively in scaling programs? Is there a GPT-4-equivalent brewing away inside DeepMind or Google Brain’s TPU pods now? They aren’t stupid, they have the hardware, they have the budgets, they have the people.

But I think they lack a vision. As far as I can tell: they do not have any such thing, because Google Brain & DeepMind do not believe in the scaling hypothesis the way that Sutskever, Amodei and others at OA do. Just read through machine learning Twitter to see the disdain for the scaling hypothesis. (A quarter year on from GPT-3 and counting, can you name a single dense model as large as the 17b Turing-NLG—never mind larger than GPT-3?)

Google Brain is entirely too practical and short-term focused to dabble in such esoteric & expensive speculation, although Quoc V. Le’s group occasionally surprises you. They’ll dabble in [mixture-of-expert models⁠](https://gwern.net/doc/ai/scaling/mixture-of-experts/index) like [GShard⁠](https://arxiv.org/abs/2006.16668#google), but mostly because they expect to be likely to be able to deploy it or something like it to production in Google Translate.⁠[<sup>⁠23⁠</sup>](https://gwern.net/scaling-hypothesis#fn23)

[Why didn’t DeepMind do GPT-3?⁠](https://rootnodes.substack.com/p/why-didnt-deepmind-build-gpt3) DeepMind⁠[<sup>⁠24⁠</sup>](https://gwern.net/scaling-hypothesis#fn24) holds what we might call the “weak scaling hypothesis”: they believe that AGI will require us to “find the right algorithms” effectively replicating a mammalian brain module by module, and that while these modules will be extremely large & expensive by contemporary standards (which is why compute is important, to give us “a more powerful tool with which to hunt for the right algorithms”), they still need to be invented & finetuned piece by piece, with little risk or surprise until the final assembly. Each piece, however, itself can scale: there’s no magical intelligence gland or quantum woo which creates a bright line between humans and, say, chimpanzees or rodents. (As much as we humans extravagantly admire our own capabilities like language or logic, those are relatively minor flourishes on the basic brain—each organism solves the same basic problems, like exploration, long-term memory, learning world-models, associating rewards with specific actions, meta-learning, etc.) As such, once you have a rat-level AGI, a human-level AGI is just more so. (And rats are a lot easier to experiment on.) That is how you get DM contraptions like [Agent57⁠](https://deepmind.google/discover/blog/agent57-outperforming-the-human-atari-benchmark/) which throw the kitchen sink at the wall to see what sticks, and why they place such emphasis on neuroscience as inspiration and cross-fertilization for reverse-engineering the brain. (See also Sam Altman’s [⁠podcast interview comments⁠](https://gwern.net/doc/ai/nn/transformer/gpt/3/2020-10-06-exponentialview-samaltman-152648-s5e01-howgpt3isshapingouraifuture.mp3#t=2205) on OA’s advantage vs unnamed rivals with more compute is because the lack of compute makes them stay “small and focused”—“for sure” like a startup approach.) When someone seems to have come up with a scalable architecture for cracking a hard problem, like AlphaZero or AlphaStar, they are willing to pour on the gas to make it scale, but otherwise, incremental refinement on ALE and then [DMLab-30⁠](https://arxiv.org/abs/1612.03801#deepmind) is the game plan. They have been biting off and chewing pieces of the brain for a decade, and it’ll probably take another decade or two of steady chewing if all goes well. Because they have locked up so much talent and have so much proprietary code and believe all of that is a major moat to any competitor trying to replicate the complicated brain, they are fairly easygoing. You will not see DM ‘bet the company’ on any moonshot; Google’s cashflow isn’t going anywhere (and [⁠DM’s budget⁠](https://gwern.net/newsletter/2020/06#deepmind-budget)), and slow and steady wins the race.

Going beyond that, most other research labs like Tesla or FAIR are irrelevant and uninterested. Chinese AI companies are a question mark: past the language barrier, I seem to discern interest in AGI & little of the reflexive Western opposition, and companies like Baidu occasionally release important research (such as the early scaling paper [Hestness et al 2017⁠](https://arxiv.org/abs/1712.00409#baidu)), but overall, Chinese AI may be overestimated, and they seem to suffer from a kind of Dutch disease—funding for surveillance technology, and for narrow e-commerce niches, is so plentiful that other areas are neglected.

OA, lacking anything like DM’s long-term funding from Google or its enormous headcount, is making a startup-like bet that they know an important truth which is a secret: “the scaling hypothesis is true!” So, simple DRL algorithms like PPO on top of large simple architectures like RNNs or Transformers can emerge, exploiting the blessings of scale, and meta-learn their way to powerful capabilities, enabling further funding for still more compute & scaling, in a virtuous cycle. This is why OA had to revise its corporate form: lacking any enormous endowment or extremely deep-pocketed patron like Google, where does it get the money to scale (or hire machine learning engineer/researchers who can command salaries in the millions)? OA has to _earn_ the necessary money, so in a move like Mozilla Foundation owning Mozilla Corporation (to sell Firefox search engine placement), or the Hershey orphanage owning Hershey Chocolate or the Girl Scouts licensing their cookies, OpenAI switched from a pure nonprofit funded by donations to a nonprofit which owns a for-profit subsidiary/startup, “OpenAI LP”, which can take investments and engage in for-profit activities. OA LP, while controlled by OA, can then shoot for the moon. And if OA is wrong to trust in the [God of Straight Lines On Graphs⁠](https://slatestarcodex.com/2018/11/26/is-science-slowing-down-2/), well, they never could compete with DM directly using DM’s favored approach, and were always going to be an also-ran footnote, so they have no regret.

While all of this hypothetically can be replicated _relatively_ easily (never underestimate the amount of tweaking and special sauce it takes) by competitors if they wished (the necessary amounts of compute budgets are still trivial in terms of Big Science or other investments like AlphaGo or AlphaStar or Waymo, after all), said competitors lack the very most important thing, which no amount of money or GPUs can ever cure: the courage of their convictions. They are too hidebound and deeply philosophically wrong to ever admit fault and try to overtake OA until it’s too late. How can we talk seriously about any kind of military Manhattan Project when the US military [⁠doesn’t even let its developers use Tensorflow or PyTorch⁠](https://warontherocks.com/2020/10/trust-algorithms-the-army-doesnt-even-trust-its-own-ai-developers/), or about government projects in the shadow of coronavirus? This might seem absurd (surely the Bitter Lesson/scaling hypothesis have now earned enough prior probability to be taken seriously and receive major research investments to test how far they can go, especially given how important the implications are), but look at the repeated criticism of OA _every time_ they release a new example of the scaling hypothesis, from GPT-1 to Dactyl to OA5 to GPT-2 to iGPT to GPT-3… To paraphrase St Augustine, most peoples’ reaction to the Bitter Lesson or scaling hypothesis is “grant me scale & compute—but not yet”.⁠[<sup>⁠25⁠</sup>](https://gwern.net/scaling-hypothesis#fn25)

A critical indicator will be whether organizations beyond ‘the usual suspects’ (Microsoft [ZeRO-2⁠](https://www.microsoft.com/en-us/research/blog/zero-2-deepspeed-shattering-barriers-of-deep-learning-speed-scale/) team has reached [1t-scale training⁠](https://www.microsoft.com/en-us/research/blog/deepspeed-extreme-scale-model-training-for-everyone/), but there is also Nvidia, Salesforce, Allen, Google DM/GB, Connor/EleutherAI, Facebook FAIR) start participating or if they continue to dismiss scaling. At least as of 2020-10-26, 152 days later, no model has come near GPT-3, and indeed, no model has even exceeded Turing-NLG’s 17b.⁠[<sup>⁠26⁠</sup>](https://gwern.net/scaling-hypothesis#fn26)

Click to expandClick to expand

**[Backlinks (1)⁠](https://gwern.net/design#backlink) for [⁠“Prospects”⁠](https://gwern.net/scaling-hypothesis#prospects):**

-   [Is OpenAI OK?⁠](https://www.reddit.com/r/mlscaling/comments/1djoqjh/ilya_sutskever_launches_safe_superintelligence_a/l9uogp9/):
    
    > [\[backlink context\]⁠](https://www.reddit.com/r/mlscaling/comments/1djoqjh/ilya_sutskever_launches_safe_superintelligence_a/l9uogp9/)
    

# [Critiquing The Critics](https://gwern.net/scaling-hypothesis#critiquing-the-critics "Link to section: § 'Critiquing The Critics'")

Keeping trackHindsight is 20⁄20Authority without accountabilityPhatic, not predictiveThe iron law of bureaucracy: Cathedral gothic

Keeping track. GPT-3 in 2020 makes as good a point as any to take a look back on the past decade. It’s remarkable to reflect that someone who started a PhD because they were excited by these new “ResNets” would still not have finished it by now—that is how recent even resnets are, never mind Transformers, and how rapid the pace of progress is. In 2010<sub><span title="2010 was 16 years ago.">16ya</span></sub>, one could easily fit everyone in the world who genuinely believed in deep learning into a moderate-sized conference room (assisted slightly by the fact that 3 of them were busy founding [DeepMind⁠](https://en.wikipedia.org/wiki/Google_DeepMind)). Someone interested in machine learning in 2010<sub><span title="2010 was 16 years ago.">16ya</span></sub> _might_ have read about some interesting stuff from weirdo diehard connectionists in recognizing hand-written digits using all of 1–2 million parameters, or some modest neural tweaks to standard voice-recognition hidden Markov models. In 2010<sub><span title="2010 was 16 years ago.">16ya</span></sub>, who would have predicted that over the next 10 years, deep learning would undergo a Cambrian explosion causing a mass extinction of alternative approaches throughout machine learning, that models would scale up to 175,000 million parameters, and that these enormous models would just spontaneously develop all these capabilities?

No one. That is, no one aside from a few diehard connectionists written off as willfully-deluded old-school fanatics by the rest of the AI community (never mind the world), such as [Moravec](https://jetpress.org/volume1/moravec.htm), Schmidhuber, [⁠Sutskever⁠](https://www.youtube.com/watch?v=13CZPWmke6A), Legg, & Amodei.

One of the more shocking things about looking back is realizing how unsurprising and easily predicted all of this was if you listened to the right people. In 1998<sub><span title="1998 was 28 years ago.">28ya</span></sub>, 22 years ago, Moravec noted that AI research could be deceptive, and hardware limits meant that “intelligent machine research did not make steady progress in its first 50 years, it marked time for 30 of them!”, predicting that as Moore’s law continued, “things will go much faster in the next 50 years than they have in the last 50.” Moravec further observed that part of the reason for rapid progress was the hardware overhang: while supercomputers of the necessary power would exist long before the connectionist revolution began, no one would be allowed to use them⁠[<sup>⁠27⁠</sup>](https://gwern.net/scaling-hypothesis#fn27), as they would be devoted to ‘more important’ (prestigious) hard STEM work, like “physics simulations” (ie. climate simulations & nuclear bombs)⁠[<sup>⁠28⁠</sup>](https://gwern.net/scaling-hypothesis#fn28), and “AI research must wait for the power to become more affordable.” Affordable meaning a workstation roughly ~$2,229<sup>$1k</sup><sub>1998</sub>; sufficiently cheap compute to rival a human would arrive sometime in the 2020s, with the 2010s seeing affordable systems in the lizard–mouse range. As it happens, the start of the DL revolution is typically dated to [AlexNet⁠](https://en.wikipedia.org/wiki/AlexNet) in 2012<sub><span title="2012 was 14 years ago.">14ya</span></sub>, by a grad student⁠[<sup>⁠29⁠</sup>](https://gwern.net/scaling-hypothesis#fn29) using 2 GTX 580 3GB GPUs (launch list price of… $789<sup>$500</sup><sub>2010</sub>, for a system build cost of perhaps $2,285<sup>$1,500</sup><sub>2012</sub>). 2020 saw GPT-3 arrive, and as discussed before, there are many reasons to expect the cost to fall, in addition to the large hardware compute gains that are being forecast for the 2020s despite the general deceleration of Moore’s law.⁠[<sup>⁠30⁠</sup>](https://gwern.net/scaling-hypothesis#fn30)

The accelerating pace of the last 10 years should wake anyone from their dogmatic slumber and make them sit upright. It turned out, it’s Hans Moravec’s world, and the rest of us were just living in a fool’s paradise. And there are 28 years left in Moravec’s forecast…

The temptation, that many do not resist so much as revel in, is to give in to a _déformation professionnelle_ and dismiss any model as “just” this or that(“just billions of IF statements” or “just a bunch of multiplications” or “just millions of memorized web pages”), missing the forest for the trees, as Moravec commented of chess engines:

> The event was notable for many reasons, but one especially is of interest here. Several times during both matches, Kasparov reported signs of mind in the machine. At times in the second tournament, he worried there might be humans behind the scenes, feeding Deep Blue strategic insights!…In all other chess computers, he reports a mechanical predictability stemming from their undiscriminating but limited lookahead, and absence of long-term strategy. In Deep Blue, to his consternation, he saw instead an “alien intelligence.”
> 
> …Deep Blue’s creators know its _quantitative_ superiority over other chess machines intimately, but lack the chess understanding to share Kasparov’s deep appreciation of the difference in the _quality_ of its play. I think this dichotomy will show up increasingly in coming years. Engineers who know the mechanism of advanced robots most intimately will be the last to admit they have real minds. From the inside, robots will indisputably be machines, acting according to mechanical principles, however elaborately layered. Only on the outside, where they can be appreciated as a whole, will the impression of intelligence emerge. A human brain, too, does not exhibit the intelligence under a neurobiologist’s microscope that it does participating in a lively conversation.

But of course, if we ever succeed in AI, or in reductionism in general, it _must be by reducing Y to ‘just X’_. Showing that some task requiring intelligence can be solved by a well-defined algorithm with no ‘intelligence’ is precisely what success must look like! (Otherwise, the question has been thoroughly begged & the problem has only been pushed elsewhere; computer chips are made of transistors, not especially tiny homunculi.)

> As long as the AI \[OA5\] can explore, it will learn, given enough time…We just kept waiting for the magic to run out. We kept waiting to hit a wall, and we never seemed to hit a wall.
> 
> [Greg Brockman⁠](https://qz.com/1311732/openai-built-gaming-bots-that-can-work-as-a-team-with-inhuman-precision "OpenAI built gaming bots that can work as a team with inhuman precision")

> Give it the compute, give it the data, and it will do amazing things. This stuff is like—it’s like _alchemy_!
> 
> [Ilya Sutskever⁠](https://www.newyorker.com/magazine/2019/10/14/can-a-machine-learn-to-write-for-the-new-yorker "Can a Machine Learn to Write for The New Yorker? Extraordinary advances in machine learning in recent years have resulted in AIs that can write for you."), summer 2019

Hindsight is 20⁄20. Even in 2015<sub><span title="2015 was 11 years ago.">11ya</span></sub>, [⁠all the experts⁠](https://news.ycombinator.com/item?id=9109140) assured us that AGI the scaling hypothesis seemed highly dubious: you needed something to scale, after all, and it was all too easy to look at flaws in existing systems and imagine that they would never go away and progress would sigmoid any month now, soon. Like the genomics revolution where a few far-sighted seers extrapolated that the necessary _n_ for GWASes would increase exponentially & deliver powerful PGSes soon, while sober experts wrung their hands over “missing heritability” & the miraculous complexity of biology & scoff about how such _n_ requirements proved GWAS was a failed paradigm, the future arrived at first slowly and then quickly. Yet, here we are: all honor to the fanatics, shame and humiliation to the critics!⁠[<sup>⁠31⁠</sup>](https://gwern.net/scaling-hypothesis#fn31) If only one could go back 10 years, or even 5, to watch every AI researchers’ head explode reading this paper… Unfortunately, few heads appear to be exploding now, because human capacity for hindsight & excuses is boundless (“I can get that much with finetuning, anyway I predicted it all along, how boring”) and, unfortunately, [“there is no fire alarm”⁠](https://intelligence.org/2017/10/13/fire-alarm/) for AGI. (If you are still _certain_ that there is near-zero probability of AGI in the next few decades, why? Did you predict—in writing—capabilities like GPT-3? Is this how you expect AI failure to look in the decades beforehand? What specific task, what specific number, would convince you otherwise? How would the world look different than it does now if these crude prototype insect-brain-sized DL systems were not on a path to success?)

Authority without accountability. What should we think about the experts? Projections of failure were made by eminent, respectable, serious people. They spoke in considered tones of why AI hype was excessive and might trigger an “AI winter”, and the fundamental flaws of fashionable approaches and why brute force could not work. These statements were made routinely in 2014<sub><span title="2014 was 12 years ago.">12ya</span></sub>, 2015<sub><span title="2015 was 11 years ago.">11ya</span></sub>, 2016… And they were wrong. I am aware of few issuing a _mea culpa_ or reflecting on it.⁠[<sup>⁠32⁠</sup>](https://gwern.net/scaling-hypothesis#fn32) It is a puzzling failure, and I’ve [⁠reflected on it before⁠](https://gwern.net/newsletter/2019/13#what-progress).

Phatic, not predictive. There is, however, a certain tone of voice the bien pensant all speak in, whose sound is the same whether right or wrong; a tone shared with many statements in January to March of this year; a tone we can also find in a 1940<sub><span title="1940 was 86 years ago.">86ya</span></sub> _Scientific American_ article authoritatively titled, [“Don’t Worry—It Can’t Happen”⁠](https://gwern.net/doc/existential-risk/1940-sciam-harrington-nuclearweapons-dontworryitcanthappen.pdf), which advised the reader to not be concerned about it any longer “and get sleep”. (‘It’ was the atomic bomb, about which certain scientists had stopped talking, raising public concerns; not only could it happen, the British bomb project had already begun, and 5 years later it did happen.)

The iron law of bureaucracy: Cathedral gothic. This tone of voice is the voice of [authority](https://srconstantin.wordpress.com/2016/10/20/ra/).  
The voice of authority insists on calm, and people not “panicking” (the chief of sins).  
The voice of authority assures you that it won’t happen (because it can’t happen).  
The voice utters simple arguments about why the status quo will prevail, and considers only how the wild new idea could fail (and not all the possible options).  
The voice is not, and does not deal in, uncertainty; things will either happen or they will not, and since it will not happen, there is no need to take any precautions (and you should not worry because it can’t happen).  
The voice does not believe in drawing lines on graphs (it is rank numerology).  
The voice does not issue any numerical predictions (which could be falsified).  
The voice will not share its source code (for complicated reasons which cannot be explained to the laity).  
The voice is opposed to unethical things like randomized experiments on volunteers (but will overlook the insult).  
The voice does not have a model of the future (because a model implies it does not already know the future).  
The voice is concerned about its public image (and unkind gossip about it by other speakers of the voice).  
The voice is always sober, respectable, and credentialed (the voice would be pleased to write an op-ed for your national magazine and/or newspaper).  
The voice speaks, and is not spoken to (you cannot ask the voice what objective fact would change its mind).  
The voice never changes its mind (until it does).  
The voice is never surprised by events in the world (only disappointed).  
The voice advises you to go back to sleep (right now).

When someone speaks about future possibilities, what is the tone of their voice?

# [Appendix](https://gwern.net/scaling-hypothesis#appendix "Link to section: § 'Appendix'")

## [It From Byte](https://gwern.net/scaling-hypothesis#it-from-byte "Link to section: § 'It From Byte'")

> Powerful generative models like GPT-3 learn to imitate agents and thus become agents when prompted appropriately. This is an inevitable consequence of training on huge amounts of human-generated data. This can be a problem.
> 
> Is human data (or moral equivalents like DRL agents) _necessary_, and other kinds of data, such as physics data, free of this problem? (And so a safety strategy of filtering data could reduce or eliminate hidden agency.)
> 
> I argue no: agency is not discrete or immaterial, but an ordinary continuum of capability, useful to a generative model in many contexts beyond those narrowly defined as ‘agents’, such as in the “intentional stance” or variational approaches to solving physics problems. Much like other [DRL-elicited capabilities⁠](https://www.sciencedirect.com/science/article/pii/S0004370221000862#deepmind) like meta-learning, memory, exploration, or reasoning, ‘agency’ is a useful tool for a large family of problems, and a powerful model applied to that family may, at some point, develop concepts of agency or theory of mind etc.
> 
> Thus, a very wide range of problems, at scale, may surprisingly induce emergent agency.

[I](https://gwern.net/dropcap#kanzlei) have previously argued that GPT-3 clearly shows agency because it is doing offline imitation learning (behavioral cloning, specifically) from the human-generated text data, and so it learns generative models of many agents, real or fictional. These generative models offer agentic capabilities, because they can be used to prompt the model to [⁠‘roleplay’⁠](https://gwern.net/gpt-3#roleplaying)—plan & take action which will steer environments into small goal regions of state-space; and this is not merely hypothetical, or confined to text transcripts of actions & results in its internal simulated environments, but given effectors, like in the case of [SayCan⁠](https://arxiv.org/abs/2204.01691#google), a language model will in fact do such things in the real world.

That such systems may never have ‘experienced the real world’ or been trained deliberately on exact action sequences of malicious agents doesn’t mean that they cannot generalize or imitate. A sufficiently accurate simulation of an agent just _is_ an agent. (One can set up a prompt for GPT-3 to imitate Adolf Hitler and ask him how to regain power & resume exterminating the Jews and get back a semi-coherent high-level plan; this is unfortunate, and the simulacra need not even be of a real person—evil fictional characters plan evil things just as easily, because it’s not hard to imagine what horrible things they _would_ want to do.) This doesn’t seem all that different from accepted instances of reinforcement learning, like behavior learning or offline reinforcement learning: if you train on data from agents, whether humans or logged data from DRL agents, then the question is “how would you _not_ learn from all these examples how to act & be capable of pursuing goals?” Presumably you would not only if you were a stupid model, too small or given too little data.

If these are not ‘agents’, I don’t know what “really” is an agent; or at least if critics insist on some sort of definition of ‘agent’ which excludes these, I think perhaps we should then abandon the word ‘agent’ entirely—because if giving a SayCan robot an instruction to ‘fetch a can of Coke and bring it to me’, with it using image inputs to construct step-by-step plans to find, possess, and return with the can, and successfully doing so often in real life on a real robot, does not count as an ‘agent’, then we need a word for such non-agent systems, so we can discuss their non-agency dangers. (If we define them as sub-agents because of lack of appendages and thus define all models as harmless non-agents, this is an unacceptable equivocation given the extreme carelessness and insouciance people display in hooking up their models the first chance they get to humans, APIs, search engines, or robots—hardly had the OpenAI GPT-3 API been launched in July 2020 than people were showing off using its basic HTML/CSS/JS abilities to drive web browsers, and large LM model developers like LaMDA or Adept display an unseemly eagerness to let it query arbitrary URLs without their paper even bothering to specify it was live. The AI box hadn’t even been invented before everyone decided to let their AI out of the box to be slightly more useful, as should come as no surprise—after all, [tool AIs _want_ to be agent AIs⁠](https://gwern.net/tool-ai).)

But one might wonder how far this logic goes: do we have agent AIs emerging from our tool AIs _only_ because we trained them on so much agent-generated data? If we scrapped human text corpuses, full of text about humans planning and taking actions and obtaining goals, or video datasets stuffed full of agents doing stuff, and if we deleted image datasets as well because they are just snapshots of videos and depict agents & actions & environments full of traces of agency, would we then have a model which is now just a (relatively) safe ‘tool AI’, with no agency lurking?

I would still say that there’s a possibility, and maybe not even that small one: agency is not a discrete thing, but a continuum, which is a convergent instrumental drive / emergent capability because it is useful even for understanding “non-agentic” things.

Click to expandClick to expand

**[Backlinks (1)⁠](https://gwern.net/design#backlink) for [⁠“It From Byte”⁠](https://gwern.net/scaling-hypothesis#it-from-byte):**

-   [GPT-3 Creative Fiction⁠](https://gwern.net/gpt-3) ([⁠full context⁠](https://gwern.net/gpt-3#gwern-scaling-hypothesis--it-from-byte)):
    
    > [⁠\[backlink context\]](https://gwern.net/gpt-3)
    

### [All Is Atoms & Void](https://gwern.net/scaling-hypothesis#all-is-atoms-void "Link to section: § 'All Is Atoms & Void'")

First, there cannot be any principled, hard-and-fast, necessary distinction between data which is ‘agentic’ and data which is merely ‘natural’. This is because there is no such distinction in reality either: all ‘agency’ is constructed of non-agentic bits like atoms. There is no agency-particle, no pineal gland granting access to ‘_Genuine_ Decision-Making™’. An agentic human is made out of the same fundamental things as a clump of dust swirling in space, or rock, or a computer. It must be the case that one could, starting only from simulations of (possibly a lot of) atoms, nothing but the most raw physics equations and atoms & the void, and eventually recapitulate the history of the universe and observe things like the origin of life and humans. Thus, one turns non-agentic data (physics equations) into agentic data.

OK, but barring a hypercomputer, that is unlikely to happen. If we consider realistic levels of compute, like contemporary NNs, trained on less-than-everything-in-the-universe & apparently harmless data like, say, the hydrology of rivers flowing downhill (eg. for flood prevention), or the trajectory of the solar system, surely none of that agency will evolve—no amount of modeling the chaotic dynamics of Pluto will give you any help in modeling the dynamics of astronomy infighting about whether Pluto is a planet, right?

### [Intentional Interpretive Stance](https://gwern.net/scaling-hypothesis#intentional-interpretive-stance "Link to section: § 'Intentional Interpretive Stance'")

Here again I differ, and invoke [Daniel Dennett’s⁠](https://en.wikipedia.org/wiki/Daniel_Dennett) [intentional stance⁠](https://en.wikipedia.org/wiki/Intentional_stance). Humans do, in fact, model natural systems like these as agents. We find such teleological explanations indispensable for intuition and shortcut reasoning across many natural systems.

#### [Variational Interpretations](https://gwern.net/scaling-hypothesis#variational-interpretations "Link to section: § 'Variational Interpretations'")

[⁠Janus comments⁠](https://www.lesswrong.com/posts/vJFdjigzmcXMhNTsx/simulators), apropos of their emphasis on what I might call a ‘world-modeling-centric’ intuition for GPT-3 vs my ‘agent-centric’ view that:

> For example, Gwern has said that anyone who uses GPT for long enough begins to think of it as an agent who only cares about roleplaying a lot of roles. That framing seems unnatural to me, comparable to thinking of physics as an agent who only cares about evolving the universe accurately according to the laws of physics. At best, the agent is an epicycle; but it is also compatible with interpretations that generate dubious predictions.

I embrace that description: it is in fact natural and not an elaborate epicycle on a geocentric model of the world, but rather, heliocentrism—powerful, and useful, and simpler. That it (also like heliocentrism⁠[<sup>⁠33⁠</sup>](https://gwern.net/scaling-hypothesis#fn33)) may feel counterintuitive is unfortunate, but its virtues are proven.

We err if an intentional stance leads us engage in the pathetic fallacy and say that the river-spirit wants to reunite with the ocean (and we must offer sacrifices lest the dikes breach), but we are correct when we say that the river tries to find the optimal path which minimizes its gravitational or [free energy⁠](https://en.wikipedia.org/wiki/Principle_of_minimum_energy). It is both true, predictively useful, and mathematically equivalent to the other way of formulating it, in terms of ‘forward’ processes computing step by step, atom by atom, and at the getting the same answer—but typically much easier to solve. (Ted Chiang’s [“Story Of Your Life”⁠](https://gwern.net/story-of-your-life) tries to convey this perspective via fiction.) And this shortcut is a trick we can use universally, for everything from a river flowing downhill to the orbit of a planet to the path of photon through water [minimizing travel time⁠](https://en.wikipedia.org/wiki/Fermat%27s_principle) to evolutionary dynamics: instead of trying to understand it step by step, treat the system as a whole via the [variational principle⁠](https://en.wikipedia.org/wiki/Variational_principle) as ‘wanting’ to minimize (or maximize) some simple global quantity (a reward), and picking the sequence of actions that does so. (“The river _wants_ to minimize its height, so without simulating it down to the individual water currents, I can look at the map and see that it should ‘choose’ to go left, then right, and then meander over this flat slightly-sloping part. Ah, looks like I was right.”) Then, into this modular trick, just plug in the system and quantity in question, and think like an agent…⁠[<sup>⁠34⁠</sup>](https://gwern.net/scaling-hypothesis#fn34)

Uh oh. ‘Predictively useful’, ‘shortcut’, ‘much easier’, ‘universally’—all properties a neural net loves. All natural to it. Why would it try to solve each heterogeneous problem with a separate, computationally-expensive, bag of tricks, when there’s one weird trick AI safety researchers hate, like adopting teleological and variational reasoning?

#### [Inducing Emergence Is Expensive](https://gwern.net/scaling-hypothesis#inducing-emergence-is-expensive "Link to section: § 'Inducing Emergence Is Expensive'")

Of course, this frame can be more expensive than solving a problem directly. Variational approaches are powerful but counterintuitive, and there are often many simpler approximations or memorization that a model can do. For a _single_ problem like modeling the orbit of Pluto, it is unlikely that any variational approach would be learned. Why would it, when there is only 1 system and 1 quantity minimized, so they can just be assumed? This is similar to other [⁠model capabilities induced by pretraining⁠](https://gwern.net/scaling-hypothesis#why-does-pretraining-work): things like induction heads or meta-learning or counting or reasoning need to pay their way, and are not superior to alternatives right from the start. They need rich enough models to compute them feasibly, enough data to force them out of easier solutions (which will fail on a few rare datapoints), and enough training (to work through all the possibilities to converge on the better capabilities).

#### [What Can Induce Agency Emergence?](https://gwern.net/scaling-hypothesis#what-can-induce-agency-emergence "Link to section: § 'What Can Induce Agency Emergence?'")

Unfortunately, this is an empirical matter. How many datasets? How big is each dataset? How diverse do they have to be? What even is a ‘dataset’, since we can always lump or split it? We struggle to predict when a capability will develop in GPT-3, so we definitely can’t say a priori that “Pluto is safe to model, but then tossing in a few thousand exoplanet solar systems would begin to elicit a define-system/plug-in-reward/maximize module and bring back agency”.

##### [Cellular Automatons](https://gwern.net/scaling-hypothesis#cellular-automatons "Link to section: § 'Cellular Automatons'")

It would also be hard to say at all what mathematical or physical systems exhibit the right kinds of maximizing behavior which can be generalized to an intentional stance. Does the ultra-abstract & simple [cellular automaton⁠](https://en.wikipedia.org/wiki/Cellular_automaton) [Conway’s Game of Life⁠](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life) (GoL) induce an intentional stance?

It has no agents, no biology, no evolution in the usual sense—but it does have many small patterns which can be usefully [chunked⁠](https://en.wikipedia.org/wiki/Chunking_(psychology)) to help understand a specific GoL. Humans, of course, look at a GoL as a bunch of small entities like ‘gliders’, but a NN given randomly-initialized boards may also see the same thing, because most GoL patterns will die out or reach fixed-points like [gliders⁠](https://en.wikipedia.org/wiki/Glider_(Conway%27s_Game_of_Life)) or [still-life⁠](https://en.wikipedia.org/wiki/Still_life_(cellular_automaton)) patterns: it is simply simpler to chunk a large GoL board into a few ‘gliders’ wandering through ‘empty space’ interrupted by the occasional ‘still life’.

And once you are talking about gliders wandering around unless they run into a still-life block which kills them, you are much of the way to an intentional stance—not modeling a glider as the inexorable outcome of applying this and that rule about the local-neighborhood to a million cells of equal importance, but as a specific entity of interest against an implicit & ignored background of dead cells, which will travel around and shoot off to infinity or meet its doom.

So, I wouldn’t want to bet too much on GoL being unable to induce any transfer.

##### [Turing Machine](https://gwern.net/scaling-hypothesis#turing-machine "Link to section: § 'Turing Machine'")

Can we go even broader? How about, not natural physics systems, nor specific abstractions of interest to humans (GoL is especially interesting among cellular automatons, and we ignore the large space of CA rules which define a CA but which does nothing interesting), but all Turing machines, let’s say random rules with some length-biased sample of random programs which we dovetail & treat available tapes as a sequence prediction problem. There is no more general computable setting, after all.

###### [Single TM](https://gwern.net/scaling-hypothesis#single-tm "Link to section: § 'Single TM'")

Would training on a random Turing machine risk the possibility of agency?

Maybe not. For a single TM, this might foster some capabilities like instruction-following (for the same reason that pretraining on source code, especially source code augmented with state logs, is a powerful prior for many tasks), but it does not seem to have any of the traits that would induce agency. There is nothing that random TM programs try to minimize or maximize; they simply run. They don’t try to maximize run time length (terminating or non-terminating), or write as few or as many places on the tape as possible, or to achieve particular patterns. A model would simply learn the TM rules and attempt to approximate it as best as it can given its own limited feedforward neural net resources; eventually, if it can work iteratively or recurrently, it would learn the rules and generalize perfectly, and no further learning occurs. Classifying TM programs by whether they halt doesn’t help: yes, the Busy Beaver ‘wants’ to maximize something, but that’s just by definition as the longest terminating program, there are many more TM programs which are ‘happy’ to halt very quickly. So predicting halting status may learn things, but also still nothing that prima facie looks like agency.

###### [TM Meta-Learning](https://gwern.net/scaling-hypothesis#tm-meta-learning "Link to section: § 'TM Meta-Learning'")

This might be due to there being only a single TM, making it analogous to training only on Pluto. Perhaps the right setting would be training over _many_ TM rules (and programs within each one). This is what a researcher would be more interested in, since few TMs are of any intrinsic interest, nor do we know the One True Turing Machine™; we’d rather have a neural network which is learning to learn TMs, or meta-learning, and training a NN over many environments drawn from a distribution is the easiest way to induce meta-learning. So what if we trained a model to do sequence prediction of a random TM + random program, without reuse? If single random Turing machines are harmless, how about all of them?

Hm, well… It’s worth noting how Alan Turing introduced the Turing machine formalism: as a general setting in which a _man_ read and executed sets of rules about how to mark up a paper tape. So even in the original formulation of computers as tools which merely do what they are programmed to do, we have a homunculus at the center! This homunculus could do (and given different instructions, would) anything to the tape, but he wants to follow the current set of instructions accurately, until he’s done. In each draw from the TM+program distribution, he is following a different set of instructions, and now the model is attempting to infer what he wants, to as quickly as possible begin predicting the sequence accurately by recomputing it.

This provides our modularity, and a particular computation executed, and strong optimization pressure to rapidly ‘read’ the history and infer what the new rules must be. That may not have a clean reward-maximizing interpretation, but it _does_ sound a lot like what anyone does with an agent of any kind: the inverse reinforcement learning problem of inferring the reward function can be arbitrarily hard, and until we succeed at that, we instead infer local rules & patterns, which target particular outcomes (regions of state-space). You may not know why your neighbor does that weird thing he does, but you can infer that he will do it, and not another agent, not even his evil identical twin. Is inferring TM rules the simplest & most rudimentary possible ‘theory of mind’? Maybe. In which case, there is no escape from the possibility of agency anywhere.

### [Ambient Agency](https://gwern.net/scaling-hypothesis#ambient-agency "Link to section: § 'Ambient Agency'")

Agency may be like [Turing-completeness⁠](https://gwern.net/turing-complete): even in settings free of selection or optimization, it is a capability too useful and too convergent to guarantee its absence. The broader and more powerful a system is, the more the next feature or next piece of data may push it over the edge, and it becomes harder to engineer a system _without_ that aspect.

Agency can be learned from data generated by agents, who generate extremely selective data. Or if you carefully remove all that, it may come from the selection of non-human data. Or it may be implicit in the dynamics of a replicator system. Or it may be one of the countless physical systems which have such interpretations which are computationally more efficient and thus any NN which is optimized to balance realizable compute with accuracy will be pushed to such interpretations. Or it may be a good simplification of systems with macro-statistics where the detailed micro-state adds little. Or it may stem from simply meta-learning of rule induction on TMs, because agents may follow complex sets of policies which are learnable but the motivating reward-function is an under-determined blackbox.

Or… like squashing Turing-completeness, as soon as one hole in the sinking ship is patched, you notice another leak spring up. You can’t keep a good idea down. All you can do is make a complex system that doesn’t display agency as far as _you_ can tell; unfortunately, much like Turing-completeness (or security vulnerabilities), that there is no overt agency doesn’t mean it is not there. The model won’t tell you, it is just getting on with the job of lowering its loss. (“Sampling can show the presence of knowledge, but not the absence.”)

I do not have any solutions to this, other than to advise yet again to abandon the seductive, convenient, but wrong idea that tool AIs (under any branding, be it ‘tool AIs’ or ‘physics generative models’ or ‘world simulators’), cannot or will not be agent AIs. They may well be, and the better they get, the more likely it is, and tampering with data is not a solution.

___

[](https://gwern.net/scaling-hypothesis#footnotes "Link to section: § ‘Footnotes’")

1.   [](https://gwern.net/scaling-hypothesis#fn1 "Link to footnote 1")
    
    Given the number of comments on the paper’s arithmetic benchmark, I should point out that the arithmetic benchmark appears to greatly understate GPT-3’s abilities due to the [BPE encoding issue⁠](https://gwern.net/gpt-3#bpes): even using commas markedly improves its 5-digit addition ability, for example. The BPE issue also appears to explain much of the poor performance on the anagram/shuffling tasks. This is something to keep in mind for any task which requires character-level manipulation or understanding.[](https://gwern.net/scaling-hypothesis#fnref1)
    
2.   [](https://gwern.net/scaling-hypothesis#fn2 "Link to footnote 2")
    
    On implicit [⁠meta-learning⁠](https://www.reddit.com/r/reinforcementlearning/search/?q=flair%3AMetaRL&include_over_18=on&restrict_sr=on&sort=top), see: [Santoro et al 2016⁠](https://arxiv.org/abs/1605.06065#deepmind)/[Wang et al 2018⁠](https://gwern.net/doc/reinforcement-learning/meta-learning/2018-wang.pdf#deepmind) ([Botvinick commentary⁠](https://www.lesswrong.com/posts/Wnqua6eQkewL3bqsF/matt-botvinick-on-the-spontaneous-emergence-of-learning))/[Botvinick et al 2019a⁠](https://www.cell.com/trends/cognitive-sciences/fulltext/S1364-6613(19)30061-0#deepmind), [Clune 2019⁠](https://arxiv.org/abs/1905.10985#uber), [Schmidhuber 2015⁠](https://arxiv.org/abs/1511.09249#schmidhuber)/[2018⁠](https://arxiv.org/abs/1802.08864#schmidhuber), [Weng 2018⁠](https://lilianweng.github.io/lil-log/2018/11/30/meta-learning.html#openai)/[Weng 2019⁠](https://lilianweng.github.io/lil-log/2019/06/23/meta-reinforcement-learning.html#openai).[](https://gwern.net/scaling-hypothesis#fnref2)[](https://gwern.net/scaling-hypothesis/#gwern-3956239092)
    
3.   [](https://gwern.net/scaling-hypothesis#fn3 "Link to footnote 3")
    
    GPT-3 hardly costs more than a few million dollars of compute (as of early 2020) as the extensive scaling research beforehand enabled one training run, and it is cheap to run (pg39): “Even with the full GPT-3 175B, generating 100 pages of content from a trained model can cost on the order of 0.4 kW-hr, or only a few cents in energy costs.” (Likewise, T5 was trained [only once⁠](https://x.com/colinraffel/status/1313097438299910147).) And for the cost of one model, GPT-3 API users have shown that you get the equivalent of hundreds of smaller special-purpose models, each requiring more researchers, custom datasets, countless training runs, and tinkering, assuming said models could be created at all. (A slogan for the future: “One model, one vector—once.”)
    
    For comparison, the [PDP-11⁠](https://en.wikipedia.org/wiki/PDP-11) was a common academic workhorse due to its extremely low cost, a mere $110,099<sup>$20k</sup><sub>1970</sub>, while the first [Lisp Machine⁠](https://en.wikipedia.org/wiki/Lisp_machine) cost >$258,956<sup>$50k</sup><sub>1972</sub>—expensive for a workstation but a bargain compared to researchers hogging mainframes costing tens of millions. IBM’s (otherwise useless) Deep Blue AI project reputedly cost >$12<sup>$5</sup><sub>1997</sub>m for the final iteration (reports of $231<sup>$100</sup><sub>1997</sub>m appear to be a confusion with the estimated value of _publicity_ mentioned in pg187 of Hsu’s _Behind Deep Blue_) and Big Science projects like [ITER⁠](https://en.wikipedia.org/wiki/ITER) blow >5000× the funding to mostly fail. (The particle physicists, incidentally, are [back asking for⁠](https://www.nature.com/articles/d41586-020-01866-9) ≫$30<sup>$24</sup><sub>2020</sub>b, based on, presumably the scientific revolutions & world-changing breakthroughs that the LHC’s >$14<sup>$9</sup><sub>2010</sub>b investment produced, or the $5.30<sup>$2</sup><sub>1993</sub>b spent to (not) build the [SSC⁠](https://en.wikipedia.org/wiki/Superconducting_Super_Collider)…)
    
    GPT-3 could have been done decades ago with global computing resources & scientific budgets; what could be done with today’s hardware & budgets that we just don’t know or care to do? There _is_ a hardware overhang. (See also the [_⁠Whole Brain Emulation Roadmap_⁠](https://gwern.net/doc/ai/scaling/hardware/2008-sandberg-wholebrainemulationroadmap.pdf) & [“2019 recent trends in GPU price per FLOPS”⁠](https://aiimpacts.org/2019-recent-trends-in-gpu-price-per-flops/).)[](https://gwern.net/scaling-hypothesis#fnref3)
    
4.   [](https://gwern.net/scaling-hypothesis#fn4 "Link to footnote 4")
    
    Further, NNs have additional hardware overhangs of their own due to the many orders of magnitude asymmetry of training vs running. Transfer learning and meta-learning are so much faster than the baseline model training. You can ‘train’ GPT-3 without even any gradient steps—just examples. You pay the extremely steep upfront cost of One Big Model to Rule Them All, and then reuse it everywhere at tiny marginal cost. If you train a model, then as soon as it’s done you get, among other things:
    
    -   the ability to run thousands of copies in parallel on the same hardware
        
        -   in a context like AlphaGo, I estimate several hundred ELO strength gains if you reuse the same hardware to merely run tree search with exact copies of the original model
            
    -   meta-learning/transfer-learning to any related domain, cutting training requirements by orders of magnitude
        
    -   model compression/distillation to train student models which are a fraction of the size, FLOPS, or latency (ratios varying widely based on task, approach, domain, acceptable performance degradation, targeted hardware etc., but often extreme like 1⁄100<sup class="ordinal">th</sup>)
        
    -   reuse of the model elsewhere to instantly power up other models (eg. use of text or image embeddings for a DRL agent)
        
    -   learning-by-doing/[experience curve effects⁠](https://en.wikipedia.org/wiki/Experience_curve_effects) (highest in information technologies, and high for DL: [Hernandez & Brown 2020⁠](https://arxiv.org/abs/2005.04305#openai)), so the next from-scratch model may be much cheaper.
        
        For example: after all the iterative model architecture & game upgrades done while training the first [OpenAI Five⁠](https://en.wikipedia.org/wiki/OpenAI_Five) (OA5) DoTA2 agent was completed, the second iteration of OA5, [⁠“Rerun”⁠](https://arxiv.org/pdf/1912.06680.pdf#page=11&org=openai), was trained from scratch. Rerun required only 20% of the training for a “98% win-rate against the final version of OpenAI Five.” As the authors note: “The ideal option would be to run Rerun-like training from the very start, but this is impossible—the OpenAI Five curve represents lessons learned that led to the final codebase, environment, etc., without which it would not be possible to train Rerun.”
        
    -   baseline for engineering much more efficient ones by ablating and comparing with the original
        
    
    [](https://gwern.net/scaling-hypothesis#fnref4)[](https://gwern.net/scaling-hypothesis/#gwern-1594489500)[](https://gwern.net/scaling-hypothesis/#gwern-3296306966)
    
5.   [](https://gwern.net/scaling-hypothesis#fn5 "Link to footnote 5")
    
    eg. a narrow context window [⁠severely limits it⁠](https://arxiv.org/pdf/2001.08361.pdf#page=25), and motivates the need for [efficient attention⁠](https://gwern.net/doc/ai/nn/transformer/attention/index). More broadly, GPT-3 does nothing exotic—no use of [brain imitation learning⁠](https://www.reddit.com/r/reinforcementlearning/comments/9pwy2f/wbe_and_drl_a_middle_way_of_imitation_learning/) or neural architecture search to try to tailor the model, online hyperparameter optimization (possibly [\>3× speedup⁠](https://arxiv.org/abs/2106.00958#openai)) or even decide basic hyperparameters like widths (which as [EfficientNet⁠](https://arxiv.org/abs/1905.11946#google) shows, can make quite a different even in “well-understood and hand-optimized vanilla architectures”).[](https://gwern.net/scaling-hypothesis#fnref5)
    
6.   [](https://gwern.net/scaling-hypothesis#fn6 "Link to footnote 6")
    
    Not even PDFs—so no Google Books, no Arxiv, no Libgen, no Sci-Hub…[](https://gwern.net/scaling-hypothesis#fnref6)
    
7.   [](https://gwern.net/scaling-hypothesis#fn7 "Link to footnote 7")
    
    Generating text from a LM can reveal the presence of knowledge, but not its absence, and it is universally agreed that the current crude heuristic methods like top-_k_ cannot possibly be optimal.[](https://gwern.net/scaling-hypothesis#fnref7)
    
8.   [](https://gwern.net/scaling-hypothesis#fn8 "Link to footnote 8")
    
    ‘A man is at the doctor’s office, and the doctor tells him, “I’ve got some good news and some bad news for you.” / The man says, “Well, I can’t take the bad news right now, so give me the good news first.” / The doctor says, “Well, the good news is that you have an 18-inch penis.” / The man looks stunned for a moment, and then asks, “What’s the bad news?” / The doctor says, “Your brain’s in your dick.”’[](https://gwern.net/scaling-hypothesis#fnref8)
    
9.   [](https://gwern.net/scaling-hypothesis#fn9 "Link to footnote 9")
    
    In particular, sample-efficiency increases with model size up to compute-efficient scaling, and [GPT-2 can memorize data after seeing it only once⁠](https://arxiv.org/abs/2012.07805)—a [desirable property⁠](https://arxiv.org/abs/1906.05271#google) given long-tailed real-world distributions of data. (An example of how _not_ to do scaling papers is [Thompson et al 2020⁠](https://arxiv.org/abs/2007.05558), which, in stark contrast to the foregoing papers—which Thompson et al do not mention at all!—attempts to infer scaling not from well-controlled experiments run by the authors, which yield extremely tight and highly predictive curves, but attempts to infer them from occasional reported numbers in highly disparate research papers; unsurprisingly, their curves barely predict anything and seem to be serious overestimates anyway.)
    
    It is noteworthy that the pursuit of large models is driven almost exclusively by OpenAI & industry entities (the latter of which are content with far smaller models), and that academia has evinced an almost total disinterest—disgust & anger, even, and denial (one might say “green AI” is green with envy). For all that the scaling hypothesis is ‘obvious’ and scaling is ‘predicted’, there is remarkably little interest in actually _doing_ it. Perhaps we should pay more attention to what people do rather than what they say; and recall that successful academic communities produce questions, not answers.[](https://gwern.net/scaling-hypothesis#fnref9)
    
10.   [](https://gwern.net/scaling-hypothesis#fn10 "Link to footnote 10")
    
    Roughly around [Chuan Li’s](https://lambdalabs.com/blog/demystifying-gpt-3 "OpenAI's GPT-3 Language Model: A Technical Overview") estimate, using nominal list prices without discounts (which could be steep as the marginal costs of cloud compute are substantially lower). The R&D project cost would be much higher, but is amortized over all subsequent models & projects.[](https://gwern.net/scaling-hypothesis#fnref10)
    
11.   [](https://gwern.net/scaling-hypothesis#fn11 "Link to footnote 11")
    
    The Manhattan Project cost ~$28<sup>$2</sup><sub>1946</sub>b.[](https://gwern.net/scaling-hypothesis#fnref11)
    
12.   [](https://gwern.net/scaling-hypothesis#fn12 "Link to footnote 12")
    
    One is reminded of the joke about the customer complaining to the butcher:
    
    “Your meat is $10/lb, while your competitor across the street sells it at $1!” “So go buy his meat.” “I would, but he has none.” “When I don’t have any meat, it costs $1 too.”[](https://gwern.net/scaling-hypothesis#fnref12)
    
13.   [](https://gwern.net/scaling-hypothesis#fn13 "Link to footnote 13")
    
    As if we live in a world where grad students could go to the Moon on a ramen budget if we just wished hard enough, as if focusing on CO<sub>2</sub> costs & not benefits in our evaluations is not like making a scissor with only one blade, or as if “green AI” approaches to try to create small models without going through big models did not look increasingly futile and like throwing good money after bad, and were not the least green of all AI research… To the extent that all cutting-edge AI research ~2010 could be done with grad student money like $1,579<sup>$1k</sup><sub>2010</sub> of hardware, where AI research in decades before & after benefited from big iron, that is an indictment of that era, demonstrating what a stagnant dead end that research was, that its techniques were so small-minded and hobbled it could not benefit from the available large-scale compute.[](https://gwern.net/scaling-hypothesis#fnref13)
    
14.   [](https://gwern.net/scaling-hypothesis#fn14 "Link to footnote 14")
    
    Fun trivia: BiT [is now more accurate⁠](https://arxiv.org/abs/2006.07159#google) at predicting (cleaned, corrected) ImageNet labels than the original ImageNet labels are.[](https://gwern.net/scaling-hypothesis#fnref14)
    
15.   [](https://gwern.net/scaling-hypothesis#fn15 "Link to footnote 15")
    
    One interesting aspect of image scaling experiments like Dojolonga et al 2020 is that even when performance is ‘plateauing’ on the original task & approaching label error, the transfer learning continues to improve. Apparently the internal representations, even when adequate for mere classification and so the score cannot increase more than a small percentage, become more human-like—because it’s encoding [dark knowledge⁠](https://arxiv.org/abs/1503.02531#google) or more [adversarial robustness⁠](https://arxiv.org/abs/2006.14536#google)? I’ve noticed with language models, the final fractions of a loss appear to make a substantial difference to generated sample quality, perhaps because it is only after all the easier modeling is finished that the lazy language model is forced to squeeze out the next bit of performance by more correctly modeling more sophisticated things like logic, objects, world-knowledge, etc.[](https://gwern.net/scaling-hypothesis#fnref15)
    
16.   [](https://gwern.net/scaling-hypothesis#fn16 "Link to footnote 16")
    
    The numbers here are not exact and are for illustration; because BPEs don’t correspond to any intuitive, I am going to borrow from my observations watching char-RNNs, and talk about the loss per character instead of BPE.[](https://gwern.net/scaling-hypothesis#fnref16)
    
17.   [](https://gwern.net/scaling-hypothesis#fn17 "Link to footnote 17")
    
    If you see thousands of images labeled ‘dog’ and thousands more labeled ‘cat’, you can simply learn separate dog & cat classifiers without bothering to understand their shared aspects like being domesticated quadruped mammal predators. This won’t be useful if you are then asked to classify ‘ferret’ images, but you weren’t asked to, so that’s not your problem, since you can just learn yet another separate classifier for ferrets if you then get a lot of ferret images.[](https://gwern.net/scaling-hypothesis#fnref17)
    
18.   [](https://gwern.net/scaling-hypothesis#fn18 "Link to footnote 18")
    
    pg210–211, “The Quiet Enemy”, [_⁠The Legacy of Hiroshima_⁠](https://gwern.net/doc/radiance/1962-teller-thelegacyofhiroshima.pdf), Teller 1962<sub><span title="1962 was 64 years ago.">64ya</span></sub>.[](https://gwern.net/scaling-hypothesis#fnref18)
    
19.   [](https://gwern.net/scaling-hypothesis#fn19 "Link to footnote 19")
    
    Another way of interpreting the various papers about how Transformers are actually like RNNs or are [actually Hopfield networks⁠](https://arxiv.org/abs/2008.02217) is to take that as indicating that what is important about them is not any inherent new capability compared to older architectures, but some lower-level aspect like being more efficiently trainable on contemporary hardware.[](https://gwern.net/scaling-hypothesis#fnref19)
    
20.   [](https://gwern.net/scaling-hypothesis#fn20 "Link to footnote 20")
    
    How do these absolute prediction performances compare to humans? It’s hard to say. The only available benchmarks for perplexity for humans/GPT-2/GPT-3 appear to be WebText, [Penn Tree Bank⁠](https://gwern.net/doc/cs/algorithm/1993-marcus.pdf) (PTB; based on the [Brown Corpus⁠](https://en.wikipedia.org/wiki/Brown_Corpus)), [1 Billion Word⁠](https://arxiv.org/abs/1312.3005) (1BW), and [LAMBADA⁠](https://arxiv.org/abs/1606.06031). But coverage is spotty.
    
    I found no human benchmarks for WebText or Penn Tree Bank, so I can’t compare the human vs GPT-2/GPT-3 perplexities ([⁠GPT-2 PTB⁠](https://cdn.openai.com/better-language-models/language_models_are_unsupervised_multitask_learners.pdf#page=5): 35.7; [⁠GPT-3 PTB⁠](https://arxiv.org/pdf/2005.14165.pdf#page=11&org=openai): 20.5).
    
    [⁠GPT-2⁠](https://cdn.openai.com/better-language-models/language_models_are_unsupervised_multitask_learners.pdf#page=5) was benchmarked at 43 perplexity on the 1 Billion Word (1BW) benchmark vs a (highly extrapolated) [human perplexity of 12⁠](https://gwern.net/doc/ai/scaling/2017-shen.pdf) (which interestingly extrapolates, using 2012<sub><span title="2012 was 14 years ago.">14ya</span></sub> LSTM RNNs, that “10 to 20 more years of research before human performance is reached”), but that may be an unfair benchmark (“Our model is still substantially worse than prior work on the One Billion Word Benchmark ([⁠Chelba et al 2013⁠](https://gwern.net/scaling-hypothesis#chelba-et-al-2013)). This is likely due to a combination of it being both the largest dataset and having some of the most destructive pre-processing—1BW’s sentence level shuffling removes all long-range structure.”) and 1BW was dropped from the GPT-3 evaluation due to data contamination (“We omit the 4 Wikipedia-related tasks in that work because they are entirely contained in our training data, and we also omit the one-billion word benchmark due to a high fraction of the dataset being contained in our training set.”).
    
    LAMBADA was benchmarked at a [⁠GPT-2 perplexity⁠](https://cdn.openai.com/better-language-models/language_models_are_unsupervised_multitask_learners.pdf#page=5) of 8.6, and a [⁠GPT-3 perplexity⁠](https://arxiv.org/pdf/2005.14165.pdf&org=openai#page=12) of 3.0 (zero-shot) / 1.92 (few-shot). [⁠OA claims⁠](https://gwern.net/scaling-hypothesis#gpt-2-blog) in their GPT-2 blog post (but not the paper) that human perplexity is 1–2, but provides no sources and I couldn’t find any. (The authors might be guessing based on how LAMBADA was constructed: examples were filtered by whether two independent human raters provided the same right answer, which lower bounds how good humans must be at predicting the answer.)
    
    So overall, it looks like the best guess is that GPT-3 continues to have somewhere around twice the absolute error of a human. This implies it will take a large (yet, far from impossible) amount of compute to fully close the remaining gap with the current scaling laws. If we irresponsibly extrapolate out the WebText scaling curve further, assume GPT-3 has twice the error of a human at its current WebText perplexity of 1.73 (and so humans are ~0.86), then we need 2.57 ⋅ (3.64 ⋅ (10<sup>3</sup> ⋅ _x_))<sup>-0.048</sup> = 0.86, where _x_ = 2.2e6 or 2,200,000× the compute of GPT-3. (This would roughly equal the cost to the USA of invading Iraq.)
    
    When is that feasible?
    
    If we imagine that [⁠peak AI compute usage doubles every 3.4 months⁠](https://gwern.net/scaling-hypothesis#amodei-et-al-2018), then 2.2e6 would be 22 doublings away—or 6.3 years, in 2027. Most people believe that that compute trend must break down soon, and this sort of prediction is a good reason why!
    
    Going the other direction, [⁠Hernandez & Brown 2020’s⁠](https://gwern.net/scaling-hypothesis#hernandez-brown-2020-paper) estimate is that, net of hardware & algorithmic progress, the cost of a fixed level of performance halves every 16 months; so if GPT-3 cost ~$6.29<sup>$5</sup><sub>2020</sub>m in early 2020, then it’ll cost $3.14<sup>$2.50</sup><sub>2020</sub>m around mid-2021, and so on. Similarly, a GPT-human requiring 2.2e6× more compute would presumably cost on the order of $13<sup>$10</sup><sub>2020</sub> trillion in 2020, but after 14 halvings (18 years) would cost $1.26<sup>$1</sup><sub>2020</sub>b in 2038.[](https://gwern.net/scaling-hypothesis#fnref20)[](https://gwern.net/scaling-hypothesis/#gwern-1230483350)
    
21.   [](https://gwern.net/scaling-hypothesis#fn21 "Link to footnote 21")
    
    As of December 2020, half a year later, almost no researcher has been willing to go on record as saying what specific capabilities they predict future 1t, 10t, or 100t models will have or not have, and at what size which missing capabilities will emerge—just as no one is on record successfully predicting GPT-2 or GPT-3’s specific capabilities.[](https://gwern.net/scaling-hypothesis#fnref21)
    
22.   [](https://gwern.net/scaling-hypothesis#fn22 "Link to footnote 22")
    
    See also [⁠Sutskever’s DRL talk⁠](https://www.youtube.com/watch?v=w3ues-NayAs?t=712#openai), and [Wojciech Zaremba’s⁠](https://en.wikipedia.org/wiki/Wojciech_Zaremba) [⁠comments about OA5⁠](https://www.youtube.com/watch?v=429QC4Yl-mA&t=1157s) ([⁠transcript⁠](https://wandb.ai/wandb_fc/gradient-dissent/reports/What-could-make-AI-conscious-with-Wojciech-Zaremba-co-founder-of-OpenAI--Vmlldzo3NDk3MDI)):
    
    > -   -   **Lukas Biewald:** How much of the work then on DoTA2 was, you felt, like fundamentally moving ML forward and how much of it was DoTA-specific or can you even pull those apart?
    >         
    >     -   **Wojciech Zaremba**: I think there was a decent amount of DoTA-specific work. And then I think it was more than optimal, but also simultaneously hard. So I remember at the beginning of DoTA project, it was actually unclear how to approach it.
    >         
    >         People are saying that contemporary reinforcement learning will have no chance in solving this problem. And people looked into off-policy matters, on-policy matters, [evolutionary strategies⁠](https://arxiv.org/abs/1703.03864#openai). The thing that became quite surprising is that [methods that already exist⁠](https://arxiv.org/abs/1707.06347#openai), with appropriate scale work extremely well. So that was a big surprise. And I remember some people even before DoTA time at OpenAI, saying that maybe reinforcement learning is a dead end. And all of a sudden it’s a very different story now.
    >         
    >     -   **L Biewald**: For sure.
    >         
    
    [](https://gwern.net/scaling-hypothesis#fnref22)[](https://gwern.net/scaling-hypothesis/#gwern-2209836886)
    
23.   [](https://gwern.net/scaling-hypothesis#fn23 "Link to footnote 23")
    
    Production services, especially _free_ production services, usually lag long after the unpublished SOTA inside the most cutting-edge lab. The second is the only thing that matters for predicting AI progress or AI risk, of course, but people will insist on measuring AI progress by bizarre metrics like what an arbitrary free service could do last year. As a rule of thumb, assume that: if you are using a free service with no login, the quality is _at least_ 2 years behind SOTA; free with a login, >1.5 years; paid service, >1 year; & recently-released research paper, >6 months.[](https://gwern.net/scaling-hypothesis#fnref23)
    
24.   [](https://gwern.net/scaling-hypothesis#fn24 "Link to footnote 24")
    
    Particularly [Demis Hassabis⁠](https://en.wikipedia.org/wiki/Demis_Hassabis); I’m not sure about [Shane Legg’s⁠](https://en.wikipedia.org/wiki/Shane_Legg) [current views⁠](https://www.vetta.org/2009/12/tick-tock-tick-tock-bing/), although given the accuracy of his [2009 predictions⁠](https://www.vetta.org/2009/12/the-teenies/) while founding DeepMind & his [2018 comments⁠](https://web.archive.org/web/20210426084422/https://www.stuff.co.nz/technology/103500435/google-deepmind-founder-and-leader-in-artificial-intelligence-returns-to-hamilton), he probably hasn’t much changed his views that AI will be empowered by the (realized) exponential compute gains or his [AGI forecast of ~2028⁠](https://www.vetta.org/2010/12/goodbye-2010/). (This is consistent with the latest [Metaculus⁠](https://www.metaculus.com/questions/questions/3479/when-will-the-first-artificial-general-intelligence-system-be-devised-tested-and-publicly-known-of/ "When will the first Artificial General Intelligence system be devised, tested, and publicly known of?") [forecasts⁠](https://www.metaculus.com/questions/questions/1394/will-ai-progress-surprise-us/ "Will AI progress surprise us?").)[](https://gwern.net/scaling-hypothesis#fnref24)
    
25.   [](https://gwern.net/scaling-hypothesis#fn25 "Link to footnote 25")
    
    When faced with the choice between having to admit all their fancy hard work is a dead-end, swallow the bitter lesson, and start budgeting tens of millions of compute, or instead writing a disdainful tweet explaining how, “_actually_, GPT-3 shows that scaling is a dead end, it’s an environmental catastrophe, and it’s just imitation intelligence anyway”—most people will get busy on the tweet![](https://gwern.net/scaling-hypothesis#fnref25)
    
26.   [](https://gwern.net/scaling-hypothesis#fn26 "Link to footnote 26")
    
    A mixture-of-expert model like GShard or an embedding like DynamicEmbedding is not comparable to ‘dense’ models like GPT-3, as it’s always been cheap & easy to train models with billions of ‘parameters’ in some sense, like extremely large embeddings; however, these parameters do little, and are more like a few hundred shallow models glued back-to-back. They probably do not learn the same interesting things that a dense model would with the same nominal parameter count.[](https://gwern.net/scaling-hypothesis#fnref26)
    
27.   [](https://gwern.net/scaling-hypothesis#fn27 "Link to footnote 27")
    
    This seems to be a bit of a blind spot by commentators: the assumption that if the necessary resource _exists_, then it will be _used_. For example, Jim Gray (d. 2007<sub><span title="2007 was 19 years ago.">19ya</span></sub>) in June 1999<sub><span title="1999 was 27 years ago.">27ya</span></sub> [⁠pokes a bit of fun⁠](https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/ms_tr_99_50_turingtalk.pdf#page=11) at Turing’s connectionist hardware argument by noting that (using an optimistic lower bound on human brain computational power):
    
    > Desktop machines should be about as intelligent as a spider or a frog, and supercomputers ought to be nearing human intelligence…So, we should start seeing intelligence in these supercomputers any day now (just kidding)…\[but we do not because\] we are missing something _very_ fundamental. Clearly, the software and databases we have for our super-computers is not on a track to pass the Turing Test in the next decade. Something quite different is needed. Out-of-the-box, radical thinking is needed.
    > 
    > We have been handed a puzzle: genomes and brains work. But we are clueless what the solution is. Understanding the answer is a wonderful long-term research goal.
    
    With the benefit of hindsight, we can say that it is true that supercomputers in 1999<sub><span title="1999 was 27 years ago.">27ya</span></sub> could have been showing far more impressive levels of intelligence than they were, and that it was also true that the software being run on the supercomputers in 1999<sub><span title="1999 was 27 years ago.">27ya</span></sub> were never going to lead to meaningful AI progress, and that there is no particular contradiction or mystery—it was simply that no one was trying. No supercomputer owner was going to let it be tied up for years doing the minor-yet-critical iteration to make connectionist approaches like RNNs or CNNs work. Thus, something quite different & radical was indeed needed—but we already knew what the solution looked like.[](https://gwern.net/scaling-hypothesis#fnref27)
    
28.   [](https://gwern.net/scaling-hypothesis#fn28 "Link to footnote 28")
    
    Strikingly, as of 2020, this is _still_ true: eg. the only deep learning research I have seen done on [Summit⁠](https://en.wikipedia.org/wiki/Summit_(supercomputer)) were [materials⁠](https://arxiv.org/abs/1909.11150) [science⁠](https://arxiv.org/abs/2005.00223) & [biology⁠](https://arxiv.org/abs/2007.06225). (In double-checking Arxiv, I did find one non-STEM paper using Summit resources: [Lin et al 2019⁠](https://arxiv.org/abs/1910.00932#google), focusing on systems engineering in training a video classification model.)[](https://gwern.net/scaling-hypothesis#fnref28)
    
29.   [](https://gwern.net/scaling-hypothesis#fn29 "Link to footnote 29")
    
    [Peter Norvig⁠](https://en.wikipedia.org/wiki/Peter_Norvig) [⁠offers an example⁠](https://wandb.ai/wandb_fc/gradient-dissent/reports/Peter-Norvig-Google-s-Director-of-Research-Singularity-is-in-the-eye-of-the-beholder--Vmlldzo2MTYwNjk?galleryTag=gradient-dissent) of what happens when grad students _can’t_ afford the necessary computing power to make neural nets work:
    
    > **[Lukas Biewald⁠](https://en.wikipedia.org/wiki/Lukas_Biewald)**: When you look at deep learning, it sort of feels like that came suddenly, but a lot of those techniques were around, in fact in your book, I remember quite far back. Do you think that the field missed something, or was it just not possible to run at the scale necessary to show that these neural network techniques were working better than people expected in the early aughts?
    > 
    > **Peter Norvig**: Yeah. I mean, if you say suddenly, right, we’ve got a sudden leap in computer vision and image net after Hinton had been trying the same thing for 30 years, right?…And then it finally worked. And I think the biggest difference was the computing power. Definitely there were advances in data. So we could do [ImageNet⁠](https://en.wikipedia.org/wiki/ImageNet) because [Fei-Fei Li⁠](https://en.wikipedia.org/wiki/Fei-Fei_Li) and others gathered this large database, and that was really important. There are certainly differences in the algorithm, right? We’ve got a slightly different [squashing function⁠](https://en.wikipedia.org/wiki/Activation_function). Instead of shaped like this \[[sigmoid⁠](https://en.wikipedia.org/wiki/Sigmoid_function)\], it’s shaped like this \[[ReLU⁠](https://en.wikipedia.org/wiki/Rectifier_(neural_networks))\]. I mean, I don’t know how big a deal that was, but we learned how to do [stochastic gradient descent⁠](https://en.wikipedia.org/wiki/Stochastic_gradient_descent) a little bit better. We figured that [dropout⁠](https://en.wikipedia.org/wiki/Dilution_(neural_networks)) gave you a little bit better robustness.
    > 
    > So there were small things, but I think probably the biggest was the computing power. And I mean, I certainly remember [Geoff Hinton⁠](https://en.wikipedia.org/wiki/Geoffrey_Hinton) came to Berkeley when I was a grad student in 1981<sub><span title="1981 was 45 years ago.">45ya</span></sub>, I think, when he talked about these neural nets. And we fellow grad students thought that was so cool. So we said, ‘Let’s go back into the lab and implement it.’
    > 
    > And of course, there was absolutely nothing you could download, so we had to build it all from scratch. And we got it to do exclusive or \[[XOR⁠](https://en.wikipedia.org/wiki/Exclusive_or)\], and then we got it to do something a little bit more complicated. And it was exciting. And then we gave it the first real problem, and it ran overnight, and it didn’t converge, and we let it run one more day, and it still didn’t converge. And then we gave up, and we went back to our sort of knowledge-based systems approach. But if we had the computing power of today, it probably would have converged after 5 seconds.
    
    By my estimate, Norvig’s attempt used the equivalent of 0.8 _milliseconds_ of contemporary GPU-time.
    
    (In ~1981, an expensive PC costing the equivalent of >$6,289<sup>$5k</sup><sub>2020</sub>, of the sort a high-powered AI lab might allocate 1 apiece to grad students, might have an additional [Intel 8087⁠](https://en.wikipedia.org/wiki/Intel_8087) floating-point [coprocessor⁠](https://en.wikipedia.org/wiki/Coprocessor) capable of 50,000 FP64 FLOPS; conservatively assuming that ‘overnight’ + ‘one more day’ ≤ 2 days, then Norvig’s experiment used 2d × 24h × 60m × 60s × 50,000 = 8×10<sup>9</sup> FLOPS; a 2020 Nvidia [A100⁠](https://en.wikipedia.org/wiki/Ampere_(microarchitecture)) GPU nominally priced ~$12,578<sup>$10k</sup><sub>2020</sub> boasts 9.7 FP64 TFLOPS or 9,700,000,000,000 FLOPS (and far more in the more useful low-precision regimes like FP32, but 1981<sub><span title="1981 was 45 years ago.">45ya</span></sub> ML didn’t know that); thus, 8<sup>9</sup> / 9.7×10<sup>12</sup> = 8×10<sup>−4</sup> seconds = 0.8 milliseconds.)[](https://gwern.net/scaling-hypothesis#fnref29)
    
30.   [](https://gwern.net/scaling-hypothesis#fn30 "Link to footnote 30")
    
    [Jeff Dean⁠](https://arxiv.org/abs/1911.05289#google) notes, “It is perhaps unfortunate that just as we started to have enough computational performance to start to tackle interesting real-world problems and the increased scale and applicability of machine learning has led to a dramatic thirst for additional computational resources to tackle larger problems, the computing industry as a whole has experienced a dramatic slowdown in the year-over-year improvement of general purpose CPU performance.” Under the computational view, this is not a coincidence: compute, not algorithms, are the critical factor; biological systems often come within orders of magnitude, or less, of the theoretical optimum for a task; and the closer one comes to optimal, the slower progress becomes; so, just as artificial computation finally starts doing “interesting real-world problems”, it necessarily is approaching its limits. (It could have been otherwise: Moore’s law could have stopped short by many orders of magnitude of biological efficiency, or surpassed it by many orders, with no temporal coincidence, and AI happened for other reasons.)[](https://gwern.net/scaling-hypothesis#fnref30)
    
31.   [](https://gwern.net/scaling-hypothesis#fn31 "Link to footnote 31")
    
    Now that GPT-3’s few-shot and [T5 finetuning⁠](https://arxiv.org/abs/2003.08380#google) have begun to make people like Gary Marcus feel slightly nervous about WinoGrande, they have [begun preparing⁠](https://arxiv.org/abs/2004.13831) [their excuses⁠](https://arxiv.org/abs/2201.02387) for why Winograd schemas [weren’t _really_⁠](https://gwern.net/modus) good measures of commonsense reasoning/intelligence (because intelligence, of course, is whatever AI can’t do yet).[](https://gwern.net/scaling-hypothesis#fnref31)
    
32.   [](https://gwern.net/scaling-hypothesis#fn32 "Link to footnote 32")
    
    One is reminded of the catastrophic dismissals of Western technology by the Chinese emperors & [Shaka Zulu⁠](https://en.wikipedia.org/wiki/Shaka): the error was not in dismissing the technology as practically unimportant (it arguably was), nor in failing to realize that they were already centuries behind in the most important geopolitical development in millennia, but in failing to acknowledge that they couldn’t explain why the Western technology had gotten so good so fast and thus couldn’t know that it wouldn’t get much better still.[](https://gwern.net/scaling-hypothesis#fnref32)
    
33.   [](https://gwern.net/scaling-hypothesis#fn33 "Link to footnote 33")
    
    As my favorite Wittgenstein anecdote goes, heliocentrism strikes everyone as false because things just don’t _look_ as if the Earth whirls at astronomical velocities around a star, but as if the Earth is perfectly still and everything else whirls around it (Anscombe 1963<sub><span title="1963 was 63 years ago.">63ya</span></sub>, _An Introduction to Wittgenstein’s Tractatus_):
    
    > The general method that Wittgenstein does suggest is that of ‘shewing that a man has supplied no meaning \[“no reference”?\] for certain signs in his sentences’. I can illustrate the method from Wittgenstein’s later way of discussing problems. He once greeted me with the question: ‘Why do people say that it was natural to think that the sun went round the earth rather than that the earth turned on its axis? I replied: ’I suppose, because it looked as if the sun went round the earth.’ ‘Well,’ he asked, ‘what would it have looked like if it _had_ looked as if the earth turned on its axis?’
    > 
    > This question brought it out that I had hitherto given no relevant meaning to ‘it looks as if’ in ‘it looks as if the sun goes round the earth’. My reply was to hold out my hands with the palms upward, and raise them from my knees in a circular sweep, at the same time leaning backwards and assuming [a dizzy⁠](https://x.com/Brummo/status/1320138187763691520) [⁠expression⁠](https://www.youtube.com/watch?v=h714VOr-6nY). ‘Exactly!’ he said.
    
    [](https://gwern.net/scaling-hypothesis#fnref33)
    
34.   [](https://gwern.net/scaling-hypothesis#fn34 "Link to footnote 34")
    
    This connection is more than superficial—a lot of RL work draws on formal analogies to physics and variational principles.[](https://gwern.net/scaling-hypothesis#fnref34)
    

# [Backlinks](https://gwern.net/scaling-hypothesis#backlinks-section "Link to section: § 'Backlinks'")

-   [OpenAI co-founder Sutskever’s new safety-focused AI startup SSI raises $1 billion⁠](https://www.reuters.com/technology/artificial-intelligence/openai-co-founder-sutskevers-new-safety-focused-ai-startup-ssi-raises-1-billion-2024-09-04/):
    
    > [\[backlink context\]⁠](https://www.reuters.com/technology/artificial-intelligence/openai-co-founder-sutskevers-new-safety-focused-ai-startup-ssi-raises-1-billion-2024-09-04/)
    
-   [Can Foundation Models Talk Causality?⁠](https://arxiv.org/abs/2206.10591):
    
    > [\[backlink context\]⁠](https://arxiv.org/abs/2206.10591)
    
-   [GPT-3 Creative Fiction⁠](https://gwern.net/gpt-3) ([⁠full context⁠](https://gwern.net/gpt-3#gwern-scaling-hypothesis)):
    
    > [⁠\[backlink context\]](https://gwern.net/gpt-3)
    
-   [‘small groups’ directory⁠](https://gwern.net/doc/sociology/small-groups/index) ([⁠full context⁠](https://gwern.net/doc/sociology/small-groups/index#gwern-scaling-hypothesis)):
    
    > [⁠\[backlink context\]](https://gwern.net/doc/sociology/small-groups/index)
    
-   [ARPA and SCI: Surfing AI⁠](https://gwern.net/review/arpa) ([⁠full context⁠](https://gwern.net/review/arpa#gwern-scaling-hypothesis)):
    
    > [⁠\[backlink context\]](https://gwern.net/review/arpa)
    
-   [Research Ideas⁠](https://gwern.net/idea) ([⁠full context⁠](https://gwern.net/idea#gwern-scaling-hypothesis)):
    
    > [⁠\[backlink context\]](https://gwern.net/idea)
    
-   [Long-term memory: scaling of information to brain size⁠](https://www.frontiersin.org/journals/human-neuroscience/articles/10.3389/fnhum.2014.00397/full):
    
    > [\[backlink context\]⁠](https://www.frontiersin.org/journals/human-neuroscience/articles/10.3389/fnhum.2014.00397/full)
    
-   [Book Reviews⁠](https://gwern.net/review/book) ([⁠full context⁠](https://gwern.net/review/book#gwern-scaling-hypothesis)):
    
    > [⁠\[backlink context\]](https://gwern.net/review/book)
    
-   [Design Graveyard⁠](https://gwern.net/design-graveyard) ([⁠full context⁠](https://gwern.net/design-graveyard#gwern-scaling-hypothesis)):
    
    > [⁠\[backlink context\]](https://gwern.net/design-graveyard)
    
-   [Towards Benchmarking LLM Diversity & Creativity⁠](https://gwern.net/creative-benchmark) ([⁠full context⁠](https://gwern.net/creative-benchmark#gwern-scaling-hypothesis--blessings-of-scale)):
    
    > [⁠\[backlink context\]](https://gwern.net/creative-benchmark)
    
-   [Absolute Unit NNs: Regression-Based MLPs for Everything⁠](https://gwern.net/aunn) ([⁠full context⁠](https://gwern.net/aunn#gwern-scaling-hypothesis--blessings-of-scale)):
    
    > [⁠\[backlink context\]](https://gwern.net/aunn)
    
-   [Scaling MLPs: A Tale of Inductive Bias⁠](https://arxiv.org/abs/2306.13575):
    
    > [\[backlink context\]⁠](https://arxiv.org/abs/2306.13575)
    
-   [Modular Brain AUNNs for Uploads⁠](https://gwern.net/aunn-brain) ([⁠full context⁠](https://gwern.net/aunn-brain#gwern-scaling-hypothesis--blessings-of-scale)):
    
    > [⁠\[backlink context\]](https://gwern.net/aunn-brain)
    
-   [Free-Play Periods for RL Agents⁠](https://gwern.net/free-play) ([⁠full context⁠](https://gwern.net/free-play#gwern-scaling-hypothesis--blessings-of-scale)):
    
    > [⁠\[backlink context\]](https://gwern.net/free-play)
    
-   [GANs Didn’t Fail, They Were Abandoned⁠](https://gwern.net/gan) ([⁠full context⁠](https://gwern.net/gan#gwern-scaling-hypothesis--blessings-of-scale)):
    
    > [⁠\[backlink context\]](https://gwern.net/gan)
    
-   [Gato: A Generalist Agent⁠](https://arxiv.org/abs/2205.06175#deepmind):
    
    > [\[backlink context\]⁠](https://arxiv.org/abs/2205.06175#deepmind)
    
-   [Chain-of-Thought Prompting Elicits Reasoning in Large Language Models⁠](https://arxiv.org/abs/2201.11903#google):
    
    > [\[backlink context\]⁠](https://arxiv.org/abs/2201.11903#google)
    
-   [Reward is enough⁠](https://www.sciencedirect.com/science/article/pii/S0004370221000862#deepmind):
    
    > [\[backlink context\]⁠](https://www.sciencedirect.com/science/article/pii/S0004370221000862#deepmind)
    
-   [Grokking: Generalization Beyond Overfitting On Small Algorithmic Datasets⁠](https://gwern.net/doc/ai/nn/fully-connected/2021-power.pdf#openai):
    
    > [\[backlink context\]⁠](https://gwern.net/doc/ai/nn/fully-connected/2021-power.pdf#openai)
    
-   [‘LaMDA’ directory⁠](https://gwern.net/doc/ai/nn/transformer/gpt/lamda/index) ([⁠full context⁠](https://gwern.net/doc/ai/nn/transformer/gpt/lamda/index#gwern-scaling-hypothesis--blessings-of-scale)):
    
    > [⁠\[backlink context\]](https://gwern.net/doc/ai/nn/transformer/gpt/lamda/index)
    
-   [GPT-2 Preference Learning for Music Generation⁠](https://gwern.net/gpt-2-preference-learning) ([⁠full context⁠](https://gwern.net/gpt-2-preference-learning#gwern-scaling-hypothesis--blessings-of-scale)):
    
    > [⁠\[backlink context\]](https://gwern.net/gpt-2-preference-learning)
    
-   [‘NN sparsity’ directory⁠](https://gwern.net/doc/ai/nn/sparsity/index) ([⁠full context⁠](https://gwern.net/doc/ai/nn/sparsity/index#gwern-scaling-hypothesis--blessings-of-scale)):
    
    > [⁠\[backlink context\]](https://gwern.net/doc/ai/nn/sparsity/index)
    
-   [‘AI scaling’ directory⁠](https://gwern.net/doc/ai/scaling/index) ([⁠full context⁠](https://gwern.net/doc/ai/scaling/index#gwern-scaling-hypothesis--blessings-of-scale)):
    
    > [⁠\[backlink context\]](https://gwern.net/doc/ai/scaling/index)
    
-   [ARPA and SCI: Surfing AI⁠](https://gwern.net/review/arpa) ([⁠full context⁠](https://gwern.net/review/arpa#gwern-scaling-hypothesis--blessings-of-scale)):
    
    > [⁠\[backlink context\]](https://gwern.net/review/arpa)
    
-   [Research Ideas⁠](https://gwern.net/idea) ([⁠full context⁠](https://gwern.net/idea#gwern-scaling-hypothesis--blessings-of-scale)):
    
    > [⁠\[backlink context\]](https://gwern.net/idea)
    
-   [GPT-3 Creative Fiction⁠](https://gwern.net/gpt-3) ([⁠full context⁠](https://gwern.net/gpt-3#gwern-scaling-hypothesis--it-from-byte)):
    
    > [⁠\[backlink context\]](https://gwern.net/gpt-3)
    
-   [GPT-3 Creative Fiction⁠](https://gwern.net/gpt-3) ([⁠full context⁠](https://gwern.net/gpt-3#gwern-scaling-hypothesis--meta-learning)):
    
    > [⁠\[backlink context\]](https://gwern.net/gpt-3)
    
-   [Is OpenAI OK?⁠](https://www.reddit.com/r/mlscaling/comments/1djoqjh/ilya_sutskever_launches_safe_superintelligence_a/l9uogp9/):
    
    > [\[backlink context\]⁠](https://www.reddit.com/r/mlscaling/comments/1djoqjh/ilya_sutskever_launches_safe_superintelligence_a/l9uogp9/)
    
-   [Reward is enough⁠](https://www.sciencedirect.com/science/article/pii/S0004370221000862#deepmind):
    
    > [\[backlink context\]⁠](https://www.sciencedirect.com/science/article/pii/S0004370221000862#deepmind)
    
-   [Reward is enough⁠](https://www.sciencedirect.com/science/article/pii/S0004370221000862#deepmind):
    
    > [\[backlink context\]⁠](https://www.sciencedirect.com/science/article/pii/S0004370221000862#deepmind)
    

# [Similar Links](https://gwern.net/scaling-hypothesis#similars-section "Link to section: § 'Similar Links'")

-   [Scaling ‘diminishing returns’⁠](https://www.econlib.org/the-importance-of-diminishing-returns/#comment-359000)
    
-   [DALL·E 1: Creating Images from Text: We’ve trained a neural network called DALL·E that creates images from text captions for a wide range of concepts expressible in natural language⁠](https://openai.com/index/dall-e/)
    
-   [Towards Better LLM Creative Writing⁠](https://www.lesswrong.com/posts/34J5qzxjyWr3Tu47L/is-building-good-note-taking-software-an-agi-complete?commentId=WW2uRJdonqEw9krqm#WW2uRJdonqEw9krqm)
    
-   [Predictability and Surprise in Large Generative Models⁠](https://arxiv.org/abs/2202.07785#anthropic)
    
-   [Scaling Language Models: Methods, Analysis & Insights from Training Gopher⁠](https://arxiv.org/abs/2112.11446#deepmind)
    
-   [CT0: Fine-tuned Language Models are Continual Learners⁠](https://arxiv.org/abs/2205.12393)
    
-   [A Solvable Model of Neural Scaling Laws⁠](https://arxiv.org/abs/2210.16859)
    
-   [Scaling Laws for Neural Language Models⁠](https://arxiv.org/abs/2001.08361#openai)
    
-   [Extrapolating GPT-_N_ performance⁠](https://www.alignmentforum.org/posts/k2SNji3jXaLGhBeYP/extrapolating-gpt-n-performance)
    
-   [On the Opportunities and Risks of Foundation Models⁠](https://arxiv.org/abs/2108.07258)
    
-   [You Could’ve Invented Transformers⁠](https://gwern.net/blog/2025/you-could-have-invented-transformers)
    
-   **Search**: [GS⁠](https://scholar.google.com/scholar?q=%22The%20Scaling%20Hypothesis%22 "Reverse citations of this paper in Google Scholar"); [Google⁠](https://www.google.com/search?q=%22The%20Scaling%20Hypothesis%22 "Google search engine hits for ‘The Scaling Hypothesis’."); [site⁠](https://www.google.com/search?q=site:gwern.net+-site:gwern.net/metadata/The%20Scaling%20Hypothesis "Gwern.net site-wide search hits for ‘The Scaling Hypothesis’.")
    

# [Bibliography](https://gwern.net/scaling-hypothesis#link-bibliography-section "Link to section: § 'Bibliography'")

Click to expandClick to expand

[⁠\[Bibliography of links/references used in page\]⁠](https://gwern.net/metadata/annotation/link-bibliography/%252Fscaling-hypothesis.html)

[](https://gwern.net/scaling-hypothesis#fn1)

[1](https://gwern.net/scaling-hypothesis/#sn1)

[](https://gwern.net/scaling-hypothesis#fn2)

[2](https://gwern.net/scaling-hypothesis/#sn2)

[](https://gwern.net/scaling-hypothesis#fn3)

[3](https://gwern.net/scaling-hypothesis/#sn3)

[](https://gwern.net/scaling-hypothesis#fn4)

[4](https://gwern.net/scaling-hypothesis/#sn4)

[](https://gwern.net/scaling-hypothesis#fn5)

[5](https://gwern.net/scaling-hypothesis/#sn5)

[](https://gwern.net/scaling-hypothesis#fn6)

[6](https://gwern.net/scaling-hypothesis/#sn6)

[](https://gwern.net/scaling-hypothesis#fn7)

[7](https://gwern.net/scaling-hypothesis/#sn7)

[](https://gwern.net/scaling-hypothesis#fn8)

[8](https://gwern.net/scaling-hypothesis/#sn8)

[](https://gwern.net/scaling-hypothesis#fn9)

[9](https://gwern.net/scaling-hypothesis/#sn9)

[](https://gwern.net/scaling-hypothesis#fn10)

[10](https://gwern.net/scaling-hypothesis/#sn10)

[](https://gwern.net/scaling-hypothesis#fn11)

[11](https://gwern.net/scaling-hypothesis/#sn11)

[](https://gwern.net/scaling-hypothesis#fn12)

[12](https://gwern.net/scaling-hypothesis/#sn12)

[](https://gwern.net/scaling-hypothesis#fn13)

[13](https://gwern.net/scaling-hypothesis/#sn13)

[](https://gwern.net/scaling-hypothesis#fn14)

[14](https://gwern.net/scaling-hypothesis/#sn14)

[](https://gwern.net/scaling-hypothesis#fn15)

[15](https://gwern.net/scaling-hypothesis/#sn15)

[](https://gwern.net/scaling-hypothesis#fn16)

[16](https://gwern.net/scaling-hypothesis/#sn16)

[](https://gwern.net/scaling-hypothesis#fn17)

[17](https://gwern.net/scaling-hypothesis/#sn17)

[](https://gwern.net/scaling-hypothesis#fn18)

[18](https://gwern.net/scaling-hypothesis/#sn18)

[](https://gwern.net/scaling-hypothesis#fn19)

[19](https://gwern.net/scaling-hypothesis/#sn19)

[](https://gwern.net/scaling-hypothesis#fn20)

[20](https://gwern.net/scaling-hypothesis/#sn20)

[](https://gwern.net/scaling-hypothesis#fn21)

[21](https://gwern.net/scaling-hypothesis/#sn21)

[](https://gwern.net/scaling-hypothesis#fn22)

[22](https://gwern.net/scaling-hypothesis/#sn22)

[](https://gwern.net/scaling-hypothesis#fn23)

[23](https://gwern.net/scaling-hypothesis/#sn23)

[](https://gwern.net/scaling-hypothesis#fn24)

[24](https://gwern.net/scaling-hypothesis/#sn24)

[](https://gwern.net/scaling-hypothesis#fn25)

[25](https://gwern.net/scaling-hypothesis/#sn25)

[](https://gwern.net/scaling-hypothesis#fn26)

[26](https://gwern.net/scaling-hypothesis/#sn26)

[](https://gwern.net/scaling-hypothesis#fn27)

[27](https://gwern.net/scaling-hypothesis/#sn27)

[](https://gwern.net/scaling-hypothesis#fn28)

[28](https://gwern.net/scaling-hypothesis/#sn28)

[](https://gwern.net/scaling-hypothesis#fn29)

[29](https://gwern.net/scaling-hypothesis/#sn29)

[](https://gwern.net/scaling-hypothesis#fn30)

[30](https://gwern.net/scaling-hypothesis/#sn30)

[](https://gwern.net/scaling-hypothesis#fn31)

[31](https://gwern.net/scaling-hypothesis/#sn31)

[](https://gwern.net/scaling-hypothesis#fn32)

[32](https://gwern.net/scaling-hypothesis/#sn32)

[](https://gwern.net/scaling-hypothesis#fn33)

[33](https://gwern.net/scaling-hypothesis/#sn33)

[](https://gwern.net/scaling-hypothesis#fn34)

[34](https://gwern.net/scaling-hypothesis/#sn34)