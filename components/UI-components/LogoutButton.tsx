import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { LogOut } from 'lucide-react-native';

type LogoutButtonProps = {
  variant?: 'text' | 'icon' | 'full';
};

export default function LogoutButton({ variant = 'full' }: LogoutButtonProps) {

  return (
    <TouchableOpacity 
      style={[
        styles.button, 
        variant === 'icon' && styles.iconButton,
        variant === 'text' && styles.textButton
      ]} 
    >
      {(variant === 'full' || variant === 'icon') && (
        <LogOut size={20} color={variant === 'full' ? '#ffffff' : '#6366f1'} />
      )}
      {(variant === 'full' || variant === 'text') && (
        <Text style={[styles.buttonText, variant === 'text' && styles.textButtonText]}>
          Logout
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#6366f1',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  iconButton: {
    backgroundColor: 'transparent',
    padding: 8,
  },
  textButton: {
    backgroundColor: 'transparent',
    padding: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  textButtonText: {
    color: '#6366f1',
  },
});