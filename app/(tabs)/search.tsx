import { View, Image, FlatList } from "react-native";
import React from "react";
import { images } from "@/constants/images";
import MovieCard from "@/components/MovieCard";

const Search = () => {
  return (
    <View className="flex-1 bg-slate-950 ">
      <Image
        source={images.bg}
        className=" flex-1 absolute w-full z-0"
        resizeMode="cover"
      ></Image>
      <FlatList data={movies} renderItem={({item}) => <MovieCard {... item}></MovieCard>}>

      </FlatList>
    </View>
  );
};

export default Search;
