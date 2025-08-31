import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';


export default function ResultScreen({ route, navigation }: NativeStackScreenProps<RootStackParamList, 'Result'>) {
const { total, correct } = route.params;
const percent = Math.round((correct / Math.max(total, 1)) * 100);
return (
<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 }}>
<Text style={{ fontSize: 24, fontWeight: '700', marginBottom: 8 }}>Natija</Text>
<Text style={{ fontSize: 18, marginBottom: 20 }}>{correct} / {total} — {percent}%</Text>
<TouchableOpacity onPress={() => navigation.popToTop()} style={{ backgroundColor: '#2563eb', padding: 14, borderRadius: 12, width: '80%' }}>
<Text style={{ color: '#fff', textAlign: 'center', fontWeight: '600' }}>Bosh sahifaga qaytish</Text>
</TouchableOpacity>
</View>
);
}