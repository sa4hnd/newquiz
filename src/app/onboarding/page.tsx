'use client';

import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function OnboardingPage() {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [name, setName] = useState(session?.user?.name || '');
  const [email, setEmail] = useState(session?.user?.email || '');
  const [image, setImage] = useState(session?.user?.image || '');
  const [ipAddress, setIpAddress] = useState('');

  useEffect(() => {
    // Fetch IP address
    fetch('https://api.ipify.org?format=json')
      .then((response) => response.json())
      .then((data) => setIpAddress(data.ip));
  }, []);

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      router.push('/');
    }
  };

  const handleUpdateProfile = async () => {
    if (name || email || image) {
      try {
        await update({ name, email, image, ipAddress });
        // After successful update, redirect to home page
        router.push('/');
      } catch (error) {
        console.error('Error updating profile:', error);
        // Handle error (e.g., show an error message to the user)
      }
    } else {
      // If no changes were made, still redirect to home page
      router.push('/');
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className='text-center'>
            <h2 className='text-white text-2xl font-bold mb-4'>
              Welcome to Fergeh Quiz!
            </h2>
            <p className='text-white mb-4'>
              Get ready to challenge yourself and test your knowledge across
              various subjects.
            </p>
            <Button
              onClick={handleNext}
              className='bg-indigo-600 hover:bg-indigo-700 text-white'
            >
              Get Started
            </Button>
          </div>
        );
      case 2:
        return (
          <div className='text-center'>
            <h2 className='text-white text-2xl font-bold mb-4'>
              Customize Your Profile (Optional)
            </h2>
            <Input
              type='text'
              placeholder='Your Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='mb-4 bg-white bg-opacity-20 text-white placeholder-gray-300'
            />
            <Input
              type='email'
              placeholder='Your Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='mb-4 bg-white bg-opacity-20 text-white placeholder-gray-300'
            />
            <Input
              type='text'
              placeholder='Profile Picture URL'
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className='mb-4 bg-white bg-opacity-20 text-white placeholder-gray-300'
            />
            <Button
              onClick={handleUpdateProfile}
              className='bg-indigo-600 hover:bg-indigo-700 text-white'
            >
              Continue
            </Button>
          </div>
        );
      case 3:
        return (
          <div className='text-center'>
            <h2 className='text-white text-2xl font-bold mb-4'>
              Stay in the Loop!
            </h2>
            <p className='text-white mb-4'>
              Follow us on Instagram to get the latest updates and quiz tips.
            </p>
            <a
              href='https://www.instagram.com/sahindhamzani'
              target='_blank'
              rel='noopener noreferrer'
              className='inline-block bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white font-bold py-2 px-4 rounded-full hover:opacity-90 transition-opacity'
            >
              Follow @sahindhamzani
            </a>
          </div>
        );
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-700 via-indigo-800 to-blue-900 p-6 flex items-center justify-center'>
      <div className='relative bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-3xl p-8 w-full max-w-md'>
        <div className='absolute inset-0 rounded-3xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 opacity-75 blur-lg -z-10'></div>
        {renderStep()}
        {step === 3 && (
          <Button
            onClick={() => router.push('/')}
            className='mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white'
          >
            Start Quizzing!
          </Button>
        )}
      </div>
    </div>
  );
}
