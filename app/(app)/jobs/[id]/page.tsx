import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { createClient } from '@/lib/supabase/server'
import { JobDetailClient } from '@/components/job-detail/JobDetailClient'

interface JobDetailPageProps {
  params: { id: string }
}

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return notFound()
  }

  const job = await prisma.job.findUnique({
    where: { id: params.id },
  })

  if (!job || job.userId !== user.id) {
    return notFound()
  }

  // Serialize the job data to pass to client component
  const serializedJob = {
    ...job,
    createdAt: job.createdAt.toISOString(),
    startedAt: job.startedAt?.toISOString() || null,
    completedAt: job.completedAt?.toISOString() || null,
  }

  return <JobDetailClient initialJob={serializedJob} />
}
