import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { useTheme } from "../../contexts/ThemeContext";

import type { EventoRequestDTO } from "../../types/evento";
import { ImageUploadBox } from "../ui/ImageUploadBox";

export interface EventFormData {
  nome: string;
  data: string;
  localizacao: string;
  imagem?: string;
}

interface EventFormProps {
  initialData?: EventFormData;
  isEditing?: boolean;
  onSubmit: (data: EventoRequestDTO) => Promise<void>;
  onCancel: () => void;
  adminId: number;
}

export function EventForm({
  initialData,
  isEditing = false,
  onSubmit,
  onCancel,
  adminId,
}: EventFormProps) {
  const { colors } = useTheme();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EventFormData>({
    values: initialData,
    defaultValues: initialData || {
      nome: "",
      data: "",
      localizacao: "",
      imagem: "",
    },
  });

  const handleFormSubmit = async (data: EventFormData) => {
    setIsSubmitting(true);
    try {
      const dto: EventoRequestDTO = {
        nome: data.nome,
        data: data.data,
        localizacao: data.localizacao,
        imagem: data.imagem || "https://example.com/padrao.jpg",
        adminId: adminId,
      };

      await onSubmit(dto);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.formContainer}>
      {!isEditing && (
        <View style={styles.imageSection}>
          <Text style={[styles.sectionLabel, { color: colors.text + "90" }]}>
            IMAGEM DO EVENTO
          </Text>

          <Controller
            control={control}
            name="imagem"
            render={({ field: { onChange, value } }) => (
              <View>
                <ImageUploadBox />
                <Input
                  label=""
                  placeholder="Ou cole a URL da imagem aqui..."
                  value={value}
                  onChangeText={onChange}
                  error={errors.imagem?.message}
                  disabled={isSubmitting}
                  style={{ marginTop: 8 }}
                />
              </View>
            )}
          />
        </View>
      )}

      <Controller
        control={control}
        name="nome"
        rules={{ required: "O título é obrigatório" }}
        render={({ field: { onChange, value } }) => (
          <Input
            label="TÍTULO DO EVENTO"
            placeholder="Ex: Festival de Música"
            value={value}
            onChangeText={(text: string) => onChange(text)}
            error={errors.nome?.message}
            disabled={isSubmitting || isEditing}
          />
        )}
      />

      <Controller
        control={control}
        name="data"
        rules={{ required: "A data é obrigatória" }}
        render={({ field: { onChange, value } }) => (
          <Input
            label="DATA"
            placeholder="dd/mm/aaaa"
            value={value}
            onChangeText={(text: string) => onChange(text)}
            error={errors.data?.message}
            disabled={isSubmitting}
          />
        )}
      />

      <Controller
        control={control}
        name="localizacao"
        rules={{ required: "O local é obrigatório" }}
        render={({ field: { onChange, value } }) => (
          <Input
            label="LOCALIZAÇÃO"
            placeholder="Ex: Parque Ibirapuera, São Paulo"
            value={value}
            onChangeText={(text: string) => onChange(text)}
            error={errors.localizacao?.message}
            disabled={isSubmitting}
          />
        )}
      />

      <View style={styles.buttonGroup}>
        <Button
          title="Cancelar"
          variant="outline"
          onPress={onCancel}
          disabled={isSubmitting}
          style={styles.cancelButton}
        />
        <Button
          title={isEditing ? "Atualizar Evento" : "Salvar Evento"}
          onPress={handleSubmit(handleFormSubmit)}
          isLoading={isSubmitting}
          style={styles.submitButton}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    gap: 16,
  },
  imageSection: {
    marginBottom: 8,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  imageUploadBox: {
    height: 140,
    borderWidth: 1.5,
    borderStyle: "dashed",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  uploadText: {
    fontSize: 14,
    fontWeight: "500",
  },
  buttonGroup: {
    flexDirection: "row",
    gap: 12,
    marginTop: 24,
  },
  cancelButton: {
    flex: 1,
  },
  submitButton: {
    flex: 1,
  },
});
