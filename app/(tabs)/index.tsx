import { StyleSheet, Text, FlatList, ActivityIndicator } from "react-native";
import { View } from "@/components/Themed";
import { getTopRatedMovies } from "@/api/movies";
import { useQuery } from "@tanstack/react-query";

export default function HomeScreen() {
  const {
    data: movies,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["movies"],
    queryFn: getTopRatedMovies,
  });

  // const [movies, setMovies] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   // * IIFE - Immediately Invoked Function Expression
  //   (async () => {
  //     setIsLoading(true);
  //     setError(null);

  //     try {
  //       const movies = await getTopRatedMovies();
  //       setMovies(movies);
  //       setIsLoading(false);
  //     } catch (error) {
  //       setError(error);
  //       setIsLoading(false);
  //     }
  //   })();
  // }, []);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text style={{ color: "white" }}>{error.message}</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={movies}
        renderItem={({ item }) => (
          <View>
            <Text style={styles.movieText}>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  movieText: {
    color: "white",
  },
});
