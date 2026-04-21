# SPRINT_PACKET_WEEK4.md — BudgetBrain

## Sprint Information

**Project Name:** BudgetBrain
**Sprint Number:** Sprint 4
**Sprint Duration:** Week 4
**Sprint Focus:** Transaction CRUD + Data Visualization

---

# Sprint Goal

The goal of Sprint 4 is to complete **full transaction CRUD operations** and introduce **basic visual financial insights**.

This sprint emphasizes enabling users to create, read, update, and delete transactions while also giving them a first view into their spending and income patterns through charts and summaries.

---

# Selected User Stories

**Primary User Story:**
_As a user, I want to manage my transactions completely so that I can keep my records accurate and up to date._

**Secondary User Story:**
_As a user, I want to see a simple chart of my finances so that I can quickly understand my spending versus income._

---

# Tasks / To-Do List

### Backend
- [ ] Implement `GET /transactions/:userId` endpoint
- [ ] Add `PUT /transactions/:id` endpoint for updates
- [ ] Add `DELETE /transactions/:id` endpoint for removals
- [ ] Add `GET /transactions/summary/:userId` endpoint for totals by type

### Frontend
- [ ] Build UI for listing all transactions
- [ ] Add edit and delete controls to transaction items
- [ ] Display totals for income, expense, and balance
- [ ] Integrate chart library or simple bar summary view

### Database
- [ ] Confirm transaction table supports full CRUD operations
- [ ] Add category lookup support for transaction display
- [ ] Seed category table with common categories for testing

### Integration
- [ ] Connect transaction edit flow from frontend to backend
- [ ] Validate update/delete operations persist correctly
- [ ] Render summary data in dashboard view

---

# Definition of Done (DoD)

- Users can add, update, and delete transactions
- Transaction list refreshes correctly after each action
- Dashboard shows income, expenses, and balance totals
- Category information is displayed with transactions
- No broken API routes for transaction CRUD

---

# Challenges / Blockers

- Managing frontend state after edits and deletes
- Ensuring backend routes return consistent JSON shapes
- Keeping chart summaries updated with live data
- Handling empty transaction lists gracefully

---

# Next Steps (Sprint 5)

- Add budget planning and goal tracking
- Implement category filtering and comparisons
- Improve UI/UX for transaction management
- Add user-specific budget summaries

---

# Sprint Summary

Sprint 4 will transition BudgetBrain from basic input functionality to a **complete transaction management experience**.

The sprint aims to make the finance dashboard more actionable by delivering CRUD operations and a first set of visual insights.
