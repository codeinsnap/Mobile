import React, { createContext, useContext, useState, useEffect } from "react";
import { useColorScheme } from "react-native";

// Define theme colors
const lightTheme = {
  background: "#FFFFFF",
  backgroundSecondary: "#F5F5F5",
  text: "#000000",
  textSecondary: "#666666",
  primary: "#007AFF",
  secondary: "#5856D6",
  border: "#E5E5E5",
  error: "#FF3B30",
  success: "#34C759",
  warning: "#FF9500",
  card: "#FFFFFF",
  switchTrackFalse: "#D9D9D9",
  switchTrackTrue: "#007AFF",
};

const darkTheme = {
  background: "#1C1C1E",
  backgroundSecondary: "#2C2C2E",
  text: "#FFFFFF",
  textSecondary: "#AEAEB2",
  primary: "#0A84FF",
  secondary: "#5E5CE6",
  border: "#38383A",
  error: "#FF453A",
  success: "#30D158",
  warning: "#FF9F0A",
  card: "#2C2C2E",
  switchTrackFalse: "#39393D",
  switchTrackTrue: "#0A84FF",
};

type ThemeType = "light" | "dark";
type ThemeContextType = {
  theme: ThemeType;
  colors: typeof lightTheme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  colors: lightTheme,
  toggleTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [theme, setTheme] = useState<ThemeType>((systemColorScheme as ThemeType) || "light");

  // Update theme when system theme changes
  useEffect(() => {
    if (systemColorScheme) {
      setTheme(systemColorScheme as ThemeType);
    }
  }, [systemColorScheme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const colors = theme === "light" ? lightTheme : darkTheme;

  return <ThemeContext.Provider value={{ theme, colors, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
