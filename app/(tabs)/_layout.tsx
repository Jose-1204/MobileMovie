import { View, Text, ImageBackground, Image } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import "../global.css"; // o "../app/global.css" según donde lo tengas

const _layout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <>
              <View>
                <ImageBackground source={images.highlight} className="flex flex-row flex-1 w-[112px] min-h-14 mt-4 justify-center items-center rounded-full overflow-hidden">
                  <Image source={icons.home} tintColor="#151312" className="size-5"></Image>
                  <Text>Home</Text>
                </ImageBackground>
              </View>
            </>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{ title: "Profile", headerShown: false }}
      />
      <Tabs.Screen
        name="saved"
        options={{ title: "Saved", headerShown: false }}
      />
      <Tabs.Screen
        name="search"
        options={{ title: "Search", headerShown: false }}
      />
    </Tabs>
  );
};

export default _layout;
