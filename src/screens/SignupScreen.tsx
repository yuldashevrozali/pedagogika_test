import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { useAuth } from '../store/AuthContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Signup'>;

export default function SignupScreen({ navigation }: Props) {
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!formData.username || !formData.phone || !formData.password || !formData.confirmPassword) {
      Alert.alert('Xatolik', 'Barcha maydonlarni to\'ldiring');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Xatolik', 'Parollar mos kelmaydi');
      return;
    }

    if (formData.password.length < 6) {
      Alert.alert('Xatolik', 'Parol kamida 6 ta belgidan iborat bo\'lishi kerak');
      return;
    }

    setLoading(true);
    try {
      console.log('Signup data being sent:', {
        username: formData.username,
        phone: formData.phone,
        password: formData.password,
      });

      await signup(formData.username, formData.phone, formData.password);

      Alert.alert('Muvaffaqiyat', 'Ro\'yxatdan o\'tish muvaffaqiyatli! Tizimga kirildi.', [
        {
          text: 'OK',
          onPress: () => navigation.replace('Tabs'),
        },
      ]);
    } catch (error: any) {
      const message = error.response?.data?.message || 'Ro\'yxatdan o\'tishda xatolik yuz berdi';
      Alert.alert('Xatolik', message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 20 }}>
        <View style={{ alignItems: 'center', marginBottom: 40 }}>
          <Text style={{ fontSize: 32, fontWeight: '700', color: '#2563eb', marginBottom: 8 }}>
            Ro'yxatdan o'tish
          </Text>
          <Text style={{ fontSize: 16, color: '#6b7280', textAlign: 'center' }}>
            Yangi hisob yaratish uchun ma'lumotlarni kiriting
          </Text>
        </View>

        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 8, color: '#374151' }}>
            Foydalanuvchi nomi
          </Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: '#d1d5db',
              borderRadius: 12,
              padding: 16,
              fontSize: 16,
              backgroundColor: '#f9fafb',
            }}
            placeholder="Foydalanuvchi nomingiz"
            value={formData.username}
            onChangeText={(text) => setFormData({ ...formData, username: text })}
            autoCapitalize="none"
          />
        </View>

        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 8, color: '#374151' }}>
            Telefon
          </Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: '#d1d5db',
              borderRadius: 12,
              padding: 16,
              fontSize: 16,
              backgroundColor: '#f9fafb',
            }}
            placeholder="+998901234567"
            value={formData.phone}
            onChangeText={(text) => setFormData({ ...formData, phone: text })}
            keyboardType="phone-pad"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 8, color: '#374151' }}>
            Parol
          </Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: '#d1d5db',
              borderRadius: 12,
              padding: 16,
              fontSize: 16,
              backgroundColor: '#f9fafb',
            }}
            placeholder="Parolingiz"
            value={formData.password}
            onChangeText={(text) => setFormData({ ...formData, password: text })}
            secureTextEntry
            autoCapitalize="none"
          />
        </View>

        <View style={{ marginBottom: 32 }}>
          <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 8, color: '#374151' }}>
            Parolni tasdiqlang
          </Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: '#d1d5db',
              borderRadius: 12,
              padding: 16,
              fontSize: 16,
              backgroundColor: '#f9fafb',
            }}
            placeholder="Parolni qayta kiriting"
            value={formData.confirmPassword}
            onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
            secureTextEntry
            autoCapitalize="none"
          />
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: '#2563eb',
            padding: 16,
            borderRadius: 12,
            alignItems: 'center',
            marginBottom: 20,
            opacity: loading ? 0.7 : 1,
          }}
          onPress={handleSignup}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={{ color: '#fff', fontSize: 18, fontWeight: '600' }}>
              Ro'yxatdan o'tish
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={{ alignItems: 'center' }}
          onPress={() => navigation.navigate('Signin', {})}
        >
          <Text style={{ color: '#2563eb', fontSize: 16, fontWeight: '500' }}>
            Allaqachon hisobingiz bormi? Kirish
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}