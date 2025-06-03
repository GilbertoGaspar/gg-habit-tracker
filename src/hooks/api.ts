"use client";
import { getCurrentUser, getHabits, getHabitStats } from "@/lib/api";
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

export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    staleTime: 1000 * 60 * 60, // 60 minutes
  });
};
