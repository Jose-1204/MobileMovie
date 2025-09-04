import { View, Image, Text, FlatList, ActivityIndicator } from "react-native";
import React from "react";
import { images } from "@/constants/images";
import MovieCard from "@/components/MovieCard";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import { icons } from "@/constants/icons";
import MainSearchBar from "@/components/MainSearchBar";

const Search = () => {
  const {
    data: movies,
    loading,
    error,
  } = useFetch(() => fetchMovies({ query: "" }));

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
              <MainSearchBar placeholder="Search movies ... "></MainSearchBar>
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
              {!loading && !error && movies?.length === 0 && (
                <Text className="text-white px-5 my-3 ">
                  Search Results for {""}
                  <Text className="text-yellow-500">SEARCH TERM</Text>
                </Text>
              )}
            </View>
          </>
        }
      ></FlatList>
    </View>
  );
};

export default Search;
