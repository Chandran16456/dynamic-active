import axiosClient from "./axiosClient";

export async function getStudents() {
  const response = await axiosClient.get("/api/students");
  return response.data;
}

export async function getMyStudentProfile() {
  const response = await axiosClient.get("/api/students/me");
  return response.data;
}

export async function createStudent(studentData) {
  const response = await axiosClient.post("/api/students", studentData);
  return response.data;
}

export async function updateStudent(studentId, studentData) {
  const response = await axiosClient.patch(`/api/students/${studentId}`, studentData);
  return response.data;
}

export async function deleteStudent(studentId) {
  const response = await axiosClient.delete(`/api/students/${studentId}`);
  return response.data;
}
