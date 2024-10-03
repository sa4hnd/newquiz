import { getSession } from '@/lib/auth';

export async function GET(request: Request) {
  const session = await getSession();

  if (!session) {
    return new Response('Unauthorized', { status: 401 });
  }

  // ... rest of your API logic
}
