---
title: A local LLM assistant for checking my own research materials
category: self
date: "2026"
type: Agentic AI, personal project
lenses: [engineer, product]
summary: A private assistant that runs fully on a 6 GB laptop GPU, with memory, search over my own papers, and opt-in tools. It ships with a regression eval and an honest list of what a 4B model cannot do.
engineerLine: Ollama, ChromaDB and Gradio in a modular Python app; hash-based incremental ingestion, a tool-calling loop with a step limit, and one shared prompt file after the eval caught two copies drifting apart.
productLine: Scoped to quick sanity checks over my own materials after watching the model invent citations, and kept tools that send data online off by default.
role: Solo project. Design, build and evaluation.
result: Passes 8 of 8 regression questions, and picks the right tool in all 3 tool-selection tests.
stack: [Python, Ollama, ChromaDB, Gradio, RAG, Tool calling, uv]
thumbnail: ../../assets/media/local-llm-agent/architecture.png
thumbnailAlt: Architecture diagram. Chat input passes through a prompt builder to a local Ollama model. Three tracks feed it, memory, document search over my own files and opt-in tools, and only the tools reach the internet.
featured: false
order: 5
attachments: []
---

<div data-for="product">

## Problem

I wanted a quick way to check my thesis notes against the papers I'd read: "does my text match what these papers say?", "is this sentence clear?". Some of that material is unpublished, so I didn't want to send it to a hosted model. It had to run on my own laptop, which has a 6 GB GPU.

## What it is for, and what it is not

Using it changed the scope. Asked for literature in plain chat, the model produced convincing citations with fake links and IDs. So I wrote the limits into the README instead of hiding them:

- **For:** sanity checks and learning over my own materials, with answers that quote the source file.
- **Not for:** finding new literature, citations or DOIs, live numbers, long reasoning or coding.

## Key decisions

- **Local first, internet opt-in.** Chat, memory and document search work offline. Web search and market data only run when I type `/agent`, because they send my question to outside services.
- **Personal context stays out of the code.** Facts about me are saved with `/remember` in a git-ignored file, not written into the prompts.
- **A market-data tool instead of web search for numbers.** Web search returned different prices across runs, and once labeled a six-day-old value as "today".
- **Dropped coding tools.** They were out of scope for a sanity-check assistant.

## What I'd do next

1. Make the model label every claim as either quoted from my files or "general knowledge, unverified".
2. Add trap questions to the eval, whose correct answer is "not found in your materials".
3. Add a citation guard that flags any link or "et al." that didn't come from the retrieved text.

</div>

<div data-for="engineer">

## How it works

One model and one memory file serve three tracks:

1. **Chat with memory.** Each message carries the saved facts and the last 6 messages. Replies stream back and are saved with crash-safe writes.
2. **Document search.** An ingest script loads PDF, Word, PowerPoint and text files, splits them into 800-character chunks, embeds them with `nomic-embed-text` and stores them in ChromaDB. Each file is hashed, so re-runs only process what changed. On every message the 4 closest excerpts are inserted right before the question.
3. **Tools (`/agent`).** A small registry exposes `search_docs`, `web_search` and `market_data`. The loop stops after 5 tool calls, and a failing tool returns an error message instead of crashing.

## Evaluation

An 8-question regression set covers general knowledge, a question about the future the model should refuse, document-grounded questions and tool choice. It passes 8 of 8 with the current model.

The eval paid off early. The browser app and the eval each kept their own copy of the agent prompt, and the copies had drifted, so the eval was testing a different prompt than the one I used. I moved every prompt into one shared file.

## Limits I measured

- **Model size.** A larger 8B model crashed with a CUDA error on this GPU, so I stayed with a 4B model.
- **Retrieval quality.** Reference-list chunks match keywords but carry no content, some PDF text comes out garbled, and fixed-size chunks cut sentences in half.
- **The eval is small and keyword-graded**, so it gives false failures and can't catch subtle errors.

</div>
