import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";

import { useTheme } from "../../contexts/ThemeContext";
import { useAuth } from "../../contexts/AuthContext";
import { useEvents } from "../../hooks/useEvents";

import { EventCard } from "../../components/cards/EventCard";
import { Button } from "../../components/ui/Button";
import { EventItem } from "../../types/evento";

export default function Home({ navigation }: any) {
  const { colors } = useTheme();
  const { adminName, signOut } = useAuth();

  // Consumindo nosso hook que espelha exatamente a lógica Web!
  const { events, isLoading, deleteEvent, refresh } = useEvents();
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      refresh();
    }, [refresh]),
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refresh();
    setRefreshing(false);
  }, [refresh]);

  const handleEdit = (event: EventItem) => {
    navigation.navigate("EditarEvento", { event });
  };

  const handleDelete = (id: number | string) => {
    Alert.alert(
      "Excluir Evento",
      "Tem certeza que deseja excluir este evento? Esta ação não pode ser desfeita.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteEvent(id);
            } catch (error) {
              Alert.alert("Erro", "Não foi possível excluir o evento.");
            }
          },
        },
      ],
    );
  };

  const firstName = adminName ? adminName.split(" ")[0] : "Admin";

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={[styles.header, { borderBottomColor: colors.inputBorder }]}>
        <View style={styles.userInfo}>
          <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
            <Text style={styles.avatarText}>
              {firstName.charAt(0).toUpperCase()}
            </Text>
          </View>
          <View>
            <View style={styles.tagContainer}>
              <View
                style={[styles.tagDot, { backgroundColor: colors.primary }]}
              />
              <Text style={[styles.tagText, { color: colors.primary }]}>
                ADMINISTRADOR
              </Text>
            </View>
            <Text style={[styles.nameText, { color: colors.text }]}>
              {firstName}
            </Text>
          </View>
        </View>

        <Button
          title=""
          variant="outline"
          onPress={signOut}
          style={styles.logoutButton}
        >
          <Ionicons name="log-out-outline" size={20} color={colors.text} />
        </Button>
      </View>

      <View style={styles.content}>
        <View style={styles.sectionHeader}>
          <View>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Meus Eventos
            </Text>
            <Text style={[styles.counterText, { color: colors.text + "80" }]}>
              {events.length} evento{events.length !== 1 ? "s" : ""} cadastrado
              {events.length !== 1 ? "s" : ""}
            </Text>
          </View>

          <Button
            title="Novo"
            onPress={() => navigation.navigate("CadastroEvento")}
            style={styles.addButton}
          >
            <Ionicons name="add" size={20} color="#fff" />
          </Button>
        </View>

        {/* Listagem */}
        {isLoading && !refreshing ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={[styles.loaderText, { color: colors.text + "80" }]}>
              Carregando eventos...
            </Text>
          </View>
        ) : (
          <FlatList
            data={events}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item, index }) => (
              <EventCard
                event={item}
                index={index}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            )}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor={colors.primary}
              />
            }
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Ionicons
                  name="calendar-outline"
                  size={48}
                  color={colors.text + "50"}
                />
                <Text style={[styles.emptyText, { color: colors.text + "99" }]}>
                  Nenhum evento cadastrado.
                </Text>
                <Button
                  title="Criar o primeiro"
                  variant="outline"
                  onPress={() => navigation.navigate("CadastroEvento")}
                  style={{ marginTop: 16 }}
                />
              </View>
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  userInfo: { flexDirection: "row", alignItems: "center", gap: 12 },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { color: "#FFFFFF", fontWeight: "bold", fontSize: 18 },
  tagContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 2,
  },
  tagDot: { width: 6, height: 6, borderRadius: 3 },
  tagText: { fontSize: 10, fontWeight: "bold", letterSpacing: 1 },
  nameText: { fontSize: 18, fontWeight: "bold" },
  logoutButton: {
    width: 44,
    height: 44,
    padding: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  content: { flex: 1, paddingHorizontal: 20, paddingTop: 20 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  sectionTitle: { fontSize: 24, fontWeight: "bold" },
  counterText: { fontSize: 14, marginTop: 4 },
  addButton: { paddingHorizontal: 16, height: 44 },
  listContainer: { paddingBottom: 24 },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  loaderText: { fontSize: 14 },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 60,
    gap: 12,
  },
  emptyText: { fontSize: 16, textAlign: "center" },
});
