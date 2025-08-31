import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Question } from '../api/mockData';


export const QuestionCard: React.FC<{
q: Question;
onAnswer: (choiceId: string, correct: boolean) => void;
}> = ({ q, onAnswer }) => {
return (
<View style={{ backgroundColor: '#fff', borderRadius: 16, padding: 16, elevation: 2 }}>
<Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 12 }}>{q.text}</Text>
{q.choices.map((c) => (
<TouchableOpacity key={c.id} onPress={() => onAnswer(c.id, !!c.correct)} style={{ padding: 12, borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 12, marginTop: 8 }}>
<Text style={{ fontSize: 16 }}>{c.text}</Text>
</TouchableOpacity>
))}
</View>
);
};