import React from "react";
import { View, Text, StyleSheet, ActivityIndicator, Image } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { Movie } from "./(tabs)";
import { getMovieDetails } from "@/api/movies";
import { LinearGradient } from "expo-linear-gradient";

const MovieDetailsScreen = () => {
  const { id } = useLocalSearchParams();

  const {
    data: movie,
    isLoading,
    error,
  } = useQuery<Movie>({
    queryKey: ["movies", id],
    queryFn: () => getMovieDetails(Number(id)),
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text style={styles.errorText}>{error.message}</Text>;
  }

  return (
    <LinearGradient colors={["#6b21a8", "black"]} style={{ flex: 1 }}>
      <View style={styles.container}>
        <Stack.Screen options={{ title: movie?.title }} />
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${movie?.backdrop_path}`,
          }}
          style={styles.image}
        />
        <View style={{ padding: 24 }}>
          <Text style={styles.title}>{movie?.title}</Text>
          <Text style={styles.overview}>{movie?.overview}</Text>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  errorText: {
    color: "white",
  },
  container: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: 300,
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  overview: {
    marginTop: 12,
    color: "#a3a3a3",
    fontSize: 16,
    fontWeight: "medium",
  },
});

export default MovieDetailsScreen;
