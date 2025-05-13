import axios from "axios";

interface RegisterUserData {
  name: string;
  email: string;
  password: string;
}

export const registerUser = async (data: RegisterUserData) => {
  const response = await axios.post("/api/account/register", data);
  return response.data;
};
