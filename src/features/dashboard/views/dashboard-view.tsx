import { DashboardHeader } from "../components/dashboard-header";
import { HeroPatter } from "../components/hero-pattern";
import { PageHeader } from "@/components/page-header";
import { TextInputPanel } from "../components/text-input-panel";

export function DashboardView() {
  return (
    <div className="relative">
      <PageHeader title="Dashboard" className="lg:hidden" />
      <HeroPatter />

      <div className="relative space-y-8 p-4 lg:p-16">
        <DashboardHeader />
        <TextInputPanel />
      </div>
    </div>
  );
}
