---
title: Predicting hospital readmission for diabetes patients
category: self
date: "2024"
type: Clinical machine learning, self-project
lenses: [engineer, product]
summary: Compared four models for predicting readmission of diabetes inpatients, and showed why the most accurate one (90.8%) was the least useful for catching patients at risk.
engineerLine: Cleaned and encoded 50 clinical features, handled a 1:7 class imbalance with SMOTE, and compared four model families.
productLine: Ties the choice of model to what the hospital needs, allocating resources or catching patients before they come back.
result: Random forest had 90.8% accuracy but caught only 0.6% of readmissions; logistic regression caught the most, about 24%.
stack: [Python, pandas, scikit-learn, SMOTE, Yeo-Johnson transform]
thumbnail: ../../assets/media/hospital-readmission/feature-importance.png
thumbnailAlt: Bar chart of the ten most important random-forest features, led by number of lab procedures, number of medications and diagnosis groups.
featured: false
order: 3
attachments:
  - { type: link, label: Code and report on GitHub, href: "https://github.com/falthackel/predictive-analysis-hospital-redmission" }
---

<div data-for="engineer">

## How it was built

**Data.** The public [UCI Diabetes 130-US Hospitals dataset](https://archive.ics.uci.edu/dataset/296/diabetes+130-us+hospitals+for+years+1999-2008): ten years (1999–2008) of inpatient encounters with diabetes, with 50 features covering demographics, admissions, lab tests, diagnoses and 24 diabetes medications.

**Preparation.**

- Dropped features that were mostly empty: weight (about 98% missing), payer code (about 40%) and medical specialty (about 50%).
- Converted age bands to midpoints and collapsed the 21 medication columns to "changed or not".
- Grouped ICD-9 diagnosis codes into disease groups.
- Engineered visit-pattern features (emergency-to-inpatient and outpatient-to-inpatient ratios, total visits).
- Applied a Yeo-Johnson transform to the skewed features.

**Modeling.** An 80:20 split, standardized features, and four models: logistic regression (L1), decision tree, random forest and a neural network. Readmitted patients were outnumbered about 1:7, so SMOTE oversampling was applied to the training data only, for logistic regression and the neural network.

## Evaluation

| Model | Accuracy | Recall (readmissions caught) |
|---|---|---|
| Random forest | 90.8% | about 0.6% |
| Decision tree | 85.2% | about 10% |
| Neural network | 83.9% | about 10% |
| Logistic regression | 73.5% | about 24% |

Recall values are read from the project's result chart. The most important features were the number of lab procedures, the number of medications, the diagnosis groups and time in hospital.

</div>

<div data-for="product">

## Problem

Readmissions of diabetes patients are a marker of inpatient care quality and a large cost for hospitals. Outside the ICU, diabetes care is often inconsistent, and research on this same dataset linked HbA1c measurement to lower readmission rates.

## Questions

1. Which factors best predict readmission?
2. How well can readmission be predicted from limited features?
3. How should a hospital pick a model for its own use case?

## Key decision: the metric depends on the use case

A model that predicts "no readmission" for almost everyone scores high accuracy on imbalanced data and is useless for prevention. Random forest showed exactly this, with 90.8% accuracy and almost no readmissions caught.

- **Allocating resources** (where false alarms are costly): weigh accuracy and precision.
- **Catching at-risk patients early** (where a miss is costly): weigh recall. Here logistic regression with SMOTE did best.

## What I would do differently

Even the best recall, about 24%, misses most readmissions, so none of these models is ready for clinical use. Next I would tune decision thresholds and compare models on precision-recall curves rather than accuracy.

</div>
