# TEMPLATE - Architecture Sketch

## Use this for Week 4
Paste this into `/docs/design-doc-v1.md` or use it to guide your diagram.

---

## 1) Architecture summary
**System name:** BudgetBrain

**Main users:**
- Individual users managing personal finances
- Financial advisors (future)

**Main job of the system:**
One sentence only: Provide intelligent insights and management tools for personal financial data to help users make informed financial decisions.

---

## 2) Context view
Show the system, users, and outside services.

### Fill this in
**Users**
- User 1: Individual Finance User - manages personal transactions, budgets, and goals
- User 2: Financial Advisor - reviews client financial data and provides recommendations

**Main system**
- Personal Finance Intelligence Web Application

**External services / systems**
- Bank APIs for transaction data import
- Authentication service (OAuth providers)
- Financial data providers for market information

### Simple text version
```md
[Individual User] ---> [Personal Finance Web App] ---> [Database]
[Financial Advisor] ---> [Personal Finance Web App] ---> [Bank APIs]
[Personal Finance Web App] ---> [Authentication Service]
```

### Notes
- What does each user do? Individual users track expenses and get AI insights; advisors analyze client data.
- What outside system matters right now? Bank APIs for data import and authentication services for secure login.

---

## 3) Container view
Show the major parts inside your system.

### Fill this in
**Frontend / UI**
- main screens: Dashboard, Transaction List, Budget Planner
- key actions: Add transactions, view insights, set budgets

**Backend / Logic**
- main responsibilities: Process financial data, generate AI insights, handle user authentication
- validation / rules: Transaction validation, budget limits, security checks

**Database / Storage**
- main data stored: User profiles, transactions, budgets, goals, AI model data

**Other service (if needed)**
- service: AI/ML Service
- purpose: Analyze spending patterns, predict future expenses, provide personalized recommendations

### Simple text version
```md
[Frontend Web UI]
  -> sends requests to [Backend API]
  -> displays data from [Backend API]

[Backend API]
  -> handles business logic and validation
  -> stores data in [Database]
  -> communicates with [AI/ML Service]
  -> integrates with [Bank APIs]

[Database]
  -> stores user data, transactions, budgets
  -> provides data to AI models

[AI/ML Service]
  -> processes financial data
  -> generates insights and predictions
```

---

## 4) Sprint 1 focus
**What part are we actually building first?**
- Basic user authentication and registration
- Simple dashboard with transaction overview
- Transaction CRUD operations
- Basic responsive UI layout

**What is out of scope for now?**
- Advanced AI insights and predictions
- Budget planning and goal setting
- Financial advisor features
- Mobile app
- Integration with real bank APIs

---

## 5) Quality check
- [x] users are visible
- [x] the system is visible
- [x] major internal parts are visible
- [x] external dependencies are visible
- [x] the diagram matches our MVP
- [x] the diagram matches our wireframes
- [x] the diagram is small enough to explain in 30 seconds

---

## 6) Example labels you can steal
Good labels:
- Student
- Admin
- Web App
- Mobile App
- API Server
- Database
- Auth Service
- Notification Service

Bad labels:
- Stuff
- System thing
- AI part
- Back-end things

---

## Final rule
If your architecture sketch cannot help you create Sprint 1 issues, it is too vague.

