import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';


export const VariantCard: React.FC<{ label: string; onPress: () => void; premium?: boolean }>= ({ label, onPress, premium }) => (
<TouchableOpacity onPress={onPress} style={{ flex: 1, minWidth: '48%' }}>
<View style={{ borderWidth: 1, borderColor: '#eee', borderRadius: 14, padding: 14, marginBottom: 10, backgroundColor: premium ? '#fff7ed' : '#f8fafc' }}>
<Text style={{ fontSize: 16, fontWeight: '600' }}>{label}</Text>
{premium && <Text style={{ marginTop: 6, color: '#b7791f', fontWeight: '500' }}>Premium</Text>}
</View>
</TouchableOpacity>
);