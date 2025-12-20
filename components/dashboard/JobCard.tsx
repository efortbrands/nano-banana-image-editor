import Link from 'next/link'
import Image from 'next/image'
import { formatDistanceToNow } from 'date-fns'
import { Badge } from '@/components/ui/badge'
import { Job } from '@/lib/types'

interface JobCardProps {
  job: Job
}

export function JobCard({ job }: JobCardProps) {
  const statusVariant = {
    pending: 'pending' as const,
    processing: 'processing' as const,
    completed: 'completed' as const,
    failed: 'failed' as const,
  }[job.status]

  const imageCount = job.inputImages.length

  return (
    <Link href={`/jobs/${job.id}`} className="block mb-6 last:mb-0">
      <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm hover:border-gray-300 transition-all duration-200 cursor-pointer">
        <div className="flex gap-4">
          {/* Thumbnail */}
          <div className="relative w-20 h-20 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
            {job.inputImages[0] ? (
              <Image
                src={job.inputImages[0]}
                alt="Job preview"
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <span className="text-2xl">📷</span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 flex flex-col gap-2">
            {/* Top row */}
            <div className="flex items-start justify-between gap-2">
              <p className="font-medium text-gray-900 truncate flex-1">
                {job.prompt.slice(0, 60)}{job.prompt.length > 60 ? '...' : ''}
              </p>
              <Badge variant={statusVariant}>{job.status}</Badge>
            </div>

            {/* Middle */}
            <p className="text-sm text-gray-600">
              {imageCount} {imageCount === 1 ? 'image' : 'images'}
            </p>

            {/* Bottom row */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">
                {formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}
              </span>
              <span className="text-sm text-gray-600 hover:text-gray-900">
                View
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
