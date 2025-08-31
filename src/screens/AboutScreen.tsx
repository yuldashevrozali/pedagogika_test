import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';


export default function AboutScreen() {
return (
<ScrollView style={{ flex: 1, padding: 16 }}>
<Image source={{ uri: 'https://picsum.photos/800/400' }} style={{ width: '100%', height: 180, borderRadius: 16, marginBottom: 16 }} />
<Text style={{ fontSize: 24, fontWeight: '700', marginBottom: 8 }}>Biz haqimizda</Text>
<Text style={{ fontSize: 16, lineHeight: 22, color: '#374151' }}>
Ushbu ilova taʼlim yoʻnalishidagi testlarni qulay va tezkor ishlash uchun yaratilgan.
Metodik, Psixologiya va Til boʼlimlari boʼyicha variantlar muntazam yangilanadi.
</Text>
</ScrollView>
);
}