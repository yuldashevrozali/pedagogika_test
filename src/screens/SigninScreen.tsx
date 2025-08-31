import React, { useState, useEffect } from 'react';
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

type Props = NativeStackScreenProps<RootStackParamList, 'Signin'>;

export default function SigninScreen({ route, navigation }: Props) {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    phone: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (route.params?.phone) {
      setFormData(prev => ({ ...prev, phone: route.params.phone! }));
    }
  }, [route.params?.phone]);

  const handleSignin = async () => {
    if (!formData.phone || !formData.password) {
      Alert.alert('Xatolik', 'Telefon va parolni kiriting');
      return;
    }

    setLoading(true);
    try {
      await login(formData.phone, formData.password);
      // Navigation will be handled by the auth context and app structure
    } catch (error: any) {
      const message = error.response?.data?.message || 'Kirishda xatolik yuz berdi';
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
            Kirish
          </Text>
          <Text style={{ fontSize: 16, color: '#6b7280', textAlign: 'center' }}>
            Hisobingizga kirish uchun ma'lumotlarni kiriting
          </Text>
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

        <View style={{ marginBottom: 32 }}>
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

        <TouchableOpacity
          style={{
            backgroundColor: '#2563eb',
            padding: 16,
            borderRadius: 12,
            alignItems: 'center',
            marginBottom: 20,
            opacity: loading ? 0.7 : 1,
          }}
          onPress={handleSignin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={{ color: '#fff', fontSize: 18, fontWeight: '600' }}>
              Kirish
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={{ alignItems: 'center' }}
          onPress={() => navigation.navigate('Signup')}
        >
          <Text style={{ color: '#2563eb', fontSize: 16, fontWeight: '500' }}>
            Hisobingiz yo'qmi? Ro'yxatdan o'tish
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}