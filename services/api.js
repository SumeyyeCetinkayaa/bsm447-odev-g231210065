
export const API_URL =
  "https://rickandmortyapi.com/api/character?status=Dead";

export async function fetchCharacters(url = API_URL) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Karakterler yüklenemedi.");
  }

  const data = await response.json();

  return data;
}
