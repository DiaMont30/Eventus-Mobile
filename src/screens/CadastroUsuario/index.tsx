import React from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useTheme } from "../../contexts/ThemeContext";
import { Button } from "../../components/ui/Button";
import { RegisterForm } from "../../components/forms/RegisterForm";

export default function CadastroUsuario({ navigation }: any) {
  const { colors } = useTheme();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={[
            styles.container,
            { backgroundColor: colors.background },
          ]}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Button
              title=""
              variant="outline"
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <Ionicons name="arrow-back" size={20} color={colors.text} />
            </Button>
            <Text style={[styles.title, { color: colors.primary }]}>
              ✨ Eventus
            </Text>
            <View style={{ width: 40 }} />
          </View>

          <View style={styles.badgeContainer}>
            <View
              style={[styles.badgeDot, { backgroundColor: colors.primary }]}
            />
            <Text style={[styles.badgeText, { color: colors.primary }]}>
              NOVA CONTA
            </Text>
          </View>

          <Text style={[styles.subtitle, { color: colors.text }]}>
            Criar Conta
          </Text>
          <Text style={[styles.description, { color: colors.text + "99" }]}>
            Cadastre-se para gerenciar seus eventos
          </Text>

          <RegisterForm onSuccess={() => navigation.navigate("Login")} />

          <View style={styles.footer}>
            <Button
              title="Já tenho uma conta"
              variant="outline"
              onPress={() => navigation.navigate("Login")}
            />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 24, justifyContent: "center" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 32,
  },
  backButton: {
    width: 40,
    height: 40,
    padding: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  title: { fontSize: 24, fontWeight: "bold" },
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
  subtitle: { fontSize: 28, fontWeight: "bold", marginBottom: 8 },
  description: { fontSize: 14, marginBottom: 32 },
  footer: { marginTop: 16 },
});
