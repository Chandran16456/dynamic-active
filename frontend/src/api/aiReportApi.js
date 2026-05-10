import axiosClient from "./axiosClient";

export async function generateAdminWeeklyReport() {
  const response = await axiosClient.post("/api/ai-reports/admin/weekly");
  return response.data;
}

export async function getAIReports() {
  const response = await axiosClient.get("/api/ai-reports");
  return response.data;
}

export async function getAIReport(reportId) {
  const response = await axiosClient.get(`/api/ai-reports/${reportId}`);
  return response.data;
}

export async function deleteAIReport(reportId) {
  const response = await axiosClient.delete(`/api/ai-reports/${reportId}`);
  return response.data;
}

export async function runAdminReportAutomationNow() {
  const response = await axiosClient.post(
    "/api/ai-reports/admin/run-automation-now"
  );
  return response.data;
}