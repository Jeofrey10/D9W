import React from 'react'
import { ReadingPassage } from '../types/reading.types'
import { ReadingPassageCard } from './ReadingPassageCard'

interface ReadingPassageGridProps {
  passages: ReadingPassage[]
  completedPassageIds: string[]
  bestScores: Record<string, number>
  onSelectPassage: (passageId: string) => void
}

export const ReadingPassageGrid: React.FC<ReadingPassageGridProps> = ({
  passages,
  completedPassageIds,
  bestScores,
  onSelectPassage,
}) => {
  const completedSet = new Set(completedPassageIds)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {passages.map((passage) => (
        <ReadingPassageCard
          key={passage.id}
          passage={passage}
          isCompleted={completedSet.has(passage.id)}
          bestScore={bestScores[passage.id]}
          onSelectPassage={onSelectPassage}
        />
      ))}
    </div>
  )
}
