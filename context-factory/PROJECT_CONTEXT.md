# Clemora: An AI-Integrated Event Planning and Resource Management Platform with Automated Customer Assistance

---

## 1. Project & Academic Metadata

| Property | Details |
| :--- | :--- |
| **Project Title** | Clemora: An AI-Integrated Event Planning and Resource Management Platform with Automated Customer Assistance |
| **Course & Code** | CAP101 - SBIT4P (Capstone Project 1) |
| **Term & Academic Year** | 1st Semester, S.Y. 2026–2027 |
| **Schedule** | Tuesday 6:00 PM – 9:00 PM |

### Project Team Members

| Student No. | Name |
| :--- | :--- |
| **23-1757** | Agustin III, Ernesto |
| **23-1781** | Almase, Jester Ace |
| **23-2239** | Banalan, Johaina |
| **23-2732** | Dayrit, Marvin |
| **23-2321** | Lubong, Jun Martin |
| **23-1780** | Magundayao, Prince Enzo |
| **23-1857** | Matias, Dominiq James |
| **23-1765** | Mercado, Lhoreese Aaliyah |
| **23-1967** | Nacion, Lorraine Heart |
| **23-1853** | Pitel, John Kenneth |
| **23-1854** | Ulgasan, Xeroj |

---

## 2. Rationale & Core Problem Statement

Event and catering service companies manage interconnected logistical and customer service processes: inquiries, consultation, quotation preparation, booking confirmations, equipment dispatch, staff scheduling, and live execution.

### Key Pain Points Solved
1. **Repetitive Inquiries & Configuration Friction**: Customers struggle to select suitable packages balancing budget, headcount, venue constraints, and dietary preferences, demanding back-and-forth communication.
2. **Double-Booking & Resource Collisions**: Traditional systems only track the active hours of an event. They fail to account for **preparation, vehicle transit, venue teardown, and sanitization/turnaround periods**, causing severe equipment shortages and crew burnout.
3. **Information Silos**: Quotation requests, inventory logs, and staff assignments often live in fragmented spreadsheets, leading to miscommunication and delayed handovers.

---

## 3. Objectives of the Study

### General Objective
To develop an event planning, resource management, and AI-assisted customer service platform that enables customers to plan, customize, and request event services while assisting event and catering service companies in managing bookings, resource allocation, and operational schedules.

### Specific Objectives
1. **Identify Challenges**: Document operational challenges encountered by customers and company staff in handling inquiries, quotation preparation, resource allocation, and scheduling.
2. **AI-Assisted Customer Service**: Build an AI chatbot grounded in real packages, menus, pricing, policies, and availability that collects requirements through natural language conversations.
3. **Intelligent Package Configuration**: Develop an automated recommendation mechanism that analyzes event type, guest count, budget, preferences, and venue conditions to formulate feasible packages.
4. **Customer-Facing Portal**: Provide customer capabilities for package customization, instant quotation generation, booking requests, status tracking, and manager escalation.
5. **Resource Management & Turnaround Scheduling**: Implement a buffer-aware scheduling engine that allocates equipment and staff while calculating transit, setup, breakdown, and warewash/sanitization turnaround periods.
6. **Centralized Management Suite**: Deploy an administrative platform for company personnel to track inquiries, quotations, active bookings, equipment dispatch, and staff assignments.
7. **System Evaluation**: Evaluate functionality, usability, performance, and suitability for catering and event operations.

---

## 4. Scope & Area of Investigation

- **Target Enterprise**: Event and catering service providers managing food packages, rental equipment (chafers, glassware, tables, linens, audio-visual rigs), and on-site hospitality personnel.
- **User Groups**:
  - **Customers**: Event hosts, corporate planners, wedding organizers.
  - **Administrators & Owners**: Business leaders monitoring revenue, utilization, and system configuration.
  - **Event Coordinators / Customer Service**: Staff preparing proposals, approving bookings, and managing live events.
  - **Operations & Warehouse Staff**: Crew managing equipment dispatch, turnaround sanitization, and transport.

---

## 5. Significance of the Study

- **For Event & Catering Companies**: Centralizes operations, prevents double-booking penalties, cuts proposal turnaround times, and optimizes asset utilization.
- **For Customers**: Provides transparent, instant package customization and 24/7 AI-guided inquiry assistance without waiting days for quotes.
- **For Staff & Coordinators**: Eliminates logistical guesswork with clear preparation checklists, conflict alerts, and realistic buffer times.
- **For Future Researchers**: Establishes a reference architecture for constraint-based event scheduling, domain-grounded AI conversational assistance, and logistics turnaround buffering.

---

## 6. System Architecture: 11 Core Functional Modules

```
                          ┌──────────────────────────┐
                          │         CLEMORA          │
                          │     Unified Platform     │
                          └─────────────┬────────────┘
         ┌──────────────────────────────┼──────────────────────────────┐
         │                              │                              │
┌────────┴────────┐            ┌────────┴────────┐            ┌────────┴────────┐
│ Customer Portal │            │ AI Assist Core  │            │ Operations Suite│
│ • Packages      │            │ • Inquiry Bot   │            │ • Dispatch/Prep │
│ • Estimator     │            │ • Requirement AI│            │ • Turnaround    │
│ • Quotation     │            │ • Staff Match   │            │ • Conflict Det. │
│ • Tracking      │            │ • Human Handover│            │ • Audit Logs    │
└─────────────────┘            └─────────────────┘            └─────────────────┘
```

### Module 1: User and Access Management
- User Registration and Login (Secure authentication)
- Role-Based Access Control (Customer, Coordinator, Inventory Manager, Administrator)
- User Profile Management
- Staff Management & Rostering
- Staff Skills, Certifications, and Availability Tracking

### Module 2: Customer-Facing Features
- Event Package Catalog & Browsing
- Interactive Package Customization (Menus, Guest Count, Service Levels)
- AI Customer Inquiry Chatbot (Domain-grounded conversational agent)
- Instant Quotation Request & Generation
- Event Booking & Appointment Consultation Scheduling
- Real-Time Booking Status Tracking (Inquiry → Quotation → Confirmed → In-Prep → Live → Completed)
- Customer Email Notifications & Status Updates
- Customer-to-Manager Live Chat Handover
- Past Events Showcase & Visual Gallery
- Customer Ratings and Post-Event Feedback

### Module 3: Package and Quotation Management
- Master Event Package Management (Create, Edit, Archive)
- Menu & Service Management (Courses, dietary attributes, buffet vs. plated)
- Pricing, Tiers, and Add-On Management
- Dynamic Quotation Formulation & PDF Export
- Quotation Status Lifecycle Tracking (Draft, Sent, Accepted, Expired, Revised)

### Module 4: Booking and Scheduling Management
- Centralized Booking Management
- Interactive Event Calendar (Day, Week, Month, Timeline views)
- Event Scheduling and Rescheduling Workflows
- Automated Scheduling Conflict Detection
- Staff Scheduling, Rostering, and Shift Assignment
- Equipment & Resource Scheduling
- **Turnaround Time Engine**: Automated buffering for Prep, Vehicle Transit, On-Site Setup, Breakdown, and Warewash Sanitization
- Booking Cancellation Management & Policy Enforcement

### Module 5: Resource and Inventory Management
- Master Equipment & Rental Inventory (Chafers, tables, chairs, linen, dinnerware, glassware)
- Real-Time Availability & Allocation Tracking
- Equipment Dispatch, Loading Dock Check-Out & Return Verification
- Consumable Inventory Management (Beverages, condiments, single-use supplies)
- Resource Utilization & Wear-and-Tear Monitoring

### Module 6: AI-Assisted Planning and Resource Allocation
- AI-Powered Package Recommendations matching budget, dietary, and headcount constraints
- AI-Assisted Staff Recommendations based on event formality, skill tags, and guest ratios
- AI-to-Manager Conversation Handover with structured requirement summaries

### Module 7: Event Operations Management
- Event Preparation Checklists & Task Tracking
- Live Event Monitoring & Milestone Execution
- Event Timeline & Run-of-Show Delay Tracking
- Incident Reporting & On-Site Resolution Tracking
- Automated Post-Event Operations Report Generation

### Module 8: Notifications and Announcements
- Staff Email & SMS Shift Notifications
- Booking, Schedule, and Event Assignment Alerts
- Company Announcements & Operational Updates
- Notification Delivery Tracking & Read Receipts

### Module 9: Reporting and Performance Monitoring
- Executive Administrative Dashboard
- Staff Performance & Attendance Metrics
- Coordinator Performance & Conversion Reports
- Booking, Revenue, and Quotation Reports
- Event Completion & Incident Analysis Reports
- Resource Utilization & Maintenance Reports
- Customer Ratings, Reviews, and Feedback Analytics

### Module 10: Past Events Management
- Past Event Archives & Portfolio Management
- Photo Gallery, Menu Showcase, and Story Description Management
- Public Event Showcase Publishing and Unpublishing Controls

### Module 11: System Administration
- Global System Configuration & Business Policy Rules
- AI Knowledge Base Management (Menu updates, policy docs, FAQs)
- AI Conversation Monitoring & Quality Auditing
- User Activity & Audit Logs
- Data Access, Security, and Compliance Management

---

## 7. The Clemora Turnaround Buffer Science

```
[ Warehouse Dispatch & Loading ] ──> 60-90 min
[ Vehicle Transit to Venue     ] ──> 30-60 min
[ On-Site Setup & Staging      ] ──> 120-180 min
[ LIVE EVENT EXECUTION         ] ──> 240-360 min
[ Teardown & Venue Pack-Up     ] ──> 60-90 min
[ Return Transit to Warehouse  ] ──> 30-60 min
[ Warewash & Sanitization Buffer] ──> 120-180 min (PROTECTED BUFFER)
====================================================================
TOTAL TIMELINE DURATION         ──> Guaranteed zero overlap window
```

---

## 8. Academic Project Timeline (Gantt Milestones)

| Period | Milestone Activity |
| :--- | :--- |
| **Aug 2026** | Requirement Analysis, Problem Identification & Proposal Formulation |
| **Sept 2026** | Literature Review (RRL) & Topic Proposal Approval |
| **Oct 2026** | Writing of Chapter 1 & Chapter 2 (Theoretical Framework & Architecture) |
| **Nov 2026** | Writing of Chapter 3 & Research Methodology Formulation |
| **Dec 2026** | Data Gathering Instruments & Core System Prototype Engineering |
| **Jan 2027** | Writing of Chapter 4 & System Implementation of 11 Modules |
| **Feb 2027** | System Testing, Turnaround Algorithm Validation & Chapter 5 Writing |
| **Mar 2027** | Comprehensive System Evaluation & Oral Defense |
| **Apr 2027** | Revision, Defense Enhancements & Post-Evaluation Refinements |
| **May 2027** | Final Hardbound Manuscript & Production Software Submission |
