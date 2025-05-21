"use client";
import { Checkbox } from "@/components/ui/checkbox";
import PanelHeader from "@/components/ui/panel-header";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetHabits } from "@/hooks/api";
import { Habit } from "@/types/shared";

export default function TodaysHabits() {
  const { data: habitsData, isLoading } = useGetHabits();

  console.log("habitsData", habitsData);

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
      {habitsData?.length > 0 &&
        habitsData.map((habit: Habit) => (
          <div
            key={habit.id}
            className="flex items-center justify-between p-4 border rounded-md bg-gray-100 "
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
    </div>
  );
}
