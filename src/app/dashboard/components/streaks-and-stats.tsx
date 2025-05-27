"use client";
import PanelHeader from "@/components/ui/panel-header";
import { Separator } from "@/components/ui/separator";
import { useGetHabitStats } from "@/hooks/api";
import { Loader2 } from "lucide-react";

export default function StreaksAndStats() {
  const { data: habitStats, isLoading } = useGetHabitStats();

  return (
    <div className="flex flex-col gap-2 max-w-[336px] w-full">
      <PanelHeader>Streaks & Stats</PanelHeader>
      <div className="flex flex-wrap items-center justify-between p-4 border rounded-md bg-gray-100 ">
        <div className="flex flex-1 items-center gap-2 justify-between py-1">
          <p>Current streak</p>
          {isLoading ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            <p>{habitStats?.currentStreak || 0} Days</p>
          )}
        </div>
        <Separator />
        <div className="flex flex-1 items-center gap-2 justify-between py-1">
          <p>Longest streak</p>
          {isLoading ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            <p>{habitStats?.longestStreak || 0} Days</p>
          )}
        </div>
        <Separator />
        <div className="flex flex-1 items-center gap-2 justify-between py-1">
          <p>Total habits completed</p>
          {isLoading ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            <p>{habitStats?.totalCompleted || 0}</p>
          )}
        </div>
      </div>
    </div>
  );
}
