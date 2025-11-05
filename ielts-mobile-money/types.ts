
export type UserAnswers = {
  [key: string]: string;
};

export interface BaseQuestion {
  id: string;
  paragraphId: string;
}

export interface MatchingQuestionType extends BaseQuestion {
  type: 'matching';
  prompt: string;
  options: string[];
  answer: string;
}

export interface FillBlankQuestionType extends BaseQuestion {
  type: 'fill-in-blank';
  prompt: {
    before?: string;
    after?: string;
  };
  answer: string[]; // a list of acceptable answers
}

export interface TFNQuestionType extends BaseQuestion {
  type: 'tfn';
  prompt: string;
  options: string[];
  answer: string;
}

export type AnyQuestion = MatchingQuestionType | FillBlankQuestionType | TFNQuestionType;

export type QuestionSectionData = {
  title: string;
  instruction: string;
  specialInstruction?: string;
  questions: AnyQuestion[];
};

export type PassageData = {
  title: string;
  paragraphs: { id: string; content: string }[];
};