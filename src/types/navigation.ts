export type RootStackParamList = {
  Signup: undefined;
  Signin: { phone?: string };
  Tabs: undefined;
  TestSelection: undefined;
  Test: { category: string; variant: string };
  Result: { total: number; correct: number };
};