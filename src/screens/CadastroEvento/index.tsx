import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useTheme } from "../../contexts/ThemeContext";
import { useAuth } from "../../contexts/AuthContext";
import { useEvents } from "../../hooks/useEvents";
import { Button } from "../../components/ui/Button";

import type { EventoRequestDTO } from "../../types/evento";
import { EventForm } from "../../components/forms/EventForm";

export default function CadastroEvento({ navigation }: any) {
  const { colors } = useTheme();
  const { adminId } = useAuth();

  const { addEvent } = useEvents();

  const handleSave = async (data: EventoRequestDTO) => {
    try {
      await addEvent({
        title: data.nome,
        date: data.data,
        location: data.localizacao,
        image: data.imagem || "",
      });

      Alert.alert("Sucesso!", "Evento cadastrado com sucesso.");
      navigation.goBack();
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      Alert.alert("Erro", "Falha ao salvar evento.");
    }
  };

  if (!adminId) {
    return <Text>Erro: Usuário não logado.</Text>;
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
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
          <Text style={[styles.title, { color: colors.text }]}>
            Novo Evento
          </Text>
          <View style={{ width: 40 }} />
        </View>

        <View style={styles.formSection}>
          <EventForm
            adminId={adminId}
            onSubmit={handleSave}
            onCancel={() => navigation.goBack()}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    paddingTop: 48,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 32,
  },
  backButton: {
    width: 40,
    height: 40,
    padding: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  formSection: {
    flex: 1,
  },
});
