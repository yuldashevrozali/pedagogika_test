export type Choice = { id: string; text: string; correct?: boolean };
export type Question = { id: string; text: string; choices: Choice[] };


export const CATEGORIES = [
{ key: 'metodik', title: 'Metodik', premium: false },
{ key: 'psixologiya', title: 'Psixologiya', premium: true },
{ key: 'til', title: 'Til', premium: true },
] as const;


export const VARIANTS: Record<string, string[]> = {
metodik: ['2024 Bahor', '2024 Kuz', '2025 Bahor'],
psixologiya: ['2024 Bahor', '2024 Kuz', '2025 Bahor'],
til: ['2024 Bahor', '2024 Kuz'],
};


// generate 100+ questions per category/variant (mock)
const makeQ = (prefix: string, count = 120): Question[] =>
Array.from({ length: count }).map((_, i) => ({
id: `${prefix}-${i + 1}`,
text: `${prefix} — Savol ${i + 1} matni?`,
choices: [
{ id: 'a', text: 'Variant A' },
{ id: 'b', text: 'Variant B', correct: (i % 4) === 0 },
{ id: 'c', text: 'Variant C' },
{ id: 'd', text: 'Variant D' },
],
}));


export const QUESTIONS_DB: Record<string, Record<string, Question[]>> = {
metodik: {
'2024 Bahor': makeQ('Metodik/Bahor24'),
'2024 Kuz': makeQ('Metodik/Kuz24'),
'2025 Bahor': makeQ('Metodik/Bahor25'),
},
psixologiya: {
'2024 Bahor': makeQ('Psixologiya/Bahor24'),
'2024 Kuz': makeQ('Psixologiya/Kuz24'),
'2025 Bahor': makeQ('Psixologiya/Bahor25'),
},
til: {
'2024 Bahor': makeQ('Til/Bahor24'),
'2024 Kuz': makeQ('Til/Kuz24'),
},
};