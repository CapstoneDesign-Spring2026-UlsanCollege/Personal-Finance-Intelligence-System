# BudgetBrain

Smart personal finance management application with authentication, transaction tracking, and budget visualization.

## Tech Stack

| Part | Technology |
|------|------------|
| Frontend | React + Vite |
| Backend | Node.js + Express |
| Database | mongodb|
| Auth | JWT + bcrypt |

## Project Structure

```
BudgetBrain/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── app/            # App components
│   │   ├── components/     # Reusable UI components
│   │   ├── contexts/       # React contexts
│   │   ├── hooks/          # Custom hooks
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   └── styles/         # CSS files
│   └── package.json
│
├── server/                 # Node.js Backend
│   ├── src/
│   │   ├── config/         # Configuration
│   │   ├── controllers/    # Route controllers
│   │   ├── middleware/     # Express middleware
│   │   ├── routes/         # API routes
│   │   └── utils/          # Utilities
│   └── package.json
│
├── Docs/                   # Documentation
└── README.md
```

## Quick Start

### Prerequisites
- Node.js (v18+)

### Installation

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### Running the App

```bash
# Terminal 1 - Start server (port 5000)
cd server
npm start

# Terminal 2 - Start client (port 5173)
cd client
npm run dev
```

Server: http://localhost:5000
Client: http://localhost:5173

## Features

- User registration and login (JWT)
- Add income and expenses
- Category-based tracking
- Dashboard with charts
- Budget management




