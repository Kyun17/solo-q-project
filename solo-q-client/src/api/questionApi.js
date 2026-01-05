import { axiosInstance } from "./axiosInstance";

/**
 * 목록 조회 (페이지 응답 형태)
 * response: { items: [], page, size, totalElements, totalPages, last }
 */
export async function fetchQuestions({ category, q, tag, page = 0, size = 10 }) {
  const params = { page, size };
  if (category && category !== "ALL") params.category = category;
  if (q) params.q = q;
  if (tag) params.tag = tag;

  const { data } = await axiosInstance.get("/questions", { params });
  return data;
}

export async function createQuestion(payload) {
  const { data } = await axiosInstance.post("/questions", payload);
  return data;
}

export async function updateQuestion(questionId, payload) {
  const { data } = await axiosInstance.put(`/questions/${questionId}`, payload);
  return data;
}

export async function deleteQuestion(questionId) {
  await axiosInstance.delete(`/questions/${questionId}`);
}
