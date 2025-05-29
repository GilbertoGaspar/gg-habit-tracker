"use client";
import { daysOfWeek } from "@/components/habit-form-week-day-selector";
import PanelHeader from "@/components/ui/panel-header";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetHabits } from "@/hooks/api";
import { Habit } from "@/types/shared";
import { Frown } from "lucide-react";
import { DynamicIcon, IconName } from "lucide-react/dynamic";

export default function CompletionOverTime() {
  const { data: habitsData, isLoading } = useGetHabits();

  return (
    <div className="flex flex-col gap-2 max-w-[336px] w-full">
      <PanelHeader>Completion Over Time</PanelHeader>
      {isLoading && (
        <>
          {[0, 1, 2].map((num) => (
            <Skeleton key={num} className="h-[54px] rounded-md" />
          ))}
        </>
      )}
      {habitsData?.length > 0 &&
        habitsData.map((habit: Habit) => {
          const completedHabitLogs = habit?.habitLogs?.filter(
            (habitLog) => habitLog.completed
          );

          const selectedDays =
            habit?.reminders?.[0]?.days?.map((currDay) => currDay?.dayOfWeek) ||
            [];
          return (
            <div
              key={habit.id}
              className="flex items-start justify-between p-2 border rounded-md bg-gray-100"
            >
              <div className="flex items-center gap-2">
                <DynamicIcon
                  name={habit.icon as IconName}
                  size={24}
                  style={{ height: "24px", width: "24px" }}
                />
                <span>{habit.name}</span>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="text-sm text-gray-500">
                  Completed: {completedHabitLogs.length}
                </span>
                <span className="text-sm text-gray-500">
                  Total Logs: {habit.habitLogs.length}
                </span>
                <div className="flex items-center gap-0.5">
                  {daysOfWeek.map((currentDay) => (
                    <div
                      key={currentDay.id}
                      className={`flex items-center justify-center rounded-full w-5 h-5 text-xs text-white ${
                        selectedDays.includes(currentDay.id)
                          ? "bg-primary"
                          : "bg-primary/40"
                      } `}
                    >
                      {currentDay.text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      {!isLoading && habitsData?.length === 0 && (
        <div className="flex items-center p-4 border rounded-md bg-gray-100 gap-1">
          <Frown />
          <p>No habits!</p>
        </div>
      )}
    </div>
  );
}
