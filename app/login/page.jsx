'use client'

import LoginForm from "./components/login-form";
import { LogoEbc } from '@/app/components';

export default function LoginPage() {
  
  return (
    
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className='flex mx-auto mb-2'>
          <LogoEbc />
        </div>
        <LoginForm />
      </div>
    </main>
  );
}