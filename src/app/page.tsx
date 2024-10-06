'use client';

<<<<<<< HEAD
import Image from 'next/image';
import { GamepadIcon, Sparkles, TrendingUp, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
=======
import { GamepadIcon, Sparkles, Users, X } from 'lucide-react';
import { UserIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
>>>>>>> temp-branch

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { useAuth } from '@/contexts/AuthContext';

interface Subject {
  id: number;
  name: string;
}

interface Year {
  id: number;
  name: string;
}

interface Course {
  id: number;
  name: string;
}

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [years, setYears] = useState<Year[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [selectedCourse, setSelectedCourse] = useState<string>('');
<<<<<<< HEAD
=======
  const router = useRouter();
  const { user, signOut, hasAccess } = useAuth();
  const [recentQuizzes, setRecentQuizzes] = useState([]);
  const [userStats, setUserStats] = useState({
    quizzesTaken: 0,
    averageScore: 0,
    streakDays: 0,
  });
  const [leaderboard, setLeaderboard] = useState([]);
  const [streakDay, setStreakDay] = useState(0);
  const [canUpdateStreak, setCanUpdateStreak] = useState(false);
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);
>>>>>>> temp-branch

  useEffect(() => {
    async function fetchData() {
      try {
        const [subjectsRes, yearsRes, coursesRes] = await Promise.all([
          fetch('/api/subjects'),
          fetch('/api/years'),
          fetch('/api/courses'),
        ]);
        const [subjectsData, yearsData, coursesData] = await Promise.all([
          subjectsRes.json(),
          yearsRes.json(),
          coursesRes.json(),
        ]);
        setSubjects(subjectsData);
        setYears(yearsData);
        setCourses(coursesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (user && hasAccess) {
      const checkStreak = async () => {
        if (user) {
          try {
            const response = await fetch(`/api/user-streak?userId=${user.id}`);
            const data = await response.json();
            setStreakDay(data.streakDays);
            if (data.canUpdateStreak) {
              setShowWelcomePopup(true);
            }
          } catch (error) {
            console.error('Error checking streak:', error);
          }
        }
      };

      const fetchRecentQuizzes = async () => {
        try {
          const response = await fetch(`/api/user-stats?userId=${user.id}`);
          const data = await response.json();
          setRecentQuizzes(data.recentQuizzes);
        } catch (error) {
          console.error('Error fetching recent quizzes:', error);
        }
      };

      checkStreak();
      fetchRecentQuizzes();
    }
  }, [user, hasAccess]);

  useEffect(() => {
    const fetchUserStats = async () => {
      if (user) {
        try {
          const response = await fetch(`/api/user-stats?userId=${user.id}`);
          const data = await response.json();
          setUserStats(data);
          setRecentQuizzes(data.recentQuizzes || []); // Set recent quizzes here
        } catch (error) {
          console.error('Error fetching user stats:', error);
          toast.error('Failed to load user statistics');
        }
      }
    };

    const fetchLeaderboard = async () => {
      try {
        const response = await fetch('/api/leaderboard');
        const data = await response.json();
        setLeaderboard(data);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
        toast.error('Failed to load leaderboard');
      }
    };

    fetchUserStats();
    fetchLeaderboard();
  }, [user]);

  const handleStartQuiz = () => {
    if (selectedSubject && selectedYear && selectedCourse) {
      router.push(
        `/quiz?subjectId=${selectedSubject}&yearId=${selectedYear}&courseId=${selectedCourse}`
      );
    }
  };

<<<<<<< HEAD
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    return null; // This will prevent any flash of unauthenticated content
  }
=======
  const handleUpdateStreak = async () => {
    if (user) {
      try {
        const response = await fetch('/api/user-streak', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user.id }),
        });
        const data = await response.json();
        setStreakDay(data.streakDays);
        setShowWelcomePopup(false);
        toast.success(data.message);
      } catch (error) {
        console.error('Error updating streak:', error);
        toast.error('Failed to update streak');
      }
    }
  };
>>>>>>> temp-branch

  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-700 via-indigo-800 to-blue-900 p-6'>
      <header className='flex justify-between items-center mb-8'>
<<<<<<< HEAD
        <h1 className='text-white text-2xl font-bold'>Fergeh Quiz</h1>
        <div className='flex items-center'>
          {session.user?.image && (
            <Image
              src={session.user.image}
              alt='User profile'
              width={40}
              height={40}
              className='rounded-full mr-4'
            />
          )}
          <span className='text-white mr-4'>
            Welcome, {session.user?.name || session.user?.email}
          </span>
          <Button onClick={() => signOut({ callbackUrl: '/login' })}>
            Sign Out
          </Button>
        </div>
      </header>
      <main className='space-y-8'>
        {/* User Stats */}
        <section className='bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-3xl p-6'>
          <h2 className='text-white text-xl font-bold mb-4'>Your Progress</h2>
          <div className='grid grid-cols-3 gap-4'>
            <div className='bg-pink-500 bg-opacity-20 rounded-2xl p-4 text-center'>
              <p className='text-white text-2xl font-bold'>42</p>
              <p className='text-white text-sm'>Quizzes Taken</p>
=======
        <h1 className='text-white text-4xl font-bold'>Welcome to Fergeh</h1>
        {user ? (
          <Link href='/profile'>
            <UserIcon className='text-white w-8 h-8 cursor-pointer' />
          </Link>
        ) : (
          <Link href='/login'>
            <Button className='bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-2 px-4 rounded-2xl transition-transform transform hover:scale-105'>
              Sign In
            </Button>
          </Link>
        )}
      </header>

      <main className='mt-8'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-3xl p-6'>
            <h2 className='text-white text-2xl font-bold mb-4'>
              Your Progress
            </h2>
            <div className='grid grid-cols-2 gap-4 mb-8'>
              <div className='bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm rounded-2xl p-4'>
                <h3 className='text-white text-lg font-bold mb-2'>
                  Quizzes Taken
                </h3>
                <p className='text-white text-3xl font-bold'>
                  {userStats.quizzesTaken}
                </p>
              </div>
              <div className='bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm rounded-2xl p-4'>
                <h3 className='text-white text-lg font-bold mb-2'>
                  Avg. Score
                </h3>
                <p className='text-white text-3xl font-bold'>
                  {userStats.averageScore}%
                </p>
              </div>
>>>>>>> temp-branch
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div className='bg-green-500 bg-opacity-20 rounded-xl p-4'>
                <h3 className='text-white text-lg font-bold mb-2'>
                  Streak Days
                </h3>
                <p className='text-white text-3xl font-bold'>{streakDay}</p>
              </div>
              <div className='bg-yellow-500 bg-opacity-20 rounded-xl p-4'>
                <h3 className='text-white text-lg font-bold mb-2'>Your Rank</h3>
                <p className='text-white text-3xl font-bold'>
                  {leaderboard.findIndex((entry) => entry.id === user?.id) + 1}
                </p>
              </div>
            </div>
          </div>

          <div className='bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-3xl p-6'>
            <h2 className='text-white text-2xl font-bold mb-4'>Leaderboard</h2>
            <ul className='space-y-2'>
              {leaderboard.slice(0, 10).map((entry, index) => (
                <li
                  key={entry.id}
                  className='flex justify-between items-center bg-white bg-opacity-20 rounded-xl p-2'
                >
                  <span className='text-white font-bold'>
                    {index + 1}. {entry.displayName}
                  </span>
                  <span className='text-white'>{entry.averageScore}%</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Quiz Categories */}
        <section className='bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-3xl p-6 mt-6'>
          <h2 className='text-white text-xl font-bold mb-4'>Quiz Categories</h2>
          <div className='space-y-4'>
            {/* Subject Dropdown */}
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger className='w-full bg-white bg-opacity-20 text-white rounded-2xl py-3 px-4'>
                <SelectValue placeholder='Select Subject' />
              </SelectTrigger>
              <SelectContent className='bg-purple-800 text-white border-none rounded-xl'>
                {subjects.map((subject) => (
                  <SelectItem
                    key={subject.id}
                    value={subject.id.toString()}
                    className='focus:bg-purple-700 focus:text-white'
                  >
                    {subject.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Year Dropdown */}
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className='w-full bg-white bg-opacity-20 text-white rounded-2xl py-3 px-4'>
                <SelectValue placeholder='Select Year' />
              </SelectTrigger>
              <SelectContent className='bg-purple-800 text-white border-none rounded-xl'>
                {years.map((year) => (
                  <SelectItem
                    key={year.id}
                    value={year.id.toString()}
                    className='focus:bg-purple-700 focus:text-white'
                  >
                    {year.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Course Dropdown */}
            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
              <SelectTrigger className='w-full bg-white bg-opacity-20 text-white rounded-2xl py-3 px-4'>
                <SelectValue placeholder='Select Course' />
              </SelectTrigger>
              <SelectContent className='bg-purple-800 text-white border-none rounded-xl'>
                {courses.map((course) => (
                  <SelectItem
                    key={course.id}
                    value={course.id.toString()}
                    className='focus:bg-purple-700 focus:text-white'
                  >
                    {course.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <button
              onClick={handleStartQuiz}
              className='w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-3 rounded-2xl transition-transform transform hover:scale-105'
            >
              Start Quiz
            </button>
          </div>
        </section>

        {/* Game Modes */}
        <section className='mb-8'>
          <h2 className='text-white text-2xl font-bold mb-4'>Game Modes</h2>
          <div className='grid grid-cols-2 gap-4'>
            {[
              {
                name: 'Challenge',
                icon: GamepadIcon,
                desc: 'Play single',
                color: 'from-blue-400 to-blue-600',
              },
              {
                name: 'Tournament',
                icon: Users,
                desc: 'Play with strangers',
                color: 'from-pink-400 to-pink-600',
              },
              {
                name: 'Duel',
                icon: GamepadIcon,
                desc: 'Play with friend',
                color: 'from-green-400 to-green-600',
              },
              {
                name: 'Lucky',
                icon: Sparkles,
                desc: 'Play single and learn',
                color: 'from-purple-400 to-purple-600',
              },
            ].map((mode) => (
              <button
                key={mode.name}
                className={`bg-gradient-to-br ${mode.color} bg-opacity-50 backdrop-filter backdrop-blur-sm rounded-2xl p-4 flex flex-col items-center justify-center transition-transform transform hover:scale-105`}
              >
                <mode.icon className='text-white w-8 h-8 mb-2' />
                <h3 className='text-white font-semibold'>{mode.name}</h3>
                <p className='text-white text-xs'>{mode.desc}</p>
              </button>
            ))}
          </div>
        </section>

        {user && hasAccess && (
          <div className='bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-3xl p-6 mt-6'>
            <h2 className='text-white text-2xl font-bold mb-4'>
              Recent Quiz Results
            </h2>
            {recentQuizzes.length > 0 ? (
              <ul>
                {recentQuizzes.map((quiz, index) => (
                  <li key={index} className='text-white mb-2'>
                    Score: {quiz.score} - Date:{' '}
                    {new Date(quiz.createdAt).toLocaleDateString()}
                  </li>
                ))}
              </ul>
            ) : (
              <p className='text-white'>No recent quizzes taken.</p>
            )}
          </div>
        )}
      </main>

      {showWelcomePopup && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-3xl p-6 max-w-md w-full'>
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-white text-2xl font-bold'>Welcome Back!</h2>
              <button
                onClick={() => setShowWelcomePopup(false)}
                className='text-white'
              >
                <X size={24} />
              </button>
            </div>
            <p className='text-white text-lg mb-4'>
              You're on day {streakDay + 1} of your streak!
            </p>
            <Button onClick={handleUpdateStreak} className='w-full'>
              Continue Streak
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
