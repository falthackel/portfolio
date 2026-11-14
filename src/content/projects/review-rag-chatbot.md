---
title: Q&A RAG chatbot for Google Play Store reviews
date: "2024"
type: LLM application, take-home assessment
lenses: [engineer, product]
summary: A retrieval-augmented chatbot that answers management questions about 3.4 million Google Play reviews of a music-streaming app.
engineerLine: Tagged and undersampled reviews before embedding them into Chroma; LangChain and gpt-4o-mini answer through a Streamlit chat.
productLine: Gives non-technical stakeholders structured answers to questions like "why are users dissatisfied?" without reading reviews by hand.
role: Take-home AI Engineer assessment
stack: [LangChain, OpenAI embeddings, gpt-4o-mini, Chroma, Streamlit]
thumbnail: ../../assets/media/review-rag-chatbot/chat.png
thumbnailAlt: Streamlit chat window titled "Spotify Google Store Review Analysis Bot", answering which features users appreciate most, with example questions in the sidebar.
featured: false
order: 5
attachments:
  - { type: mp4, label: Chatbot demo, href: assets/projects/chatbot/demo.mp4 }
  - { type: link, label: Code on GitHub, href: "https://github.com/falthackel/qna-chatbot" }
---

<div data-for="engineer">

## How it was built

Built a retrieval-augmented Q&A tool over 3.4 million Google Play Store reviews of a music-streaming app (the public Spotify reviews dataset on Kaggle), as a take-home AI Engineer assessment. [Code on GitHub](https://github.com/falthackel/qna-chatbot).

Preprocessed and undersampled the reviews for balanced rating representation, then tagged them by sentiment, feature mentions and competitor comparisons to sharpen retrieval relevance before embedding them with OpenAI's text-embedding-ada-002 into a Chroma vector store.

The RAG chain (LangChain orchestrating retrieval plus gpt-4o-mini generation) answers management-style questions (what users like, who they compare the app to, why they're dissatisfied) through a Streamlit chat interface with sample queries and chat history.

</div>

<div data-for="product">

## Problem

Management can't get quick, structured answers out of 3.4 million unstructured app-store reviews. Reading through them by hand to answer one specific question (for example, "why are users dissatisfied?") doesn't scale.

## Scope

### In scope

- RAG Q&A over a fixed review dataset
- Feature praise
- Competitor comparisons
- Dissatisfaction drivers
- Emerging trends in user sentiment
- A Streamlit chat UI usable by non-technical stakeholders

### Out of scope

- Live or streaming ingestion of new reviews
- Multi-app or multi-market rollout
- Automatically acting on insights

## User stories

- As a product manager, I want to ask in plain language which features users appreciate most, so I don't have to read thousands of reviews.
- As a product manager, I want to see the most common complaints, so the team can prioritize what to fix.
- As a strategy lead, I want to know how users compare the app with competing streaming services, so I can see where we win and lose.
- As a non-technical stakeholder, I want example questions and chat history in the interface, so I can start without training and come back to earlier answers.

</div>
