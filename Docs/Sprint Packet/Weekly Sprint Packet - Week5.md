# SPRINT_PACKET_WEEK5.md — BudgetBrain

## Sprint Information

**Project Name:** BudgetBrain
**Sprint Number:** Sprint 5
**Sprint Duration:** Week 5
**Sprint Focus:** Budget Planning and Category Management

---

# Sprint Goal

The goal of Sprint 5 is to implement **budget creation and category management** so users can plan spending and compare actual transactions against their targets.

This sprint focuses on adding budgets per category, enabling users to view budget status, and refining the category model across the application.

---

# Selected User Stories

**Primary User Story:**
_As a user, I want to set monthly budgets for categories so that I can control my spending._

**Secondary User Story:**
_As a user, I want to see my transactions grouped by category so that I can compare actual spend to budget limits._

---

# Tasks / To-Do List

### Backend
- [ ] Create `POST /budget` endpoint to save budgets
- [ ] Create `GET /budget/:userId` endpoint to retrieve budgets
- [ ] Add budget status calculation logic for category usage
- [ ] Add category CRUD endpoints if needed

### Frontend
- [ ] Create budget setup form
- [ ] Display budget list with category and limit values
- [ ] Show budget progress per category
- [ ] Add filters to view transactions by category

### Database
- [ ] Ensure budgets table stores category relationships
- [ ] Seed default categories for budget selection
- [ ] Add sample budget records for testing

### Integration
- [ ] Connect budget creation workflow to backend
- [ ] Display remaining budget values in dashboard
- [ ] Show warnings when a category exceeds its budget

---

# Definition of Done (DoD)

- Users can create budgets linked to categories
- Users can view budgets with current limits
- Transaction totals are compared to budget limits
- Frontend filters transactions by category
- Budget data persists and is retrievable per user

---

# Challenges / Blockers

- Keeping budget summaries accurate after new transactions
- Managing category selection across transactions and budgets
- Displaying budget progress clearly in the UI
- Verifying budget logic against edge cases (zero amounts, no budgets)

---

# Next Steps (Sprint 6)

- Add AI insights for budget recommendations
- Implement user goals and spending alerts
- Improve dashboard charts and analytics
- Add authentication token security and password hashing

---

# Sprint Summary

Sprint 5 will introduce **budget planning capabilities** to BudgetBrain, enabling users to move beyond tracking transactions and into active financial planning.

This sprint establishes the category/budget relationship and makes spending limits easier to manage.
