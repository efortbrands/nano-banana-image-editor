'use client'

import { useState, useEffect } from 'react'
import { AppLayout } from '@/components/layout/AppLayout'
import { StepIndicator } from './StepIndicator'
import { Step1Upload } from './Step1Upload'
import { Step2Prompt } from './Step2Prompt'
import { Step3Review } from './Step3Review'
import { useNewEditStore } from '@/lib/stores/newEditStore'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export function MultiStepForm() {
  const { step } = useNewEditStore()
  const [userEmail, setUserEmail] = useState<string | undefined>(undefined)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push('/login')
        return
      }

      setUserEmail(user.email)
    }

    checkAuth()
  }, [router])

  return (
    <AppLayout
      userEmail={userEmail}
      title="New Edit"
      subtitle="Create a new image edit in 3 simple steps"
    >
      <div className="w-full max-w-screen-2xl mx-auto">
        <StepIndicator currentStep={step} />
        <div className="py-8">
          {step === 1 && <Step1Upload />}
          {step === 2 && <Step2Prompt />}
          {step === 3 && <Step3Review />}
        </div>
      </div>
    </AppLayout>
  )
}
