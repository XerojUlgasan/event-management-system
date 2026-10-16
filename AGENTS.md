# AGENTS.md — Agent & Developer Briefing Guide

> **NOTICE FOR AI AGENTS & CONTRIBUTORS**:  
> Before modifying or building features for this repository, **you MUST inspect the `/context-factory` directory first**. It houses the canonical project requirements, research objectives, team metadata, and the 11-module feature scope.

---

## 1. Primary Entry Point: `/context-factory`

Whenever starting a task, refer to the files in `/context-factory/`:

| File | Purpose | What It Contains |
| :--- | :--- | :--- |
| **`/context-factory/PROJECT_CONTEXT.md`** | **Mandatory Reference** | Complete capstone documentation: Rationale, General & Specific Objectives, Area of Investigation, Significance of the Study, Gantt Milestones (Aug 2026 – May 2027), Student Author Roster (CAP101 - SBIT4P), and the full 11-module feature scope. |
| **`/context-factory/index.ts`** | **Typed Programmatic Export** | TypeScript interface definitions (`ProjectMetadata`, `ProjectMember`) and the `CLEMORA_PROJECT_METADATA` constant for use across application components. |

---

## 2. Project Executive Summary

- **System Name**: **Clemora**
- **Full Title**: *“Clemora: An AI-Integrated Event Planning and Resource Management Platform with Automated Customer Assistance”*
- **Domain**: Event Planning, Catering Service Management, AI-Assisted Customer Consultation, and Logistics/Resource Scheduling.
- **Key Architectural Innovation**: **Turnaround Buffer Scheduling**. Standard booking calendars only block the 4–5 hours of active dining. Clemora automatically schedules and protects:
  1. `Warehouse Loading & Dispatch` (60–90 min)
  2. `Vehicle Transit to Venue` (30–60 min)
  3. `On-Site Table & Kitchen Staging` (120–180 min)
  4. `Live Event Execution` (240–360 min)
  5. `Teardown & Retrieval` (60–90 min)
  6. `Transit Return to Warehouse` (30–60 min)
  7. `Warewashing, Inspection & Sanitization Buffer` (120–180 min)  
  *Guarantees zero equipment collisions and zero staff double-booking.*

---

## 3. The 11 Core Functional Modules to Build

When implementing or extending features, keep them aligned with these 11 modules detailed in `/context-factory/PROJECT_CONTEXT.md`:

1. **User and Access Management**: RBAC (Customer, Coordinator, Inventory Manager, Administrator), profiles, staff skills & availability.
2. **Customer-Facing Features**: Package listing, dynamic package customizer, AI inquiry chatbot, instant quotations, booking status tracking, customer-to-manager chat handover, past event gallery, ratings/reviews.
3. **Package and Quotation Management**: Menu/tier management, add-ons, dynamic quotation generator, quotation lifecycle tracking.
4. **Booking and Scheduling Management**: Event calendar, conflict detection, staff shift assignments, equipment scheduling, turnaround buffer engine, cancellations.
5. **Resource and Inventory Management**: Chafing dishes, banquet furniture, glassware, linens, dispatch barcodes, consumable tracking, utilization metrics.
6. **AI-Assisted Planning and Allocation**: Natural language requirement extraction, package recommendations, skill-based staff recommendations, AI-to-human handover.
7. **Event Operations Management**: Checklists, live event milestone tracking, delay tracking, on-site incident reporting, post-event automated reports.
8. **Notifications and Announcements**: Staff email/SMS notifications, schedule shift alerts, company bulletins, delivery tracking.
9. **Reporting and Performance Monitoring**: Executive dashboard, staff metrics, coordinator conversions, revenue, equipment utilization, incident reports.
10. **Past Events Management**: Portfolio publishing, photo galleries, case study descriptions.
11. **System Administration**: Business rules configuration, AI knowledge base management, conversation auditing, security & audit logs.

---

## 4. Design & UI/UX Constitution

When building UI for Clemora, strictly observe the established design system:
- **60% Neutral Canvas**: Porcelain Alabaster (`#FAFAF8` / `bg-white`)
- **30% Structural Anchor**: Deep Slate Navy (`#0F172A`)
- **10% High-Intent Accent**: Warm Amber Bronze (`#B45309`)
- **Hairline Dividers**: Stone Gray (`#E7E5E4`)
- **Anti-Slop Discipline**:
  - No static pill capsules for metadata (use clean text separated by `·`).
  - No mechanical code headers (`// 01 ARCHITECTURE` is prohibited; use clean editorial titles like `01. Automated Pipeline`).
  - Top navigation follows the 1-row, 3-zone contract (`[Brand] — [Nav links] — [1 Primary Action]`).
  - All numbers in tables, metrics, and financials must use `tabular-nums` / font-mono.
  - Zero dead clicks: every button and interactive control must be wired to working state handlers.

---

## 5. Source Tree Quick Map

```
/
├── AGENTS.md                     # You are here (primary agent instruction entry point)
├── context-factory/
│   ├── PROJECT_CONTEXT.md        # Definitive capstone document & 11-module feature spec
│   └── index.ts                  # Typed metadata export
├── src/
│   ├── assets/images/            # High-fidelity verified imagery (banquet, culinary staging)
│   ├── components/               # Modular UI components (TopBar, Hero, Estimator, Buffer, etc.)
│   ├── data/mockData.ts          # Strongly typed domain packages, tiers, add-ons
│   ├── App.tsx                   # Main application assembly
│   ├── main.tsx                  # React entry point
│   └── index.css                 # Tailwind CSS styles & typography base
├── metadata.json                 # AI Studio project configuration
└── package.json                  # Dependencies & scripts
```
