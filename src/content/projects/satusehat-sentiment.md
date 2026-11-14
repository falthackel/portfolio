---
title: Sentiment analysis of SATUSEHAT Mobile reviews
category: self
date: "2024"
type: NLP, self-project
lenses: [engineer, product]
summary: Scraped and labeled about 75,700 Google Play reviews of Indonesia's national health app. Forty-six percent read as negative, and a TF-IDF and logistic regression classifier reached 88.6% test accuracy.
engineerLine: Indonesian text cleaning, lexicon-based labeling, then two feature schemes tested against five classifiers.
productLine: A read on how citizens feel about the app built on the SATUSEHAT platform, which I researched at the Ministry of Health.
result: TF-IDF and logistic regression, 88.6% test accuracy (89.3% train, so no overfitting)
stack: [Python, google-play-scraper, Sastrawi, NLTK, Word2Vec, scikit-learn, XGBoost]
thumbnail: ../../assets/media/satusehat-sentiment/polarity.png
thumbnailAlt: Pie chart of SATUSEHAT Mobile review sentiment, 46.0% negative, 39.5% neutral and 14.4% positive.
featured: false
order: 4
attachments:
  - { type: link, label: Code on GitHub, href: "https://github.com/falthackel/sentiment-analysis-satusehat-mobile" }
---

<div data-for="engineer">

## How it was built

**Data.** Scraped 139,500 Google Play reviews of SATUSEHAT Mobile with google-play-scraper. 75,748 remained after removing incomplete rows.

**Preprocessing for Indonesian.** Removed mentions, hashtags, links and symbols; normalized slang (for example "bgt" to "banget"); then tokenized, removed stopwords and stemmed with Sastrawi.

**Labeling.** Scored each review against an Indonesian sentiment lexicon, which gave 34,866 negative, 29,951 neutral and 10,931 positive reviews. Class weights compensated for the imbalance.

## Evaluation

Two feature schemes, each tested with five classifiers on an 80:20 split:

| Features | Best model | Test accuracy | Train accuracy |
|---|---|---|---|
| TF-IDF | Logistic regression | 88.6% | 89.3% |
| TF-IDF | Random forest | 84.2% | 99.2% |
| Word2Vec | Random forest | 74.6% | 99.9% |

I chose TF-IDF with logistic regression: the highest test accuracy, and train and test scores close together. The random forests scored near 100% on training data, a sign of overfitting.

## Limits

The labels come from a lexicon, not from people. So 88.6% measures how well the model reproduces the lexicon, not how well it reads real sentiment. The next step would be hand-labeling a sample of reviews to check the lexicon itself.

</div>

<div data-for="product">

## Problem

SATUSEHAT Mobile is Indonesia's public health app, connected to the national SATUSEHAT health-data platform. It has more than 100,000 reviews on Google Play, far too many to read, and the product team needs to know which way users lean.

## Why this project

As a Product Intern at the Ministry of Health's Digital Transformation Office, I led user and market research with 145 participants on the SATUSEHAT platform. This project looks at the same ecosystem from the citizen side, through what users say in public reviews.

## Outcome

- Nearly half of the reviews (46%) read as negative, 39.5% as neutral and only 14.4% as positive.
- A reusable pipeline that can score new reviews, for example to compare sentiment before and after a release.

</div>
