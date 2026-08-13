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
  adminId: number | null;
  signIn: (token: string, adminId: number, adminName: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [adminName, setAdminName] = useState<string | null>(null);
  const [adminId, setAdminId] = useState<number | null>(null);

  useEffect(() => {
    async function loadStorageData() {
      try {
        const token = await AsyncStorage.getItem("eventus_token");
        const name = await AsyncStorage.getItem("eventus_admin_name");
        const idStr = await AsyncStorage.getItem("eventus_admin_id");
        if (token) {
          setIsAuthenticated(true);
          setAdminName(name);
          setAdminId(idStr ? Number(idStr) : null);
        }
      } catch (error) {
        console.error("Erro ao ler token:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadStorageData();
  }, []);

  const signIn = async (token: string, adminId: number, adminName: string) => {
    await AsyncStorage.multiSet([
      ["eventus_token", token],
      ["eventus_admin_id", adminId.toString()],
      ["eventus_admin_name", adminName],
    ]);
    setIsAuthenticated(true);
    setAdminName(adminName);
    setAdminId(adminId);
  };

  const signOut = async () => {
    await AsyncStorage.multiRemove([
      "eventus_token",
      "eventus_admin_id",
      "eventus_admin_name",
    ]);
    setIsAuthenticated(false);
    setAdminName(null);
    setAdminId(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        adminName,
        signIn,
        signOut,
        adminId,
      }}
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
