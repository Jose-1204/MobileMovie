import SearchBar from "@/components/MainSearchBar"; // search bar component
import { icons } from "@/constants/icons";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import { images } from "@/constants/images";
import { useRouter } from "expo-router";
import useFetch from "@/services/useFetch"; // Custom fetch hook
import { fetchMovies } from "@/services/api";
import MovieCard from "@/components/MovieCard";

// Main app screen
export default function App() {
  const router = useRouter();
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchMovies({ query: "" }));

  if (moviesLoading) {
    return (
      <View className="flex-1 bg-slate-950 justify-center items-center">
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

  if (moviesError) {
    return (
      <View className="flex-1 bg-slate-950 justify-center items-center">
        <Text className="text-red-500">Error: {moviesError?.message}</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-slate-950">
      <Image source={images.bg} className="absolute w-full z-0" />
      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 20,
          paddingRight: 5,
          marginBottom: 10,
        }}
        contentContainerStyle={{
          paddingBottom: 20,
          paddingHorizontal: 20,
        }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <Image
              source={icons.logo}
              className="w-20 h-16 mt-12 mb-5 mx-auto"
            />
            <SearchBar
              onPress={() => router.push("/search")}
              placeholder="Search for a movie"
            />
            <Text className="text-lg text-white font-bold mt-5 mb-3">
              Latest Movies
            </Text>
          </>
        }
      />
    </View>
  );
}
