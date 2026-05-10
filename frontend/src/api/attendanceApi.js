import axiosClient from "./axiosClient";

export async function createAttendanceSession(sessionData) {
  const response = await axiosClient.post("/api/attendance/sessions", sessionData);
  return response.data;
}

export async function getAttendanceSessions() {
  const response = await axiosClient.get("/api/attendance/sessions");
  return response.data;
}

export async function updateAttendanceSession(sessionId, sessionData) {
  const response = await axiosClient.patch(
    `/api/attendance/sessions/${sessionId}`,
    sessionData
  );
  return response.data;
}

export async function deleteAttendanceSession(sessionId) {
  const response = await axiosClient.delete(
    `/api/attendance/sessions/${sessionId}`
  );
  return response.data;
}

export async function getStudentsForAttendance(className) {
  const response = await axiosClient.get(`/api/attendance/students/${className}`);
  return response.data;
}

export async function markAttendanceBulk(sessionId, records) {
  const response = await axiosClient.post(
    `/api/attendance/sessions/${sessionId}/records`,
    { records }
  );
  return response.data;
}

export async function getAttendanceRecords(sessionId) {
  const response = await axiosClient.get(
    `/api/attendance/sessions/${sessionId}/records`
  );
  return response.data;
}

export async function updateAttendanceRecord(recordId, recordData) {
  const response = await axiosClient.patch(
    `/api/attendance/records/${recordId}`,
    recordData
  );
  return response.data;
}
