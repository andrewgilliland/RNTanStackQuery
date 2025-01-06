import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { Movie } from "./(tabs)";
import { getMovieDetails } from "@/api/movies";

const MovieDetailsScreen = () => {
  const { id } = useLocalSearchParams();

  const {
    data: movies,
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
    return <Text style={styles.text}>{error.message}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{movies?.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default MovieDetailsScreen;
