import { createContext, useContext, ReactNode } from "react";

// Define the shape of the context
interface AuthContextType {
  logout: () => Promise<void>;
  userid: string | null;
}

// Create the context with a default (placeholder) value
const AuthLogout = createContext<AuthContextType>({
  logout: async () => {},
  userid: null,
});

// Provider Props
interface AuthLogoutProps {
  children: ReactNode;
  userid: string;
}

// Provider Component
export const AuthLogoutProvider = ({ children, userid }: AuthLogoutProps) => {
  const logout = async () => {
    try {
      const logoutRes = await fetch(
        `http://localhost:5000/api/account/${userid}/logout`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "x-active-user": userid,
            "Content-Type": "application/json",
          },
        }
      );

      if (!logoutRes.ok) {
        new Notification("Could not log you out, try again");
        window.location.reload();
      } else {
        window.location.reload();
      }
    } catch (error) {
      console.error("Logout error:", error);
      new Notification("An error occurred during logout");
      window.location.reload();
    }
  };

  return (
    <AuthLogout.Provider value={{ logout, userid }}>
      {children}
    </AuthLogout.Provider>
  );
};

export const useAuthLogout = () => {
  const context = useContext(AuthLogout);
  if (!context) {
    throw new Error("useAuthLogout must be used within an AuthLogoutProvider");
  }
  return context;
};
