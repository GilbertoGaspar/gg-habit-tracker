export interface Habit {
  id: string;
  icon: string;
  name: string;
}

export type HabitStatus = "ACTIVE" | "INACTIVE" | "ARCHIVED";
