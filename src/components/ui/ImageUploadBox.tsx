import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useTheme } from "../../contexts/ThemeContext";

interface ImageUploadBoxProps {
  value?: string;
  onChange: (base64Image: string) => void;
  style?: any;
}

export function ImageUploadBox({
  value,
  onChange,
  style,
}: ImageUploadBoxProps) {
  const { colors } = useTheme();

  const handlePickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Precisamos de permissão para acessar suas fotos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
      base64: true,
    });

    if (!result.canceled && result.assets[0].base64) {
      const imageUri = `data:image/jpeg;base64,${result.assets[0].base64}`;
      onChange(imageUri);
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[
        styles.container,
        {
          borderColor: colors.primary + "50",
          backgroundColor: colors.primary + "0A",
          borderStyle: value ? "solid" : "dashed",
        },
        style,
      ]}
      onPress={handlePickImage}
    >
      {value ? (
        <Image source={{ uri: value }} style={styles.previewImage} />
      ) : (
        <>
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: colors.primary + "20" },
            ]}
          >
            <Ionicons
              name="cloud-upload-outline"
              size={24}
              color={colors.primary}
            />
          </View>
          <Text style={[styles.uploadText, { color: colors.text + "80" }]}>
            Clique para escolher da galeria
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 140,
    borderWidth: 1.5,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  previewImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  uploadText: { fontSize: 14, fontWeight: "500" },
});
