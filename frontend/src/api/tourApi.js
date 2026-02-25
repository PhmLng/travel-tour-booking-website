const API_URL = "http://localhost:8080/api/tours";

export const getTours = async () => {
  const res = await fetch(API_URL);
  return res.json();
};

export const getTourById = async (id) => {
  const res = await fetch(`${API_URL}/${id}`);
  return res.json();
};