import { createContext, useContext, useState } from "react";

// 👇 Set default value here (optional but helpful for auto-complete or SSR)
const BreadcrumbContext = createContext({
  breadcrumbs: [],
  updateBreadcrumbs: () => {},
});

export function BreadcrumbProvider({ children }) {
  const [breadcrumbs, setBreadcrumbs] = useState([
    { label: "Home", path: "/" }, // Your default breadcrumbs here
  ]);

  const updateBreadcrumbs = (newCrumbs) => {
    setBreadcrumbs(newCrumbs);
  };

  return (
    <BreadcrumbContext.Provider value={{ breadcrumbs, updateBreadcrumbs }}>
      {children}
    </BreadcrumbContext.Provider>
  );
}

export function useBreadcrumbContext() {
  const context = useContext(BreadcrumbContext);
  if (!context) {
    throw new Error("useBreadcrumbContext must be used within BreadcrumbProvider");
  }
  return context;
}