import SearchBar from "@/components/MainSearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Image, ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";



export default function App() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-slate-950">
      <Image source={images.bg} className=" absolute w-full z-0"></Image>
      <ScrollView
        className="flex-1 px-5 "
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <Image
          source={icons.logo}
          className="w-12 h10 mt-20 mb-5 mx-auto"
        ></Image>

        <View className="flex-1 mt-5">
          <SearchBar onPress={() => router.push("/search")} placeholder="Search for a movie"></SearchBar>
          
        </View>
      </ScrollView>
    </View>
  );
}
