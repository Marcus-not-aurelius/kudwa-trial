import React, { useState, useMemo } from "react";
import reportJson from "../../data/Report/report.json";
import "./ReportPage.css";

function parseYearMonth(ym) {
    const [year, month] = ym.split("-").map(Number);
    return new Date(year, month - 1);
}

function aggregateValues(values, period) {
    if (period === "monthly") return values;

    const periodLength = period === "quarterly" ? 3 : 12;
    const result = [];

    for (let i = 0; i < values.length; i += periodLength) {
        const slice = values.slice(i, i + periodLength);
        const sum = slice.reduce((acc, val) => acc + (val ?? 0), 0);
        result.push(sum);
    }
    return result;
}

function generateLabels(startDate, count, period) {
    const labels = [];
    let date = parseYearMonth(startDate);

    const increment = period === "monthly" ? 1 : period === "quarterly" ? 3 : 12;

    for (let i = 0; i < count; i++) {
        labels.push(
            period === "monthly"
                ? date.toLocaleString("default", { month: "short", year: "numeric" })
                : period === "quarterly"
                    ? `Q${Math.floor(date.getMonth() / 3 + 1)} ${date.getFullYear()}`
                    : `${date.getFullYear()}`
        );
        date = new Date(date.getFullYear(), date.getMonth() + increment, 1);
    }
    return labels;
}

function Field({ field, period, startDate, level = 0 }) {
    const [expanded, setExpanded] = useState(false);

    const values = useMemo(() => {
        if (!field.actualData || !field.actualData.length) return [];
        const monthlyValues = field.actualData[0].value || [];
        return aggregateValues(monthlyValues, period);
    }, [field, period]);

    const labels = useMemo(() => generateLabels(startDate, values.length, period), [
        startDate,
        values.length,
        period,
    ]);

    // Indent based on level
    const indentPx = level * 20;

    return (
        <>
            <tr
                className="field-row"
                onClick={() => field.fields && field.fields.length > 0 && setExpanded(!expanded)}
                style={{ cursor: field.fields && field.fields.length > 0 ? "pointer" : "default" }}
            >
                <td style={{ paddingLeft: indentPx + 10, userSelect: "none" }}>
                    {field.fields && field.fields.length > 0 ? (
                        <span className="expand-icon">{expanded ? "▼" : "▶"}</span>
                    ) : (
                        <span className="bullet-icon">•</span>
                    )}{" "}
                    {field.name}
                </td>
                {values.map((val, i) => (
                    <td key={i} className="value-cell">
                        {val.toFixed(2)}
                    </td>
                ))}
            </tr>
            {expanded &&
                field.fields &&
                field.fields.map((subField) => (
                    <Field key={subField.id} field={subField} period={period} startDate={startDate} level={level + 1} />
                ))}
        </>
    );
}

export default function ReportPage() {
    const [period, setPeriod] = useState("monthly");
    const { reportResult } = reportJson;

    if (!reportResult) return <div>No report data found</div>;

    const { startingDate, profitnLoss } = reportResult;

    // Calculate max columns to generate labels once (based on first field with data)
    const maxDataLength =
        profitnLoss.flatMap((section) =>
            section.fields.flatMap((f) => (f.actualData?.[0]?.value?.length || 0))
        ).reduce((max, val) => Math.max(max, val), 0);

    const labels = generateLabels(startingDate, period === "monthly" ? maxDataLength : Math.ceil(maxDataLength / (period === "quarterly" ? 3 : 12)), period);

    return (
        <div className="report-page">
            <h1>Financial Report</h1>

            <div className="period-buttons">
                {["monthly", "quarterly", "yearly"].map((p) => (
                    <button
                        key={p}
                        onClick={() => setPeriod(p)}
                        className={period === p ? "active" : ""}
                    >
                        {p.charAt(0).toUpperCase() + p.slice(1)}
                    </button>
                ))}
            </div>

            {profitnLoss.map((section) => (
                <div key={section.id} className="section">
                    <h2>{section.name}</h2>
                    <div className="report-table-container">
                        <table className="report-table">
                            <thead>
                                <tr>
                                    <th>Category</th>
                                    {labels.map((label, i) => (
                                        <th key={i}>{label}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {section.fields.map((field) => (
                                    <Field key={field.id} field={field} period={period} startDate={startingDate} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ))}
        </div>
    );
}