import React, { useState, useEffect, useTransition } from "react";
import { Tabs, Tab, TabContent } from "./Tabs";
import InfiniteProgressBar from "./InfiniteProgressBar.tsx";

// Simulate a heavy API call returning large report data.
async function fetchReportData() {
    return new Promise<string[]>((resolve) => {
        setTimeout(() => {
            // Create a large array to simulate heavy data.
            const heavyData = Array.from({ length: 10000 }, (_, i) => `Row ${i + 1}`);
            resolve(heavyData);
        }, 2000);
    });
}

// Heavy rendering components for each tab.
// Using React.memo to avoid unnecessary re-renders when reportData updates.
const ReportSummary: React.FC<{ data: string[] }> = React.memo(({ data }) => {
    return (
        <div>
            <h2 className="text-lg font-bold">Summary</h2>
            <p>Total rows: {data.length}</p>
        </div>
    );
});

const ReportDetails: React.FC<{ data: string[] }> = React.memo(({ data }) => {
    return (
        <div>
            <h2 className="text-lg font-bold">Details</h2>
            <ul className="max-h-64 overflow-y-auto">
                {data.slice(0, 100).map((row, idx) => (
                    <li key={idx} className="text-sm">{row}</li>
                ))}
            </ul>
        </div>
    );
});

const ReportStats: React.FC<{ data: string[] }> = React.memo(({ data }) => {
    const totalLength = data.reduce((acc, row) => acc + row.length, 0);
    const avgLength = Math.round(totalLength / data.length);
    return (
        <div>
            <h2 className="text-lg font-bold">Stats</h2>
            <p className="text-sm">Average row length: {avgLength}</p>
        </div>
    );
});

export const Report: React.FC = () => {
    const [reportData, setReportData] = useState<string[] | null>(null);
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        async function loadData() {
            const data = await fetchReportData();
            // Mark this update as a transition so the UI stays responsive.
            startTransition(() => {
                setReportData(data);
            });
        }
        loadData();
    }, []);

    if (!reportData) {
        return <div className="p-4">Loading report data...</div>;
    }

    return (
        <div>
            <InfiniteProgressBar />

        <Tabs defaultTabName="summary">
            <Tab name="summary">Summary</Tab>
            <Tab name="details">Details</Tab>
            <Tab name="stats">Stats</Tab>


            <TabContent name="summary">
                <ReportSummary data={reportData} />
            </TabContent>
            <TabContent name="details">
                <ReportDetails data={reportData} />
            </TabContent>
            <TabContent name="stats">
                <ReportStats data={reportData} />
            </TabContent>
        </Tabs>
        </div>
    );
};
