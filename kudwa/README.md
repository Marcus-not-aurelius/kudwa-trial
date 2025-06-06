Introduction
Hello and thank you for taking the time to read me! I will be going into details about the tech stack here as well as explaining our basic features. This websites aims to show the user their mock data

Tech stack
React Router Dom

This package simply re-exports everything from react-router to smooth the upgrade path for v6 applications. Once upgraded you can change all of your imports and remove it from your dependencies

find the repo here: https://github.com/remix-run/react-router

find the npm page here: https://www.npmjs.com/package/react-router-dom

reliability:

constantly updated gitlab issues are miniscule high rate of usage and downloads

React Icons

Include popular icons in your React projects easily with react-icons, which utilizes ES6 imports that allows you to include only the icons that your project is using.

find the repo here: https://github.com/react-icons/react-icons

find the npm page here: https://github.com/react-icons/react-icons#readme

reliability:

constantly maintained and updated.

Pages
Dashboard page

The Dashboard.jsx component is a dynamic and interactive analytics dashboard built with React and ApexCharts. It visualizes key performance indicators (KPIs) and various financial datasets from preloaded JSON files (monthly.json, quarterly.json, yearly.json) depending on the selected timeframe.

✨ Features Timeframe Toggle: Users can switch between Monthly, Quarterly, and Yearly views using a dropdown menu. Data and charts update accordingly.

Dynamic Breadcrumbs: Breadcrumbs automatically reflect the selected timeframe to enhance navigation clarity.

Flexible Chart Rendering: The dashboard supports various chart types, rendered based on the data:

Line Charts

Bar Charts

Donut/Pie Charts

Mixed Charts (stacked bars + lines)

Automatically falls back to Donut for unknown types.

Modular & Reusable Components: Chart components (LineChart, BarChart, DonutChart, MixedChart) are memoized with React.memo and configured with useMemo for performance.

Responsive KPI Layout: KPIs are grouped and placed alongside charts in alternating left-right layouts to improve visual balance.

🧠 Data-Driven Design Reads data from:

main-dashboard/monthly.json

main-dashboard/quarterly.json

main-dashboard/yearly.json

Expects a structure with:

mainDashboard.dateArray

mainDashboard.charts

mainDashboardKPIs.topKPIs and KPIs

Automatically skips empty or invalid chart entries.

📁 File Dependencies Dashboard.css: Contains layout and styling for charts and KPI cards.

useBreadcrumbs.jsx: Custom hook to manage and update breadcrumbs.

Chart from react-apexcharts: Used for rendering all charts.

✅ Key Strengths Clean separation of logic and presentation

Efficient data switching and rendering

Scalable design ready for integration with live data or APIs

Home

The Home.jsx component is a clean and minimal landing page that introduces users to the app — Kudwa-ish — and provides a gateway to the main dashboard.

✨ Features Simple, Elegant Welcome UI Introduces the app with a bold title and a short tagline: “Your data, visualized beautifully.”

"Go to App" Button Two call-to-action buttons (in header and main content) navigate to the /dashboard route using react-router-dom’s <Link> component.

Responsive Layout & Styling Designed with a black-and-white color theme (defined in Home.css), creating a modern, professional look suitable for a data platform.

🔗 Route Accessible via / (root path)

Navigates to /dashboard where the main visualizations and KPIs are located

📁 File Dependencies Home.css: Contains layout, typography, and button styling for the landing page

Uses Link from react-router-dom for client-side navigation

✅ Purpose Acts as the entry point to the app and sets the tone for a polished, data-centric user experience.

Let me know if you want a visual mockup description, layout diagram, or code comments included too.

Reports page

The ReportPage.jsx component is a fully interactive, expandable financial reporting interface built to visualize hierarchical financial data across different time periods.

✅ Purpose This page allows users to analyze profit and loss data dynamically across monthly, quarterly, or yearly views — with expandable categories and subcategories for detailed financial insight.

✨ Key Features Period Toggle Buttons Users can choose between Monthly, Quarterly, and Yearly views. The data is automatically aggregated based on the selected timeframe.

Expandable Tree Structure Financial fields can contain nested subfields. These are shown in an indented, collapsible table using a recursive <Field> component.

Dynamic Label Generation Date labels are generated intelligently based on the report's starting date and selected period (e.g., "Jan 2024", "Q2 2024", "2024").

Data Aggregation The table supports dynamic aggregation of values from monthly data into quarters or full years.

Responsive Breadcrumbs Breadcrumbs update automatically to reflect the current time selection, e.g., Report > Yearly.

Graceful Fallback Displays a friendly message if the report.json file contains no usable data.

📁 File Dependencies report.json Located in data/Report/report.json. Must include a reportResult object with:

startingDate: in YYYY-MM format

profitnLoss: array of sections with nested fields

ReportPage.css Styles the buttons, table, and expandable layout cleanly with readable spacing and hierarchy indicators.

⚙️ Key Components & Logic 🔄 Field component Renders each row and its nested children recursively

Memoizes processed values for performance

Adds indentation based on depth level

Handles expand/collapse toggling

🔢 Aggregation & Labels aggregateValues(values, period) – sums monthly values into quarterly/yearly

generateLabels(startDate, count, period) – builds appropriate x-axis labels

🧠 Tech Highlights React Hooks: useState, useMemo, useEffect used for performance and interactivity

Modular, readable logic: Aggregation, formatting, and rendering are cleanly separated

Expandable recursion: The use of recursion for nested fields provides a flexible tree structure

🔗 Route Available at /report

Updates breadcrumbs: Report > [Timeframe]

Layout
Main Layout

Key Features Collapsible Sidebar The sidebar’s visibility is controlled via useState and can be toggled programmatically or via a keyboard shortcut (Ctrl + B).

Keyboard Shortcut with useCtrlB Hook Pressing Ctrl + B triggers the sidebar toggle using a custom hook.

React Router Integration Uses <Outlet /> from react-router-dom to render nested page components based on the current route.

🧠 Tech Highlights React Hooks: useState for sidebar state and a custom useCtrlB hook for keyboard control

Modular Components: Sidebar and Navbar are kept in reusable, isolated components

Clean Layout Structure: Ensures consistent UI and responsive content areas

💡 Styling Main layout is styled via MainLayout.css

Class names:

main-layout-container: wraps sidebar + main content

main-container-navbar: wraps navbar + page outlet

main-content: main page rendering area

Hooks
*Use Breadcrumbs

The useBreadcrumbs hook provides an easy interface for accessing and updating the breadcrumb navigation state in your app.

✅ Purpose It connects to a global breadcrumb context (from useBreadcrumbContext) and exposes:

breadcrumbs: current breadcrumb trail (array)

setBreadcrumbs: function to update the breadcrumb trail (alias for updateBreadcrumbs)

🔧 Internals Relies on useBreadcrumbContext, which is assumed to be a context hook managing breadcrumb state globally.

Serves as a lightweight abstraction layer so components don’t need to work with context directly.

Use control B

🧠 useCtrlB Hook Description A custom React hook that listens for the Ctrl + B keyboard shortcut and triggers a callback function when pressed.

Purpose Useful for toggling UI elements (like a sidebar) or performing quick actions with a familiar hotkey.

How It Works

Attaches a keydown event listener on mount.

Checks if Ctrl + B is pressed.

If yes, prevents default behavior and runs the callback.

Cleans up the event listener on unmount.

Stores
Breadcrumb store

Purpose: Manages and provides breadcrumb state globally across your React app.

How it works:

Uses React Context (BreadcrumbContext) to share breadcrumb data and an update function across components.

Initializes breadcrumbs with a default value ([{ label: "Home", path: "/" }]).

Provides a function updateBreadcrumbs to update the breadcrumb state.

Components wrapped inside BreadcrumbProvider can access breadcrumbs and update function via the context.

Key parts:

BreadcrumbProvider: The context provider component that holds the breadcrumb state (breadcrumbs) and updater (updateBreadcrumbs). Wrap your app or relevant parts with this provider.

useBreadcrumbContext: A custom hook to safely consume the breadcrumb context. It throws an error if used outside the provider, ensuring correct usage.

Usage: Wrap your app with <BreadcrumbProvider>, then use useBreadcrumbContext() in child components to get or update breadcrumbs.