@echo off
echo Creating Sprint 1 Issues for BudgetBrain...
echo Make sure you have authenticated with GitHub CLI first by running:
echo "C:\Program Files\GitHub CLI\gh.exe" auth login
echo.
echo Press any key to continue...
pause >nul

REM Issue 1: Set up Node.js/Express server
"C:\Program Files\GitHub CLI\gh.exe" issue create --title "Set up Node.js/Express server with basic API structure" --body "
Set up the backend foundation for the BudgetBrain.

**Acceptance Criteria:**
- Node.js/Express server initialized
- Basic project structure created
- API routes structure defined
- Environment configuration set up
- Basic error handling implemented

**Labels:** backend, setup, sprint-1
**Story Points:** 5
" --label "backend,setup,sprint-1"

REM Issue 2: User authentication endpoints
"C:\Program Files\GitHub CLI\gh.exe" issue create --title "Implement user registration and login endpoints" --body "
Create secure authentication endpoints for user registration and login.

**Acceptance Criteria:**
- POST /api/auth/register endpoint
- POST /api/auth/login endpoint
- JWT token generation and validation
- Password hashing with bcrypt
- Input validation and error responses
- Basic rate limiting

**Labels:** backend, authentication, security, sprint-1
**Story Points:** 8
" --label "backend,authentication,security,sprint-1"

REM Issue 3: Database schema
"C:\Program Files\GitHub CLI\gh.exe" issue create --title "Create PostgreSQL database schema for users and transactions" --body "
Design and implement the database schema for the MVP.

**Acceptance Criteria:**
- Users table with authentication fields
- Transactions table with all required fields
- Categories table for transaction categorization
- Proper foreign key relationships
- Database migrations set up
- Basic seed data for testing

**Labels:** database, backend, sprint-1
**Story Points:** 5
" --label "database,backend,sprint-1"

REM Issue 4: Login UI
"C:\Program Files\GitHub CLI\gh.exe" issue create --title "Build login/authentication UI components" --body "
Create the frontend login and registration interface.

**Acceptance Criteria:**
- Login form with email/password fields
- Registration form with validation
- Error handling and user feedback
- Responsive design for mobile/desktop
- Form validation (client-side)
- Loading states and success messages

**Labels:** frontend, ui, authentication, sprint-1
**Story Points:** 4
" --label "frontend,ui,authentication,sprint-1"

REM Issue 5: Dashboard layout
"C:\Program Files\GitHub CLI\gh.exe" issue create --title "Design and implement responsive dashboard layout" --body "
Build the main dashboard interface showing financial overview.

**Acceptance Criteria:**
- Header with navigation and user menu
- Balance display cards
- Recent transactions list
- Spending breakdown visualization
- Responsive grid layout
- Clean, professional design matching wireframes

**Labels:** frontend, ui, dashboard, sprint-1
**Story Points:** 8
" --label "frontend,ui,dashboard,sprint-1"

REM Issue 6: Transaction components
"C:\Program Files\GitHub CLI\gh.exe" issue create --title "Create transaction list and add transaction components" --body "
Implement transaction management functionality.

**Acceptance Criteria:**
- Transaction list with pagination
- Add transaction form (date, amount, category, description)
- Edit/delete transaction functionality
- Category dropdown with predefined options
- Form validation and error handling
- Real-time updates after adding transactions

**Labels:** frontend, ui, transactions, sprint-1
**Story Points:** 6
" --label "frontend,ui,transactions,sprint-1"

REM Issue 7: CI/CD setup
"C:\Program Files\GitHub CLI\gh.exe" issue create --title "Set up CI/CD pipeline and development environment" --body "
Establish automated testing and deployment processes.

**Acceptance Criteria:**
- GitHub Actions workflow for CI
- Automated testing on push/PR
- Linting and code quality checks
- Development environment documentation
- Staging deployment setup
- Environment variable management

**Labels:** devops, infrastructure, sprint-1
**Story Points:** 4
" --label "devops,infrastructure,sprint-1"

REM Issue 8: Security measures
"C:\Program Files\GitHub CLI\gh.exe" issue create --title "Implement basic security measures" --body "
Add essential security protections to the application.

**Acceptance Criteria:**
- CORS configuration
- Input sanitization and validation
- SQL injection prevention
- XSS protection
- HTTPS enforcement in production
- Security headers (helmet.js)
- Rate limiting on API endpoints

**Labels:** security, backend, sprint-1
**Story Points:** 4
" --label "security,backend,sprint-1"

REM Issue 9: Documentation
"C:\Program Files\GitHub CLI\gh.exe" issue create --title "Create project documentation and README" --body "
Document the project for developers and users.

**Acceptance Criteria:**
- Comprehensive README.md with setup instructions
- API documentation
- Development guidelines
- Architecture overview
- Contributing guidelines
- License and acknowledgments

**Labels:** documentation, sprint-1
**Story Points:** 3
" --label "documentation,sprint-1"

echo.
echo All Sprint 1 issues have been created!
echo Go to your project board to add them to the backlog:
echo https://github.com/orgs/CapstoneDesign-Spring2026-UlsanCollege/projects/20
echo.
pause

