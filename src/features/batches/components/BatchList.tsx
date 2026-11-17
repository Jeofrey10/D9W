import React from 'react'
import { Batch } from '@/data/batches'
import { BatchCard } from './BatchCard'
import { BatchEmptyState } from './BatchEmptyState'

interface BatchListProps {
  batches: Batch[]
  onViewDetails: (batch: Batch) => void
  onResetFilters: () => void
  className?: string
}

export const BatchList: React.FC<BatchListProps> = ({
  batches,
  onViewDetails,
  onResetFilters,
  className = '',
}) => {
  if (batches.length === 0) {
    return <BatchEmptyState onResetFilters={onResetFilters} className={className} />
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between text-xs text-[#89857E] px-1 font-mono uppercase tracking-wider">
        <span>Chronological Upcoming Batches</span>
        <span>{batches.length} {batches.length === 1 ? 'Cohort' : 'Cohorts'} Scheduled</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {batches.map((batch) => (
          <BatchCard
            key={batch.id}
            batch={batch}
            onViewDetails={onViewDetails}
          />
        ))}
      </div>
    </div>
  )
}
