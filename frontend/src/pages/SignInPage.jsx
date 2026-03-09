import { SigninForm } from '@/components/auth/signin-form'
import React from 'react'

export const SignInPage = () => {
  return (
    <div className="relative inset-0 z-0 flex flex-col items-center justify-center p-6 bg-white min-h-svh md:p-10">
      <div
        className="absolute inset-0 z-10"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(229,231,235,0.8) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(229,231,235,0.8) 1px, transparent 1px),
            radial-gradient(circle 500px at 20% 20%, rgba(139,92,246,0.3), transparent),
            radial-gradient(circle 500px at 80% 80%, rgba(59,130,246,0.3), transparent)
          `,
          backgroundSize: "48px 48px, 48px 48px, 100% 100%, 100% 100%",
        }}
      />
      <div className="absolute z-20 w-full max-w-sm md:max-w-4xl">
        <SigninForm />
      </div>
    </div>
  )
}