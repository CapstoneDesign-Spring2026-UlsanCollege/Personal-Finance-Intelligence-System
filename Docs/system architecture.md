# Architecture (C4-lite) - BudgetBrain

## Purpose
This architecture sketch shows the **minimum system structure** needed to build and deploy the BudgetBrain MVP in Sprint 1.

---

## 1) Context View
**What users see and what systems we depend on**

### Users
- **Finance User**: Individual who logs in to track spending, view transactions, set budgets
- **Admin (future)**: May manage user accounts and view system health

### Main System
- **Personal Finance Intelligence Web Application**: Central platform where users manage and analyze their financial data

### External Systems
- **Authentication Service** (OAuth/JWT): Handles secure login
- **Bank APIs** (future): Future data import from bank accounts
- **Email Service** (future): Send notifications and password resets

### Simple Diagram
```
┌─────────────────────────────────────────────────────────────┐
│                                                               │
│  [Finance User]                                              │
│       │                                                       │
│       │ logs in / uses                                        │
│       └──────────────────┐                                    │
│                           │                                    │
│     ┌──────────────────────────────────────────┐             │
│     │  Personal Finance Intelligence Web App   │             │
│     │  (Dashboard, Transactions, Budgets)      │             │
│     └──────────────────────────────────────────┘             │
│           │                         │                         │
│    requests auth         reads/writes data                   │
│           │                         │                         │
│     ┌───────────┐          ┌────────────────┐               │
│     │  Auth     │          │   Database     │               │
│     │  Service  │          │  (PostgreSQL)  │               │
│     └───────────┘          └────────────────┘               │
│                                                               │
│  [External: Bank APIs - Future]                             │
│  [External: Email Service - Future]                         │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## 2) Container View
**What major pieces are inside the system**

### Frontend
- **Technology**: HTML5, CSS3, JavaScript (React framework)
- **What it does**:
  - Login/registration screen
  - Dashboard with balance and transaction overview
  - Transaction list with add/edit/delete
  - Basic budget tracking
- **Who uses it**: Finance users access via web browser

### Backend API Server
- **Technology**: Node.js with Express
- **What it does**:
  - Handle user registration and login
  - Validate and process transactions
  - Enforce budget rules
  - Manage categories
  - Serve data to frontend
- **Key responsibilities**:
  - Secure token/session management
  - Input validation
  - Business logic (categorization, budget checks)

### Database
- **Technology**: PostgreSQL
- **What it stores**:
  - User profiles and login info
  - Transactions (date, amount, category)
  - Budgets and goals
  - Categories and preferences

### Authentication Service (External)
- **Purpose**: Validate user login and generate secure tokens
- **What it provides**: OAuth tokens or JWT for secure session management

### Detailed Diagram
```
┌────────────────────────────┐
│   Frontend Web UI (React)   │
│  - Login page              │
│  - Dashboard               │
│  - Transaction list        │
│  - Budget tracker          │
└────────────┬───────────────┘
             │
             │ HTTP requests
             │ (login, transactions, budget)
             │
┌────────────▼───────────────────────────────────┐
│     Backend API Server (Node.js/Express)       │
│  - Authentication routes                       │
│  - Transaction CRUD endpoints                  │
│  - Budget management logic                     │
│  - Validation & business rules                 │
└────────────┬────────────────────┬──────────────┘
             │                    │
        validates user      reads/writes data
             │                    │
      ┌──────▼────┐       ┌──────▼──────────┐
      │   Auth     │       │   PostgreSQL    │
      │  Service   │       │   Database      │
      │ (External) │       │                 │
      └────────────┘       │  - Users        │
                           │  - Transactions │
                           │  - Budgets      │
                           │  - Categories   │
                           └─────────────────┘
```

---

## 3) Data Flow (MVP)
### Login Flow
1. User enters email/password in Frontend
2. Frontend sends to Backend API
3. Backend validates against Database
4. Backend checks with Auth Service
5. Backend returns secure token
6. Frontend stores token, redirects to Dashboard

### Transaction Flow
1. User adds transaction in Frontend form
2. Frontend sends to Backend with token
3. Backend validates data & applies business rules
4. Backend stores in Database
5. Frontend receives confirmation, updates display

---

## 4) What's NOT in Scope for Sprint 1
- AI/ML insights and predictions 
- Real bank API integrations 
- Investment tracking 
- Financial advisor features
- Mobile app 
- Export/reporting 
- Multiple currencies 

---

## 5) Sprint 1 Focus
This architecture enables these Sprint 1 tasks:
-  Set up Express API structure
-  Create user registration/login endpoints
-  Build PostgreSQL database schema
-  Create React frontend components
-  Connect frontend to backend
-  Implement transaction CRUD
-  Deploy to staging environment

---

## 6) Quality Checklist
- [x] Users are clearly shown (Finance User)
- [x] Main system is clear (Personal Finance Web App)
- [x] Major internal parts are visible (Frontend, Backend, Database)
- [x] External dependencies are shown (Auth Service)
- [x] Only MVP/Sprint 1 features are included
- [x] Labels are clear enough for any team member to understand
- [x] Diagram matches the wireframes and design doc
- [x] A new developer could use this to plan Sprint 1 tasks

---

## 7) Key Rules for This Architecture
1. **Simple**: 3 main containers, 1 main user type for MVP
2. **Honest**: Shows what we actually need Week 1
3. **Useful**: Every team member knows what to build
4. **Scoped**: Future features (AI, advisors, banks) are labeled as Future

<<<<<<< HEAD

=======
---
>>>>>>> 584d703 (itr)
