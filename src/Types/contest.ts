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

export interface ResultAnswer {
  currentQuestion: number;
  oneAnswer?: string;
  multipleAnswer?: string;
  textAnswer?: string;
}

export interface ResultSubmit {
  id: string;
  result: ResultAnswer[];
  submitted?: boolean;
}

export interface Contest {
  text: string;
  fullTime: number;
  timeCurrent: number;
}
