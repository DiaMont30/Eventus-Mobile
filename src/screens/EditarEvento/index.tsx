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
import { EventForm } from "../../components/forms/EventForm";
import type { EventItem, EventoRequestDTO } from "../../types/evento";

export default function EditarEvento({ navigation, route }: any) {
  const { colors } = useTheme();
  const { adminId } = useAuth();
  const { updateEvent } = useEvents();

  const event: EventItem = route.params?.event;

  const handleUpdate = async (data: EventoRequestDTO) => {
    try {
      await updateEvent(event.id, {
        date: data.data,
        location: data.localizacao,
      });

      Alert.alert("Sucesso!", "Evento atualizado com sucesso.");
      navigation.goBack();
    } catch (error) {
      console.error("Erro ao atualizar evento:", error);
      Alert.alert("Erro", "Não foi possível atualizar o evento.");
    }
  };

  if (!event || !adminId) {
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: colors.background, justifyContent: "center" },
        ]}
      >
        <Text style={{ color: colors.text }}>Erro: Dados não encontrados.</Text>
      </View>
    );
  }

  const initialData = {
    nome: event.title,
    data: event.date,
    localizacao: event.location,
    imagem: event.image,
  };

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
            <Ionicons name="arrow-down" size={20} color={colors.text} />
          </Button>
          <Text style={[styles.title, { color: colors.text }]}>
            Editar Evento
          </Text>
          <View style={{ width: 40 }} />
        </View>

        <View style={styles.formSection}>
          <EventForm
            adminId={adminId}
            initialData={initialData}
            isEditing={true}
            onSubmit={handleUpdate}
            onCancel={() => navigation.goBack()}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 24, paddingTop: 48 },
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
  title: { fontSize: 22, fontWeight: "bold" },
  formSection: { flex: 1 },
});
