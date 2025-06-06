// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from './pages/home/Home.jsx'
import DashboardPage from './pages/dashboard/Dashboard.jsx'
import ReportPage from "./pages/report/ReportPage.jsx";
import Sidebar from "./components/sidebar/Sidebar";
import MainLayout from './layouts/MainLayout.jsx'

function App() {
  return (
    <>
      <Routes>
          <Route path="/" element={<HomePage />} />

        {/* Dashboard + Report share the same layout */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/report" element={<ReportPage />} />
        </Route>

        

        {/* Catch-all: redirect unknown routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;