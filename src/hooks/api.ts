"use client";
import { getHabits, getHabitStats } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useGetHabits = () => {
  return useQuery({
    queryKey: ["habits"],
    queryFn: getHabits,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useGetHabitStats = () => {
  return useQuery({
    queryKey: ["habits-stats"],
    queryFn: getHabitStats,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
