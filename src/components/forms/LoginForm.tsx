import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { authService } from "../../services/authService";
import { useAuth } from "../../contexts/AuthContext";

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      senha: "",
    },
  });

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      const response = await authService.login(data);

      if (response.token) {
        await AsyncStorage.setItem("eventus_token", response.token);
        const profile = await authService.getProfile();
        await signIn(response.token, Number(profile.id), profile.nome);
      }
    } catch (error) {
      console.error("Erro no login:", error);
      Alert.alert("Erro", "Credenciais inválidas ou erro de conexão.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.formContainer}>
      <Controller
        control={control}
        name="email"
        rules={{ required: "O email é obrigatório" }}
        render={({ field: { onChange, value } }) => (
          <Input
            label="Email"
            placeholder="admin@exemplo.com"
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
        rules={{ required: "A senha é obrigatória" }}
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

      <View style={styles.buttonContainer}>
        <Button
          title="Entrar"
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
