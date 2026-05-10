import axiosClient from "./axiosClient";

export async function getSchedules() {
  const response = await axiosClient.get("/api/schedules");
  return response.data;
}

export async function createSchedule(scheduleData) {
  const response = await axiosClient.post("/api/schedules", scheduleData);
  return response.data;
}

export async function updateSchedule(scheduleId, scheduleData) {
  const response = await axiosClient.patch(`/api/schedules/${scheduleId}`, scheduleData);
  return response.data;
}

export async function deleteSchedule(scheduleId) {
  const response = await axiosClient.delete(`/api/schedules/${scheduleId}`);
  return response.data;
}
