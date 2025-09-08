import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import { useRouter } from "expo-router";

import useFetch from "@/services/useFetch"; // Custom fetch hook
import { fetchMovies } from "@/services/api";
import { getTrendingMovies } from "@/services/appwrite";

import { icons } from "@/constants/icons";
import { images } from "@/constants/images";

import SearchBar from "@/components/MainSearchBar"; // search bar component
import MovieCard from "@/components/MovieCard";
import TrendingCard from "@/components/TrendingCard";

// Main app screen
export default function App() {
  const router = useRouter();

  const {
    data: trendingMovies,
    loading: trendingLoading,
    error: trendingError,
  } = useFetch(getTrendingMovies);

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchMovies({ query: "" }));

  return (
    <View className="flex-1 bg-slate-950">
      <Image
        source={images.bg}
        className="absolute w-full z-0"
        resizeMode="cover"
      />

      {moviesLoading || trendingLoading ? (
        <ActivityIndicator
          size="large"
          color="#00ff00"
          className="mt-10 self-center"
        />
      ) : moviesError || trendingError ? (
        <Text className="text-red-500 text-center mt-10">
          Error: {moviesError?.message || trendingError?.message}
        </Text>
      ) : (
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

              {/*  SearchBar*/}
              <SearchBar
                value=""
                onChangeText={() => {}}
                onPress={() => router.push("/search")}
                placeholder="Search for a movie"
              />

              {/* Trending Movies */}
              {trendingMovies && (
                <View className="mt-10">
                  <Text className="text-lg text-white font-bold mb-3">
                    Trending Movies
                  </Text>
                  <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={trendingMovies}
                    contentContainerStyle={{ gap: 26 }}
                    renderItem={({ item, index }) => (
                      <TrendingCard movie={item} index={index} />
                    )}
                    keyExtractor={(item) => item.movie_id.toString()}
                    ItemSeparatorComponent={() => <View className="w-4" />}
                  />
                </View>
              )}

              {/* Latest Movies */}
              <Text className="text-lg text-white font-bold mt-5 mb-3">
                Latest Movies
              </Text>
            </>
          }
        />
      )}
    </View>
  );
}
