import useBreadcrumbs from "../../hooks/useBreadcrumbs";
import { NavLink } from "react-router-dom";
import './Breadcrumbs.css'

export default function Breadcrumbs() {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <nav className="breadcrumbs">
      {breadcrumbs.map((crumb, index) => (
        <span key={index} className="breadcrumbs-text-container">
          <NavLink to={crumb.path}>{crumb.label}</NavLink>
          {index < breadcrumbs.length - 1 && " / "}
        </span>
      ))}
    </nav>
  );
}