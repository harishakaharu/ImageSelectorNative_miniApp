import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import appStyle from "./App.style";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { launchImageLibraryAsync } from "expo-image-picker";
import { useEffect, useState } from "react";
import backgroundImg from "./assets/background.jpg";
import uuid from "react-native-uuid";
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
      const newImage = { id: uuid.v4(), uriVal: image.assets[0].uri };
      setImageURIList([...imageURIList, newImage]);
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
  const deleteImage = (data) => {
    Alert.alert("Delete Image", "Are you sure?", [
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          const newImageList = imageURIList.filter(
            (imageVal) => imageVal.id !== data.id
          );
          setImageURIList(newImageList);
        },
      },
      { text: "Cancel", style: "cancel" },
    ]);
  };
  return (
    <ImageBackground source={backgroundImg} style={{ flex: 1 }}>
      <SafeAreaProvider>
        <SafeAreaView style={appStyle.container}>
          <Text style={appStyle.title}>Favourite Photos</Text>
          <View style={appStyle.body}>
            <ScrollView>
              {imageURIList &&
                imageURIList.map((data) => (
                  <TouchableOpacity
                    onLongPress={() => deleteImage(data)}
                    key={data.id}
                  >
                    <Image
                      style={appStyle.image}
                      source={{ uri: data.uriVal }}
                    />
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
