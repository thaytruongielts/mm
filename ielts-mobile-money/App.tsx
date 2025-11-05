import React, { useState, useCallback, useRef } from 'react';
import { PASSAGE, QUESTION_SECTIONS } from './constants';
import { UserAnswers, AnyQuestion } from './types';
import Passage from './components/Passage';
import QuestionRenderer from './components/QuestionRenderer';
import AnswerKey from './components/AnswerKey';

const App: React.FC = () => {
  const [userAnswers, setUserAnswers] = useState<UserAnswers>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);
  const [score, setScore] = useState(0);
  const [resultsChecked, setResultsChecked] = useState(false);
  const [highlightedParagraphId, setHighlightedParagraphId] = useState<string | null>(null);
  const highlightTimeoutRef = useRef<number | null>(null);

  const totalQuestions = QUESTION_SECTIONS.reduce((acc, section) => acc + section.questions.length, 0);

  const handleAnswerChange = useCallback((id: string, answer: string) => {
    setUserAnswers((prev) => ({ ...prev, [id]: answer }));
  }, []);
  
  const isCorrect = (question: AnyQuestion, answer: string): boolean => {
    const cleanedAnswer = answer.trim().toLowerCase();
    if (question.type === 'fill-in-blank') {
      return question.answer.some(ans => ans.toLowerCase() === cleanedAnswer);
    }
    return question.answer.toLowerCase() === cleanedAnswer;
  };

  const checkAnswers = () => {
    let currentScore = 0;
    QUESTION_SECTIONS.forEach(section => {
      section.questions.forEach(q => {
        const userAnswer = userAnswers[q.id] || '';
        if (isCorrect(q, userAnswer)) {
          currentScore++;
        }
      });
    });
    setScore(currentScore);
    setIsSubmitted(true);
    setShowAnswers(true);
    setResultsChecked(true);
    window.scrollTo(0, 0);
  };

  const resetTest = () => {
    setUserAnswers({});
    setIsSubmitted(false);
    setShowAnswers(false);
    setResultsChecked(false);
    setScore(0);
  };

  const handleShowAnswers = () => {
    setShowAnswers(true);
    setIsSubmitted(true);
    setResultsChecked(false);
  };
  
  const locateAnswer = useCallback((paragraphId: string) => {
    if (highlightTimeoutRef.current) {
      clearTimeout(highlightTimeoutRef.current);
    }
    
    setHighlightedParagraphId(paragraphId);
    
    const passageElement = document.getElementById('passage-container');
    if (passageElement) {
        passageElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    highlightTimeoutRef.current = window.setTimeout(() => {
        setHighlightedParagraphId(null);
        highlightTimeoutRef.current = null;
    }, 3000); // Highlight for 3 seconds
  }, []);


  return (
    <div className="container mx-auto p-4 md:p-8 font-sans">
      <header className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">IELTS Reading Practice Test</h1>
        <p className="text-gray-600 mt-2">Money Transfers by Mobile</p>
      </header>
      
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg">
        <Passage data={PASSAGE} highlightedParagraphId={highlightedParagraphId} />
        
        <hr className="my-10 border-gray-200" />
        
        {resultsChecked && (
          <div className="mb-8 p-4 bg-blue-100 border-l-4 border-blue-500 text-blue-700 rounded-md">
            <h3 className="font-bold text-lg">Your Score: {score} / {totalQuestions}</h3>
          </div>
        )}

        {resultsChecked && (
          <AnswerKey
            sections={QUESTION_SECTIONS}
            userAnswers={userAnswers}
            isCorrect={isCorrect}
          />
        )}


        {QUESTION_SECTIONS.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-12">
            <div className="bg-teal-600 text-white p-3 rounded-t-lg">
              <h2 className="text-xl font-bold">{section.title}</h2>
            </div>
            <div className="bg-gray-50 p-6 rounded-b-lg border border-gray-200">
              <p className="text-gray-700 mb-4 italic">
                {section.instruction}{' '}
                {section.specialInstruction && <strong className="text-red-600 not-italic">{section.specialInstruction}</strong>}
              </p>
              
              {section.title === 'Questions 9-13' && (
                <div className="space-y-2 text-sm text-gray-600 mb-6 p-4 bg-gray-100 rounded-md border">
                    <p><strong className="font-semibold text-gray-800">TRUE.</strong> if the statement agrees with the information</p>
                    <p><strong className="font-semibold text-gray-800">FALSE.</strong> if the statement contradicts the information</p>
                    <p><strong className="font-semibold text-gray-800">NOT GIVEN.</strong> if there is no information on this</p>
                </div>
              )}
              
              <div className="space-y-6">
                {section.questions.map((question) => (
                   <QuestionRenderer
                      key={question.id}
                      question={question}
                      userAnswer={userAnswers[question.id] || ''}
                      onAnswerChange={handleAnswerChange}
                      isSubmitted={isSubmitted}
                      showAnswer={showAnswers}
                      isCorrect={isSubmitted ? isCorrect(question, userAnswers[question.id] || '') : undefined}
                      onLocate={locateAnswer}
                   />
                ))}
              </div>
            </div>
          </div>
        ))}

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
            <button
                onClick={checkAnswers}
                className="w-full sm:w-auto bg-teal-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-teal-700 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
            >
                Check Answers
            </button>
             <button
                onClick={handleShowAnswers}
                className="w-full sm:w-auto bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
                Show Correct Answers
            </button>
            <button
                onClick={resetTest}
                className="w-full sm:w-auto bg-gray-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
            >
                Reset
            </button>
        </div>
      </div>
    </div>
  );
};

export default App;