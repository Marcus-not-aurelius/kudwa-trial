// src/components/sidebar/Sidebar.jsx
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { useBreadcrumbContext } from '../../stores/useBreadcrumbContext'
import Breadcrumbs from "../breadcrumbs/Breadcrumbs";

export default function Navbar() {
    const { breadcrumbs, updateBreadcrumbs } = useBreadcrumbContext();
    return (
        <header className="navbar">
            <div className="breadcrumb">
                <Breadcrumbs></Breadcrumbs>
            </div>
        </header>
    )
}