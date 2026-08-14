import React from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import { useTheme } from "../../contexts/ThemeContext";
import { LoginForm } from "../../components/forms/LoginForm";
import { Button } from "../../components/ui/Button";
import { ThemeToggle } from "../../components/ui/ThemeToggle";

export default function Login({ navigation }: any) {
  const { colors } = useTheme();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={[styles.container, { backgroundColor: colors.background }]}
        >
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.primary }]}>
              ✨ Eventus
            </Text>
            <ThemeToggle />
          </View>

          <View style={styles.badgeContainer}>
            <View
              style={[styles.badgeDot, { backgroundColor: colors.primary }]}
            />
            <Text style={[styles.badgeText, { color: colors.primary }]}>
              ADMINISTRADOR
            </Text>
          </View>

          <Text style={[styles.subtitle, { color: colors.text }]}>
            Bem-vindo de volta
          </Text>
          <Text style={[styles.description, { color: colors.text + "99" }]}>
            Acesse sua conta para continuar
          </Text>
          <LoginForm />

          <View style={styles.footer}>
            <Button
              title="Cadastrar-se"
              variant="outline"
              onPress={() => navigation.navigate("CadastroUsuario")}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: "center" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 40,
    justifyContent: "space-between",
  },
  title: { fontSize: 28, fontWeight: "bold" },
  badgeContainer: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(100, 100, 255, 0.1)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 6,
    marginBottom: 16,
  },
  badgeDot: { width: 6, height: 6, borderRadius: 3 },
  badgeText: { fontSize: 10, fontWeight: "bold", letterSpacing: 1 },
  subtitle: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
    lineHeight: 36,
  },
  description: { fontSize: 14, marginBottom: 32 },
  footer: { marginTop: 16 },
});
