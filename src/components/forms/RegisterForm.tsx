import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";

import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { authService } from "../../services/authService";
interface RegisterFormData {
  nome: string;
  email: string;
  senha: string;
  confirmarSenha: string;
}

interface RegisterFormProps {
  onSuccess: () => void;
}

export function RegisterForm({ onSuccess }: RegisterFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<RegisterFormData>({
    defaultValues: {
      nome: "",
      email: "",
      senha: "",
      confirmarSenha: "",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      const { confirmarSenha, ...payload } = data;

      await authService.register(payload);
      Alert.alert(
        "Sucesso!",
        "Conta criada com sucesso. Você já pode fazer login.",
      );
      onSuccess();
    } catch (error) {
      console.error("Erro no cadastro:", error);
      Alert.alert(
        "Erro",
        "Não foi possível criar a conta. Verifique os dados e tente novamente.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.formContainer}>
      <Controller
        control={control}
        name="nome"
        rules={{ required: "O nome é obrigatório" }}
        render={({ field: { onChange, value } }) => (
          <Input
            label="Nome Completo"
            placeholder="Ex: Maria Silva"
            value={value}
            onChangeText={onChange}
            error={errors.nome?.message}
            disabled={isLoading}
          />
        )}
      />

      <Controller
        control={control}
        name="email"
        rules={{ required: "O email é obrigatório" }}
        render={({ field: { onChange, value } }) => (
          <Input
            label="Email"
            placeholder="maria@exemplo.com"
            value={value}
            onChangeText={onChange}
            autoCapitalize="none"
            keyboardType="email-address"
            error={errors.email?.message}
            disabled={isLoading}
          />
        )}
      />

      <Controller
        control={control}
        name="senha"
        rules={{
          required: "A senha é obrigatória",
          minLength: { value: 6, message: "Mínimo de 6 caracteres" },
        }}
        render={({ field: { onChange, value } }) => (
          <Input
            label="Senha"
            placeholder="••••••••"
            value={value}
            onChangeText={onChange}
            isPassword
            error={errors.senha?.message}
            disabled={isLoading}
          />
        )}
      />

      <Controller
        control={control}
        name="confirmarSenha"
        rules={{
          required: "A confirmação de senha é obrigatória",
          validate: (value) =>
            value === getValues("senha") || "As senhas não coincidem", // <--- A mágica da validação acontece aqui
        }}
        render={({ field: { onChange, value } }) => (
          <Input
            label="Confirmar Senha"
            placeholder="••••••••"
            value={value}
            onChangeText={onChange}
            isPassword
            error={errors.confirmarSenha?.message}
            disabled={isLoading}
          />
        )}
      />

      <View style={styles.buttonContainer}>
        <Button
          title="Criar Conta"
          onPress={handleSubmit(onSubmit)}
          isLoading={isLoading}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: { gap: 4 },
  buttonContainer: { marginTop: 16 },
});
