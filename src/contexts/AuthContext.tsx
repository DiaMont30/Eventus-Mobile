import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthContextData {
  isAuthenticated: boolean;
  isLoading: boolean;
  adminName: string | null;
  signIn: (token: string, adminId: string, adminName: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [adminName, setAdminName] = useState<string | null>(null);

  useEffect(() => {
    async function loadStorageData() {
      try {
        const token = await AsyncStorage.getItem("eventus_token");
        const name = await AsyncStorage.getItem("eventus_admin_name");
        if (token) {
          setIsAuthenticated(true);
          setAdminName(name);
        }
      } catch (error) {
        console.error("Erro ao ler token:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadStorageData();
  }, []);

  const signIn = async (token: string, adminId: string, adminName: string) => {
    await AsyncStorage.multiSet([
      ["eventus_token", token],
      ["eventus_admin_id", adminId],
      ["eventus_admin_name", adminName],
    ]);
    setIsAuthenticated(true);
    setAdminName(adminName);
  };

  const signOut = async () => {
    await AsyncStorage.multiRemove([
      "eventus_token",
      "eventus_admin_id",
      "eventus_admin_name",
    ]);
    setIsAuthenticated(false);
    setAdminName(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isLoading, adminName, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}
