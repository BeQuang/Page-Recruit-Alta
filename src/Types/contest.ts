export interface AnswerItem {
  name: string;
  isAnswer: boolean;
}

export interface QuestionItem {
  question: string;
  type: string;
  answer?: AnswerItem[];
}

export interface DataContest {
  id: string;
  title: string;
  totalQuestions: number;
  fullTime: number;
  listQuestions?: QuestionItem[];
}
