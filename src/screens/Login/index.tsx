import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import { useTheme } from "../../contexts/ThemeContext";
import { LoginForm } from "../../components/forms/LoginForm";
import { Button } from "../../components/ui/Button";

export default function Login({ navigation }: any) {
  const { theme, toggleTheme, colors } = useTheme();

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
            <Switch
              value={theme === "dark"}
              onValueChange={toggleTheme}
              trackColor={{ false: "#767577", true: colors.primary }}
              thumbColor={"#f9fafb"}
            />
          </View>

          <Text style={[styles.subtitle, { color: colors.text }]}>
            Bem-vindo de volta
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
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 40,
  },
  title: { fontSize: 28, fontWeight: "bold" },
  subtitle: { fontSize: 24, fontWeight: "bold", marginBottom: 32 },
  footer: { marginTop: 16 },
});
