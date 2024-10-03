import { getServerSession } from 'next-auth/next';
import { useSession as useNextAuthSession } from 'next-auth/react';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export const useSession = useNextAuthSession;

export async function getSession() {
  return await getServerSession(authOptions);
}
