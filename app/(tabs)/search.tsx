import { View, Image, Text, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { images } from "@/constants/images";
import MovieCard from "@/components/MovieCard";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import { icons } from "@/constants/icons";
import MainSearchBar from "@/components/MainSearchBar";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: movies,
    loading,
    error,
    refetch: loadMovies,
    reset,
  } = useFetch(() => fetchMovies({ query: searchQuery }));

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await loadMovies();
      } else {
        reset();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return (
    <View className="flex-1 bg-slate-950 ">
      <Image
        source={images.bg}
        className=" flex-1 absolute w-full z-0"
        resizeMode="cover"
      ></Image>
      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard {...item}></MovieCard>}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 20,
          paddingRight: 5,
          marginBottom: 10,
        }}
        contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: 20 }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <View>
              <Image
                source={icons.logo}
                className="w-20 h-16 mt-12 mb-5 mx-auto"
              ></Image>
            </View>

            <View className="my-5">
              <MainSearchBar
                placeholder="Search movies ... "
                value={searchQuery}
                onChangeText={(text: string) => setSearchQuery(text)}
              ></MainSearchBar>
            </View>

            <View>
              {loading && (
                <ActivityIndicator
                  size="large"
                  color="#0000ff"
                  className="my-3"
                />
              )}

              {error && (
                <Text className="text-red-500 px-5 my-3 ">
                  Error: {error.message}
                </Text>
              )}
              {!loading &&
                !error &&
                searchQuery.trim() &&
                movies?.length === 0 && (
                  <Text className="text-white px-5 my-3 ">
                    Search Results for {""}
                    <Text className="text-yellow-500">{searchQuery}</Text>
                  </Text>
                )}
            </View>
          </>
        }
        ListEmptyComponent={
          !loading && !error ? (
            <View className=" mt-10 px-5">
              <Text className="text-white text-center">
                {searchQuery.trim()
                  ? "No movies found."
                  : "Start typing to search for movies."}
              </Text>
            </View>
          ) : null
        }
      ></FlatList>
    </View>
  );
};

export default Search;
