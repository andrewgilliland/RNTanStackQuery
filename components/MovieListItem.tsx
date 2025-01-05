import React, { FC } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Movie } from "@/app/(tabs)";

type MovieListItemProps = {
  movie: Movie;
};

const MovieListItem: FC<MovieListItemProps> = ({ movie }) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
        style={styles.image}
      />
      <Text style={styles.title}>{movie.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: "100%",
    aspectRatio: 3 / 5,
    borderRadius: 4,
  },
  title: {
    color: "white",
  },
});

export default MovieListItem;
