import { StyleSheet, Text, FlatList, ActivityIndicator } from "react-native";
import { View } from "@/components/Themed";
import { useQuery } from "@tanstack/react-query";
import MovieListItem from "@/components/MovieListItem";
import { LinearGradient } from "expo-linear-gradient";
import { Stack } from "expo-router";
import { getWatchlistMovies } from "@/api/watchlist";

export type Movie = {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
};

export default function WatchlistScreen() {
  const {
    data: movies,
    isLoading,
    error,
  } = useQuery<Movie[]>({
    queryKey: ["watchlist"],
    queryFn: getWatchlistMovies,
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text style={styles.text}>{error.message}</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Watchlist" }} />
      <LinearGradient colors={["#6b21a8", "black"]} style={{ flex: 1 }}>
        <FlatList<Movie>
          contentContainerStyle={styles.flatListContainer}
          columnWrapperStyle={styles.flatListColumnWrapper}
          data={movies ?? []}
          numColumns={2}
          renderItem={({ item }) => <MovieListItem movie={item} />}
        />
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatListContainer: {
    gap: 24,
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  flatListColumnWrapper: {
    gap: 24,
  },
  text: {
    color: "white",
  },
});
