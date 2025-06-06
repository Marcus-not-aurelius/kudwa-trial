import { NavLink, Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { IoIosMenu } from "react-icons/io";
import { BsFillGrid1X2Fill } from "react-icons/bs";
import { LuNewspaper } from "react-icons/lu";
import { CiLogout } from "react-icons/ci";
import { FaProjectDiagram } from "react-icons/fa";
import { RiInformation2Line } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import "./Sidebar.css";

export default function Sidebar({ open, toggleSidebar }) {
  return (
    <aside className={`sidebar ${open ? "open" : "closed"}`}>
      <div className={`sidebar-container ${open ? "sidebar-container-open" : "sidebar-container-closed"}`}>
        <div className={`sidebar-header ${open ? "open" : "closed"}`}>
          {open && (
            <Link to="/" className="logo">
              <span className="logo-highlight">Ku</span>dwa
            </Link>
          )}
          <button className="toggle-menu" onClick={toggleSidebar}>
            {open ? <IoMdClose /> : <IoIosMenu />}
          </button>
        </div>

        {open && (
          <nav className="nav-links">
            <NavLink
              to="/dashboard"
              className={({ isActive }) => (isActive ? "link-container active" : "link-container")}
            >
              <BsFillGrid1X2Fill />
              <span>Dashboard</span>
            </NavLink>

            <NavLink
              to="/report"
              className={({ isActive }) => (isActive ? "link-container active" : "link-container")}
            >
              <LuNewspaper />
              <span>Report</span>
            </NavLink>

            <NavLink
              to="/projects"
              className={({ isActive }) => (isActive ? "link-container active" : "link-container")}
            >
              <FaProjectDiagram />
              <span>Projects</span>
            </NavLink>

            <NavLink
              to="/aboutUs"
              className={({ isActive }) => (isActive ? "link-container active" : "link-container")}
            >
              <RiInformation2Line />
              <span>About Us</span>
            </NavLink>

            <div className="bottom-sidebar-section">
              <NavLink
                to="/settings"
                className={({ isActive }) => (isActive ? "bottom-sidebar-item link-container active" : "bottom-sidebar-item link-container")}
              >
                <span>Settings</span>
                <IoSettingsOutline />
              </NavLink>

              <NavLink
                to="/logout"
                className={({ isActive }) => (isActive ? "bottom-sidebar-item link-container active" : "bottom-sidebar-item link-container")}
              >
                <span>Logout</span>
                <CiLogout />
              </NavLink>
            </div>
          </nav>
        )}
      </div>
    </aside>
  );
}