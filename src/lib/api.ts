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

interface UpdateHabitData {
  id: string;
  name: string;
  description: string;
  frequency: string;
  icon: string;
  daysOfWeek: number[];
  dateTime: string;
}

interface DeleteHabitData {
  id: string;
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

export const getHabitStats = async () => {
  try {
    const response = await axios.get("/api/habits/stats");
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

export const putUpdateHabit = async (data: UpdateHabitData) => {
  try {
    const response = await axios.put(`/api/habits/${data?.id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteHabit = async (data: DeleteHabitData) => {
  try {
    const response = await axios.delete(`/api/habits/${data?.id}`);
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
