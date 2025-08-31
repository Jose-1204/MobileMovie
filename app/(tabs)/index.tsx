import SearchBar from "@/components/MainSearchBar"; // search bar component
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import useFetch from "@/services/useFetch"; // Custom fetch hook
import { fetchMovies } from "@/services/api";

// Main app screen
export default function App() {
  const router = useRouter();

  // Fetch popular movies on mount
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchMovies({ query: "" }));

  return (
    <View className="flex-1 bg-slate-950">
      {/* Background image */}
      <Image source={images.bg} className=" absolute w-full z-0"></Image>
      <ScrollView
        className="flex-1 px-5 "
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        {/* App logo */}
        <Image
          source={icons.logo}
          className="w-12 h10 mt-20 mb-5 mx-auto"
        ></Image>

        {/* Loading, error*/}
        {moviesLoading ? (
          <ActivityIndicator size="large" color="#00ff00" className="mt-10" />
        ) : moviesError ? (
          <Text className="text-red-500 text-center mt-10">
            {" "}
            Error: {moviesError?.message}
          </Text>
        ) : (
          <View className="flex-1 mt-5">
            <SearchBar
              onPress={() => router.push("/search")}
              placeholder="Search for a movie"
            ></SearchBar>
            <>
              <Text className="text-lg text-white font-bold mt-5 mb-3">
                Latest Movies
              </Text>

              <FlatList
                data={movies}
                renderItem={({ item }) => (
                  <Text className="text"> {item.title}</Text>
                )}
              >
                {" "}
              </FlatList>
            </>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
