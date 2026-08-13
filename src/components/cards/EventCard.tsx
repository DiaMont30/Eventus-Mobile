import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../contexts/ThemeContext";

export interface EventItem {
  id: number | string;
  title: string;
  date: string;
  location: string;
  image: string;
}

interface EventCardProps {
  event: EventItem;
  index: number;
  onEdit: (event: EventItem) => void;
  onDelete: (id: number | string) => void;
}

const CARD_ACCENTS = [
  "#8B5CF6", // Violet
  "#EC4899", // Pink
  "#06B6D4", // Cyan
  "#F59E0B", // Amber
  "#10B981", // Emerald
];

function formatDate(dateStr: string) {
  const d = new Date(dateStr + "T12:00:00");
  return d.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export function EventCard({ event, index, onEdit, onDelete }: EventCardProps) {
  const { colors } = useTheme();
  const accentColor = CARD_ACCENTS[index % CARD_ACCENTS.length];

  const handleDelete = () => {
    Alert.alert(
      "Excluir Evento",
      "Deseja excluir este evento permanentemente?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Sim, excluir",
          style: "destructive",
          onPress: () => onDelete(event.id),
        },
      ],
    );
  };

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: colors.background, borderColor: colors.inputBorder },
      ]}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: event.image }} style={styles.image} />

        <View style={[styles.accentBar, { backgroundColor: accentColor }]} />

        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={[
              styles.actionButton,
              { backgroundColor: colors.inputBg + "E6" },
            ]} // E6 adiciona transparência
            onPress={() => onEdit(event)}
            activeOpacity={0.7}
          >
            <Ionicons name="pencil" size={16} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.actionButton,
              { backgroundColor: colors.inputBg + "E6" },
            ]}
            onPress={handleDelete}
            activeOpacity={0.7}
          >
            <Ionicons name="trash" size={16} color="#EF4444" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>
          {event.title}
        </Text>

        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <View style={[styles.iconBox, { backgroundColor: accentColor }]}>
              <Ionicons name="calendar" size={12} color="#FFFFFF" />
            </View>
            <Text style={[styles.detailText, { color: colors.text + "99" }]}>
              {formatDate(event.date)}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <View style={[styles.iconBox, { backgroundColor: accentColor }]}>
              <Ionicons name="location" size={12} color="#FFFFFF" />
            </View>
            <Text
              style={[styles.detailText, { color: colors.text + "99" }]}
              numberOfLines={1}
            >
              {event.location}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 16,
    elevation: 3, // Sombra para Android
    shadowColor: "#000", // Sombras para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imageContainer: {
    height: 180,
    position: "relative",
    backgroundColor: "#E5E7EB",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  accentBar: {
    position: "absolute",
    bottom: 12,
    left: 12,
    height: 4,
    width: 48,
    borderRadius: 2,
  },
  actionsContainer: {
    position: "absolute",
    top: 12,
    right: 12,
    flexDirection: "row",
    gap: 8,
  },
  actionButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    padding: 20,
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    lineHeight: 24,
  },
  detailsContainer: {
    gap: 12,
    marginTop: "auto",
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  iconBox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  detailText: {
    fontSize: 13,
    flex: 1,
  },
});
