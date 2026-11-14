---
title: "Tiny Detector: early autism screening for preschool teachers"
category: school
date: "2024"
type: Health product, undergraduate final project at ITB
lenses: [engineer, product]
summary: A web app that helps preschool teachers screen toddlers for autism risk with the M-CHAT questionnaire. Tested with 19 teachers, it scored 73.69 on the System Usability Scale, rated "good".
engineerLine: Flutter front end, Node.js REST back end and PostgreSQL on a virtual machine, with 11 pages for teachers and admins.
productLine: Built for teachers rather than clinicians, and usability-tested with 19 of them across four age groups.
role: Final-year project. I gathered requirements, designed and built the full system, and ran the user testing. Co-authors on the paper were Allya Paramita Koesoema, Ph.D. (ITB) and dr. Marietta Shanti Prananta, Sp.KFR (Padjadjaran University).
result: SUS satisfaction 73.69 ("good"); between test sessions, efficiency rose from 72.9% to 88.6% and effectiveness from 71.5% to 84.9%.
stack: [Flutter, Node.js, PostgreSQL, REST API, M-CHAT-R/F]
thumbnail: ../../assets/media/tiny-detector/home.png
thumbnailAlt: Tiny Detector home screen on a phone, showing unfinished assessments to resume and three features, new assessment, assessment history and FAQ. Toddler names are blurred.
featured: true
order: 1
attachments:
  - { type: pdf, label: Paper (English), href: assets/projects/tiny-detector/18320008_Paper_ENG.pdf }
  - { type: pdf, label: Poster, href: assets/projects/tiny-detector/18320008_Poster.pdf }
  - { type: pdf, label: Final presentation (Indonesian), href: assets/projects/tiny-detector/18320008_Presentasi.pdf }
  - { type: png, label: System architecture, href: assets/projects/tiny-detector/architecture.png }
  - { type: link, label: Code on GitHub, href: "https://github.com/falthackel/tiny-detector" }
---

<div data-for="engineer">

## How it was built

Three components talk to each other over REST APIs: a Flutter front end, a Node.js back end and a PostgreSQL database, all hosted on one virtual machine.

- **Assessment flow.** The teacher fills in a toddler profile, which the server checks against the database. The teacher then answers the 20 yes/no M-CHAT items. The system scores the answers automatically and maps the score to low (0–2), medium (3–7) or high (8–20) risk.
- **Resume later.** If an assessment is interrupted, the answers so far are saved and the assessment appears on the home screen to continue.
- **History and accounts.** Teachers sign up and log in (hashed tokens) and can review past assessments sorted by most recent. Admins have dashboards for toddlers, assessors and admin accounts.

In total: 8 pages for teachers, plus admin dashboards (11 pages across the system).

## Evaluation

Tested with 19 preschool teachers in Bandung across three sessions, using the PACMAD usability model:

- **Efficiency** rose from 72.9% to 88.6% between sessions, and failed tasks dropped from 40 to 18.
- **Effectiveness** rose from 71.5% to 84.9%.
- **Satisfaction** averaged 73.69 on the System Usability Scale ("good").
- **Cognitive load** averaged 45.08 on NASA-TLX ("somewhat high").

## What failed and what I would fix

The most frequent critical errors were server time-outs, API calls that didn't respond correctly, and navigation that teachers found hard to follow. The next version should fix reliability before adding features: stronger authentication and token handling, a single-page navigation model, and better hosting.

</div>

<div data-for="product">

## Problem

Autism signs can be recognized at 12–24 months, but many children in Indonesia are diagnosed much later, which delays support. Preschool teachers see toddlers every day and could spot early signs, but they lack training and screening tools. The few screening apps that exist were not available in Indonesian.

## Users

- **Preschool teachers (assessors)**: run screenings, resume unfinished ones, review history.
- **Admins**: manage assessors and see all assessments.

## Scope

### In scope

- The validated M-CHAT-R/F questionnaire (20 items) in Indonesian, with automatic risk scoring
- Saving progress and resuming unfinished assessments
- Assessment history
- Basic information about autism and an FAQ

### Out of scope

- Diagnosis. The app screens for risk and points toward professional evaluation; it does not diagnose.
- Settings and clinic-information pages, which were cut late in development to keep the core flow simple

## User stories

- As a preschool teacher, I want a guided yes/no questionnaire in Indonesian, so I can screen a toddler for autism risk without clinical training.
- As a preschool teacher, I want to pause an assessment and continue it later, because a screening often can't be finished in one sitting.
- As a preschool teacher, I want to see past assessments, so I can follow up with parents.
- As an admin, I want to see all assessors and their assessments, so I can oversee how the tool is used.

## What testing taught me

- **Confidence needs onboarding.** Teachers who judged short videos by intuition felt *more* confident (4.75 of 6) than those using M-CHAT (4.1). A screening tool for non-clinicians needs training built in, not only a questionnaire.
- **Design for the oldest users.** Teachers over 45 had the lowest effectiveness (50.2%) and satisfaction (66, "not good") and the highest cognitive load. They also improved the most between sessions (learnability +70.5%), so the tool is learnable but its first use is too hard.

</div>
