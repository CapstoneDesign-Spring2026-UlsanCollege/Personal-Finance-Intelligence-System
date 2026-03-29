# Wireframes - Personal Finance Intelligence System

**Purpose**: These wireframes show the MVP user flow for Spring 1. Simple layout, no colors or decoration—just function.

---

## Screen 1 - Login / Entry

**What is the user trying to do?** Log into their financial dashboard securely.

**Main action:** Enter credentials and authenticate.

```
┌─────────────────────────────────────────────┐
│                                               │
│  Personal Finance Intelligence System       │
│  Manage your money, smartly                 │
│                                               │
│  ┌─────────────────────────────────────┐    │
│  │ Email:                              │    │
│  │ [____________________________]       │    │
│  │                                     │    │
│  │ Password:                           │    │
│  │ [____________________________]       │    │
│  │                                     │    │
│  │         [ Login Button ]            │    │
│  │                                     │    │
│  │     Don't have account? Sign up     │    │
│  └─────────────────────────────────────┘    │
│                                               │
│  © 2026 Personal Finance System              │
│                                               │
└─────────────────────────────────────────────┘
```

**Key elements:**
- App title + tagline
- Email field
- Password field
- Login button (primary action)
- Sign up link for new users

**What happens next?** On success → go to Dashboard (Screen 2)

---

## Screen 2 - Dashboard / Home

**What is the user trying to do?** See their financial overview and recent activity at a glance.

**Main action:** View balance, recent transactions, navigate to add transaction.

```
┌─────────────────────────────────────────────┐
│ Logo    Dashboard         [ Profile ▼ ]     │
├─────────────────────────────────────────────┤
│                                               │
│  ┌────────────────────┐  ┌────────────────┐ │
│  │ Current Balance    │  │ Monthly Spend  │ │
│  │    $ 5,234.56      │  │    $ 1,456.78  │ │
│  └────────────────────┘  └────────────────┘ │
│                                               │
│  ┌────────────────────────────────────────┐  │
│  │ Recent Transactions                    │  │
│  ├─────────────────────────────────────── ┤  │
│  │ Grocery Store        $45.32  Mar 25    │  │
│  │ Gas Station          $52.00  Mar 24    │  │
│  │ Coffee Shop          $6.50   Mar 23    │  │
│  │ Amazon              $129.99  Mar 22    │  │
│  │                                        │  │
│  │         [ View All Transactions ]      │  │
│  └────────────────────────────────────────┘  │
│                                               │
│  Spending by Category This Month:            │
│  ┌────────────────────────────────────────┐  │
│  │ Food        ███████░░░  35%            │  │
│  │ Transport   ████░░░░░░  20%            │  │
│  │ Shopping    ██████░░░░░  28%           │  │
│  │ Other       ████░░░░░░░  17%           │  │
│  └────────────────────────────────────────┘  │
│                                               │
│  [ + Add Transaction ]  [ Set Budget ]       │
│                                               │
└─────────────────────────────────────────────┘
```

**Key elements:**
- Header with logo, section title, user profile menu
- Balance cards (current balance, monthly spending)
- Recent transactions list with quick view
- Spending breakdown by category
- Primary action buttons: Add Transaction, Set Budget

**What happens next?** 
- Click "Add Transaction" → go to Screen 3
- Click "View All" → full transaction list
- Click transaction → transaction detail view

---

## Screen 3 - Add / Edit Transaction

**What is the user trying to do?** Record a new spending transaction or edit an existing one.

**Main action:** Fill form, save transaction.

```
┌─────────────────────────────────────────────┐
│ Logo    Add Transaction      [ ✕ Close ]    │
├─────────────────────────────────────────────┤
│                                               │
│  Transaction Details                         │
│  ┌─────────────────────────────────────┐    │
│  │ Date:                               │    │
│  │ [___ / ___ / _____]                 │    │
│  │                                     │    │
│  │ Amount:                             │    │
│  │ $ [________________]                │    │
│  │                                     │    │
│  │ Category:                           │    │
│  │ [ Dropdown ▼ ]                      │    │
│  │   • Food & Dining                   │    │
│  │   • Transportation                  │    │
│  │   • Shopping                        │    │
│  │   • Entertainment                   │    │
│  │   • Utilities                       │    │
│  │   • Other                           │    │
│  │                                     │    │
│  │ Description (optional):             │    │
│  │ [________________________]           │    │
│  │                                     │    │
│  │      [ Save Transaction ]           │    │
│  │      [ Cancel ]                     │    │
│  └─────────────────────────────────────┘    │
│                                               │
│  💡 Tip: Categorize accurately for better    │
│     insights                                  │
│                                               │
└─────────────────────────────────────────────┘
```

**Key elements:**
- Modal/form layout
- Date picker field
- Amount field (currency)
- Category dropdown with options
- Optional description field
- Save button (primary action)
- Cancel button
- Helpful tip at bottom

**Form validation notes:**
- Amount required, must be positive number
- Date required, cannot be in future
- Category required
- Description limited to 100 characters

**What happens next?** On save → return to Dashboard (Screen 2), refreshed data shown

---

## Screen Flow Summary

```
┌──────────────────┐
│  Screen 1: Login │
│  (User enters    │
│   credentials)   │
└────────┬─────────┘
         │ success
         ▼
┌──────────────────────────────┐
│  Screen 2: Dashboard / Home  │
│  (User views balance,        │
│   transactions, spending)    │
└────────┬──────────┬──────────┘
         │          │
    click on    click on
   transaction  Add Transaction
         │          │
         ▼          ▼
     Detail    ┌──────────────────┐
     view      │ Screen 3: Add/Edit│
              │ Transaction Form  │
              │ (User enters      │
              │  transaction data)│
              └──────────────────┘
                     │ save
                     ▼
              Return to Dashboard
```

---

## MVP Scope Notes

**Included in these wireframes (Week 1):**
-  User authentication (login)
-  Dashboard overview
-  Recent transaction display
-  Add/edit transaction form
-  Category selection

**Not included (future sprints):**
-  Advanced budgeting UI
-  AI insights display
-  Bill payment features
-  Investment tracking
-  Mobile-specific layout

---

## Quality Checklist

- [x] Only 3 screens (login, dashboard, add transaction)
- [x] Each screen has clear purpose
- [x] Main action is obvious on each screen
- [x] Screens match the MVP defined in design doc
- [x] Screens match the architecture sketch (frontend shows these 3 core flows)
- [x] Labels are readable and descriptive
- [x] A teammate can explain the flow in under a minute
- [x] Low-fidelity (focus on function, not decoration)
- [x] No future features shown that aren't in Sprint 1 scope

---

## Next Steps for Design

1. **Week 5**: Convert these wireframes to high-fidelity mockups with branding
2. **Week 5**: Conduct user testing with wireframes
3. **Sprint 1**: Implement these screens in React
4. **Sprint 2**: Add additional screens (full transaction list, budget setup, etc.)
