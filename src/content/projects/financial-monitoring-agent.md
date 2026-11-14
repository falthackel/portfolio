---
title: Agentic Financial Monitoring Assistant
category: self
date: "2026"
type: Agentic AI, personal project
lenses: [engineer, product]
summary: A command-line agent that answers currency, gold and IHSG price questions in one query, and remembers which asset a follow-up question refers to.
engineerLine: LangChain agent on Google Gemini that chooses between four tools, including a web-search fallback.
productLine: Replaces manual checking across several sites, each with its own update speed, with one question.
stack: [Python, LangChain, Google Gemini, DuckDuckGo search]
thumbnail: ../../assets/media/financial-monitoring-agent/terminal.png
thumbnailAlt: Terminal session where the assistant answers "update harga hari ini" with a table of USD, SGD and TWD rates, gold and the IHSG index.
featured: false
order: 1
attachments:
  - { type: svg, label: Agentic workflow, href: assets/projects/finance/flowchart.svg }
  - { type: gif, label: Agent demo, href: assets/projects/finance/agentic.gif }
---

<div data-for="engineer">

## How it was built

Built as a single Python CLI agent on LangChain's create_agent framework and Google Gemini, reaching for four tools as needed: get_exchange_rate and get_average_exchange_rate for currency pairs (TWD/IDR, USD/IDR, SGD/IDR), get_price_table for a full board of assets (XAU and IHSG) in one query, and a DuckDuckGo web-search fallback for anything the structured sources don't cover.

The agent decides which tool a given question needs, including follow-up questions that refer back to an asset already in the conversation, rather than following a fixed script.

</div>

<div data-for="product">

## Problem

Currency and asset prices come from different sources with different update speeds (some daily, some per minute). Checking them manually across multiple sites is slow and inconsistent.

## Scope

### In scope

- Currency rates (USD, SGD, TWD)
- Gold (XAU)
- IHSG (IDX Composite)
- Single-user CLI tool
- Fallback web search for uncovered assets

### Out of scope

- Real-time alerts
- Web or mobile app
- Multi-user support

## User stories

- As a user, I want one query to show prices across several assets, so I don't check multiple sites.
- As a user, I want follow-up questions to remember what asset we just talked about.
- As a user, I want a fallback answer when live data isn't available, instead of a dead end.

</div>
