import React, { useEffect, useState, useMemo } from "react";
import Chart from "react-apexcharts";
import "./Dashboard.css";
import monthlyData from "../../data/main-dashboard/monthly.json";
import yearlyData from "../../data/main-dashboard/yearly.json";
import quarterlyData from "../../data/main-dashboard/quarterly.json";
import { FaInfo } from "react-icons/fa";
import useBreadcrumbs from '../../hooks/useBreadcrumbs.jsx';

const Dashboard = () => {
  const { setBreadcrumbs } = useBreadcrumbs();

  const [timeframe, setTimeframe] = useState("Monthly");
  const [dashboardData, setDashboardData] = useState(monthlyData);

  // Update dashboard data when timeframe changes
  useEffect(() => {
    switch (timeframe) {
      case "Monthly":
        setDashboardData(monthlyData);
        break;
      case "Quarterly":
        setDashboardData(quarterlyData);
        break;
      case "Yearly":
        setDashboardData(yearlyData);
        break;
      default:
        setDashboardData(monthlyData);
    }
  }, [timeframe]);

  // Update breadcrumbs when timeframe changes (separate effect)
  useEffect(() => {
    const newBreadcrumbs = [
      { label: "Dashboard", path: "/dashboard" },
      { label: timeframe },
    ];
    setBreadcrumbs((prev) => {
      // Only update if breadcrumbs changed
      if (JSON.stringify(prev) !== JSON.stringify(newBreadcrumbs)) {
        return newBreadcrumbs;
      }
      return prev;
    });
  }, [timeframe, setBreadcrumbs]);

  const labels = dashboardData.mainDashboard.dateArray;
  const { charts } = dashboardData.mainDashboard;
  const { topKPIs, KPIs } = dashboardData.mainDashboardKPIs;

  const getLineSeries = (items) =>
    items.map((item) => ({
      name: item.name,
      data: item.values,
    }));

  // Memoized chart components with useMemo

  const TopKPIs = ({ kpis }) => (
    <div className="kpi-grid">
      {kpis.map((kpi, idx) => (
        <div key={idx} className="kpi-card">
          <div className="kpi-title">{kpi.name}</div>
          <div className="kpi-value">{kpi.value.toLocaleString()}</div>
        </div>
      ))}
    </div>
  );

  const DonutChart = React.memo(({ title, series }) => {
    const options = useMemo(() => ({
      labels: series.map((s) => s.name),
      colors: ["#EAE62F", "#B09280", "#698AC5", "#35ea2f", "#b36072", "#b969c5"],
    }), [series]);

    const dataSeries = useMemo(() => series.map((s) => s.values), [series]);

    return (
      <div className="chart-container">
        <h2 className="chart-title">{title}</h2>
        <div className="chart-inner-wrapper">
          <Chart options={options} series={dataSeries} type="donut" width="100%" />
        </div>
      </div>
    );
  });

  const LineChart = React.memo(({ title, series }) => {
    const options = useMemo(() => ({
      xaxis: { categories: labels },
      colors: ["#EAE62F", "#B09280", "#698AC5", "#35ea2f", "#b36072", "#b969c5"],
    }), [labels]);

    return (
      <div className="chart-container">
        <h2 className="chart-title">{title}</h2>
        <div className="chart-inner-wrapper">
          <Chart options={options} series={series} type="line" height={300} />
        </div>
      </div>
    );
  });

  const BarChart = React.memo(({ title, series }) => {
    const options = useMemo(() => ({
      xaxis: { categories: labels },
      colors: ["#EAE62F", "#B09280", "#698AC5", "#35ea2f", "#b36072", "#b969c5"],
    }), [labels]);

    return (
      <div className="chart-container">
        <div className="chart-header">
          <h2 className="chart-title">{title}</h2>
          <div className="chart-info">
            <FaInfo />
          </div>
        </div>
        <div className="chart-inner-wrapper">
          <Chart options={options} series={series} type="bar" height={300} />
        </div>
      </div>
    );
  });

  const MixedChart = React.memo(({ title, stacked, bars, lines }) => {
    const options = useMemo(() => ({
      chart: { stacked },
      xaxis: { categories: labels },
      colors: ["#EAE62F", "#B09280", "#698AC5", "#35ea2f", "#b36072", "#b969c5"],
    }), [stacked, labels]);

    const series = useMemo(() => [
      ...bars.map((b) => ({ ...b, type: "bar" })),
      ...lines.map((l) => ({ ...l, type: "line" })),
    ], [bars, lines]);

    return (
      <div className="chart-container">
        <h2 className="chart-title">{title}</h2>
        <div className="chart-inner-wrapper">
          <Chart options={options} series={series} type="line" height={350} />
        </div>
      </div>
    );
  });

  const renderGridSections = () => {
    const allKPIs = [...topKPIs, ...KPIs];
    const chartEntries = Object.entries(charts).filter(
      ([, chartData]) => Array.isArray(chartData) && chartData.length > 0
    );

    const groups = [];
    let kpiIndex = 0;

    chartEntries.forEach(([key, chartData], index) => {
      const cleanData = chartData.filter(Boolean);
      const chartType = cleanData[0]?.chartType;

      const title = key
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase());

      const chartComponent = (() => {
        switch (chartType) {
          case "line":
            return <LineChart key={key} title={title} series={getLineSeries(cleanData)} />;
          case "bar":
            return <BarChart key={key} title={title} series={getLineSeries(cleanData)} />;
          case "donut":
          case "pie":
            return <DonutChart key={key} title={title} series={cleanData} />;
          case "columnStacked":
            const bars = getLineSeries(cleanData.filter(c => c.chartType === "columnStacked"));
            const lines = getLineSeries(cleanData.filter(c => c.chartType === "line"));
            return (
              <MixedChart
                key={key}
                title={title}
                stacked
                bars={bars}
                lines={lines}
              />
            );
          default:
            return (
              <DonutChart key={key} title={`${title} (Defaulted)`} series={cleanData} />
            );
        }
      })();

      const kpisSlice = allKPIs.slice(kpiIndex, kpiIndex + 4);
      kpiIndex += 4;

      const isEven = index % 2 === 0;
      const hasKPIs = kpisSlice.length > 0;

      groups.push(
        <div
          className={`mixed-grid-row ${hasKPIs ? "with-kpis" : "no-kpis"}`}
          key={`section-${index}`}
        >
          {hasKPIs ? (
            isEven ? (
              <>
                <TopKPIs kpis={kpisSlice} />
                <div className="chart-wrapper">{chartComponent}</div>
              </>
            ) : (
              <>
                <div className="chart-wrapper">{chartComponent}</div>
                <TopKPIs kpis={kpisSlice} />
              </>
            )
          ) : (
            <div className="chart-wrapper full-width">{chartComponent}</div>
          )}
        </div>
      );
    });

    return groups;
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>
          Now viewing{" "}
          <select
            className="dashboard-header-dropdown"
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
          >
            <option value="Monthly">Monthly</option>
            <option value="Quarterly">Quarterly</option>
            <option value="Yearly">Yearly</option>
          </select>{" "}
          Data
        </h1>
      </div>
      {renderGridSections()}
    </div>
  );
};

export default Dashboard;