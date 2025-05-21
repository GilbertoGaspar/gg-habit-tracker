"use client";
import HabitFormDialog from "@/components/habit-form-dialog";
import { Button } from "@/components/ui/button";
import PanelHeader from "@/components/ui/panel-header";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetHabits } from "@/hooks/api";
import { Habit } from "@/types/shared";
import { Frown } from "lucide-react";
import { DynamicIcon, IconName } from "lucide-react/dynamic";
import Link from "next/link";

export default function ManageHabits() {
  const { data: habitsData, isLoading } = useGetHabits();

  return (
    <div className="flex flex-col gap-2 max-w-[336px] w-full">
      <PanelHeader>Manage Habits</PanelHeader>
      <HabitFormDialog
        button={
          <Button className="self-end cursor-pointer">Create Habit</Button>
        }
        title="Create Habit"
        description="Create your habit here. Click create when you're done."
      />
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
            className="flex items-center justify-between p-2 border rounded-md bg-gray-100"
          >
            <div className="flex items-center gap-2">
              <DynamicIcon
                name={habit.icon as IconName}
                size={24}
                style={{ height: "24px", width: "24px" }}
              />
              <span>{habit.name}</span>
            </div>
            <Link href={`/dashboard/habits/${habit.id}`}>
              <Button className="cursor-pointer">View</Button>
            </Link>
          </div>
        ))}
      {!isLoading && habitsData?.length === 0 && (
        <div className="flex items-center p-4 border rounded-md bg-gray-100 gap-1">
          <Frown />
          <p>No habits!</p>
        </div>
      )}
    </div>
  );
}
