'use client';

<<<<<<< HEAD
import { ArrowLeft, BarChart2, Clock } from 'lucide-react';
import { AlertCircle } from 'lucide-react';
import { useRouter,useSearchParams } from 'next/navigation';
import { useEffect,useState } from 'react';

=======
import { AlertCircle, ArrowLeft, BarChart2, Clock } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import SubscriptionPrompt from '@/components/SubscriptionPrompt';
>>>>>>> temp-branch
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
<<<<<<< HEAD
=======

import { useAuth } from '@/contexts/AuthContext';
>>>>>>> temp-branch

interface Question {
  id: number;
  text: string;
  options: string;
  answer: string;
}

export default function QuizPage() {
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [showWarning, setShowWarning] = useState(false);
  const [showSubscriptionPrompt, setShowSubscriptionPrompt] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push('/login');
    } else if (!user.hasAccess) {
      setShowSubscriptionPrompt(true);
    } else {
      fetchQuestions();
    }
  }, [user, router, fetchQuestions]); // Add fetchQuestions to the dependency array

  useEffect(() => {
    // Load answers from localStorage when component mounts
    const savedAnswers = localStorage.getItem('quizAnswers');
    if (savedAnswers) {
      setUserAnswers(JSON.parse(savedAnswers));
    }
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await fetch(
        `/api/questions?subjectId=${searchParams.get(
          'subjectId'
        )}&yearId=${searchParams.get('yearId')}&courseId=${searchParams.get(
          'courseId'
        )}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch questions');
      }
      const data = await response.json();
      setQuestions(data);
      setUserAnswers(new Array(data.length).fill(''));
      setTimeLeft(600); // Reset timer when questions are loaded
    } catch (error) {
      console.error('Error fetching questions:', error);
      toast.error('Failed to load questions. Please try again.');
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (answer: string) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = answer;
    setUserAnswers(newAnswers);
    setSelectedAnswer(answer);

    // Save answers to localStorage
    localStorage.setItem('quizAnswers', JSON.stringify(newAnswers));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(userAnswers[currentQuestionIndex + 1] || null);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedAnswer(userAnswers[currentQuestionIndex - 1] || null);
    }
  };

  const handleFinish = () => {
    const unansweredQuestions = userAnswers.filter((answer) => answer === '');
    if (unansweredQuestions.length > 0) {
      setShowWarning(true);
    } else {
      submitQuiz();
    }
  };

  const submitQuiz = async () => {
    const score = userAnswers.reduce((acc, answer, index) => {
      return acc + (answer === questions[index].answer ? 1 : 0);
    }, 0);
    const percentage = Math.round((score / questions.length) * 100);

    try {
      const response = await fetch('/api/quiz-results', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          score,
          total: questions.length,
          percentage,
          subjectId: searchParams.get('subjectId'),
          yearId: searchParams.get('yearId'),
          courseId: searchParams.get('courseId'),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit quiz results');
      }

      const data = await response.json();
      console.log('Quiz result submitted:', data);

      router.push(
        `/quiz-results?score=${score}&total=${
          questions.length
        }&percentage=${percentage}&subjectId=${searchParams.get(
          'subjectId'
        )}&yearId=${searchParams.get('yearId')}&courseId=${searchParams.get(
          'courseId'
        )}&userAnswers=${JSON.stringify(userAnswers)}`
      );
    } catch (error) {
      console.error('Error submitting quiz results:', error);
      toast.error('Failed to submit quiz results. Please try again.');
    }
  };

  if (!user || !user.hasAccess) {
    return (
      <SubscriptionPrompt
        isOpen={showSubscriptionPrompt}
        onClose={() => router.push('/')}
      />
    );
  }

  if (questions.length === 0) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-purple-700 via-indigo-800 to-blue-900 p-6 flex items-center justify-center'>
        <div className='bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-3xl p-8 max-w-md text-center'>
          <AlertCircle className='text-yellow-400 w-16 h-16 mx-auto mb-4' />
          <h2 className='text-white text-2xl font-bold mb-4'>Stay Tuned!</h2>
          <p className='text-white text-lg'>
            We're working on adding questions for this quiz. Please check back
            later or try another subject.
          </p>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const options = JSON.parse(currentQuestion.options);

  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-700 via-indigo-800 to-blue-900 p-6 flex flex-col'>
      <header className='flex justify-between items-center mb-8'>
        <ArrowLeft
          className='text-white w-6 h-6 cursor-pointer'
          onClick={() => router.push('/')}
        />
        <h1 className='text-white text-xl font-bold'>Quiz</h1>
        <BarChart2 className='text-white w-6 h-6' />
      </header>

      <main className='flex-grow flex flex-col justify-center'>
        <div className='bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-3xl p-4 sm:p-8 max-w-4xl mx-auto w-full'>
          <div className='flex flex-col sm:flex-row justify-between items-center mb-6'>
            <h2 className='text-white text-xl sm:text-2xl font-bold mb-2 sm:mb-0'>
              Question {currentQuestionIndex + 1} / {questions.length}
            </h2>
            <div className='flex items-center bg-[#8B4513] bg-opacity-70 rounded-full px-4 py-2'>
              <Clock className='text-white w-5 h-5 mr-2' />
              <span className='text-white font-bold'>
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>

          <div className='bg-white bg-opacity-20 backdrop-filter backdrop-blur-sm rounded-2xl p-4 sm:p-6 mb-6'>
            <h3 className='text-white text-lg sm:text-xl font-bold mb-4'>
              {currentQuestion.text}
            </h3>
            {options.map((option: string) => (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                className={`w-full text-left text-white backdrop-filter backdrop-blur-sm rounded-xl p-3 sm:p-4 mb-3 transition-all ${
                  selectedAnswer === option
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500'
                    : 'bg-white bg-opacity-10 hover:bg-opacity-20'
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          <div className='flex justify-between items-center mb-6'>
            <button
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className='bg-white bg-opacity-20 text-white font-bold py-2 px-4 rounded-full transition-transform transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed'
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={currentQuestionIndex === questions.length - 1}
              className='bg-white bg-opacity-20 text-white font-bold py-2 px-4 rounded-full transition-transform transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed'
            >
              Next
            </button>
          </div>

          <div className='grid grid-cols-4 sm:grid-cols-6 gap-2 mb-6'>
            {questions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestionIndex(index)}
                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full font-bold transition-all ${
                  currentQuestionIndex === index
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                    : userAnswers[index]
                    ? 'bg-gradient-to-r from-green-400 to-blue-500 text-white'
                    : 'bg-white bg-opacity-10 text-white hover:bg-opacity-30'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <button
            onClick={handleFinish}
            className='w-full bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold py-3 sm:py-4 rounded-full text-base sm:text-lg transition-transform transform hover:scale-105'
          >
            Finish Quiz
          </button>

          <Dialog open={showWarning} onOpenChange={setShowWarning}>
            <DialogContent className='bg-gradient-to-br from-purple-700 via-indigo-800 to-blue-900 text-white'>
              <DialogHeader>
                <DialogTitle>Warning</DialogTitle>
                <DialogDescription>
                  You haven't finished all questions yet. Are you sure you want
                  to submit?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant='outline' onClick={() => setShowWarning(false)}>
                  Continue Quiz
                </Button>
                <Button onClick={submitQuiz}>Submit Anyway</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </main>
    </div>
  );
}
