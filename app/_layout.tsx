import storage from "@/components/storage";
import { store, TRootState } from "@/redux/store";
import { setUser } from "@/redux/userSlice";
import { Stack, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { View, ActivityIndicator, StyleSheet, Text, useColorScheme } from "react-native";
import { Provider, useDispatch, useSelector } from "react-redux";
import { useUserProfile } from "@/hooks/useUserProfile";
import { ThemeProvider } from "@/context/ThemeContext";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";

// Root layout wrapper with Redux Provider
export default function RootLayoutWrapper() {
  const colorScheme = useColorScheme();
  useEffect(() => {
    if (typeof window !== "undefined") {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      window.frameworkReady?.();
    }
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider>
        <GluestackUIProvider config={config}>
          <RootLayout />
          <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
        </GluestackUIProvider>
      </ThemeProvider>
    </Provider>
  );
}

// Main root layout handling authentication state
function RootLayout() {
  const { user } = useSelector((state: TRootState) => state.user);
  const { getUser } = useUserProfile();
  const dispatch = useDispatch();
  const token = storage.getItem("token"); // Retrieve token from storage

  useEffect(() => {
    const validateTokenAndFetchUser = async () => {
      try {
        const response = await getUser();
        dispatch(setUser(response?.data?.data))
        if (response?.data?.data?.profileInfoCompleted === 'false'){
          router.replace('/auth/complete-profile')
        } else if(response?.data?.data?.profileInfoCompleted) {
          router.replace('/(tabs)')
        }
      } catch (error) {
        console.error("Error validating token:", error);
      }
    };

    if (token && !user) {
      validateTokenAndFetchUser();
    }

    if (!token) {
      router.replace('/auth/login')
    }
  }, [token, getUser]);

  

  // Always render the navigator first to avoid navigation errors
  return (
    <>
      {/* Keep Stack as the root layout */}
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
     

      {/* Token exists but user data is not yet loaded */}
      {token && !user && (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#6366f1" />
          <Text style={styles.loadingText}>Checking authentication...</Text>
        </View>
      )}

      <StatusBar style="auto" />
    </>
  );
}

// Styles for the loading UI
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject, // Make the loading screen cover the entire screen
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#6366f1",
  },
});
