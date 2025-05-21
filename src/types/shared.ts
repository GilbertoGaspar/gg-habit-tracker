export type HabitStatus = "ACTIVE" | "INACTIVE" | "ARCHIVED";

export type Frequency = "DAILY" | "WEEKLY" | "MONTHLY";

export interface Habit {
  id: string;
  name: string;
  description: string;
  frequency: Frequency;
  status: HabitStatus;
  icon: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  reminders: Reminder[];
  habitLogs: HabitLog[];
}

export interface Day {
  id: string;
  reminderId: string;
  dayOfWeek: number; // 0 = Sunday, 6 = Saturday
}

export interface Reminder {
  id: string;
  habitId: string;
  timeOfDay: string; // ISO string
  createdAt: string;
  days: Day[];
}

export interface HabitLog {
  id: string;
  date: string;
  completed: boolean;
  habitId: string;
}
