import { StyleSheet, ScrollView } from "react-native";
import { Box, Text, Heading, VStack, Switch, HStack, Divider, Button } from "@gluestack-ui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { Moon, Sun, Bell, Globe, Lock, CircleHelp as HelpCircle, LogOut } from "lucide-react-native";
import { useTheme } from "../../context/ThemeContext";
import storage from "../../components/storage";
import { useCallback } from "react";

export default function SettingsScreen() {
  const { colors, theme, toggleTheme } = useTheme();
  const handleLogout = useCallback(() => storage.deleteItemAsync('token'), [])

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Box p="$4">
          <VStack space="md">
            <Heading size="xl" color={colors.text}>
              Settings
            </Heading>

            <VStack space="lg" mt="$4">
              <Heading size="md" color={colors.text}>
                Appearance
              </Heading>

              <HStack justifyContent="space-between" alignItems="center">
                <HStack space="md" alignItems="center">
                  {theme === "dark" ? <Moon size={24} color={colors.text} /> : <Sun size={24} color={colors.text} />}
                  <Text color={colors.text} fontSize="$md">
                    Dark Mode
                  </Text>
                </HStack>
                <Switch value={theme === "dark"} onValueChange={toggleTheme} trackColor={{ false: colors.switchTrackFalse, true: colors.switchTrackTrue }} />
              </HStack>

              <Divider my="$2" />

              <Heading size="md" color={colors.text} mt="$2">
                Notifications
              </Heading>

              <HStack justifyContent="space-between" alignItems="center">
                <HStack space="md" alignItems="center">
                  <Bell size={24} color={colors.text} />
                  <Text color={colors.text} fontSize="$md">
                    Push Notifications
                  </Text>
                </HStack>
                <Switch value={true} trackColor={{ false: colors.switchTrackFalse, true: colors.switchTrackTrue }} />
              </HStack>

              <HStack justifyContent="space-between" alignItems="center">
                <HStack space="md" alignItems="center">
                  <Bell size={24} color={colors.text} />
                  <Text color={colors.text} fontSize="$md">
                    Email Notifications
                  </Text>
                </HStack>
                <Switch value={false} trackColor={{ false: colors.switchTrackFalse, true: colors.switchTrackTrue }} />
              </HStack>

              <Divider my="$2" />

              <Heading size="md" color={colors.text} mt="$2">
                General
              </Heading>

              {[
                { icon: <Globe size={24} color={colors.text} />, title: "Language" },
                { icon: <Lock size={24} color={colors.text} />, title: "Privacy" },
                { icon: <HelpCircle size={24} color={colors.text} />, title: "Help & Support" },
              ].map((item, index) => (
                <HStack key={index} justifyContent="space-between" alignItems="center" py="$2">
                  <HStack space="md" alignItems="center">
                    {item.icon}
                    <Text color={colors.text} fontSize="$md">
                      {item.title}
                    </Text>
                  </HStack>
                  <Text color={colors.textSecondary}>›</Text>
                </HStack>
              ))}
              <Button onTouchEnd={handleLogout}>
                <LogOut size={24} color={colors.text} />
                <Text color={colors.text} fontSize="$md">
                  Logout
                </Text>
              </Button>
            </VStack>
          </VStack>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
});
