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

🔗 Live Demo → [# 📑 SaaS Contracts Dashboard

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

🔗 Live Demo → [https://contract-spa-dashboard.vercel.app]
]
