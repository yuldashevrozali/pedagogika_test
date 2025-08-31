import React, { useEffect, useState } from 'react';
import { View, Text, Alert, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { Question } from '../api/mockData';
import { fetchQuestions } from '../api';
import { QuestionCard } from '../components/QuestionCard';
import { useAuth } from '../store/AuthContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Test'>;

export default function TestScreen({ route, navigation }: Props) {
  const { category, variant } = route.params;
  const { user } = useAuth();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [idx, setIdx] = useState(0);
  const [correct, setCorrect] = useState(0);

  const total = questions.length;

  useEffect(() => {
    (async () => {
      try {
        const qs = await fetchQuestions(
          { category, variant: 'random', limit: 20 },
          user?.accessToken || null,
          user?.premium || false
        );
        setQuestions(qs);
      } catch (e: any) {
        Alert.alert('Xatolik', e.message ?? 'Maʼlumot olishda xatolik');
        navigation.goBack();
      } finally {
        setLoading(false);
      }
    })();
  }, [category, user?.accessToken, user?.premium, navigation]);

  const handleAnswer = (choiceId: string, isCorrect: boolean) => {
    console.log(`Answer selected: ${choiceId}, isCorrect: ${isCorrect}`);
    if (isCorrect) {
      console.log('✅ Correct answer!');
      setCorrect((x) => x + 1);
    } else {
      console.log('❌ Wrong answer');
    }

    if (idx + 1 >= total) {
      console.log(`Test completed: ${correct + (isCorrect ? 1 : 0)}/${total} correct`);
      navigation.replace('Result', { total, correct: correct + (isCorrect ? 1 : 0) });
    } else {
      setIdx((x) => x + 1);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  if (!questions.length) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Savollar topilmadi</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 16, marginBottom: 8 }}>
        {category.toUpperCase()} • Random Test
      </Text>
      <Text style={{ marginBottom: 12 }}>
        Savol {idx + 1} / {total}
      </Text>
      <QuestionCard q={questions[idx]} onAnswer={handleAnswer} />
    </View>
  );
}