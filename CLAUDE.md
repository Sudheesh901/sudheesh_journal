# AI/ML Foundations Page — Build Log

## Route
`/foundations/ai-ml` → `src/pages/foundations/ai-ml.astro`

## Status: COMPLETE ✓ — Built 2026-05-19, 240 KB output, 25 pages built in 34s

## Architecture
Same `rm-*` design system as `/foundations/python`.  
Interactive stages: layers → stages → expandable spec items → tabbed detail (Overview · Code · In Production · Interview Q&A).

## Layers & Stages (12 total)

| Layer | ID | Stages | Status |
|---|---|---|---|
| 1 — Problem Framing & Data | `framing` | 01–02 | ✓ |
| 2 — Classical Algorithms | `classical` | 03–04 | ✓ |
| 3 — Evaluation & Generalization | `evaluation` | 05–06 | ✓ |
| 4 — Neural Networks | `neural` | 07–08 | ✓ |
| 5 — Optimization & Training | `optimization` | 09–10 | ✓ |
| 6 — Advanced ML & Workflows | `advanced` | 11–12 | ✓ |

## Nav Change
`src/components/Nav.astro` — AI/ML link updated from `/foundations/ai-ml-research-map` → `/foundations/ai-ml`

## Build
Run `npm run build` (or `npm run dev`) from `D:\sudheeshKR website\journal\`.

---

# Statistics & Experimentation Page

## Route
`/foundations/statistics` → `src/pages/foundations/statistics.astro`

## Status: COMPLETE ✓ — Built 2026-05-19, 318 KB output, 26 pages built in 19s

## Page Objectives
- **Audience**: DS/AI career aspirants — from beginner to working engineer
- **Tone**: Sequential (concepts build on each other), detailed enough for beginners
- **Interlinking**: Every stage explicitly connects the stat concept to an AI/ML algorithm or workflow
- **Math**: Show formulas explicitly inline in Overview — notation like E[X] = Σ xᵢ·P(xᵢ)
- **Use cases**: Real DS/AI examples at every stage (not generic textbook examples)

## Tab Structure (ADAPTED from Python/AI-ML pages)
Four tabs per spec item — same interactive UI, new labels:

| Tab | Purpose |
|---|---|
| **Overview** | Concept explanation + explicit math formula/notation + beginner-friendly intuition |
| **Code** | scipy.stats / statsmodels / numpy — fully runnable, no pseudocode |
| **In DS & AI** | ML interlinking, use cases, practical patterns, common traps in real DS/AI work |
| **Interview Q&A** | Min 2 questions per item — mix of conceptual and applied |

> "In DS & AI" replaces "In Production" because statistics needs to show direct mapping to
> ML algorithms, loss functions, experiment design, and model diagnostics.
> e.g. MLE → cross-entropy loss; CLT → why batch gradients work; t-test → comparing model AUCs.

## Architecture
Same `rm-*` design system as Python and AI/ML pages.
Tools shown as pills: scipy.stats · statsmodels · numpy · pandas · pingouin · matplotlib

## Layers & Stages (12 total)

| Stage | Layer | ID | Topics | ML Interlinks |
|---|---|---|---|---|
| 01 | Probability Foundations | `probability` | Probability axioms, random variables, PMF/PDF/CDF, E[X], Var(X) | Likelihood functions, generative models, Naive Bayes |
| 02 | Probability Foundations | `probability` | Key distributions: Normal, Binomial, Poisson, Exponential, Beta | Weight init (He/Xavier), label noise models, priors in MAP/Bayesian opt |
| 03 | Sampling & CLT | `sampling` | Descriptive stats, moments, skewness, kurtosis, outlier impact | Feature EDA, data quality checks, understanding model input distributions |
| 04 | Sampling & CLT | `sampling` | Law of Large Numbers, Central Limit Theorem, standard error, bootstrap | Why SGD works, BatchNorm justification, CI on model metrics |
| 05 | Estimation | `estimation` | Confidence intervals (z, t), interpretation, margin of error | CI on AUC/F1, uncertainty in model comparison, error bars on metrics |
| 06 | Estimation | `estimation` | MLE derivation, log-likelihood, MAP estimation, Bayesian credible intervals | Cross-entropy = MLE for classification; MSE = MLE for Gaussian; L2 reg = MAP |
| 07 | Hypothesis Testing | `testing` | Null/alt hypothesis, p-value (correct meaning), Type I/II errors, t-tests | Comparing two model versions, feature importance significance |
| 08 | Hypothesis Testing | `testing` | Chi-squared, Mann-Whitney U, power analysis, sample size, FDR correction | Ablation study design, feature selection testing, multiple metric correction |
| 09 | Experimentation | `experimentation` | A/B test design: randomisation, MDE, duration, guardrail metrics, novelty effect | Online model evaluation, treatment/control in recommendation systems |
| 10 | Experimentation | `experimentation` | Sequential testing, peeking problem, multi-armed bandits vs A/B | Epsilon-greedy, Thompson sampling, explore-exploit in RL and RecSys |
| 11 | Causal Inference | `causal` | Correlation vs causation, DAGs, confounders, collider bias, d-separation | Spurious features, feedback loop bias, selection bias in logged training data |
| 12 | Causal Inference | `causal` | Diff-in-Diff, Instrumental Variables, CUPED; metric design & Goodhart's Law | Treatment effect models, variance reduction in A/B, metric stack for AI products |

## Diagrams to Include (ASCII / inline text-art in Overview panes)
- Stage 01: Venn diagram for P(A∪B) = P(A) + P(B) − P(A∩B)
- Stage 02: Bell curve with μ ± 1σ/2σ/3σ labelled (68–95–99.7 rule)
- Stage 04: CLT simulation — skewed population → normal sampling distribution
- Stage 05: 20 confidence intervals — ~19 covering true mean (95% CI visualised)
- Stage 06: Log-likelihood surface with MLE maximum marked
- Stage 07: Type I/II error regions on overlapping null/alt distributions
- Stage 08: Power curve — effect size vs power at fixed α=0.05
- Stage 09: A/B test timeline: randomise → expose → measure → decide
- Stage 11: DAG showing X→Y with confounder Z→X, Z→Y

## Build Sub-tasks (3 coding sessions)

### Task A — Scaffold + Layers 1 & 2 (Stages 01–04)  [STATUS: complete ✓]
- Create `src/pages/foundations/statistics.astro`
- Full page scaffold: hero, tool pills, stage index nav, BaseLayout
- Layer 1 — Probability Foundations (stages 01–02)
- Layer 2 — Sampling & CLT (stages 03–04)

### Task B — Layers 3 & 4 (Stages 05–08)  [STATUS: complete ✓]
- Layer 3 — Estimation (stages 05–06)
- Layer 4 — Hypothesis Testing (stages 07–08)

### Task C — Layers 5 & 6 + CSS/JS + Nav (Stages 09–12)  [STATUS: complete ✓]
- Layer 5 — Experimentation (stages 09–10)
- Layer 6 — Causal Inference (stages 11–12)
- CSS: 6 layer-colour overrides
- JS: rmToggle / rmTab / rmQA / scroll-reveal (same as Python/AI-ML)
- Nav: `/foundations/statistics-experimentation` → `/foundations/statistics`

## Files
- New:      `src/pages/foundations/statistics.astro`
- Keep:     `src/content/foundations/statistics-experimentation.mdx` (do not delete)
- Nav:      `src/components/Nav.astro` — Foundations dropdown, Statistics link

## Content Rules
1. Every stage intro opens with a real DS/AI scenario where this stat concept matters
2. Math shown as plain-text notation in Overview: E[X] = Σ xᵢ·P(xᵢ), not just prose
3. Code tab: fully runnable scipy/statsmodels/numpy — no pseudocode
4. In DS & AI tab: at least one named ML algorithm or workflow linked per spec item
5. Interview Q&A: min 2 questions per spec item, one conceptual + one applied
