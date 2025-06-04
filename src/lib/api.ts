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

interface UpdateCurrentUserData {
  emailNotifications: boolean;
}

interface ResetPasswordData {
  token: string;
  password: string;
}

interface ForgotPasswordData {
  email: string;
}

export const getCurrentUser = async () => {
  try {
    const response = await axios.get("/api/users/me");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postUpdateCurrentUser = async (data: UpdateCurrentUserData) => {
  try {
    const response = await axios.post("/api/users/me", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (data: RegisterUserData) => {
  try {
    const response = await axios.post("/api/account/register", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postResetPassword = async (data: ResetPasswordData) => {
  try {
    const response = await axios.post("/api/account/reset-password", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postForgotPassword = async (data: ForgotPasswordData) => {
  try {
    const response = await axios.post("/api/account/forgot-password", data);
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
