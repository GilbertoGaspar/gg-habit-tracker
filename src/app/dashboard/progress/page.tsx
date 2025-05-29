import { Separator } from "@/components/ui/separator";
import StreaksAndStats from "../components/streaks-and-stats";
import CompletionOverTime from "./components/completion-over-time";
import MonthlyProgress from "./components/monthly-progress";

export default async function Progress() {
  return (
    <div className="flex flex-1 flex-wrap justify-center w-full p-4 gap-4">
      <div className="flex flex-col sm:flex-1 items-center py-4 gap-8">
        <MonthlyProgress />
        <CompletionOverTime />
      </div>
      <Separator
        className="hidden sm:block self-stretch"
        orientation="vertical"
      />
      <div className="flex flex-1 justify-center py-4">
        <StreaksAndStats />
      </div>
    </div>
  );
}
