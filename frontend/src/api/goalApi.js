import axiosClient from "./axiosClient";

export async function getGoals() {
  const response = await axiosClient.get("/api/goals");
  return response.data;
}

export async function createGoal(goalData) {
  const response = await axiosClient.post("/api/goals", goalData);
  return response.data;
}

export async function updateGoal(goalId, goalData) {
  const response = await axiosClient.patch(`/api/goals/${goalId}`, goalData);
  return response.data;
}

export async function deleteGoal(goalId) {
  const response = await axiosClient.delete(`/api/goals/${goalId}`);
  return response.data;
}
