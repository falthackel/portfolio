---
title: Multimodal classification across 500+ wheel-rim variants
category: work
date: "2025"
type: Computer vision, client project
lenses: [engineer, product]
summary: A multimodal SigLIP2 classifier for more than 500 wheel-rim variants, compressed to FP16 ONNX to run on the factory's Intel NUC.
engineerLine: Fused images with structured specifications, trained on SigLIP2, then exported to ONNX and quantized to FP16 for edge hardware.
productLine: Built to survive a live production line, with constrained hardware, a 6-second classification budget and PLC-driven control.
role: Brought on as the data specialist; ended up owning the full technical pipeline.
stack: [SigLIP2, ONNX, FP16 quantization, Intel NUC, PLC integration]
thumbnail: ../../assets/media/wheel-rim-classification/dashboard.jpg
thumbnailAlt: Inspection dashboard showing a grey alloy wheel on a green conveyor, with the detected rim code, similarity score and threshold settings.
featured: false
order: 1
# The client progress report (chemco-report.pdf) is not published: no permission
# from the client. Its substance is described in the "How I ran the project" section.
attachments:
  - { type: svg, label: Integrated solution workflow, href: assets/projects/rim-wheels/workflow.svg }
  - { type: mp4, label: Software demo, href: assets/projects/rim-wheels/demo.mp4 }
---

<div data-for="engineer">

## How it was built

Though brought on as the data specialist, I ended up owning the full technical pipeline.

Led data acquisition (sourcing and coordinating a team to collect images across 500+ wheel-rim variants), then compiled each image alongside structured labels (name, dimensions, specifications) into .npy format to fuse the two modalities ahead of training.

Built and trained the resulting multimodal model on SigLIP2, then compressed it for the shop floor: exported to ONNX and quantized to FP16 to fit the compute budget of the on-site Intel NUC.

Evaluated the model both manually (spot-checking predictions against ground truth) and statistically (aggregate metrics), with troubleshooting running through every stage: data quality, training, compression, and the eventual edge deployment.

## What failed and how it was fixed

- **Noisy capture conditions.** Stray outside light, a camera angle knocked out of place, a lamp that was off during one day's capture and a camera resolution left off-standard all made predictions inconsistent. We sealed the staging area with extra panels, retook the affected data, and wrote a pre-capture checklist (all lights on, clean conveyor mat, camera settings verified) into the data-collection SOP.
- **Overfitting and class imbalance.** Some rim types had far more images than others, and same-type rims were sometimes predicted as different types. We balanced the images per class, used every physical sample of a type, and standardized rotation and mat position during capture.
- **Unstable predictions under rapid captures.** Class similarities were packed too tightly. Fewer, more varied images per class helped, and so did changing the pipeline from augment → annotate → train to annotate first, then augment during training.
- **One model for every brand dragged accuracy down**, because part numbers were grouped inconsistently across a few brands. Training a separate model per brand fixed this (see the product lens for the decision).

</div>

<div data-for="product">

## Problem

The client needed automated inspection across 500+ wheel-rim types, but a classification model alone wasn't the real deliverable. It had to survive contact with a live production line: run on constrained edge hardware, classify in under 6 seconds, plug into existing PLC-driven control, and integrate with the client's software stack, not just perform well in a notebook.

## Scope

### In scope

- Client discovery through proof of concept and periodic progress reporting
- Leading data acquisition, understanding and labeling
- Multimodal model design and training
- Edge optimization for Intel NUC deployment
- Coordinating with the software engineering team on data transfer and the AI API
- Designing the system integration flow (programming, electrical and AI)
- Data integration with the client's on-premises DBMS and PLC control system

### Out of scope

- Automated training application for new rim types

## User stories

- As a factory worker, I want the system to identify the rim type in under 6 seconds.
- As a manager, I want fewer misclassified rims, to reduce operational costs.
- As the data team, I want every rim classification case recorded in our database.

## How it fits the line

A rim enters the inspection booth, the operator presses capture, and the dashboard shows the AI's result next to the quality-control entry. When the two match, the operator prints the label. The AI confirms the operator's work rather than replacing it, and every capture is logged.

## Key decision: one model per brand

Training a single model across all brands was the obvious first choice. It failed because a few brands grouped their part numbers in ways that were unclear even to us, and those classes pulled overall performance down. I split training into one model per brand, which recovered strong results on the clean brands, and raised the part-number definitions with the client as an open question instead of guessing at labels.

## How I ran the project

Although my title was AI engineer, much of the work was project management:

- **Regular progress reports to the client**, covering status for each workstream (mechanical, data and AI, software, integration) against a shared timeline.
- **An issue log in a fixed format**: problem, impact, action, result and lesson learned. Each root cause became a rule in the data-collection SOP.
- **Coordinating parallel teams**, with data acquisition, AI development and software built side by side on one schedule, so model testing could start while capture was still running.
- **Flagging blockers early**, such as duplicate samples shrinking the set of unique types and slow delivery of the next sample batch, with a concrete request to the client.

<!-- The original progress report is not published: it names the client and is
     the client's document. This section describes the work without it. -->

</div>
