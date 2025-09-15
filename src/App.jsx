import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { UploadModal } from "@/components/modals/UploadModal";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ContractDetail from "./pages/ContractDetail";
import Insights from "./pages/Insights";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import { useState } from "react";
import "./index.css"; // Explicit CSS import

const queryClient = new QueryClient();

const App = () => {
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Login />} />
              
              {/* Protected Routes with Dashboard Layout */}
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <DashboardLayout onUploadClick={() => setUploadModalOpen(true)}>
                      <Dashboard />
                    </DashboardLayout>
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/contracts/:id" 
                element={
                  <ProtectedRoute>
                    <DashboardLayout onUploadClick={() => setUploadModalOpen(true)}>
                      <ContractDetail />
                    </DashboardLayout>
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/insights" 
                element={
                  <ProtectedRoute>
                    <DashboardLayout onUploadClick={() => setUploadModalOpen(true)}>
                      <Insights />
                    </DashboardLayout>
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/reports" 
                element={
                  <ProtectedRoute>
                    <DashboardLayout onUploadClick={() => setUploadModalOpen(true)}>
                      <Reports />
                    </DashboardLayout>
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/settings" 
                element={
                  <ProtectedRoute>
                    <DashboardLayout onUploadClick={() => setUploadModalOpen(true)}>
                      <Settings />
                    </DashboardLayout>
                  </ProtectedRoute>
                } 
              />

              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            
            {/* Global Upload Modal */}
            <UploadModal
              isOpen={uploadModalOpen}
              onClose={() => setUploadModalOpen(false)}
            />
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
