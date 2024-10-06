'use client';

import { Check, Home, RotateCcw, Share, X } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
<<<<<<< HEAD:src/app/results/page.tsx
import { useEffect,useState } from 'react';
=======
import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
>>>>>>> temp-branch:src/app/quiz-results/page.tsx
import { toast } from 'sonner';

interface Question {
  id: number;
  text: string;
  options: string;
  answer: string;
  userAnswer: string;
}

interface ParsedQuestion extends Omit<Question, 'options'> {
  options: string[];
}

export default function ResultsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showQuestions, setShowQuestions] = useState<
    'correct' | 'incorrect' | null
  >(null);
  const [questions, setQuestions] = useState<ParsedQuestion[]>([]);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState<
    number | null
  >(null);
<<<<<<< HEAD:src/app/results/page.tsx
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [percentage, setPercentage] = useState(0);
=======
  const [showConfetti, setShowConfetti] = useState(true);

  const score = parseInt(searchParams.get('score') || '0');
  const total = parseInt(searchParams.get('total') || '1');
  const percentage = parseInt(searchParams.get('percentage') || '0');
>>>>>>> temp-branch:src/app/quiz-results/page.tsx

  useEffect(() => {
    const fetchQuestions = async () => {
      const subjectId = searchParams.get('subjectId');
      const yearId = searchParams.get('yearId');
      const courseId = searchParams.get('courseId');
      const userAnswers = JSON.parse(searchParams.get('userAnswers') || '[]');

<<<<<<< HEAD:src/app/results/page.tsx
      const response = await fetch(
        `/api/questions?subjectId=${subjectId}&yearId=${yearId}&courseId=${courseId}`
      );
      const data: Question[] = await response.json();

      const questionsWithUserAnswers: ParsedQuestion[] = data.map(
        (q: Question, index: number) => ({
          ...q,
          options: JSON.parse(q.options),
          userAnswer: userAnswers[index] || '',
        })
      );

      setQuestions(questionsWithUserAnswers);
      setScore(parseInt(searchParams.get('score') || '0'));
      setTotal(parseInt(searchParams.get('total') || '0'));
      setPercentage(parseInt(searchParams.get('percentage') || '0'));
=======
      try {
        const response = await fetch(
          `/api/questions?subjectId=${subjectId}&yearId=${yearId}&courseId=${courseId}`
        );
        const data = await response.json();

        if (!Array.isArray(data)) {
          console.error('Expected an array of questions, but received:', data);
          toast.error('Failed to load questions. Please try again.');
          return;
        }

        const questionsWithUserAnswers = data.map(
          (q: Question, index: number) => ({
            ...q,
            options: Array.isArray(q.options)
              ? q.options
              : JSON.parse(q.options),
            userAnswer: userAnswers[index] || '',
          })
        );

        setQuestions(questionsWithUserAnswers);
      } catch (error) {
        console.error('Error fetching questions:', error);
        toast.error('Failed to load questions. Please try again.');
      }
>>>>>>> temp-branch:src/app/quiz-results/page.tsx
    };

    fetchQuestions();

    // Clear localStorage when results are shown
    localStorage.removeItem('quizAnswers');

    // Stop confetti after 5 seconds
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, [searchParams]);

  const correctQuestions = questions.filter((q) => q.answer === q.userAnswer);
  const incorrectQuestions = questions.filter((q) => q.answer !== q.userAnswer);

  const handleShowQuestions = (type: 'correct' | 'incorrect') => {
    setShowQuestions(type);
    setSelectedQuestionIndex(null);
  };

  const filteredQuestions = showQuestions
    ? questions.filter((q) =>
        showQuestions === 'correct'
          ? q.answer === q.userAnswer
          : q.answer !== q.userAnswer
      )
    : [];

  const handleShare = async () => {
    const shareData = {
      title: 'Fergeh Quiz Results',
      text: `I scored ${percentage}% (${score}/${total}) on the Fergeh quiz!`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(
          `${shareData.text}\n${shareData.url}`
        );
        toast.success('Result copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
      toast.error('Failed to share results');
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-700 via-indigo-800 to-blue-900 p-6'>
      {showConfetti && <Confetti />}
      <main className='flex-grow flex flex-col justify-center'>
        <div className='bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-3xl p-8 max-w-md mx-auto w-full'>
          <h2 className='text-white text-3xl font-bold mb-4'>Quiz Results</h2>
          <div className='text-center mb-8'>
            <div className='text-6xl font-bold text-white mb-2'>
              {percentage}%
            </div>
            <p className='text-white text-xl'>
              You scored <span className='font-bold'>{score}</span> out of{' '}
              <span className='font-bold'>{total}</span>
            </p>
          </div>

          <div className='grid grid-cols-2 gap-4 mb-8'>
            <button
              onClick={() => handleShowQuestions('correct')}
              className={`bg-green-500 bg-opacity-20 backdrop-filter backdrop-blur-sm rounded-2xl p-4 text-center ${
                showQuestions === 'correct' ? 'ring-2 ring-green-400' : ''
              }`}
            >
              <h3 className='text-white text-lg font-bold mb-2'>Correct</h3>
              <p className='text-white text-3xl font-bold'>
                {correctQuestions.length}
              </p>
            </button>
            <button
              onClick={() => handleShowQuestions('incorrect')}
              className={`bg-red-500 bg-opacity-20 backdrop-filter backdrop-blur-sm rounded-2xl p-4 text-center ${
                showQuestions === 'incorrect' ? 'ring-2 ring-red-400' : ''
              }`}
            >
              <h3 className='text-white text-lg font-bold mb-2'>Incorrect</h3>
              <p className='text-white text-3xl font-bold'>
                {incorrectQuestions.length}
              </p>
            </button>
          </div>

          {showQuestions && (
            <div className='mb-8'>
              <h3 className='text-white text-xl font-bold mb-4'>
                {showQuestions === 'correct' ? 'Correct' : 'Incorrect'}{' '}
                Questions
              </h3>
              <div className='grid grid-cols-5 gap-2 mb-4'>
                {filteredQuestions.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedQuestionIndex(index)}
                    className={`w-8 h-8 rounded-full font-bold ${
                      selectedQuestionIndex === index
                        ? 'bg-blue-500 text-white'
                        : 'bg-white bg-opacity-20 text-white'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
              {selectedQuestionIndex !== null && (
                <div className='bg-white bg-opacity-20 backdrop-filter backdrop-blur-sm rounded-2xl p-4 mb-4'>
                  <p className='text-white font-bold mb-2'>
                    {selectedQuestionIndex + 1}.{' '}
                    {filteredQuestions[selectedQuestionIndex].text}
                  </p>
                  {filteredQuestions[selectedQuestionIndex].options.map(
                    (option, optionIndex) => (
                      <div
                        key={optionIndex}
                        className={`p-2 rounded-xl mb-2 ${
                          option ===
                          filteredQuestions[selectedQuestionIndex].answer
                            ? 'bg-green-500 bg-opacity-30'
                            : option ===
                              filteredQuestions[selectedQuestionIndex]
                                .userAnswer
                            ? 'bg-red-500 bg-opacity-30'
                            : 'bg-white bg-opacity-10'
                        }`}
                      >
                        <span className='text-white'>{option}</span>
                        {option ===
                          filteredQuestions[selectedQuestionIndex].answer && (
                          <Check className='inline-block ml-2 text-green-500' />
                        )}
                        {option ===
                          filteredQuestions[selectedQuestionIndex].userAnswer &&
                          option !==
                            filteredQuestions[selectedQuestionIndex].answer && (
                            <X className='inline-block ml-2 text-red-500' />
                          )}
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          )}

          <div className='grid grid-cols-3 gap-4'>
            <button
              onClick={() => router.push('/')}
              className='flex flex-col items-center justify-center bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm rounded-2xl p-4 transition-transform transform hover:scale-105'
            >
              <Home className='text-white w-6 h-6 mb-2' />
              <span className='text-white text-sm'>Home</span>
            </button>
            <button
              onClick={() => router.back()}
              className='flex flex-col items-center justify-center bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm rounded-2xl p-4 transition-transform transform hover:scale-105'
            >
              <RotateCcw className='text-white w-6 h-6 mb-2' />
              <span className='text-white text-sm'>Retry</span>
            </button>
            <button
              onClick={handleShare}
              className='flex flex-col items-center justify-center bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm rounded-2xl p-4 transition-transform transform hover:scale-105'
            >
              <Share className='text-white w-6 h-6 mb-2' />
              <span className='text-white text-sm'>Share</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
