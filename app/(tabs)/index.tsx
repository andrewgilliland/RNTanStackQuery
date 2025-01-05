import { StyleSheet, Text, FlatList, ActivityIndicator } from "react-native";
import { View } from "@/components/Themed";
import { getTopRatedMovies } from "@/api/movies";
import { useQuery } from "@tanstack/react-query";
import MovieListItem from "@/components/MovieListItem";

export type Movie = {
  title: string;
  poster_path: string;
};

export default function HomeScreen() {
  const {
    data: movies,
    isLoading,
    error,
  } = useQuery<Movie[]>({
    queryKey: ["movies"],
    queryFn: getTopRatedMovies,
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text style={styles.text}>{error.message}</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList<Movie>
        contentContainerStyle={styles.flatList}
        columnWrapperStyle={styles.flatList}
        data={movies ?? []}
        numColumns={2}
        renderItem={({ item }) => <MovieListItem movie={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatList: {
    gap: 8,
  },
  text: {
    color: "white",
  },
});
