import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../contexts/ThemeContext";

interface ImageUploadBoxProps {
  onPress?: () => void;
  style?: any;
}

export function ImageUploadBox({ onPress, style }: ImageUploadBoxProps) {
  const { colors } = useTheme();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      Alert.alert(
        "Upload de Imagem",
        "Em breve abriremos a galeria do celular! Por enquanto, cole a URL abaixo.",
      );
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
        },
        style,
      ]}
      onPress={handlePress}
    >
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
        Clique para enviar imagem
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 140,
    borderWidth: 1.5,
    borderStyle: "dashed",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  uploadText: {
    fontSize: 14,
    fontWeight: "500",
  },
});
