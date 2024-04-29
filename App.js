import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import appStyle from "./App.style";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { launchImageLibraryAsync } from "expo-image-picker";
import { useEffect, useState } from "react";
import backgroundImg from "./assets/background.jpg";
export default function App() {
  useEffect(() => {
    loadImages();
  }, []);
  const [imageURIList, setImageURIList] = useState([]);
  const imagePickerHandler = async () => {
    const image = await launchImageLibraryAsync();
    if (image.canceled) {
      alert("No Image selected");
    } else {
      setImageURIList([...imageURIList, image.assets[0].uri]);
    }
  };
  useEffect(() => {
    saveImages();
  }, [imageURIList]);
  const saveImages = async () => {
    try {
      await AsyncStorage.setItem("imageURIList", JSON.stringify(imageURIList));
    } catch (err) {
      console.log(err);
    }
  };
  const loadImages = async () => {
    try {
      const loadImagesUri = await AsyncStorage.getItem("imageURIList");
      const parsedImages = JSON.parse(loadImagesUri);
      setImageURIList(parsedImages || []);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <ImageBackground source={backgroundImg} style={{ flex: 1 }}>
      <SafeAreaProvider>
        <SafeAreaView style={appStyle.container}>
          <Text style={appStyle.title}>Favourite Photos</Text>
          <View style={appStyle.body}>
            <ScrollView>
              {imageURIList.map((data, i) => (
                <TouchableOpacity key={data + i}>
                  <Image style={appStyle.image} source={{ uri: data }} />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          <View style={appStyle.footer}>
            <TouchableOpacity style={appStyle.btn} onPress={imagePickerHandler}>
              <Text style={appStyle.btnTxt}>Add Pictures</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </ImageBackground>
  );
}
