import { useState } from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import Navbar from '../components/navbar/Navbar';
import { Outlet } from 'react-router-dom';
import './MainLayout.css';
import useCtrlB from '../hooks/useCtrlB';

export default function MainLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    function handleToggle() {
        setSidebarOpen(prev => !prev);
    }

    useCtrlB(() => {
        handleToggle();
    });

    return (
        <div className="main-layout-container">
            <Sidebar open={sidebarOpen} toggleSidebar={handleToggle} />
            <div className="main-container-navbar">
                <Navbar />
                <div className="main-content">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}