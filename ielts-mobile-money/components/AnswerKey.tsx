import React from 'react';
import { QuestionSectionData, UserAnswers, AnyQuestion } from '../types';

interface AnswerKeyProps {
  sections: QuestionSectionData[];
  userAnswers: UserAnswers;
  isCorrect: (question: AnyQuestion, answer: string) => boolean;
}

const AnswerKey: React.FC<AnswerKeyProps> = ({ sections, userAnswers, isCorrect }) => {
  const allQuestions = sections.flatMap(section => section.questions);

  const getCorrectAnswerText = (question: AnyQuestion): string => {
    if (question.type === 'fill-in-blank') {
       return question.answer.length > 1 ? question.answer.join(' / ') : question.answer[0];
    }
    return question.answer;
  };

  return (
    <div className="mb-8 p-6 bg-gray-50 border border-gray-200 rounded-lg">
      <h3 className="text-xl font-bold text-gray-800 mb-6" style={{ color: '#2d3748' }}>Part 1: Question 1 - 13</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
        {allQuestions.map(question => {
          const userAnswer = userAnswers[question.id] || '';
          const isAnswerCorrect = isCorrect(question, userAnswer);
          const correctAnswer = getCorrectAnswerText(question);

          return (
            <div key={question.id} className="flex items-center space-x-3 text-base">
              <span className="flex-shrink-0 flex items-center justify-center w-7 h-7 text-white font-bold rounded-full" style={{ backgroundColor: '#2F855A' }}>
                {question.id}
              </span>
              <div className="flex items-center gap-2 text-gray-700">
                <span>{userAnswer || 'No Answer'}</span>
                 {isAnswerCorrect ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                 ) : (
                    <>
                        <span className="text-gray-500">: {correctAnswer}</span>
                        <span className="font-semibold" style={{color: '#c53030'}}>×</span>
                    </>
                 )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AnswerKey;