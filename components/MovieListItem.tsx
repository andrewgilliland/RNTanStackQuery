import React, { FC } from "react";
import { StyleSheet, Image, Pressable } from "react-native";
import { Link } from "expo-router";
import { Movie } from "@/app/(tabs)";

type MovieListItemProps = {
  movie: Movie;
};

const MovieListItem: FC<MovieListItemProps> = ({ movie }) => {
  return (
    <Link href={`/${movie.id}`} asChild>
      <Pressable style={styles.container}>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          }}
          style={styles.image}
        />
      </Pressable>
    </Link>
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
});

export default MovieListItem;
