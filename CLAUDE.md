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

---

# Deep Learning Systems Page

## Route
`/foundations/deep-learning-systems` → `src/pages/foundations/deep-learning-systems.astro`

## Status: COMPLETE ✓ — All 12 stages built 2026-05-19, 27 pages, 14.62s.

## Pre-existing file
`src/content/foundations/deep-learning-systems.mdx` — MDX stub currently served via `src/pages/foundations/[slug].astro`.
The new `.astro` page takes over the same URL automatically (static page wins over dynamic `[slug]`).
**Do NOT delete the MDX file** — it may be referenced elsewhere.

## Architecture
Same `rm-*` design system as Python / AI-ML / Statistics pages.
Copy the scaffold (hero, tool pills, stage-index nav, layer headers, JS functions) from `src/pages/foundations/statistics.astro` and adapt.

## Tab Labels
| Tab | Purpose |
|---|---|
| **Overview** | Concept + math/notation + beginner-friendly intuition |
| **Code** | PyTorch (primary) — fully runnable, no pseudocode |
| **In Production** | Real engineering patterns: scaling, memory, deployment, debugging |
| **Interview Q&A** | Min 2 questions per item — one conceptual + one applied |

> "In Production" (same as AI-ML page) fits DL better than "In DS & AI" because
> the content is engineering-heavy: GPU memory, mixed precision, model serving, quantization.

## Tool Pills
PyTorch · JAX · HuggingFace Transformers · PEFT · bitsandbytes · ONNX · TensorRT · WandB · torchvision

## Layers & Stages (12 total)

| Stage | Layer | ID | Core Topics | Production Angle |
|---|---|---|---|---|
| 01 | Neural Net Foundations | `foundations` | Perceptron → MLP, forward pass, activation fns (ReLU/GELU/sigmoid/tanh), universal approximation | Activation choice impact on training speed; dead ReLU problem |
| 02 | Neural Net Foundations | `foundations` | Backprop, chain rule, computational graphs, autograd (torch.autograd) | Debugging gradient flow; `retain_graph`, `detach()` patterns |
| 03 | Training Mechanics | `training` | Loss functions (MSE, cross-entropy, BCE, focal, contrastive/triplet), gradient flow, vanishing/exploding gradients | Loss selection per task; gradient clipping in practice |
| 04 | Training Mechanics | `training` | Optimizers (SGD+momentum, Adam, AdamW, Lion), LR schedules (cosine, warmup, cyclic), weight decay | AdamW vs Adam for LLM fine-tuning; 1-cycle policy |
| 05 | Regularization & Init | `regularization` | BatchNorm, LayerNorm, GroupNorm; dropout, weight decay; He/Xavier/orthogonal init | BN pitfalls with small batch; LN in Transformers; init impact on convergence |
| 06 | Regularization & Init | `regularization` | Data augmentation (flip, crop, colour jitter), mixup, cutmix, label smoothing; early stopping, learning curves | Augmentation pipelines with `torchvision.transforms.v2`; WandB learning curves |
| 07 | Architectures | `architectures` | CNNs: convolutions, pooling, receptive field, ResNet skip connections, EfficientNet scaling; transfer learning | Feature extraction vs full fine-tune; torchvision pretrained models |
| 08 | Architectures | `architectures` | Transformers: scaled dot-product attention, multi-head attention, positional encoding, encoder/decoder; BERT vs GPT paradigm | Attention memory O(n²); Flash Attention motivation |
| 09 | Training at Scale | `scale` | Mixed precision (FP16/BF16, `torch.autocast`), gradient accumulation, DDP vs FSDP; memory optimisation (activation checkpointing, `torch.compile`) | Multi-GPU setup with `torchrun`; memory profiling with `torch.cuda.memory_summary` |
| 10 | Efficient Fine-tuning | `scale` | LoRA (low-rank decomposition), QLoRA (4-bit + LoRA), adapter layers, prefix tuning; PEFT library | When LoRA rank matters; merging adapters back; `bitsandbytes` quantization |
| 11 | Model Compression | `deployment` | Quantization (INT8, INT4, GPTQ, AWQ), pruning (magnitude/structured), knowledge distillation; ONNX export, TorchScript | `torch.quantization` API; ONNX → TensorRT pipeline; latency benchmarking |
| 12 | Training Stability & MLOps | `deployment` | Gradient debugging (grad norms, loss spikes, NaN detection), hyperparameter sweeps (WandB Sweeps), experiment tracking, reproducibility (seeds, determinism) | WandB integration; `torch.backends.cudnn.deterministic`; checkpoint strategy |

## Diagrams to Include (ASCII in Overview panes)
- Stage 01: MLP diagram — input → hidden layers → output with activation labels
- Stage 02: Computational graph for `z = x·w + b`, `L = (z−y)²` with gradient arrows
- Stage 03: Vanishing gradient illustration — gradient magnitude per layer (bar chart)
- Stage 04: Loss curve comparison — SGD vs Adam vs AdamW on same task
- Stage 05: BatchNorm vs LayerNorm normalisation axes (batch × features grid)
- Stage 07: ResNet skip connection diagram — `F(x) + x`
- Stage 08: Attention matrix heatmap (Q·Kᵀ/√d) + softmax → weighted V
- Stage 09: GPU memory breakdown — parameters + gradients + activations + optimizer states
- Stage 10: LoRA decomposition — W = W₀ + BA where rank(BA) ≪ rank(W₀)
- Stage 11: Quantization: FP32 → INT8 bucket mapping with scale/zero-point

## Critical Build Note — JS Template Literal Escape
Python f-strings like `print(f"Loss = {loss:.4f}")` inside JS backtick template literals
**must** be escaped: `\${loss:.4f}`. Failure to escape causes Astro build error:
`Expected "}" but found ":"` at the f-string format spec colon.
Apply this proactively to every Python code block that uses f-strings with format specs.

## Build Sub-tasks (3 coding sessions)

### Task A — Scaffold + Layers 1 & 2 (Stages 01–04)  [STATUS: complete ✓]
- Create `src/pages/foundations/deep-learning-systems.astro`
- Full scaffold: hero, tool pills, stage index nav, BaseLayout, CSS layer colours, JS (rmToggle/rmTab/rmQA/scroll-reveal)
- Layer 1 — Neural Net Foundations (stages 01–02)
- Layer 2 — Training Mechanics (stages 03–04)

### Task B — Layers 3 & 4 (Stages 05–08)  [STATUS: complete ✓]
- Layer 3 — Regularization & Init (stages 05–06)
- Layer 4 — Architectures (stages 07–08)

### Task C — Layers 5 & 6 + Nav (Stages 09–12)  [STATUS: complete ✓]
- Layer 5 — Training at Scale (stages 09–10)
- Layer 6 — Model Compression & MLOps (stages 11–12)
- Nav: verify `/foundations/deep-learning-systems` link in `src/components/Nav.astro`

## Files
- New:   `src/pages/foundations/deep-learning-systems.astro`
- Keep:  `src/content/foundations/deep-learning-systems.mdx` (do not delete)
- Nav:   `src/components/Nav.astro` — Foundations dropdown, Deep Learning link (likely already correct URL)

## Content Rules
1. Every stage opens with a concrete engineering scenario (e.g. "Your ResNet is converging slowly — here's why init matters")
2. Math in Overview uses plain-text notation: ∂L/∂w = ∂L/∂ŷ · ∂ŷ/∂w, not just prose
3. Code tab: PyTorch primary, fully runnable — define model/data inline, no `# ... rest of code`
4. In Production: name real tools/flags (e.g. `torch.compile`, `FSDP`, `bitsandbytes`) with realistic code
5. Interview Q&A: min 2 questions per spec item — one conceptual ("why does X happen?") + one applied ("how would you debug Y?")

---

# Data & Databases for AI Page

## Route
`/ai-engineering/data-databases` → `src/pages/ai-engineering/data-databases.astro`

## Status: COMPLETE ✓ — All 12 stages built 2026-05-20, 27 pages, 19.36s.

## Pre-existing file
`src/content/ai-engineering/data-databases.mdx` — MDX stub served via `[slug].astro`.
New `.astro` page takes over the URL. **Do NOT delete the MDX file.**

## Architecture
Copy the `lnlp-*` design system from `src/pages/ai-engineering/llms-nlp.astro`.
Rename every CSS class prefix `lnlp-` → `ddb-` in both the HTML template and `<style is:global>` block.
Rename every JS function prefix `lnlp` → `ddb` (e.g. `ddbToggle`, `ddbTab`, `ddbQA`).
Data structure per point: `{ overview, code: {label, lines}, pitfalls: [{issue, context, fix}], qa: [{q, a}] }`
Same layer → stage → point nesting as all other pages.

## Tool Pills
PostgreSQL · pgvector · Redis · DuckDB · S3 · Qdrant · Airflow · dbt · Great Expectations

## Layers & Stages (12 total)

| Stage | Layer | ID | Core Topics |
|---|---|---|---|
| 01 | Relational Databases | `relational` | ACID, B-tree/GIN/BRIN indexes, JSONB, row-level security, connection pooling (PgBouncer) |
| 02 | Relational Databases | `relational` | EXPLAIN ANALYZE, slow query patterns, N+1, upsert / RETURNING, pg_stat_statements, vacuum |
| 03 | Vector Stores | `vector` | HNSW vs IVFFlat, ANN accuracy/speed tradeoff, pgvector setup, Qdrant/Weaviate comparison |
| 04 | Vector Stores | `vector` | Retrieval data model: chunk schema, embedding model versioning, metadata filtering, ACL, hybrid search (BM25 + dense) |
| 05 | Caching & Queues | `cache` | Redis data structures (sorted sets, hashes, streams, HyperLogLog), caching patterns (cache-aside, write-through, write-behind), TTL, eviction policies (LRU, LFU) |
| 06 | Caching & Queues | `cache` | Message queues: Redis Streams vs Kafka vs SQS; consumer groups, at-least-once vs exactly-once, dead-letter queues, backpressure |
| 07 | Data Pipelines | `pipelines` | ETL vs ELT, Airflow DAGs, idempotent transforms, CDC (change data capture), backfill strategies, dependency management |
| 08 | Data Pipelines | `pipelines` | Feature stores: online (Redis) vs offline (S3/DuckDB); point-in-time correctness, training-serving skew, Feast basics |
| 09 | Analytical Stores | `analytical` | OLAP & columnar: DuckDB, BigQuery, Snowflake; columnar storage, partitioning, materialized views, cost-based optimisation |
| 10 | Analytical Stores | `analytical` | Lakehouses: S3 + Delta Lake / Iceberg; open table formats, ACID on object storage, time travel, schema evolution, medallion architecture |
| 11 | Data Quality | `quality` | Schema validation (Great Expectations, Pydantic), data contracts, anomaly detection, freshness SLAs, null / cardinality checks |
| 12 | Data Quality | `quality` | Data observability & lineage: lineage DAGs, column-level lineage, impact analysis, cost attribution, OpenLineage, data versioning |

## Build Sub-tasks (3 coding sessions)

### Task A — Scaffold + Layers 1 & 2 (Stages 01–04)  [STATUS: complete ✓]
- Create `src/pages/ai-engineering/data-databases.astro`
- Full scaffold: hero, tool pills, stage-index nav, BaseLayout, CSS (`ddb-*`), JS (`ddbToggle/ddbTab/ddbQA/scroll-reveal`)
- Layer 1 — Relational Databases (stages 01–02)
- Layer 2 — Vector Stores (stages 03–04)

### Task B — Layers 3 & 4 (Stages 05–08)  [STATUS: complete ✓]
- Layer 3 — Caching & Queues (stages 05–06)
- Layer 4 — Data Pipelines (stages 07–08)

### Task C — Layers 5 & 6 (Stages 09–12)  [STATUS: complete ✓]
- Layer 5 — Analytical Stores (stages 09–10)
- Layer 6 — Data Quality & Observability (stages 11–12)
- Nav: `/ai-engineering/data-databases` already correct in `src/components/Nav.astro`

## Files
- New:   `src/pages/ai-engineering/data-databases.astro`
- Keep:  `src/content/ai-engineering/data-databases.mdx` (do not delete)
- Nav:   already correct — no change needed

## Content Rules
1. Every stage intro opens with a real AI/data engineering scenario (e.g. "Your RAG system returns stale embeddings after re-indexing — here's why versioning matters")
2. Code tab: Python, SQL, or YAML — fully runnable snippets (no pseudocode); use psycopg2, redis-py, airflow, duckdb, great_expectations
3. Pitfalls: 2 per spec item — one silent failure mode + one ops trap, each with concrete fix
4. Interview Q&A: min 2 per item — mix of conceptual and applied (e.g. "When would you use pgvector vs Qdrant?" / "Your vector search latency spiked overnight — how do you debug?")
5. Connect every topic to AI/ML context: e.g. partitioning → faster training data queries; connection pooling → LLM API request fan-out

---

# MLOps Page

## Route
`/ai-engineering/mlops` → `src/pages/ai-engineering/mlops.astro`

## Status: NOT STARTED

## Pre-existing file
`src/content/ai-engineering/mlops-llmops.mdx` — MDX stub (old combined route). **Do NOT delete.**
New `.astro` page at `/ai-engineering/mlops` takes its own route independently.

## Architecture
Same `lnlp-*` copy-and-rename pattern. Use prefix `mlo-` throughout:
CSS classes: `mlo-*`, JS functions: `mloToggle`, `mloTab`, `mloQA`.
Data structure per point: `{ overview, code: {label, lines}, pitfalls: [{issue, context, fix}], qa: [{q, a}] }`
Same layer → stage → point nesting as all other pages.

## Tab Labels
| Tab | Purpose |
|---|---|
| **Overview** | Concept + architecture + real production decisions + key formulas/thresholds |
| **Code** | Python, YAML, bash — fully runnable; MLflow API calls, GitHub Actions YAML, K8s manifests |
| **In Production** | Real failure modes, war-story patterns, tooling trade-offs, org-level challenges |
| **Interview Q&A** | Min 2 per item — one "how does X work?" + one "how would you handle Y incident?" |

## Tool Pills
MLflow · DVC · Airflow · Docker · Kubernetes · GitHub Actions · Prometheus · Grafana · Feast · BentoML

## Layers & Stages (12 total)

| Stage | Layer | ID | Core Topics |
|---|---|---|---|
| 01 | Experiment Tracking | `tracking` | MLflow architecture (tracking server, artifact store, model registry); run logging (params, metrics, artifacts, tags); nested runs; autologging; comparing runs programmatically; MLflow Projects for reproducible training |
| 02 | Experiment Tracking | `tracking` | DVC: data versioning (`.dvc` pointer files, remote storage on S3/GCS), `dvc.yaml` pipeline stages, `params.yaml`, `dvc repro`, `dvc diff`, experiment branches; DVC + MLflow integration for full reproducibility |
| 03 | CI/CD for ML | `cicd` | ML pipeline gates: data validation → train → evaluate → compare → promote; GitHub Actions ML workflow (trigger on data push, schedule); automated model regression on golden sets; promotion criteria (AUC delta threshold, latency SLA); rollback triggers |
| 04 | CI/CD for ML | `cicd` | Docker for ML: multi-stage builds (build-time deps vs slim runtime), CUDA base images, layer caching; Kubernetes: GPU node pools (`nvidia.com/gpu` limits), tolerations, Job/CronJob for training, HPA vs KEDA for inference autoscaling; Helm chart basics |
| 05 | Deployment Patterns | `deployment` | Shadow mode (zero user impact, dual-write comparison), canary (5%→20%→100% with automated metric gates), blue-green (instant rollback), A/B with statistical significance gate; feature flags (LaunchDarkly) for model versions; automated rollback on error rate spike |
| 06 | Deployment Patterns | `deployment` | Inference serving: TorchServe, Triton Inference Server (model ensemble, dynamic batching config, gRPC), BentoML, Ray Serve (autoscaling policies, replica placement); REST vs gRPC latency trade-off; model warm-up strategies; streaming inference (SSE); cold-start mitigation |
| 07 | Monitoring & Observability | `monitoring` | 4-layer monitoring stack: infra (CPU/GPU utilisation, memory), data (schema drift, null rate), model (score distribution, confidence histogram, AUC on labeled sample), product (CTR, revenue impact); Prometheus + Grafana + OpenTelemetry; SLO/SLI definitions; error budget tracking; alerting rules and PagerDuty runbooks |
| 08 | Drift & Retraining | `drift` | Data drift detection: PSI (threshold 0.2), KS test (p < 0.05), chi-square for categoricals; concept drift (performance decay on labeled holdout window); covariate shift; embedding drift (cosine centroid distance); automated retraining triggers; continuous training vs scheduled retraining trade-off; champion-challenger model swap |
| 09 | Feature Stores | `features` | Feast architecture: feature registry, offline store (S3/BigQuery), online store (Redis), materialization jobs; point-in-time correctness and `entity_df` with `event_timestamp`; feature serving latency SLOs; TTL for online store; backfilling historical features; training-serving skew root cause debugging |
| 10 | Training Pipelines | `pipelines` | Airflow DAGs for ML training: sensor → validate → featurize → train → evaluate → register; incremental feature computation; Great Expectations checkpoint as blocking gate; schema drift handling; SageMaker Pipelines / Vertex AI Pipelines comparison; distributed training orchestration (PyTorch DDP via Kubernetes Job) |
| 11 | Reliability & Resilience | `reliability` | Multi-region model serving; circuit breakers (timeout → rule-based fallback); bulkhead pattern (separate pools per tenant); retry with exponential backoff + jitter; graceful degradation; SLA breach response playbook; chaos testing ML inference (inject latency, kill pods); blast radius analysis for model update rollouts |
| 12 | Governance & Compliance | `governance` | Model cards (intended use, training data provenance, eval results, limitations, known biases); fairness audits (disparate impact ratio, demographic parity, equal opportunity); bias detection tooling (Fairlearn, AI Fairness 360); GDPR compliance (right to explanation, training data erasure requests); EU AI Act high-risk system classification; audit log requirements; responsible AI checklist |

## Build Sub-tasks (3 coding sessions)

### Task A — Scaffold + Layers 1 & 2 (Stages 01–04)  [STATUS: not started]
- Create `src/pages/ai-engineering/mlops.astro`
- Full scaffold: hero, tool pills, stage-index nav, BaseLayout, CSS (`mlo-*`), JS (`mloToggle/mloTab/mloQA/scroll-reveal`)
- Layer 1 — Experiment Tracking & Reproducibility (stages 01–02)
- Layer 2 — CI/CD for ML (stages 03–04)

### Task B — Layers 3 & 4 (Stages 05–08)  [STATUS: not started]
- Layer 3 — Deployment Patterns (stages 05–06)
- Layer 4 — Monitoring, Observability & Drift (stages 07–08)

### Task C — Layers 5 & 6 (Stages 09–12)  [STATUS: not started]
- Layer 5 — Feature Stores & Training Pipelines (stages 09–10)
- Layer 6 — Reliability & Governance (stages 11–12)
- Nav: `/ai-engineering/mlops` updated in `src/components/Nav.astro`

## Files
- New:   `src/pages/ai-engineering/mlops.astro`
- Keep:  `src/content/ai-engineering/mlops-llmops.mdx` (do not delete)
- Nav:   `src/components/Nav.astro` — update MLOps link from `/ai-engineering/mlops-llmops` → `/ai-engineering/mlops`

## Content Rules
1. Every stage intro opens with a real production incident or decision (e.g. "A model was promoted to production without a golden-set regression check — latency SLA was breached within 10 minutes")
2. Code must be fully runnable: MLflow Python API, GitHub Actions YAML, Dockerfile, Kubernetes manifests, Airflow DAG — no pseudocode, no `# ... rest of code`
3. Pitfalls: 2 per spec item — one silent failure mode (hard to detect) + one process/org trap with a concrete fix
4. Interview Q&A: go deep — interviewers at FAANG/AI-first companies ask follow-up "what if X fails" and "how would you handle 10x scale" — answers must address those angles
5. Numbers matter: give real thresholds (PSI > 0.2, p99 < 200ms, AUC delta 0.005), not just concepts
6. Every stage connects to business impact: model drift → revenue drop; slow inference → user churn; governance failure → regulatory fine

---

# LLMOps Page

## Route
`/ai-engineering/llmops` → `src/pages/ai-engineering/llmops.astro`

## Status: NOT STARTED

## Pre-existing file
None — this is a new page with no existing MDX stub.

## Architecture
Same `lnlp-*` copy-and-rename pattern. Use prefix `llo-` throughout:
CSS classes: `llo-*`, JS functions: `lloToggle`, `lloTab`, `lloQA`.
Data structure per point: `{ overview, code: {label, lines}, pitfalls: [{issue, context, fix}], qa: [{q, a}] }`
Same layer → stage → point nesting as all other pages.

## Tab Labels
| Tab | Purpose |
|---|---|
| **Overview** | Concept + architecture + production decision framework + key metrics/thresholds |
| **Code** | Python — LangChain, LiteLLM, LangSmith, vLLM, PEFT, OpenAI SDK; fully runnable |
| **In Production** | Real-world failure modes unique to LLMs; war stories; tooling comparison; org challenges |
| **Interview Q&A** | Min 2 per item — deep, follow-up-aware answers; covers "design a system" + "debug this incident" formats |

## Tool Pills
LangChain · LiteLLM · LangSmith · vLLM · PEFT · RAGAS · Axolotl · Arize · NeMo Guardrails · Weights & Biases

## Layers & Stages (12 total)

| Stage | Layer | ID | Core Topics |
|---|---|---|---|
| 01 | Prompt Management | `prompts` | Prompt versioning (git-versioned YAML templates, LangSmith Hub, PromptLayer); semantic versioning for prompts; A/B testing prompt variants with statistical gates; few-shot example stores (retrieval-augmented few-shot); system prompt design patterns; prompt regression testing in CI; injection defense (instruction hierarchy, sandwich defense, canary tokens) |
| 02 | Prompt Management | `prompts` | Context window management: token budget allocation (system/history/retrieved context/response); dynamic truncation strategies (recency-weighted, importance-scored); conversation memory patterns (buffer, summary, entity, vector-store memory); lost-in-the-middle phenomenon; context compression (LLMLingua, Selective Context); sliding window for long docs; token counting before API call |
| 03 | LLM Serving Infrastructure | `serving` | Self-hosted LLM serving: vLLM (PagedAttention, continuous batching, tensor parallelism config, AWQ/GPTQ quantized models); TGI (HuggingFace); Triton + FasterTransformer; KV cache sizing; GPU memory calculator (model weights + KV cache + activations); throughput vs latency trade-off; speculative decoding; multi-GPU tensor parallelism (`tensor_parallel_size`); latency SLO for streaming (TTFT, TPOT, E2E) |
| 04 | Cost Optimisation | `cost` | Token cost accounting: per-request logging (model, input_tokens, output_tokens, cost, user_id, feature); user-level and feature-level attribution; semantic caching (GPTCache, Redis with cosine similarity gate); exact caching for deterministic prompts; prompt compression before API call; model routing (small model for intent classification, large for generation); budget enforcement (daily spend alerts, per-user hard limits); ROI modelling for LLM features |
| 05 | RAG Operations | `rag` | Chunking strategy production decisions: chunk size vs retrieval precision trade-off (512 tokens sweet spot, 128-token overlap); semantic chunking vs fixed-size; embedding model versioning (v1→v2 migration: dual-index strategy, gradual traffic shift); index lifecycle (rebuild triggers, incremental updates, stale embedding detection); retrieval quality monitoring (recall@5, MRR, latency p99); hybrid search tuning (BM25 α weight, RRF k parameter); metadata filter pushdown performance |
| 06 | RAG Evaluation | `rag` | RAGAS metrics in depth: faithfulness (claims supported by context), answer relevancy (response addresses query), context precision (relevant chunks ranked first), context recall (all relevant facts retrieved), answer correctness; LLM-as-judge for groundedness scoring; hallucination rate tracking (fact-check pipeline); citation accuracy; production eval pipeline triggered on every index update; regression on golden Q&A pairs in CI; building eval datasets from production logs (cluster similar queries, sample hard negatives) |
| 07 | LLM Observability | `observability` | LangSmith trace anatomy: chain → LLM → tool spans; token usage per span; latency breakdown (queue, prompt processing, generation, postprocess); cost per span; feedback tagging (thumbs up/down → label store); Arize AI (embedding drift, prediction monitoring); structured log schema (request_id, session_id, model_version, prompt_hash, token_count, latency_ms, cost_usd); PII detection before logging; output anomaly detection (response length outliers, language detection, toxicity signals); A/B experiment tagging in traces |
| 08 | Evaluation Frameworks | `evaluation` | Offline eval pipeline: pytest-based golden dataset fixture, LLM-as-judge scoring function, per-metric threshold gates; RAGAS eval suite automation; prompt regression CI step (run evals on every prompt YAML change); eval-driven development workflow (write evals before changing prompts); building eval datasets from production (cluster queries → sample → annotate → label); human eval calibration (annotator agreement, IAA score); eval metrics dashboard (per-model, per-prompt-version, over time); cost of evaluation at scale |
| 09 | Fine-tuning Pipelines | `finetuning` | Instruction tuning dataset formats (ShareGPT, Alpaca, ChatML); DPO pair creation from preference data; LoRA/QLoRA training pipeline with Axolotl or LLaMA-Factory (config YAML, data loader, PEFT checkpoint management); fine-tune evaluation (MT-Bench, task-specific golden sets, perplexity on held-out set); adapter versioning and merging back to base (`merge_and_unload`); continual fine-tuning without catastrophic forgetting; SFT → DPO two-stage pipeline; quantization after fine-tuning (GGUF, AWQ) |
| 10 | RLHF & Alignment | `alignment` | Preference data collection at scale: labeling guidelines, inter-annotator agreement, quality filtering (skip low-confidence pairs); reward model training (Bradley-Terry formulation, reward hacking prevention, reward normalisation); PPO in practice: KL penalty tuning, reward clipping, value function stabilisation; DPO advantages (no reward model, training stability, memory efficiency); RLAIF (AI feedback as substitute for human labels); iterative alignment cycles; Constitutional AI (self-critique and revision); safety fine-tuning; red-teaming pipeline (adversarial prompt generation, model response audit) |
| 11 | Guardrails & Safety | `guardrails` | Prompt injection defence: classifier-based detection (fine-tuned RoBERTa), instruction hierarchy (system > user > tool), canary token insertion and detection, sandboxed tool call execution; output filtering pipeline: Llama Guard (meta-llama/Meta-Llama-Guard), NeMo Guardrails (topical rails, fact-check rails, jailbreak rails), custom toxicity classifiers; PII masking before logging (presidio); jailbreak detection (embedding similarity to known attacks); rate limiting (token bucket per user per minute); abuse detection (anomalous usage pattern alerts); fail-safe responses for guardrail trigger |
| 12 | Provider Management & Reliability | `reliability` | Multi-provider routing with LiteLLM: OpenAI / Anthropic / Google / Mistral / local Ollama in one interface; latency-based routing (route to lowest p50 provider); failover (provider outage → secondary in < 100 ms with fallback model mapping); rate limit management (per-minute token bucket, request queuing, exponential backoff); cost anomaly detection (daily spend alert, per-feature budget breach); provider SLA tracking; local fallback with Ollama for offline or cost-sensitive scenarios; incident response playbook for LLM provider outage (degraded mode, user messaging, SLA breach communication); API key rotation and secrets management |

## Build Sub-tasks (3 coding sessions)

### Task A — Scaffold + Layers 1 & 2 (Stages 01–04)  [STATUS: not started]
- Create `src/pages/ai-engineering/llmops.astro`
- Full scaffold: hero, tool pills, stage-index nav, BaseLayout, CSS (`llo-*`), JS (`lloToggle/lloTab/lloQA/scroll-reveal`)
- Layer 1 — Prompt & Context Management (stages 01–02)
- Layer 2 — LLM Serving & Cost (stages 03–04)

### Task B — Layers 3 & 4 (Stages 05–08)  [STATUS: not started]
- Layer 3 — RAG Operations & Evaluation (stages 05–06)
- Layer 4 — Observability & Evaluation Frameworks (stages 07–08)

### Task C — Layers 5 & 6 (Stages 09–12)  [STATUS: not started]
- Layer 5 — Fine-tuning & Alignment (stages 09–10)
- Layer 6 — Guardrails, Safety & Reliability (stages 11–12)
- Nav: `/ai-engineering/llmops` added to `src/components/Nav.astro`

## Files
- New:   `src/pages/ai-engineering/llmops.astro`
- Nav:   `src/components/Nav.astro` — add LLMOps link under AI Engineering dropdown

## Content Rules
1. Every stage intro opens with a production incident or real engineering decision unique to LLMs (e.g. "A prompt template was updated in prod without version control — a downstream regression went undetected for 3 days")
2. Code must be fully runnable: LangSmith SDK, LiteLLM routing config, vLLM launch command, RAGAS eval scripts, Axolotl YAML, NeMo Guardrails config — no pseudocode
3. Pitfalls: 2 per spec item — one "this silently breaks in prod" trap + one "this burns your API budget" or "this gets you pwned" trap
4. Interview Q&A: LLMOps interviews are increasingly system-design-heavy — answers must address scale ("10k requests/min"), cost ("$50k/month OpenAI bill"), and safety ("what if the LLM is jailbroken?") dimensions
5. Numbers throughout: TTFT < 500ms, faithfulness > 0.85, context precision > 0.7, cost per 1M tokens (GPT-4o $5 input / $15 output), hallucination rate < 2% — concrete benchmarks an interviewer expects
6. Connect LLMOps concepts to classical MLOps analogues: prompt version ≈ model version; retrieval index ≈ feature store; LLM-as-judge ≈ human eval; RAG pipeline ≈ feature pipeline; guardrails ≈ input validation at system boundary

---

# System Design for AI Page

## Route
`/ai-engineering/system-design-for-ai` → `src/pages/ai-engineering/system-design-for-ai.astro`

## Status: NOT STARTED

## Pre-existing file
`src/content/ai-engineering/system-design-for-ai.mdx` — MDX stub. **Do NOT delete.**

## Architecture
Same `lnlp-*` copy-and-rename pattern. Use prefix `sdi-` throughout:
CSS classes: `sdi-*`, JS functions: `sdiToggle`, `sdiTab`, `sdiQA`.
Data structure identical to Data & Databases and MLOps pages above.

## Tool Pills
FastAPI · PostgreSQL · Redis · Kafka · Kubernetes · Nginx · Prometheus · pgvector · Docker

## Layers & Stages (12 total)

| Stage | Layer | ID | Core Topics |
|---|---|---|---|
| 01 | Requirements & Scoping | `requirements` | Functional vs non-functional requirements, latency budgets, cost constraints, failure tolerance, quality definition, user personas |
| 02 | Requirements & Scoping | `requirements` | Capacity estimation: QPS, storage sizing, bandwidth, GPU hours, back-of-envelope reasoning, traffic patterns (diurnal, bursty) |
| 03 | Data Architecture | `data` | Data flow design: ingestion → validation → storage → indexing → serving → feedback; event-driven vs request-driven; data model design |
| 04 | Data Architecture | `data` | Storage selection: OLTP vs OLAP vs vector store; read/write patterns; caching layer; consistency models (strong vs eventual); CAP theorem in practice |
| 05 | Model Strategy & Serving | `model` | Model selection framework: rules vs ML vs LLM; build vs buy; API vs self-hosted; fine-tuning vs RAG vs prompt engineering; cost modelling |
| 06 | Model Strategy & Serving | `model` | Serving architecture: API gateway, load balancer, inference service, streaming (SSE/WebSocket), timeouts, retries, circuit breakers, graceful degradation |
| 07 | RAG & Agent Systems | `ragagent` | RAG system design: chunking strategy, embedding model selection, index design, retrieval pipeline, reranking, context assembly, citation |
| 08 | RAG & Agent Systems | `ragagent` | Agent system design: tool definitions, orchestration patterns (ReAct, Plan-and-Execute), state management, guardrails, observability, failure modes |
| 09 | Reliability & Scale | `reliability` | SLAs/SLOs/SLIs, circuit breakers, bulkheads, fallbacks, graceful degradation, retry budgets, chaos engineering principles |
| 10 | Reliability & Scale | `reliability` | Scale patterns: horizontal vs vertical, CDN, read replicas, async processing, eventual consistency, backpressure, auto-scaling triggers |
| 11 | Security | `security` | Prompt injection defence, PII detection/masking, RBAC, audit logging, data residency, rate limiting, input validation, secrets management |
| 12 | Production Operations | `ops` | Observability stack design, incident response playbooks, capacity planning, cost optimisation, on-call runbooks, post-mortem culture |

## Build Sub-tasks (3 coding sessions)

### Task A — Scaffold + Layers 1 & 2 (Stages 01–04)  [STATUS: not started]
- Create `src/pages/ai-engineering/system-design-for-ai.astro`
- Full scaffold: hero, tool pills, stage-index nav, BaseLayout, CSS (`sdi-*`), JS (`sdiToggle/sdiTab/sdiQA/scroll-reveal`)
- Layer 1 — Requirements & Scoping (stages 01–02)
- Layer 2 — Data Architecture (stages 03–04)

### Task B — Layers 3 & 4 (Stages 05–08)  [STATUS: not started]
- Layer 3 — Model Strategy & Serving (stages 05–06)
- Layer 4 — RAG & Agent Systems (stages 07–08)

### Task C — Layers 5 & 6 (Stages 09–12)  [STATUS: not started]
- Layer 5 — Reliability & Scale (stages 09–10)
- Layer 6 — Security & Production Operations (stages 11–12)
- Nav: `/ai-engineering/system-design-for-ai` already correct in `src/components/Nav.astro`

## Files
- New:   `src/pages/ai-engineering/system-design-for-ai.astro`
- Keep:  `src/content/ai-engineering/system-design-for-ai.mdx` (do not delete)
- Nav:   already correct — no change needed

## Content Rules
1. Every stage intro frames a real system design decision or interview question scenario
2. Include ASCII diagrams in Overview where helpful: data flow diagrams, request paths, component relationships
3. Code: Python (FastAPI), SQL, YAML configs — realistic production patterns, not toy examples
4. Pitfalls: 2 per spec item — architectural anti-patterns or interview traps with concrete fixes
5. Interview Q&A: min 2 per item — framed as "Design a system that..." or "How would you handle..."; answers structured as decision → tradeoff → production consideration
6. Connect every stage to the 6-step design framework: Requirements → Data Flow → Model → Serving → Evaluation → Operations
