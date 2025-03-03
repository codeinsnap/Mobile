import { StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { Box, Text, Heading, VStack, Avatar, AvatarFallbackText, AvatarImage, Divider, HStack } from '@gluestack-ui/themed';
import { useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Mail, MapPin, Calendar } from 'lucide-react-native';
import { TRootState } from '@/redux/store';

export default function ProfileScreen() {
  const { colors } = useTheme();
  const { user } = useSelector((state: TRootState) => state.user);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Box p="$4">
          <VStack space="md" alignItems="center">
            <Avatar size="2xl" borderRadius="$full">
              <AvatarFallbackText>John Doe</AvatarFallbackText>
              <AvatarImage 
                source={{ 
                  uri: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1887&auto=format&fit=crop' 
                }} 
                alt="Profile Picture" 
              />
            </Avatar>
            
            <Heading size="xl" color={colors.text} mt="$2">
              {user?.firstName || 'John Doe'}
            </Heading>
            
            <Text color={colors.textSecondary} fontSize="$md">
              @johndoe
            </Text>
            
            <Text color={colors.text} textAlign="center" mt="$2">
              Software developer passionate about creating beautiful and functional applications
            </Text>
            
            <HStack space="md" mt="$4" mb="$4">
              <HStack alignItems="center" space="xs">
                <Mail size={16} color={colors.textSecondary} />
                <Text color={colors.textSecondary}>johndoe@example.com</Text>
              </HStack>
              
              <HStack alignItems="center" space="xs">
                <MapPin size={16} color={colors.textSecondary} />
                <Text color={colors.textSecondary}>San Francisco</Text>
              </HStack>
            </HStack>
            
            <Divider my="$4" />
            
            <VStack width="100%" space="lg">
              <Heading size="md" color={colors.text}>
                Stats
              </Heading>
              
              <HStack justifyContent="space-between" width="100%">
                <VStack alignItems="center">
                  <Heading size="lg" color={colors.text}>248</Heading>
                  <Text color={colors.textSecondary}>Posts</Text>
                </VStack>
                
                <VStack alignItems="center">
                  <Heading size="lg" color={colors.text}>12.4k</Heading>
                  <Text color={colors.textSecondary}>Followers</Text>
                </VStack>
                
                <VStack alignItems="center">
                  <Heading size="lg" color={colors.text}>142</Heading>
                  <Text color={colors.textSecondary}>Following</Text>
                </VStack>
              </HStack>
              
              <Divider my="$4" />
              
              <Heading size="md" color={colors.text}>
                Recent Activity
              </Heading>
              
              <VStack space="md">
                {[1, 2, 3].map((item) => (
                  <HStack key={item} space="md" alignItems="center">
                    <Calendar size={20} color={colors.textSecondary} />
                    <VStack>
                      <Text color={colors.text} fontWeight="$semibold">
                        Posted a new article
                      </Text>
                      <Text color={colors.textSecondary} fontSize="$sm">
                        {item} day{item > 1 ? 's' : ''} ago
                      </Text>
                    </VStack>
                  </HStack>
                ))}
              </VStack>
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
  }
});