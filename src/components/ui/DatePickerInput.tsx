import React, { useState } from "react";
import { View, Platform, TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import { Input } from "./Input";
import { Button } from "./Button";

interface DatePickerInputProps {
  label: string;
  value: string;
  onChange: (date: string) => void;
  error?: string;
  disabled?: boolean;
}

export function DatePickerInput({
  label,
  value,
  onChange,
  error,
  disabled,
}: DatePickerInputProps) {
  const [show, setShow] = useState(false);

  const formatVisualDate = (dateString: string) => {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");
    if (!year || !month || !day) return dateString;
    return `${day}/${month}/${year}`;
  };

  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => !disabled && setShow(true)}
      >
        <Input
          label={label}
          placeholder="Selecione a data..."
          value={formatVisualDate(value)}
          editable={false}
          error={error}
          disabled={disabled}
          pointerEvents="none"
        />
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          value={value ? new Date(value + "T12:00:00") : new Date()}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={(event, selectedDate) => {
            setShow(Platform.OS === "ios");
            if (event.type === "set" && selectedDate) {
              const year = selectedDate.getFullYear();
              const month = String(selectedDate.getMonth() + 1).padStart(
                2,
                "0",
              );
              const day = String(selectedDate.getDate()).padStart(2, "0");

              onChange(`${year}-${month}-${day}`);

              if (Platform.OS === "android") {
                setShow(false);
              }
            } else if (event.type === "dismissed") {
              setShow(false);
            }
          }}
        />
      )}

      {show && Platform.OS === "ios" && (
        <Button
          title="Confirmar Data"
          onPress={() => setShow(false)}
          style={{ marginTop: 8 }}
        />
      )}
    </View>
  );
}
