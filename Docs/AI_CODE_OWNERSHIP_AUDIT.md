AI Code Ownership Audit – BudgetBrain
1) Team + Project
Team: Bidhan Pokhrel, Nima, Suvakar, Sunil Lama
Project name: BudgetBrain
Current repo: https://github.com/CapstoneDesign-Spring2026-UlsanCollege/BudgetBrain/new/main/Docs
Current demo link: 
Date updated: April 29, 2026

3) What Our App Currently Does

BudgetBrain is a personal finance management web application that helps users track income, expenses, and manage budgets using a modern dashboard.

Feature / flow 1: User registration and login using email/password with JWT authentication
Feature / flow 2: Dashboard displays financial data and summaries
Feature / flow 3: Users can create and manage transactions stored in MongoDB
Current MVP flow

Our main user can:

Register a new account
Login securely
Access dashboard
Add and manage transactions
3) What Works Right Now
Working item	Evidence link	Owner who can explain it
User registration API	/register route	Sunil
User login with JWT	/login route	Bidhan
MongoDB connection (Atlas/Compass)	Connection logs	Sunil
Basic dashboard UI	dashboard.html	Nima
Static frontend routing	Express setup	Suvakar
4) Code We Understand
Code area	File / folder	What it does	Who can explain it?	Evidence
Server setup	backend/server.js	Starts Express server	Sunil	Console logs
MongoDB connection	mongoose.connect()	Connects to database	Sunil	Logs
Authentication	/login route	Verifies user and returns JWT	Bidhan	API test
Registration	/register route	Stores user data in MongoDB	Sunil	DB data
Frontend login	index.html	Sends login request	Nima	UI
Dashboard UI	dashboard.html	Displays interface	Suvakar	Screenshot
5) Code We Do NOT Fully Understand Yet
Code area	What is confusing?	Risk level	Owner	Next step
JWT middleware	Token verification flow	Medium	Bidhan	Study auth flow
MongoDB Atlas connection	URI & network issues	High	Sunil	Fix IP whitelist
Express routing	Static file path errors	Medium	Suvakar	Debug routes
Transaction CRUD	API not fully stable	High	Nima	Complete endpoints
6) AI-Assisted Work
Area	AI tool used	What AI helped with	What humans checked/changed	Evidence
Backend server	ChatGPT	Express server setup	Modified routes	server.js
MongoDB schema	ChatGPT	User & transaction models	Adjusted fields	Models
Frontend UI	ChatGPT	Dashboard design	Edited CSS/UI	HTML
Authentication	ChatGPT	JWT + bcrypt logic	Debugged login issues	API
7) Bugs / Unreliable Features
Bug / problem	Severity	Evidence link	Owner	Next action
MongoDB connection failed	P0	Error logs	Sunil	Fix URI/IP access
Server crash (app not defined)	P1	Node error	Bidhan	Fix code
Cannot GET frontend pages	P1	Browser error	Suvakar	Fix static path
Transactions not updating	P2	Dashboard issue	Nima	Fix API
8) Risk List
Risk	Why it matters	Mitigation	Owner
MongoDB connection issues	App cannot store data	Fix Atlas config	Sunil
Backend instability	App crashes	Debug server.js	Bidhan
Incomplete API	Features not working	Complete CRUD	Nima
AI dependency	Low understanding	Code review	Team
9) Team Ownership Map
Student	Owned area	Can explain?	Evidence link	Needs help with
Bidhan	Authentication & backend	Clear	server.js	Middleware
Nima	Frontend UI	Needs work	HTML	API
Suvakar	Routing & frontend logic	Needs work	JS	Debugging
Sunil	Database (MongoDB)	Clear	DB connection	Error fixing
10) Top 3 Stabilization Goals
Fix MongoDB connection (Atlas / Compass)
Ensure backend runs without crashing
Connect frontend with backend APIs properly
11) Definition of Done for Sprint 3
 Core MVP flow works
 Core MVP flow has evidence
 P0 bugs fixed
 Each member explains their part
 AI code reviewed
 Audit linked in sprint
