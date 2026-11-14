---
title: Multimodal classification across 500+ wheel-rim variants
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
featured: true
order: 3
# The client progress report (chemco-report.pdf) is left out until Farrel confirms
# he has permission to publish it. See CLAUDE.md, problem 11.
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

<!-- TODO(Farrel): user stories for this project. The old site showed the
     finance agent's stories here by mistake (CLAUDE.md problem 6). -->

</div>
