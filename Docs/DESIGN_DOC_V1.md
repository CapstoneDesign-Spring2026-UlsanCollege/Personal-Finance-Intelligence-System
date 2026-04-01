# Design Doc v1

## 1) Project purpose
**One-sentence summary:**
BudgetBrain helps users track, analyze, and optimize their financial decisions through an intelligent web platform with AI-powered insights.

**Why this matters:**
Most people struggle to understand their spending patterns and make informed financial decisions. By centralizing financial data and providing AI-driven insights, this system empowers users to take control of their finances and achieve their financial goals more effectively.

---

## 2) Target users
- **Primary user:** Individual adults (ages 25-55) who earn income and want to manage personal finances better
- **Secondary user:** Financial advisors wanting to view client financial data (future release)
- **What they need:** Easy way to track spending, understand where money goes, set savings goals, and receive actionable recommendations

---

## 3) MVP scope
### In scope now
- User registration and secure login
- Dashboard showing financial overview (balance, recent transactions, spending summary)
- Transaction management (add, view, edit, delete)
- Basic spending categorization
- Simple budget tracking
- Responsive web design for desktop and mobile

### Out of scope for now
- Advanced AI insights and predictions
- Goal setting and financial planning
- Investment tracking
- Bill payment integrations
- Real bank account connections
- Mobile app
- Financial advisor features
- Multi-currency support
- Export/reporting features

---

## 4) Core user flow
Describe the basic flow in 3-5 steps:
1. User signs up or logs in securely
2. Views dashboard with current balance and recent transactions
3. Adds or reviews transactions with automatic categorization
4. Monitors spending against budget limits
5. Receives basic insights about spending patterns

---

## 5) Architecture (C4-lite)
### Context view
- **Users:** Individual finance users, financial advisors (future)
- **Main system:** Personal Finance Intelligence Web Application
- **Outside systems/services:** Bank APIs (future), Authentication services, Financial data providers

### Container view
- **Frontend:** React-based web UI with dashboard, transaction management, and budget tracking screens
- **Backend:** Node.js/Express API server handling user management, data validation, and business logic
- **Database:** PostgreSQL storing users, transactions, budgets, and financial data
- **Other service:** AI/ML Service (future) for insights and predictions

### Diagram
```
[Individual User] 
  ---> [Frontend Web UI] 
    ---> [Backend API Server] 
      ---> [Database (PostgreSQL)]
      ---> [AI/ML Service] (future)
      ---> [Bank APIs] (future)
```

---

## 6) Wireframes
### Screen 1 - Login / Authentication
- **Purpose:** Secure user access to personal financial data
- **Main action:** Enter credentials or sign up for new account
- **Features:** Email/password fields, "Remember me" option, sign-up link

### Screen 2 - Dashboard (Home)
- **Purpose:** At-a-glance view of financial status and recent activity
- **Main action:** View balance, recent transactions, spending summary; navigate to other features
- **Features:** Balance cards, recent transaction list, spending breakdown chart, quick action buttons

### Screen 3 - Transaction Management
- **Purpose:** Add, view, and organize financial transactions
- **Main action:** Add new transaction or view/edit existing transactions
- **Features:** Transaction list with filters, add transaction form, category selection, edit/delete options

---

## 7) Sprint 1 plan
### Top goals
1. Complete user authentication system (register/login) with secure token handling
2. Build dashboard with transaction overview and financial summary
3. Implement transaction CRUD operations and category management

### Initial issues / work chunks
- Set up Node.js/Express server with basic API structure
- Implement user registration and login endpoints
- Create PostgreSQL database schema for users and transactions
- Build login/authentication UI components
- Design and implement responsive dashboard layout
- Create transaction list and add transaction components
- Set up CI/CD pipeline and development environment
- Implement basic security measures (CORS, input validation)
- Create project documentation and README

---

## 8) Risks / assumptions
### Risks
- **Database performance:** Large transaction datasets may cause slow queries (mitigation: implement pagination and indexing early)
- **API rate limits:** Third-party integrations (future) may have rate limits (mitigation: implement caching layers)
- **Team coordination:** Frontend and backend teams need strong API contract alignment (mitigation: document API early, use API mocking)
- **Authentication complexity:** Implementing secure authentication correctly is critical (mitigation: use established libraries, security audit)

### Assumptions
- Users will have steady internet connection for web app access
- Users trust the system with their sensitive financial data
- Frontend/backend teams can work in parallel with clear API contracts
- PostgreSQL is available as database solution
- Deployment to cloud infrastructure is available

---

## 9) Scope cut list
If time runs short, cut these first:
- Advanced budget planning features
- AI insights and recommendations
- Transaction import from CSV
- Real-time notifications
- Mobile responsive optimization (focus on desktop first)

---

## 10) Evidence links
- **Board link:** [Sprint 1 Issues](SPRINT_1_ISSUES.md)
- **Sprint Packet link:** [Sprint Week 1](Sprint%20Packet/SPRINT_PACKET_WEEK1.md)
- **Architecture reference:** [Architecture Sketch](ARCHITECTURE_SKETCH.md)
- **Wireframes reference:** [Wireframes](WIREFRAMES.md)
- **User stories reference:** [User Stories](user_stories.md)

---

## 11) Quality check
- [x] project purpose is clear
- [x] target users are specific
- [x] MVP scope is realistic
- [x] architecture is included
- [x] 3 wireframes are included
- [x] Sprint 1 goals are small enough to demo
- [x] risks are honest
- [x] evidence links are included where possible

