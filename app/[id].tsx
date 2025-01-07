import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  Pressable,
} from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Movie } from "./(tabs)";
import { getMovieDetails } from "@/api/movies";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";
import { addMovieToWatchlist } from "@/api/watchlist";

const MovieDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const client = useQueryClient();

  const {
    data: movie,
    isLoading,
    error,
  } = useQuery<Movie>({
    queryKey: ["movies", id],
    queryFn: () => getMovieDetails(Number(id)),
  });

  const { mutate } = useMutation({
    mutationFn: () => addMovieToWatchlist(Number(id)),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["watchlist"] });
    },
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
        <View style={styles.textContainer}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>{movie?.title}</Text>
            <Pressable
              onPress={() => mutate()}
              style={({ pressed }) => ({
                transform: [{ scale: pressed ? 0.9 : 1 }],
              })}
            >
              <FontAwesome name="bookmark-o" color="white" size={32} />
            </Pressable>
          </View>
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
  textContainer: {
    padding: 24,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  overview: {
    marginTop: 18,
    color: "#a3a3a3",
    fontSize: 16,
    fontWeight: "medium",
  },
});

export default MovieDetailsScreen;
