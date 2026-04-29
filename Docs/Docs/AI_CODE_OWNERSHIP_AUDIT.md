AI Code Ownership Audit – BudgetBrain
1) Team + Project
Team: Bidhan Pokhrel, Nima, Suvakar, Sunil Lama
Project name: BudgetBrain
Current repo: https://github.com/CapstoneDesign-Spring2026-UlsanCollege/BudgetBrain/new/main/Docs
Current demo link: 
Date updated: April 29, 2026

2) What Our App Currently Does
BudgetBrain is a personal finance management web application that allows users to track their income and expenses, manage budgets, and view financial insights through a dashboard.

Feature / flow 1: User registration and login using email and password with JWT authentication
Feature / flow 2: Dashboard displays user data including transactions and financial summary
Feature / flow 3: Users can add, edit, and delete transactions (income/expense)
Current MVP flow

Our main user can:

Register a new account
Login securely using credentials
View dashboard after authentication
Add and manage transactions
3) What Works Right Now
Working item	Evidence link	Owner who can explain it
User registration API	Backend /register route	Sunil
User login with JWT	Backend /login route	Bidhan
MySQL database connection (port 3307)	Local server logs	Sunil
Basic dashboard UI	dashboard.html	Nima
Static frontend routing	Express static config	Suvakar
4) Code We Understand
Code area	File / folder	What it does	Who can explain it?	Evidence
Server setup	backend/server.js	Starts Express server and connects to MySQL	Sunil	Console logs
Authentication	POST /login	Verifies user and returns JWT token	Bidhan	API testing
Registration	POST /register	Saves user with hashed password	Sunil	DB entries
Frontend login	frontend/index.html	Sends login request	Nima	UI testing
Dashboard UI	frontend/dashboard.html	Displays user interface	Suvakar	Screenshots
Token storage	frontend/app.js	Stores JWT in localStorage	Bidhan	Browser dev tools
5) Code We Do NOT Fully Understand Yet
Code area	What is confusing?	Risk level	Owner	Next step
JWT middleware	How token verification works fully	Medium	Bidhan	Study middleware flow
MySQL errors	Connection failures & port issues	High	Sunil	Fix config and test
Express routing	Static path issues (Cannot GET)	Medium	Suvakar	Debug paths
Transaction APIs	Full CRUD logic not stable	High	Nima	Implement properly
6) AI-Assisted Work
Area	AI tool used	What AI helped with	What humans checked/changed	Evidence
Backend server	ChatGPT	Generated Express + MySQL code	Modified DB port and routes	server.js
SQL schema	ChatGPT	Created tables and relationships	Adjusted for port 3307	MySQL
Frontend UI	ChatGPT	Generated dashboard layout	Customized styles	HTML/CSS
Authentication	ChatGPT	JWT + bcrypt logic	Debugged errors	API testing
7) Bugs / Unreliable Features
Bug / problem	Severity	Evidence link	Owner	Next action
Cannot connect to MySQL server	P0	Console error	Sunil	Fix port/config
app is not defined error	P1	Node.js crash	Bidhan	Fix server.js
Cannot GET frontend pages	P1	Browser error	Suvakar	Fix static path
Transactions not showing	P2	Dashboard issue	Nima	Connect API
8) Risk List
Risk	Why it matters	Mitigation	Owner
Backend instability	App may not run in demo	Fix server errors	Bidhan
Database issues	Data not saved/retrieved	Proper MySQL setup	Sunil
Incomplete features	Demo looks unfinished	Focus on MVP only	Team
Over-reliance on AI	Lack of understanding	Manual code review	Team
9) Team Ownership Map
Student	Owned area	Can explain?	Evidence link	Needs help with
Bidhan	Authentication & backend logic	Clear	server.js	Middleware
Nima	Frontend UI & dashboard	Needs work	HTML files	API integration
Suvakar	Routing & frontend structure	Needs work	app.js	Debugging
Sunil	Database & backend setup	Clear	MySQL	Error handling
10) Top 3 Stabilization Goals

Before adding more features, we will stabilize:

Fix backend server errors and ensure server runs without crashes
Ensure MySQL database connection works consistently
Fully connect frontend with backend (login → dashboard → transactions)
11) Definition of Done for Sprint 3

By the end of Sprint 3, we should be able to show:

 Core MVP flow works
 Core MVP flow has evidence
 P0 bugs are fixed or clearly documented
 Every member can explain one code/doc/test area
 AI-assisted work has been reviewed by humans
 Weekly Sprint Packet links this audit
