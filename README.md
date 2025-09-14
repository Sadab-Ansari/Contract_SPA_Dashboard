📑 SaaS Contracts Dashboard

A React + Tailwind single-page application simulating a SaaS contracts management dashboard.
Built for a UI/UX Developer Assignment to demonstrate modern frontend design, API handling, and state management.

✨ Features

🔐 Authentication

Mock login (any username, password = test123)

JWT stored in localStorage

📊 Contracts Dashboard

Sidebar navigation: Contracts, Insights, Reports, Settings

Topbar with profile dropdown

Search by contract name / parties

Filters: Status (Active, Expired, Renewal Due) & Risk (Low, Medium, High)

Pagination (10 rows per page)

Graceful handling of loading, empty, and error states

📑 Contract Detail Page

Metadata: parties, start & expiry dates, status, risk score

Clauses section with summaries + confidence scores

AI Insights section with risk & recommendation labels

Evidence panel with relevance scores and copy-to-clipboard functionality

⬆️ Upload Modal

Drag & drop or browse file

Simulated file upload with status indicators

📱 Responsive UI/UX

Fully optimized for desktop and mobile screens

🛠 Tech Stack

React (Vite, functional components, hooks)

Tailwind CSS for styling

shadcn/ui for reusable components

React Router v6 for routing

Context API for authentication & state management

Vercel for deployment
