import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../contexts/ThemeContext";

export function ThemeToggle() {
  const { theme, toggleTheme, colors } = useTheme();
  const isDark = theme === "dark";

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: colors.primary + "15" }]}
      onPress={toggleTheme}
      activeOpacity={0.8}
    >
      <Ionicons
        name={isDark ? "sunny" : "moon"}
        size={20}
        color={colors.primary}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
