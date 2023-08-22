import http from "./httpService";

export async function getAllSports() {
  const response = http.get('/sports');
  return response;
}

export async function getSportById(sportId) {
  const response = http.get(`/sports/${sportId}`);
  return response;
}