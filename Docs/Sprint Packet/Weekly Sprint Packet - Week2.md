# WEEKLY SPRINT PACKET - WEEK2.md — BudgetBrain

## Sprint Information

**Project Name:** BudgetBrain  
**Sprint Number:** Sprint 2  
**Sprint Duration:** Week 2  
**Sprint Focus:** Implement First Functional Slice – Transaction Input

---

# Sprint Goal

The goal of Sprint 2 is to implement the **first functional slice** of the BudgetBrain: allowing users to **input income and expenses**, which are stored in the database.  

This sprint focuses on **frontend form creation, backend API implementation, and database integration** to track personal finances.

---

# Topic Change Note

**Important:** In the second week, we changed our project topic to "BudgetBrain" upon the professor's suggestion, as the initial topic was too broad and complex for the sprint timeline. This change allowed us to focus on a more manageable and impactful project scope.

---

# Selected User Story

**User Story:**  
_As a user, I want to input my income and expenses so that I can track my personal finances._

This is the first slice of the system, focusing on **data entry and storage**.

---

# Tasks / To-Do List

### Frontend
- [x] Design basic HTML form for transaction input  
- [x] Implement frontend validation (required fields, numeric input)  

### Backend
- [x] Set up Node.js / Express server  
- [x] Create API endpoint `POST /transactions` to save transactions  

### Database
- [x] Design `transactions` table schema  
- [x] Connect backend API to database  

### Integration
- [x] Connect frontend form to backend API  
- [ ] Test end-to-end transaction input and storage  

---

# Repository Structure (Updated for Sprint 2)

The repository is organized to clearly separate documentation, frontend, backend, and database components.

- **docs/** – Contains all project documentation, sprint packets, team agreements, and system design files.  
- **frontend/** – Handles the user interface, including dashboard, transaction input form, charts, and interactions.  
- **backend/** – Provides RESTful APIs to store and retrieve transaction data, handles business logic, and communicates with the database.  
- **database/** – Contains SQL scripts for creating tables, defining relationships, and initial seed data for income and expense tracking.  
- **package.json** – Manages Node.js dependencies, scripts for running the server, and build tasks.  

---

# Definition of Done (DoD)

- Users can input transactions via the frontend form  
- Data is validated on the frontend  
- Transactions are successfully stored in the database  
- Confirmation message displayed after saving  
- No errors when multiple transactions are added  

---

# Challenges / Blockers

- Integration of frontend form with backend API  
- Ensuring database connections work properly  
- Handling input validation and error messages  
- Team alignment after changing project topic  

---

# Next Steps (Sprint 3)

- Implement **view transactions** page with a table of saved data  
- Add **summary dashboard** showing balance and totals  
- Start working on **visualization of categories** in charts  
- Implement **basic authentication** for users  

---

# Proof of Work

- Screenshot of transaction input form in the browser  
- Screenshot of database showing saved transactions  
- Demo showing frontend → backend → database flow  

---

# Sprint Summary

Sprint 2 focused on **building the first functional slice** of the BudgetBrain.  

The team successfully implemented the **transaction input feature**, connected frontend and backend, and stored data in the database.  

The system is now ready for **Sprint 3**, which will expand features to **viewing, summarizing, and visualizing transactions**.

---


