import { useBreadcrumbContext } from "../stores/useBreadcrumbContext";

export default function useBreadcrumbs() {
  const { breadcrumbs, updateBreadcrumbs } = useBreadcrumbContext();
  return {
    breadcrumbs,
    setBreadcrumbs: updateBreadcrumbs,
  };
}   