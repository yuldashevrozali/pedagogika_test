import React, { useState } from 'react';
import { View, Text, TouchableOpacity, LayoutAnimation, Platform, UIManager } from 'react-native';


if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
UIManager.setLayoutAnimationEnabledExperimental(true);
}


const Card: React.FC<{ children: React.ReactNode; style?: any }>= ({ children, style }) => (
<View style={[{ backgroundColor: '#fff', borderRadius: 16, padding: 16, marginVertical: 8, elevation: 2, shadowColor: '#00000022', shadowOpacity: 0.2, shadowRadius: 8 }, style]}>
{children}
</View>
);


export const Accordion: React.FC<{ title: string; subtitle?: string; children: React.ReactNode; premium?: boolean }>= ({ title, subtitle, children, premium }) => {
const [open, setOpen] = useState(false);
const toggle = () => { LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut); setOpen(!open); };
return (
<Card>
<TouchableOpacity onPress={toggle} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
<View>
<Text style={{ fontSize: 18, fontWeight: '600' }}>{title} {premium && <Text style={{ color: '#b7791f' }}>• Premium</Text>}</Text>
{!!subtitle && <Text style={{ color: '#666', marginTop: 4 }}>{subtitle}</Text>}
</View>
<Text style={{ fontSize: 22 }}>{open ? '−' : '+'}</Text>
</TouchableOpacity>
{open && <View style={{ marginTop: 12 }}>{children}</View>}
</Card>
);
};


export default Card;