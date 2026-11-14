---
title: Looking for market cycles in IHSG with Fourier analysis
category: self
date: "2026"
type: Signal processing, AI-assisted exploration
lenses: [engineer, product]
summary: An exploration with Gemini of whether gold and the Indonesian stock index (IHSG) move in repeating cycles, applying the signal-processing methods I learned in biomedical engineering, and questioning the model at every step.
engineerLine: Detrending, DFT, FIR low-pass filtering and a 4-sinusoid reconstruction, moving to log-price space when a linear trend distorted the spectrum.
productLine: Separates what a cycle model can support, long-term regime positioning, from what it can't, short-term timing.
role: Self-directed exploration with Gemini. The analysis has not yet been reproduced in my own code.
stack: [Fourier transform (DFT), FIR filtering, Detrending, Gemini]
thumbnail: ../../assets/media/market-cycles/decomposition.png
thumbnailAlt: Illustration, not real data, of a price series broken into a rising trend, smooth cycles and noise.
featured: false
order: 5
attachments:
  - { type: link, label: Gemini conversation, href: "https://share.gemini.google/ypLPjiHsn7zG" }
---

<div data-for="engineer">

## Approach

I started with one year of gold prices and asked whether a trend hides a cycle. From there the analysis widened step by step:

1. **Longer windows.** One year showed a downtrend; five, twenty and thirty-six years told different stories. The window length changes the conclusion.
2. **Remove the trend, then look at frequencies.** Subtract a fitted trend, then use the discrete Fourier transform to see which cycle lengths carry the most energy.
3. **Switch to IHSG** (annual closes, 1998–2026), where crashes such as 2008 make the signal far noisier than gold.
4. **Filter the noise.** A small FIR low-pass filter smooths single-year shocks without assuming the whole series repeats.
5. **Convert frequency to period** (T = 2π/ω) for each component, then rebuild the signal from the four strongest sinusoids.
6. **Move to log prices.** A straight-line trend on exponential growth leaves a large artificial arch; detrending ln(price) fixed most of it.

## Where I pushed back

The value of this exercise was in the questions, not in accepting the first chart:

- **Deterministic or stochastic?** I asked whether the model was treating IHSG as a perfectly repeating wave or adapting to random shocks. That led to filtering instead of a pure Fourier fit.
- **Is the 29-year cycle real?** It isn't. The slowest Fourier component is always the length of the data window, so a 29-year dataset always "finds" a 29-year cycle.
- **Does IHSG consist of 4 sine waves?** No. A 29-point series has 14 frequency components, and the first four carried well under half of the filtered variance.

## What I learned

- Window length, trend choice and sampling rate shape the spectrum as much as the market does. With annual data, nothing shorter than a 2-year cycle can be seen at all.
- Market crashes act like impulses and spread energy across many frequencies, which is why IHSG looks noisier than gold.
- In log space, Gemini's analysis placed a roughly 7-year cycle as the strongest component after the window-length arch. That is close to the classic 6–8 year business cycle, but I treat it as a hypothesis until I reproduce it.

## Limits

All figures came from Gemini's own calculations on data it retrieved. I have not yet checked the data or reproduced the numbers in code, and Gemini itself warns that it can be inaccurate. The next step is a Python notebook using quarterly data, so shorter cycles become visible.

</div>

<div data-for="product">

## Question

Do gold and IHSG move in cycles regular enough to tell which phase the market is in?

## What a cycle model can and cannot tell you

- **Can:** describe broad regimes, for example whether IHSG sits in a multi-year expansion or a consolidation relative to its long-run trend.
- **Cannot:** time the market. Single-year shocks dominate short-term moves, and a Fourier model cannot tell a temporary trough from a permanent change in the growth rate. That still needs macro fundamentals such as central bank policy, the rupiah and foreign capital flows.

## Why it is on this site

It shows how I work with AI tools: I use them to move fast, but I question the assumptions behind each answer, and I keep unverified output labeled as such.

</div>
