import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  const cookieStore = cookies();
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  try {
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
      console.log('Dashboard auth guard: No authenticated user found, redirecting to home');
      redirect('/?authRequired=true');
    }

    console.log('Dashboard auth guard: User authenticated, rendering dashboard');
    return <>{children}</>;

  } catch (error) {
    console.error('Dashboard auth guard error:', error);
    redirect('/?authRequired=true');
  }
}
