# 📑 SaaS Contracts Dashboard

A **React + Tailwind single-page application** that simulates a SaaS contracts management dashboard.  
Built for the **UI/UX Developer Assignment** to demonstrate modern frontend design, API handling, and state management.

---

## ✨ Features

- 🔐 **Authentication** → mock login (any username, password = `test123`), JWT stored in localStorage  
- 📊 **Contracts Dashboard**  
  - Sidebar navigation (Contracts, Insights, Reports, Settings)  
  - Topbar with profile dropdown  
  - Search by contract name / parties  
  - Filters: Status (Active, Expired, Renewal Due) & Risk (Low, Medium, High)  
  - Pagination (10 rows per page)  
  - Loading, Empty, and Error states handled gracefully  
- 📑 **Contract Detail Page**  
  - Metadata: parties, start & expiry dates, status, risk score  
  - Clauses section with summaries + confidence scores  
  - AI Insights section with risks & recommendations (severity labels)  
  - Evidence panel with relevance scores and copy-to-clipboard  
- ⬆️ **Upload Modal** → drag & drop or browse, simulated file upload with statuses  
- 📱 **Responsive UI/UX** → optimized for desktop and mobile  

---

## 🛠 Tech Stack

- React (Vite, functional components, hooks)  
- Tailwind CSS for styling  
- shadcn/ui for customizable components  
- React Router v6 for routing  
- Context API for auth & state management  
- Vercel for deployment  

---

## 📂 Project Structure
smart-contracts-dash
├─ bun.lockb
├─ components.json
├─ eslint.config.js
├─ index.html
├─ package-lock.json
├─ package.json
├─ postcss.config.js
├─ public
│  ├─ contracts.json
│  ├─ placeholder.svg
│  └─ robots.txt
├─ README.md
├─ src
│  ├─ App.css
│  ├─ App.tsx
│  ├─ components
│  │  ├─ auth
│  │  │  └─ ProtectedRoute.tsx
│  │  ├─ contracts
│  │  │  └─ ContractsTable.tsx
│  │  ├─ layout
│  │  │  └─ DashboardLayout.tsx
│  │  ├─ modals
│  │  │  └─ UploadModal.tsx
│  │  └─ ui
│  │     ├─ accordion.tsx
│  │     ├─ alert-dialog.tsx
│  │     ├─ alert.tsx
│  │     ├─ aspect-ratio.tsx
│  │     ├─ avatar.tsx
│  │     ├─ badge.tsx
│  │     ├─ breadcrumb.tsx
│  │     ├─ button.tsx
│  │     ├─ calendar.tsx
│  │     ├─ card.tsx
│  │     ├─ carousel.tsx
│  │     ├─ chart.tsx
│  │     ├─ checkbox.tsx
│  │     ├─ collapsible.tsx
│  │     ├─ command.tsx
│  │     ├─ context-menu.tsx
│  │     ├─ dialog.tsx
│  │     ├─ drawer.tsx
│  │     ├─ dropdown-menu.tsx
│  │     ├─ enhanced-button.tsx
│  │     ├─ form.tsx
│  │     ├─ hover-card.tsx
│  │     ├─ input-otp.tsx
│  │     ├─ input.tsx
│  │     ├─ label.tsx
│  │     ├─ loading-spinner.tsx
│  │     ├─ menubar.tsx
│  │     ├─ navigation-menu.tsx
│  │     ├─ pagination.tsx
│  │     ├─ popover.tsx
│  │     ├─ progress.tsx
│  │     ├─ radio-group.tsx
│  │     ├─ resizable.tsx
│  │     ├─ risk-score.tsx
│  │     ├─ scroll-area.tsx
│  │     ├─ select.tsx
│  │     ├─ separator.tsx
│  │     ├─ sheet.tsx
│  │     ├─ sidebar.tsx
│  │     ├─ skeleton.tsx
│  │     ├─ slider.tsx
│  │     ├─ sonner.tsx
│  │     ├─ status-badge.tsx
│  │     ├─ switch.tsx
│  │     ├─ table.tsx
│  │     ├─ tabs.tsx
│  │     ├─ textarea.tsx
│  │     ├─ toast.tsx
│  │     ├─ toaster.tsx
│  │     ├─ toggle-group.tsx
│  │     ├─ toggle.tsx
│  │     ├─ tooltip.tsx
│  │     └─ use-toast.ts
│  ├─ context
│  │  └─ AuthContext.tsx
│  ├─ hooks
│  │  ├─ use-mobile.tsx
│  │  └─ use-toast.ts
│  ├─ index.css
│  ├─ lib
│  │  └─ utils.ts
│  ├─ main.tsx
│  ├─ pages
│  │  ├─ ContractDetail.tsx
│  │  ├─ Dashboard.tsx
│  │  ├─ Index.tsx
│  │  ├─ Insights.tsx
│  │  ├─ Login.tsx
│  │  ├─ NotFound.tsx
│  │  ├─ Reports.tsx
│  │  └─ Settings.tsx
│  └─ vite-env.d.ts
├─ tailwind.config.ts
├─ tsconfig.app.json
├─ tsconfig.json
├─ tsconfig.node.json
└─ vite.config.ts

```

## 📊 Mock API

- **Contracts List** → `GET /contracts`  
- **Contract Detail** → `GET /contracts/:id`  

Data is hosted locally in **`/public/contracts.json`** and fetched with `fetch()`.

---

## ⚡ Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Sadab-Ansari/Contract_SPA_Dashboard
cd saas-contracts-dashboard

npm install 

npm run dev


## 🌐 Deployment

🔗 Live Demo → [Paste your Vercel/Netlify link here]
