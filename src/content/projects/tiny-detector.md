---
title: "Tiny Detector: early autism screening for preschool teachers"
category: school
date: "2023–24"
type: Health product, undergraduate final project at ITB
lenses: [engineer, product]
summary: A web app that lets preschool teachers screen toddlers for autism risk with the validated M-CHAT questionnaire in Indonesian. Tested with 19 teachers, it scored 73.69 on the System Usability Scale, rated "good".
engineerLine: Flutter web front end, Node.js REST back end with 20 endpoints and PostgreSQL, deployed on a Debian VPS.
productLine: Built for teachers, not clinicians, after interviews with a preschool head and a pediatric rehabilitation specialist.
role: Final-year project. I ran the research, design, build and user testing. Supervised by Allya Paramita Koesoema, S.T., M.T., Ph.D. (ITB) and dr. Marietta Shanti Prananta, Sp.KFR Ped (K) (Padjadjaran University).
result: SUS satisfaction 73.69 ("good"); between test sessions, efficiency rose from 72.9% to 88.6% and failed tasks fell from 40 to 18.
stack: [Flutter, Node.js, PostgreSQL, REST API, Apache2, M-CHAT-R/F]
thumbnail: ../../assets/media/tiny-detector/home.png
thumbnailAlt: Tiny Detector home screen on a phone, showing unfinished assessments to resume and three features, new assessment, assessment history and FAQ. Names are blurred.
featured: true
order: 1
attachments:
  - { type: pdf, label: Paper (English), href: assets/projects/tiny-detector/18320008_Paper_ENG.pdf }
  - { type: pdf, label: Poster, href: assets/projects/tiny-detector/18320008_Poster.pdf }
  - { type: pdf, label: Final presentation (Indonesian), href: assets/projects/tiny-detector/18320008_Presentasi.pdf }
  - { type: png, label: System architecture, href: assets/projects/tiny-detector/architecture.webp }
  - { type: link, label: Code on GitHub, href: "https://github.com/falthackel/tiny-detector" }
---

<div data-for="product">

## Problem

Autism signs can be recognized at 12–24 months, yet many Indonesian children are only diagnosed at five or older, when symptoms become obvious in primary school. Parents often don't notice early signs, and formal diagnosis is slow and needs a specialist.

Preschool teachers see toddlers every day and could spot early signs, but they have no training on special needs and no screening tools. The few screening apps that exist (ASDTests, Autism AI, ASDetect, Autism Fingerprint) were not available in Indonesian.

## Users and what they needed

I interviewed both sides of the referral path before designing anything:

- **The head of a community preschool (PAUD) in Bandung.** Her teachers had never been trained to recognize children with special needs. They asked for basic training on autism and a tool to help them spot early signs.
- **A pediatric rehabilitation specialist,** dr. Marietta, who was also my clinical supervisor. Children usually reach her too late. She needed early signs to be caught by as many people as possible, and asked for a tool simple enough for non-clinicians, with a friendly interface.

## Key decisions

- **Questionnaire, not machine learning.** A predictive model was the obvious idea, but there was no usable dataset of Indonesian toddlers. A validated questionnaire could work on day one.
- **M-CHAT over 18 alternatives.** I compared 19 screening instruments against three criteria: covers under-threes, covers children up to five, and takes 5–10 minutes. Three passed (M-CHAT, Q-CHAT, DBC-ES); M-CHAT had the best published sensitivity (95–97%) and specificity (99%).
- **Refer instead of follow-up interview.** M-CHAT-R/F has a second-stage interview for medium-risk scores. That interview is hard for non-clinicians, so medium and high risk both point to a professional evaluation instead.
- **Borrowed what worked in other apps:** pausing and resuming an assessment (from ASDetect), an illustration for every question (from Autism Fingerprint), and basic autism information inside the app.
- **Screening, not diagnosis.** The app is explicit that a result is a risk indication and that only a doctor can diagnose.

## Scope

### In scope

- The 20-item M-CHAT questionnaire in Indonesian, with an illustration per question and automatic risk scoring
- Saving progress and resuming unfinished assessments
- Assessment history for each teacher
- An FAQ with basic autism information
- An admin dashboard for all assessments, assessors and admin accounts

### Out of scope

- Diagnosis, and the M-CHAT follow-up interview
- Settings and clinic-information pages, cut late in development to keep the core flow simple
- Full WCAG accessibility and privacy compliance, which were scoped as future work

## User stories

These come from the requirements in the thesis:

- As a teacher, I want to screen a toddler with a guided questionnaire, so I can spot autism risk without clinical training.
- As a teacher, I want to pause a screening and continue it later.
- As a teacher, I want to see my past screenings and their results.
- As a teacher, I want to read basic information about autism.
- As an admin, I want to see every screening by every teacher, and manage assessor and admin accounts.

## What testing taught me

Testing ran with 19 preschool teachers in Bandung, after a one-day autism webinar the day before. It was approved by the ITB research ethics committee.

- **Confidence needs onboarding.** Teachers who judged short videos by intuition felt *more* confident (4.75 of 6) than those using M-CHAT (4.1), though both groups identified the children with similar accuracy. A screening tool for non-clinicians needs training built in, not just a questionnaire.
- **Design for the oldest users.** Teachers over 45 had the lowest effectiveness (50%) and satisfaction (66, "not good") and the highest cognitive load. They also improved the most between sessions (+70.5% learnability), so the tool is learnable, but the first use is too hard.

## What I would do differently

Fix reliability and security before adding features, design the first-use experience for older teachers, and secure funding for hosting. The live site ran on a one-month server I paid for myself, so it is no longer online.

</div>

<div data-for="engineer">

## How it was built

I followed a design-thinking process: requirements from interviews and literature, a low-fidelity design in Figma validated with prospective users and my clinical supervisor, then the full build.

- **Front end:** a Flutter web app, 8 pages for teachers and admin dashboards.
- **Back end:** a Node.js REST API with 20 endpoints for sign-up and login (hashed tokens), registering a toddler, saving each answer, submitting and scoring, and the admin views.
- **Database:** PostgreSQL with two tables, assessors and toddlers. Each toddler row holds the 20 answers, total score, risk result and timestamps, so an unfinished screening is simply a row with no result yet.
- **Scoring:** the server computes the M-CHAT score and maps it to low (0–2), medium (3–7) or high (8–20) risk.
- **Deployment:** a single Hostinger VPS (Debian, 1 vCPU, 4 GB RAM) running Apache2 and the API, with its own domain and SSL certificate. The whole project, including hosting and the ethics review, cost about Rp 800,000.

## Evaluation

The usability test followed the PACMAD model across two sessions, the first with facilitators and the second without:

| Measure | First use | Second use |
|---|---|---|
| Efficiency | 72.9% | 88.6% |
| Effectiveness (tasks completed) | 71.5% | 84.9% |
| Failed tasks | 40 | 18 |
| Errors (critical / non-critical) | 26 / 20 | 10 / 3 |

Satisfaction averaged 73.69 on the System Usability Scale ("good") and cognitive load 45.08 on NASA-TLX ("somewhat high").

## What failed and how it was fixed

- **Server time-outs** locked some teachers out. The one-core server was the bottleneck; the fix is more server capacity.
- **Submitting failed** when a question was skipped, because the flow assumed answers in order. I added a notice for unanswered questions and a jump to the first unanswered one.
- **Text and illustrations were too small**, especially for older teachers. Both were enlarged, and layouts were reworked to fit each screen and scroll properly.
- **Passwords with special characters were rejected.** I fixed the validation rule.
- **Unclear terms.** I added explanations to the FAQ.

</div>
