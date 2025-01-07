export const getWatchlistMovies = async () => {
  const url =
    "https://api.themoviedb.org/3/account/9551733/watchlist/movies?language=en-US&page=1&sort_by=created_at.asc";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_API_KEY}`,
    },
  };

  const response = await fetch(url, options);

  if (!response.ok || response.status !== 200) {
    throw new Error("Failed to fetch movies");
  }

  const json = await response.json();
  return json.results;
};

export const addMovieToWatchlist = async (movieId: number) => {
  const url = "https://api.themoviedb.org/3/account/9551733/watchlist";
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_API_KEY}`,
    },
    body: JSON.stringify({
      media_type: "movie",
      media_id: movieId,
      watchlist: true,
    }),
  };

  const response = await fetch(url, options);

  if (!response.ok || response.status !== 201) {
    throw new Error("Failed to add movie to watchlist");
  }

  const json = await response.json();
  return json;
};
