import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useTheme } from "../../contexts/ThemeContext";
import { useAuth } from "../../contexts/AuthContext";
import { useEvents } from "../../hooks/useEvents";
import { EventCard, type EventItem } from "../../components/cards/EventCard";
import { Button } from "../../components/ui/Button";

export default function Home({ navigation }: any) {
  const { colors } = useTheme();
  const { adminName, signOut } = useAuth();
  const { events, isLoading, deleteEvent } = useEvents();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const handleEdit = (event: EventItem) => {
    console.log("Editar evento:", event.id);
  };

  const handleDelete = async (id: number | string) => {
    try {
      await deleteEvent(id);
    } catch (error) {
      console.error("Erro ao deletar evento:", error);
    }
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
            <Text style={[styles.welcomeText, { color: colors.text + "99" }]}>
              Bem-vindo,
            </Text>
            <Text style={[styles.nameText, { color: colors.text }]}>
              {firstName}
            </Text>
          </View>
        </View>

        <View style={styles.headerActions}>
          <Button
            title="Sair"
            variant="outline"
            onPress={signOut}
            style={styles.logoutButton}
          />
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Meus Eventos
          </Text>
          <Text style={[styles.counterText, { color: colors.primary }]}>
            {events.length} encontrados
          </Text>
        </View>

        {isLoading && !refreshing ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
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
                  Nenhum evento cadastrado no momento.
                </Text>
              </View>
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  welcomeText: {
    fontSize: 12,
  },
  nameText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  headerActions: {
    width: 80,
  },
  logoutButton: {
    height: 36,
    marginBottom: 0,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  counterText: {
    fontSize: 14,
    fontWeight: "600",
  },
  listContainer: {
    paddingBottom: 24,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 60,
    gap: 12,
  },
  emptyText: {
    fontSize: 14,
    textAlign: "center",
  },
});
