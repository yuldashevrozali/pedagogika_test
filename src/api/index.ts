import axios from 'axios';
import { Question } from './mockData';

type ApiTestData = {
  id: string;
  section: string;
  question: string;
  options: string[];
  answer: string;
};

export async function fetchQuestions(
  params: { category: string; variant: string; limit: number },
  token: string | null,
  premium: boolean
): Promise<Question[]> {
  if (!token) throw new Error('Unauthorized: token kerak');

  try {
    console.log('Fetching tests with params:', params);
    console.log('Using token:', token ? 'Present' : 'Missing');
    const response = await axios.get('https://pedagogika-backend.onrender.com/api/tests', {
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      }
    });
    console.log('Tests API response:', response.data);

    const allTests: ApiTestData[] = response.data;

    // Filter tests by section
    const sectionTests = allTests.filter(test => test.section === params.category);

    if (sectionTests.length === 0) {
      throw new Error('Bu bo\'lim uchun testlar topilmadi');
    }

    // Better randomization using Fisher-Yates shuffle
    const shuffled = [...sectionTests];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    const selectedTests = shuffled.slice(0, params.limit);

    console.log(`Selected ${selectedTests.length} random questions from ${sectionTests.length} total questions`);

    // Convert API format to our Question format
    return selectedTests.map(test => {
      console.log(`Question ${test.id}: answer = "${test.answer}", options = [${test.options.join(', ')}]`);

      const choices = test.options.map((option, index) => {
        const choiceId = String.fromCharCode(97 + index); // a, b, c, d
        const isCorrect = choiceId === test.answer.toLowerCase();
        console.log(`  ${choiceId}) ${option} - ${isCorrect ? 'CORRECT' : 'incorrect'}`);
        return {
          id: choiceId,
          text: option,
          correct: isCorrect
        };
      });

      return {
        id: test.id,
        text: test.question,
        choices: choices
      };
    });

  } catch (error: any) {
    if (error.response?.status === 401) {
      throw new Error('Unauthorized: token yaroqsiz');
    }
    throw new Error(error.response?.data?.message || 'Testlarni yuklashda xatolik');
  }
}