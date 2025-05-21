"use client";
import { Checkbox } from "@/components/ui/checkbox";
import PanelHeader from "@/components/ui/panel-header";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetHabits } from "@/hooks/api";
import { Habit } from "@/types/shared";
import { Frown } from "lucide-react";
import { useMemo } from "react";

export default function TodaysHabits() {
  const { data: habitsData, isLoading } = useGetHabits();

  const todaysHabits = useMemo(() => {
    const today = new Date();
    const todayDayOfWeek = today.getDay();

    const habitsForToday = habitsData?.filter((habit: Habit) => {
      if (habit.status !== "ACTIVE") return false;

      return habit?.reminders?.some((reminder) =>
        reminder?.days?.some((day) => day?.dayOfWeek === todayDayOfWeek)
      );
    });

    return habitsForToday;
  }, [habitsData]);

  return (
    <div className="flex flex-col gap-2 max-w-[336px] w-full">
      <PanelHeader>Today&apos;s Habits</PanelHeader>
      {isLoading && (
        <>
          {[0, 1, 2].map((num) => (
            <Skeleton key={num} className="h-[54px] rounded-md" />
          ))}
        </>
      )}
      {todaysHabits?.length > 0 &&
        todaysHabits.map((habit: Habit) => (
          <div
            key={habit.id}
            className="flex items-center justify-between p-4 border rounded-md bg-gray-100"
          >
            <div className="flex items-center gap-2">
              <Checkbox
                id={`checkbox-${habit.id}`}
                className="rounded-full w-6 h-6 cursor-pointer"
              />
              <label
                htmlFor={`checkbox-${habit.id}`}
                className="cursor-pointer"
              >
                {habit.name}
              </label>
            </div>
          </div>
        ))}
      {!isLoading && todaysHabits?.length === 0 && (
        <div className="flex items-center p-4 border rounded-md bg-gray-100 gap-1">
          <Frown />
          <p>No habits for today!</p>
        </div>
      )}
    </div>
  );
}
