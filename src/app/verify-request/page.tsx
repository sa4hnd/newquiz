import Link from 'next/link';

export default function VerifyRequestPage() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-700 via-indigo-800 to-blue-900 p-6 flex items-center justify-center'>
      <div className='bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-3xl p-8 w-full max-w-md text-center'>
        <h1 className='text-white text-3xl font-bold mb-6'>Check Your Email</h1>
        <p className='text-white mb-6'>
          A sign in link has been sent to your email address. Please check your
          inbox and click the link to continue.
        </p>
        <Link href='/login' className='text-indigo-300 hover:text-indigo-200'>
          Return to login
        </Link>
      </div>
    </div>
  );
}
