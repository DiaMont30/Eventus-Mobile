import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Switch,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useTheme } from "../../contexts/ThemeContext";
import { authService } from "../../services/authService";

import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { useAuth } from "../../contexts/AuthContext";

export default function Login({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { theme, toggleTheme, colors } = useTheme();
  const { signIn } = useAuth();

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert("Atenção", "Preencha todos os campos.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await authService.login({ email, senha });

      if (response.token) {
        await AsyncStorage.setItem("eventus_token", response.token);
        const profile = await authService.getProfile();
        await signIn(response.token, profile.id.toString());
      }
    } catch (error: unknown) {
      console.error("Erro no login:", error);
      Alert.alert(
        "Erro",
        "Credenciais inválidas ou erro de conexão com o servidor.",
      );
    } finally {
      setIsLoading(false);
    }
  };

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

          <View style={styles.form}>
            <Input
              label="Email"
              placeholder="admin@exemplo.com"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />

            <Input
              label="Senha"
              placeholder="••••••••"
              value={senha}
              onChangeText={setSenha}
              isPassword
            />
          </View>

          <View style={styles.footer}>
            <Button
              title="Entrar"
              onPress={handleLogin}
              isLoading={isLoading}
            />

            <Button
              title="Cadastrar-se"
              variant="outline"
              onPress={() => Alert.alert("Navegar para Cadastro")}
              disabled={isLoading}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 32,
  },
  form: {
    marginBottom: 12,
  },
  footer: {
    marginTop: 16,
  },
});
