## 🚀 Setup Instructions

## 1.Clone the repository
```
git clone https://github.com/Sadab-Ansari/Contract_SPA_Dashboard.git
cd Saas_Contract_Dashboard
```
## 2.Install dependencies
```
npm install
```

## 3.Run the development server
```
npm run dev
```

## 🛠 Tech Stack Choices  

- **React (Vite)** → Fast development with functional components and hooks  
- **Tailwind CSS** → Utility-first styling for responsive design  
- **shadcn/ui** → Pre-built, modern UI components  
- **React Router v6** → Client-side routing  
- **Context API** → Lightweight state management


## 📌 Assumptions Made  

- Authentication is simulated with a **mock login** (any username, password = `test123`).  
- API responses are mocked using **local JSON files** in `/public/contracts.json`.  
- No real backend or database is integrated; data fetching uses the browser’s native `fetch()`.  
- JWT storage in `localStorage` is only for **simulation** (not real authentication).  

## 🌐 Deployment  

The project is deployed on **Vercel** for easy access and demonstration.  

🔗 **Live Demo:** [https://contract-spa-dashboard.vercel.app](https://contract-spa-dashboard.vercel.app)  

