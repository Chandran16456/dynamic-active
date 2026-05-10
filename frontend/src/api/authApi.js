import axiosClient from "./axiosClient";

export async function loginUser(username, password) {
  const response = await axiosClient.post("/api/auth/login", {
    username,
    password,
  });

  return response.data;
}

export async function getCurrentUser() {
  const response = await axiosClient.get("/api/auth/me");
  return response.data;
}
