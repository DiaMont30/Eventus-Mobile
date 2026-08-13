import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { Appearance } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ThemeColors {
  background: string;
  text: string;
  primary: string;
  inputBg: string;
  inputBorder: string;
}

interface ThemeContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
  colors: ThemeColors;
}

const lightColors: ThemeColors = {
  background: "#F8F8FC",
  text: "#111827",
  primary: "#8B5CF6",
  inputBg: "#EDE9FE",
  inputBorder: "#DDD6FE",
};

const darkColors: ThemeColors = {
  background: "#0F0F1A",
  text: "#F9FAFB",
  primary: "#A78BFA",
  inputBg: "#1E1E30",
  inputBorder: "#2D2D44",
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    async function loadTheme() {
      const savedTheme = await AsyncStorage.getItem("eventus_theme");
      if (savedTheme === "light" || savedTheme === "dark") {
        setTheme(savedTheme);
      } else {
        const systemTheme = Appearance.getColorScheme();
        setTheme(systemTheme === "dark" ? "dark" : "light");
      }
    }
    loadTheme();
  }, []);

  const toggleTheme = useCallback(async () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      AsyncStorage.setItem("eventus_theme", newTheme).catch(console.error);
      return newTheme;
    });
  }, []);

  const colors = theme === "light" ? lightColors : darkColors;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme deve ser usado dentro de um ThemeProvider");
  }
  return context;
}
