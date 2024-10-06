'use client';

import Link from 'next/link';
<<<<<<< HEAD
import { signIn } from 'next-auth/react';
import { useState } from 'react';
=======
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
>>>>>>> temp-branch
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

<<<<<<< HEAD
export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signIn('email', { email, callbackUrl: '/onboarding' });
      toast.success(
        isSignUp
          ? 'Check your email to complete sign up!'
          : 'Check your email for the login link!'
      );
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl: '/onboarding' });
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-700 via-indigo-800 to-blue-900 p-6 flex items-center justify-center'>
      <div className='relative bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-3xl p-8 w-full max-w-md'>
        <div className='absolute inset-0 rounded-3xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 opacity-75 blur-lg -z-10'></div>
        <h1 className='text-white text-3xl font-bold mb-2 text-center'>
          Welcome to Fergeh Quiz
        </h1>
        <p className='text-white text-center mb-6'>
          Test your knowledge and challenge yourself!
        </p>
        <form onSubmit={handleEmailAuth} className='space-y-4 mb-6'>
          <Input
            type='email'
            placeholder='Enter your email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='bg-white bg-opacity-20 text-white placeholder-gray-300'
            required
          />
          <Button
            type='submit'
            className='w-full bg-indigo-600 hover:bg-indigo-700 text-white'
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : isSignUp ? 'Sign Up' : 'Login'}
          </Button>
        </form>
        <div className='relative mb-6'>
          <hr className='border-t border-gray-300' />
          <span className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-transparent px-2 text-white text-sm'>
            OR
          </span>
        </div>
        <Button
          onClick={handleGoogleSignIn}
          className='w-full bg-white text-gray-800 hover:bg-gray-100 flex items-center justify-center mb-4'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 48 48'
            width='24'
            height='24'
            className='mr-2'
          >
            <path
              fill='#FFC107'
              d='M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z'
            />
            <path
              fill='#FF3D00'
              d='M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z'
            />
            <path
              fill='#4CAF50'
              d='M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z'
            />
            <path
              fill='#1976D2'
              d='M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z'
            />
          </svg>
          Sign in with Google
        </Button>
        <p className='text-white text-center'>
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className='text-indigo-300 hover:text-indigo-200 ml-2'
          >
            {isSignUp ? 'Login' : 'Sign Up'}
          </button>
        </p>
      </div>
=======
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, signInWithEmail } = useAuth();
  const router = useRouter();

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmail(email, password);
      router.push('/');
    } catch (error) {
      console.error('Error signing in with email:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      console.log('Attempting Google Sign-In');
      const firebaseUser = await signIn();
      console.log('Sign-In successful, user:', firebaseUser);
      if (firebaseUser) {
        console.log('Redirecting to home page');
        router.push('/');
      } else {
        console.error('Sign in failed or was cancelled');
        toast.error('Sign in failed. Please try again.');
      }
    } catch (error) {
      console.error('Error signing in with Google:', error);
      toast.error('Failed to sign in with Google. Please try again.');
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-700 via-indigo-800 to-blue-900 p-6 flex flex-col'>
      <header className='flex justify-between items-center mb-8'>
        <Link href='/'>
          <h1 className='text-white text-4xl font-bold'>Fergeh</h1>
        </Link>
      </header>
      <main className='flex-grow flex items-center justify-center'>
        <div className='bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-3xl p-8 w-full max-w-md'>
          <h2 className='text-white text-3xl font-bold mb-6 text-center'>
            Sign In
          </h2>
          <form onSubmit={handleEmailSignIn} className='space-y-4 mb-6'>
            <Input
              type='email'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='bg-white bg-opacity-20 text-white placeholder-gray-300'
            />
            <Input
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='bg-white bg-opacity-20 text-white placeholder-gray-300'
            />
            <Button
              type='submit'
              className='w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-3 rounded-2xl transition-transform transform hover:scale-105'
            >
              Sign In with Email
            </Button>
          </form>
          <div className='relative mb-6'>
            <hr className='border-t border-gray-300' />
            <span className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-transparent px-2 text-white text-sm'>
              or
            </span>
          </div>
          <Button
            onClick={handleGoogleSignIn}
            className='w-full flex items-center justify-center space-x-2 bg-white text-gray-800 hover:bg-gray-100 font-bold py-3 rounded-2xl transition-transform transform hover:scale-105'
          >
            <FcGoogle size={20} />
            <span>Sign In with Google</span>
          </Button>
        </div>
      </main>
>>>>>>> temp-branch
    </div>
  );
}
