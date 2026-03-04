"use client";

import { KPICards } from "./KPICards";
import { ChartsSection } from "./ChartsSection";
import { RecentActivityTable } from "./RecentActivityTable";

export function DashboardOverview() {
    return (
        <div className="space-y-6 max-w-[1600px] mx-auto">
            <KPICards />
            <ChartsSection />
            <RecentActivityTable />
        </div>
    );
}
