import axios from "axios";

interface RegisterUserData {
  name: string;
  email: string;
  password: string;
}

interface CreateHabitData {
  name: string;
  description: string;
  frequency: string;
  icon: string;
  daysOfWeek: number[];
  dateTime: string;
}

export const registerUser = async (data: RegisterUserData) => {
  try {
    const response = await axios.post("/api/account/register", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getHabits = async () => {
  try {
    const response = await axios.get("/api/habits");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postCreateHabit = async (data: CreateHabitData) => {
  try {
    const response = await axios.post("/api/habits", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const toggleHabit = async (id: string) => {
  try {
    const response = await axios.post(`/api/habits/${id}/toggle`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
