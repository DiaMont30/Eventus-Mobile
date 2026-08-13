import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
  ActivityIndicator,
} from "react-native";
import { useTheme } from "../../contexts/ThemeContext";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: "solid" | "outline";
  isLoading?: boolean;
}

export function Button({
  title,
  variant = "solid",
  isLoading,
  style,
  ...rest
}: ButtonProps) {
  const { colors } = useTheme();

  const isSolid = variant === "solid";
  const bgColor = isSolid ? colors.primary : "transparent";
  const textColor = isSolid ? "#FFFFFF" : colors.text;
  const borderColor = isSolid ? "transparent" : colors.primary;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: bgColor,
          borderColor: borderColor,
          borderWidth: isSolid ? 0 : 1,
        },
        style,
      ]}
      disabled={isLoading || rest.disabled}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <Text style={[styles.text, { color: textColor }]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 56,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
