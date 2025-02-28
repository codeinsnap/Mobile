import storage from '@/components/storage';
import { store, TRootState } from '@/redux/store';
import { setUser } from '@/redux/userSlice';
import { getUserFromToken } from '@/Utils/token';
import { Stack, Redirect, Slot, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Root layout wrapper with Redux Provider
export default function RootLayoutWrapper() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      window.frameworkReady?.();
    }
  }, []);

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
      <RootLayout />
      </GestureHandlerRootView>
    </Provider>
  );
}

// Main root layout handling authentication state
function RootLayout() {
  const { user } = useSelector((state: TRootState) => state.user);
  const dispatch = useDispatch();
  const token = storage.getItem('token'); // Retrieve token from storage

  useEffect(() => {
    const userData = getUserFromToken();
    if (!user?.firstName && userData?.firstName) {
      dispatch(setUser(userData));
    }
  }, [user?.firstName]);


  // Always render the navigator first to avoid navigation errors
  return (
    <>
      {/* Keep Stack as the root layout */}
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>

      {/* Show loading screen while checking authentication state */}
      {!token && <Redirect href="/auth/login" />}

      {/* Token exists but user data is not yet loaded */}
      {token && !user && (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#6366f1" />
          <Text style={styles.loadingText}>Checking authentication...</Text>
        </View>
      )}

      {/* User exists but profile is incomplete */}
      {token && user && !user?.profileInfoCompleted && (
        <Redirect href="/auth/complete-profile" />
      )}

      <StatusBar style="auto" />
    </>
  );
}

// Styles for the loading UI
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject, // Make the loading screen cover the entire screen
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#6366f1',
  },
});