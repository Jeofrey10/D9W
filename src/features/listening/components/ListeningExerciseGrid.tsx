import React from 'react'
import { ListeningExercise } from '../types/listening.types'
import { ListeningExerciseCard } from './ListeningExerciseCard'
import { ListeningEmptyState } from './ListeningEmptyState'

interface ListeningExerciseGridProps {
  exercises: ListeningExercise[]
  bestScores: Record<string, number>
  completedIds: string[]
  onSelectExercise: (exercise: ListeningExercise) => void
  onResetFilters: () => void
}

export const ListeningExerciseGrid: React.FC<ListeningExerciseGridProps> = ({
  exercises,
  bestScores,
  completedIds,
  onSelectExercise,
  onResetFilters,
}) => {
  if (exercises.length === 0) {
    return <ListeningEmptyState onResetFilters={onResetFilters} />
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {exercises.map((exercise) => (
        <ListeningExerciseCard
          key={exercise.id}
          exercise={exercise}
          bestScore={bestScores[exercise.id]}
          isCompleted={completedIds.includes(exercise.id)}
          onSelectExercise={onSelectExercise}
        />
      ))}
    </div>
  )
}
