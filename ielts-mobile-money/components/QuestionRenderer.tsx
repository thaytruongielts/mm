
import React from 'react';
import { AnyQuestion } from '../types';

interface QuestionRendererProps {
  question: AnyQuestion;
  userAnswer: string;
  onAnswerChange: (id: string, answer: string) => void;
  isSubmitted: boolean;
  showAnswer: boolean;
  isCorrect?: boolean;
  onLocate: (paragraphId: string) => void;
}

const CorrectnessIndicator: React.FC<{ isCorrect?: boolean; showAnswer: boolean; correctAnswer: string | string[] }> = ({ isCorrect, showAnswer, correctAnswer }) => {
  if (isCorrect === undefined) return null;

  if (showAnswer) {
    const answerText = Array.isArray(correctAnswer) ? correctAnswer.join(' / ') : correctAnswer;
    return (
      <div className="mt-1 text-sm text-blue-600 font-semibold">
        Correct Answer: {answerText}
      </div>
    );
  }

  return (
    <span className="ml-3">
      {isCorrect ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      )}
    </span>
  );
};


const QuestionRenderer: React.FC<QuestionRendererProps> = ({ question, userAnswer, onAnswerChange, isSubmitted, showAnswer, isCorrect, onLocate }) => {
  
  const renderInput = () => {
    switch (question.type) {
      case 'matching':
      case 'tfn':
        return (
          <div className="relative inline-block w-48">
            <select
              value={userAnswer}
              onChange={(e) => onAnswerChange(question.id, e.target.value)}
              disabled={isSubmitted && !showAnswer}
              className={`block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-700 ${
                isSubmitted && !showAnswer && isCorrect !== undefined ? (isCorrect ? 'border-green-500' : 'border-red-500') : ''
              }`}
            >
              <option value="">Select...</option>
              {question.options.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        );
      case 'fill-in-blank':
        return (
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => onAnswerChange(question.id, e.target.value)}
            disabled={isSubmitted && !showAnswer}
            className={`px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 w-full sm:w-auto ${
                isSubmitted && !showAnswer && isCorrect !== undefined ? (isCorrect ? 'border-green-500' : 'border-red-500') : ''
            }`}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
      <div className="flex-shrink-0 flex items-center">
        <span className="flex items-center justify-center w-7 h-7 bg-gray-200 text-gray-700 font-bold rounded-full">{question.id}</span>
      </div>
      <div className="flex-grow">
          {question.type === 'fill-in-blank' ? (
             <div className="flex flex-wrap items-center gap-2 text-gray-800">
                {question.prompt.before && <span>{question.prompt.before}</span>}
                {renderInput()}
                {question.prompt.after && <span>{question.prompt.after}</span>}
             </div>
          ) : (
             <div className="flex items-center gap-4 text-gray-800">
                {renderInput()}
                <label>{question.prompt}</label>
             </div>
          )}
      </div>
       <button
        onClick={() => onLocate(question.paragraphId)}
        className="p-2 rounded-full hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 flex-shrink-0"
        title="Locate answer in passage"
        aria-label="Locate answer in passage"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>
      {isSubmitted && <CorrectnessIndicator isCorrect={isCorrect} showAnswer={showAnswer} correctAnswer={question.answer} />}
    </div>
  );
};

export default QuestionRenderer;