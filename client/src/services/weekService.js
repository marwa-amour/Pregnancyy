import http from "./httpService";

export async function getAllWeeks() {
  const response = http.get('/weeks');
  return response;
}

export async function getWeekById(weekId) {
  const response = http.get(`/weeks/${weekId}`);
  return response;
}