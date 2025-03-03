import { StyleSheet, ScrollView } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import { Box, Text, Heading, VStack, Button, ButtonText, Image } from "@gluestack-ui/themed";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Box p="$4">
          <VStack space="md">
            <Heading size="2xl" color={colors.text}>
              Welcome to GlueApp
            </Heading>
            <Text color={colors.text} mb="$4">
              A complete React Native app with Gluestack UI, Redux Toolkit, and theming
            </Text>

            <Image source={{ uri: "https://images.unsplash.com/photo-1605379399642-870262d3d051?q=80&w=1812&auto=format&fit=crop" }} alt="App Banner" size="2xl" $xs-borderRadius="$lg" mb="$4" />

            <Heading size="lg" color={colors.text} mt="$4">
              Latest Posts
            </Heading>

            <Button mt="$4" variant="solid" action="primary">
              <ButtonText>View All Posts</ButtonText>
            </Button>
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
