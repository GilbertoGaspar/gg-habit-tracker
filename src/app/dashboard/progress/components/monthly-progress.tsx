"use client";
import PanelHeader from "@/components/ui/panel-header";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetHabits } from "@/hooks/api";
import { Frown } from "lucide-react";
import ProgressChart from "./progress-chart";
import Heatmap from "./heat-map";
import { Separator } from "@/components/ui/separator";
import { useMemo } from "react";
import { Habit, HabitLog } from "@/types/shared";

export default function MonthlyProgress() {
  const { data: habitsData, isLoading } = useGetHabits();

  const flattenedCompletedHabitLogs = useMemo(() => {
    return habitsData
      ?.reduce((acc: HabitLog[], habit: Habit) => {
        return [...acc, ...habit.habitLogs];
      }, [])
      .filter((habitLog: HabitLog) => habitLog.completed);
  }, [habitsData]);

  const heatMapData = useMemo(() => {
    const data = flattenedCompletedHabitLogs?.reduce(
      (acc: Record<string, number>, habitLog: HabitLog) => {
        const date = new Date(habitLog.date).toISOString().split("T")[0];
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      },
      {}
    );
    return data;
  }, [flattenedCompletedHabitLogs]);

  const progressChartData = useMemo(() => {
    const data = [
      { id: 0, day: "Sun", value: 0 },
      { id: 1, day: "Mon", value: 0 },
      { id: 2, day: "Tue", value: 0 },
      { id: 3, day: "Wed", value: 0 },
      { id: 4, day: "Thu", value: 0 },
      { id: 5, day: "Fri", value: 0 },
      { id: 6, day: "Sat", value: 0 },
    ];
    flattenedCompletedHabitLogs?.forEach((habitLog: HabitLog) => {
      const date = new Date(habitLog.date);
      const dayIndex = date.getDay();
      data[dayIndex].value++;
    });
    return data;
  }, [flattenedCompletedHabitLogs]);

  return (
    <div className="flex flex-col gap-2 max-w-[336px] w-full">
      <PanelHeader>Monthly Progress</PanelHeader>
      {isLoading && (
        <>
          <Skeleton className="h-[135px] rounded-md" />
          <Skeleton className="h-[135px] rounded-md" />
        </>
      )}
      {habitsData?.length > 0 && (
        <div className="flex flex-col gap-2">
          <ProgressChart data={progressChartData} />
          <Separator className="self-stretch" orientation="horizontal" />
          <Heatmap data={heatMapData} />
        </div>
      )}
      {!isLoading && habitsData?.length === 0 && (
        <div className="flex items-center p-4 border rounded-md bg-gray-100 gap-1">
          <Frown />
          <p>No habits!</p>
        </div>
      )}
    </div>
  );
}
