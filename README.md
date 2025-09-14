# 📑 SaaS Contracts Dashboard

A **React + Tailwind single-page application** simulating a modern SaaS contracts management dashboard.  
This project was developed as part of a **UI/UX Developer Assignment** to showcase skills in frontend development, responsive design, state management, and API integration.

## ✨ Features

- 🔐 **Authentication**
  - Mock login (any username, password = `test123`)
  - JWT stored in `localStorage` for session simulation

- 📊 **Contracts Dashboard**
  - Sidebar navigation: Contracts, Insights, Reports, Settings
  - Topbar with profile dropdown
  - Search contracts by name or parties
  - Filters: Status (Active, Expired, Renewal Due) & Risk (Low, Medium, High)
  - Pagination (10 rows per page)
  - Graceful handling of loading, empty, and error states

- 📑 **Contract Detail Page**
  - Display metadata: parties, start & expiry dates, status, risk score
  - Clauses section with summaries and confidence scores
  - AI Insights section with risks and recommendations
  - Evidence panel with relevance scores and copy-to-clipboard

- ⬆️ **Upload Modal**
  - Drag & drop or browse file uploads
  - Simulated upload with status indicators

- 📱 **Responsive Design**
  - Fully optimized for desktop and mobile screens
## 🛠 Tech Stack

- **Frontend:** React (Vite, functional components, hooks)  
- **Styling:** Tailwind CSS  
- **UI Components:** shadcn/ui  
- **Routing:** React Router v6  
- **State Management:** Context API (Authentication & App state)  
- **Deployment:** Vercel  

---

## 📊 Mock API & Data

- **Contracts List:** `GET /contracts`  
- **Contract Detail:** `GET /contracts/:id`  

> All data is hosted locally in **`/public/contracts.json`** and fetched using the native `fetch()` API.  
> This simulates real API calls without requiring a backend.

Sample data includes:
- Contract ID, name, and parties
- Start and expiry dates
- Status (Active, Expired, Renewal Due)
- Risk score (Low, Medium, High)
- Clauses with summaries and confidence scores
- AI-generated insights and evidence


## 🌐 Deployment

The project is deployed on **Vercel** for easy access and demonstration.  

🔗 **Live Demo:** [https://contract-spa-dashboard.vercel.app](https://contract-spa-dashboard.vercel.app)

> The app is fully functional in the browser, including authentication simulation, contract browsing, filters, and contract detail views.

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18.x  
- npm >= 9.x  

### Installation
```bash
# Clone the repository
git clone https://github.com/Sadab-Ansari/Contract_SPA_Dashboard.git
cd smart-contracts-dash
# Install dependencies
npm install





