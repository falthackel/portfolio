---
title: Anomaly detection for capsule defects
category: work
date: "2025"
type: Computer vision, proof of concept
lenses: [engineer, product]
summary: A PatchCore pipeline that flags defective hair-vitamin capsules across eight defect types, with an image-level AUROC of 0.96 and F1 of 0.98.
engineerLine: Benchmarked PatchCore against Reverse Distillation in Anomalib; pixel-level localization still lags (AUROC 0.71).
productLine: Replaces slow, inconsistent visual checks, and reports detection and localization accuracy separately so stakeholders see the limits.
result: Image-level AUROC 0.96, F1 0.98 (pixel-level AUROC 0.71, F1 0.30)
stack: [Anomalib, PatchCore, Reverse Distillation, ImageJ]
thumbnail: ../../assets/media/capsule-anomaly-detection/inference.jpg
thumbnailAlt: Four panels of one red capsule, showing the original image, the ground-truth defect mask, the anomaly heat map and the predicted defect outline.
featured: false
order: 2
attachments:
  - { type: jpg, label: AI inference demo, href: assets/projects/anomaly/demo.jpg }
  - { type: png, label: Model evaluation metrics, href: assets/projects/anomaly/result.png }
---

<div data-for="engineer">

## How it was built

Built a visual anomaly detection pipeline in Anomalib for Ellips hair-vitamin capsules, targeting eight defect types as an initial proof-of-concept scope.

Captured a same-angle image set with an OBSBot webcam under fixed lighting and a white background (several sample locations per defect type, 20 images each), then hand-labeled ground-truth masks in ImageJ.

## Evaluation

Benchmarked two Anomalib backbones, PatchCore and Reverse Distillation, and selected PatchCore on the strength of its results: image-level AUROC of 0.96 and F1 of 0.98.

Pixel-level localization lagged well behind (AUROC 0.71, F1 0.30). The model reliably flags a defective capsule, but its defect outline still needs work before it can be trusted on its own.

</div>

<div data-for="product">

## Problem

Checking hair-vitamin capsules for surface and fill defects by eye is slow, inconsistent between inspectors, and doesn't scale past a proof-of-concept batch. The goal was an AI system that detects defects quickly and accurately, to save inspection effort and reduce the risk of human error.

## Scope

### In scope

- 8 defect types (surface and fill)
- Single-camera, fixed-angle image capture with controlled lighting
- PatchCore-based detection and pixel-level localization

### Out of scope

- Real-time production-line inspection
- Defect types beyond the initial eight
- Other samples or product lines

## User stories

- As a quality inspector, one model catching multiple defect types in a single pass beats running a separate check per flaw category.
- As a quality inspector, seeing where the defect is (not just that one exists) lets me judge severity instead of treating every flag the same.
- As a stakeholder, seeing accuracy broken out by defect detection versus localization tells me exactly where the model's current limits are before I rely on it.

</div>
