import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Alert, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import { Accordion } from '../components/Accordion';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { useAuth } from '../store/AuthContext';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import { showAdWithTimeout } from '../utils/admob';

const styles = StyleSheet.create({
  startButton: {
    backgroundColor: '#2563eb',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 6,
  },
});

type TestData = {
  id: string;
  section: string;
  question: string;
  options: string[];
  correct_answer: string;
};

type SectionData = {
  [section: string]: TestData[];
};

export default function TestSelectionScreen() {
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { user } = useAuth();
  const [sections, setSections] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestSections();
  }, []);

  const fetchTestSections = async () => {
    try {
      const response = await axios.get('https://pedagogika-backend.onrender.com/api/tests', {
        headers: {
          'Authorization': `Bearer ${user?.accessToken}`
        }
      });

      const tests: TestData[] = response.data;
      const sectionMap: SectionData = {};

      // Group tests by section
      tests.forEach(test => {
        if (!sectionMap[test.section]) {
          sectionMap[test.section] = [];
        }
        sectionMap[test.section].push(test);
      });

      // Get unique sections
      const uniqueSections = Object.keys(sectionMap);
      setSections(uniqueSections);
    } catch (error: any) {
      console.error('Error fetching tests:', error);
      Alert.alert('Xatolik', 'Testlarni yuklashda xatolik yuz berdi');
    } finally {
      setLoading(false);
    }
  };

  const handleTestStart = async (section: string) => {
    if (!user?.accessToken) {
      Alert.alert('Kirish kerak', 'Testni boshlash uchun tizimga kiring.');
      return;
    }

    try {
      console.log('Showing ad before starting test...');
      const adShown = await showAdWithTimeout(5); // 5 second ad

      if (adShown) {
        console.log('Ad completed, starting test...');
      } else {
        console.log('Ad failed or skipped, starting test anyway...');
      }

      // Navigate to test regardless of ad success
      nav.navigate('Test', { category: section, variant: 'random' });
    } catch (error) {
      console.error('Error showing ad:', error);
      // Still navigate to test even if ad fails
      nav.navigate('Test', { category: section, variant: 'random' });
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={{ marginTop: 16, color: '#6b7280' }}>Testlar yuklanmoqda...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: '700', marginBottom: 8 }}>Testlar</Text>
      <Text style={{ color: '#6b7280', marginBottom: 20 }}>
        Bo'limni tanlang va testni boshlang. Har bir testda 10 ta savol bo'ladi.
      </Text>

      {sections.map((section) => (
        <Accordion
          key={section}
          title={section}
          subtitle="10 ta savol"
          premium={false}
        >
          <View style={{ padding: 16 }}>
            <Text style={{ fontSize: 16, color: '#374151', marginBottom: 16 }}>
              {section} bo'limi testini boshlash uchun quyidagi tugmani bosing:
            </Text>
            <TouchableOpacity
              style={styles.startButton}
              onPress={() => handleTestStart(section)}
            >
              <Ionicons name="play-circle" size={20} color="#fff" />
              <Text style={styles.startButtonText}>Boshlash</Text>
            </TouchableOpacity>
          </View>
        </Accordion>
      ))}

      {sections.length === 0 && !loading && (
        <View style={{ alignItems: 'center', padding: 40 }}>
          <Text style={{ fontSize: 16, color: '#6b7280' }}>
            Testlar topilmadi
          </Text>
        </View>
      )}
    </ScrollView>
  );
}