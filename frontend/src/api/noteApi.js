import axiosClient from "./axiosClient";

export async function getNotes() {
  const response = await axiosClient.get("/api/notes");
  return response.data;
}

export async function createNote(noteData) {
  const response = await axiosClient.post("/api/notes", noteData);
  return response.data;
}

export async function updateNote(noteId, noteData) {
  const response = await axiosClient.patch(`/api/notes/${noteId}`, noteData);
  return response.data;
}

export async function deleteNote(noteId) {
  const response = await axiosClient.delete(`/api/notes/${noteId}`);
  return response.data;
}
