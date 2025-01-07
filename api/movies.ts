const headers = {
  accept: "application/json",
  Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_API_KEY}`,
};

export const getTopRatedMovies = async (page: number = 1) => {
  const url = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}`;
  const options = {
    method: "GET",
    headers,
  };

  const response = await fetch(url, options);

  if (!response.ok || response.status !== 200) {
    throw new Error("Failed to fetch movies");
  }

  const json = await response.json();
  return json.results;
};

export const getMovieDetails = async (id: number) => {
  const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
  const options = {
    method: "GET",
    headers,
  };

  const response = await fetch(url, options);

  if (!response.ok || response.status !== 200) {
    throw new Error("Failed to fetch movies");
  }

  const json = await response.json();
  return json;
};
