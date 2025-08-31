import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="school" size={64} color="#2563eb" />
        <Text style={styles.title}>Pedagogika Test</Text>
        <Text style={styles.subtitle}>O'zbekiston pedagogika sohasi uchun test platformasi</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <Ionicons name="book" size={32} color="#2563eb" style={styles.icon} />
          <Text style={styles.sectionTitle}>Ta'lim sifatini oshirish</Text>
          <Text style={styles.sectionText}>
            Pedagogika sohasida bilimlaringizni sinab ko'ring va rivojlantiring.
            Har xil fanlar bo'yicha testlar orqali o'z bilimingizni baholang.
          </Text>
        </View>

        <View style={styles.section}>
          <Ionicons name="analytics" size={32} color="#2563eb" style={styles.icon} />
          <Text style={styles.sectionTitle}>Aniq natijalar</Text>
          <Text style={styles.sectionText}>
            Har bir testdan keyin batafsil natija va tahlil olishingiz mumkin.
            O'z kuchli va zaif tomonlaringizni aniqlang.
          </Text>
        </View>

        <View style={styles.section}>
          <Ionicons name="trophy" size={32} color="#2563eb" style={styles.icon} />
          <Text style={styles.sectionTitle}>Rivojlanish</Text>
          <Text style={styles.sectionText}>
            Doimiy ravishda o'z ustingizda ishlang va pedagog sifatida o'sing.
            Bilimlaringizni mustahkamlang va yangilang.
          </Text>
        </View>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    alignItems: 'center',
    padding: 32,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1f2937',
    marginTop: 16,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 24,
  },
  content: {
    padding: 20,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  icon: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  sectionText: {
    fontSize: 16,
    color: '#6b7280',
    lineHeight: 24,
  },
  testButton: {
    backgroundColor: '#2563eb',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  testButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginRight: 8,
  },
});