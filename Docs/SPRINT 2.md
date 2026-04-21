# SPRINT 2 – Midterm Development Plan (BudgetBrain)

##  Sprint Goal
Transform BudgetBrain from a basic expense tracker (Sprint 1) into an **intelligent financial dashboard system** with visualization, budgeting, and enhanced user experience.

---

## Objectives
- Add **data visualization (charts & insights)**
- Implement **budget tracking system**
- Improve **UI/UX**
- Prepare for **Midterm Pitch**
- Ensure **stable backend + database integration**

---

##  Target Users
- Students managing personal finances
- Young professionals tracking expenses
- Budget-conscious users

---

##  Key Features (Sprint 2)

### 1.  Financial Dashboard
- Pie chart (expenses by category)
- Monthly spending summary
- Quick insights (top category, total spend)

### 2.  Budget Management
- Set monthly budget
- Track remaining balance
- Visual progress bar

### 3. Category Management
- Create custom categories
- Edit / delete categories

### 4.  Filtering & Sorting
- Filter by category
- Sort by:
  - Date
  - Amount

### 5.  User Profile
- Update user info
- Change password

---

##  System Architecture (Updated)

### Frontend
- HTML / CSS / JavaScript (or React if upgraded)
- Dashboard UI
- Forms (budget, transaction)

### Backend
- Node.js / Express (or Java backend if using JavaFX)
- API endpoints:
  - `/transactions`
  - `/budget`
  - `/categories`

### Database (MySQL)
Tables:
- users
- transactions
- categories
- budgets

---

## 🗃 Database Updates

### New Table: budgets
```sql
CREATE TABLE budgets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    monthly_limit DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
