import axiosClient from "./axiosClient";

export async function getObservations() {
  const response = await axiosClient.get("/api/observations");
  return response.data;
}

export async function createObservation(observationData) {
  const response = await axiosClient.post("/api/observations", observationData);
  return response.data;
}

export async function updateObservation(observationId, observationData) {
  const response = await axiosClient.patch(
    `/api/observations/${observationId}`,
    observationData
  );
  return response.data;
}

export async function deleteObservation(observationId) {
  const response = await axiosClient.delete(`/api/observations/${observationId}`);
  return response.data;
}
