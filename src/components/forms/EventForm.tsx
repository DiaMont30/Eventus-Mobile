import React, { useState } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { useForm, Controller } from "react-hook-form";

import { Input } from "../ui/Input";
import { Button } from "../ui/Button";

import type { EventFormData, EventoRequestDTO } from "../../types/evento";

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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EventFormData>({
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
      <Controller
        control={control}
        name="nome"
        rules={{ required: "O título é obrigatório" }}
        render={({ field: { onChange, value } }) => (
          <Input
            label="Título do Evento"
            placeholder="Ex: Conferência Tech"
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
            label="Data"
            placeholder="AAAA-MM-DD"
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
            label="Local"
            placeholder="Ex: Centro de Convenções"
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
          title={initialData ? "Atualizar" : "Salvar"}
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
