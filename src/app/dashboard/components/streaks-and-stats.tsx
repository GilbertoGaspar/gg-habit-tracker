import PanelHeader from "@/components/ui/panel-header";
import { Separator } from "@/components/ui/separator";

export default function StreaksAndStats() {
  return (
    <div className="flex flex-col gap-2 max-w-[336px] w-full">
      <PanelHeader>Streaks & Stats</PanelHeader>
      <div className="flex flex-wrap items-center justify-between p-4 border rounded-md bg-gray-100 ">
        <div className="flex flex-1 items-center gap-2 justify-between py-1">
          <p>Current streak</p>
          <p>10 Days</p>
        </div>
        <Separator />
        <div className="flex flex-1 items-center gap-2 justify-between py-1">
          <p>Longest streak</p>
          <p>15 Days</p>
        </div>
        <Separator />
        <div className="flex flex-1 items-center gap-2 justify-between py-1">
          <p>Total habits completed</p>
          <p>140</p>
        </div>
      </div>
    </div>
  );
}
