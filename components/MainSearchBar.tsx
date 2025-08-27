import { View, Text, Image } from "react-native";
import React from "react";
import { icons } from "@/constants/icons";

const MainSearchBar = () => {
  return (
    <View className="flex-row items-cent bg-red-600 rounded-full px- py-4">
      <Image
        source={icons.search}
        className=" size-5"
        resizeMode="contain"
        tintColor="#ab8bff"
      ></Image>
    </View>
  );
};

export default MainSearchBar;
