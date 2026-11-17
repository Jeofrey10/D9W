import React from 'react'
import {
  ListeningExercise,
  ListeningExerciseType,
} from '../types/listening.types'
import { LISTENING_CATEGORIES } from '@/data/listening/categories'
import {
  Clock,
  CheckCircle2,
  Play,
  Volume2,
  FileText,
  HelpCircle,
  PenTool,
  Radio,
  ArrowRight,
} from 'lucide-react'

interface ListeningExerciseCardProps {
  exercise: ListeningExercise
  bestScore?: number
  isCompleted: boolean
  onSelectExercise: (exercise: ListeningExercise) => void
}

function getExerciseTypeLabel(type: ListeningExerciseType): {
  label: string
  icon: React.ReactNode
} {
  switch (type) {
    case 'multiple-choice':
      return { label: 'Multiple Choice', icon: <HelpCircle className="w-3.5 h-3.5 text-[#1E4F8A]" /> }
    case 'true-false':
      return { label: 'Richtig / Falsch', icon: <CheckCircle2 className="w-3.5 h-3.5 text-[#2E7D32]" /> }
    case 'fill-blank':
      return { label: 'Lückentext', icon: <FileText className="w-3.5 h-3.5 text-[#D7B95D]" /> }
    case 'conversation':
      return { label: 'Dialogverständnis', icon: <Radio className="w-3.5 h-3.5 text-[#C83B32]" /> }
    case 'announcement':
      return { label: 'Durchsage', icon: <Volume2 className="w-3.5 h-3.5 text-[#171717]" /> }
    case 'dictation':
      return { label: 'Diktat-Training', icon: <PenTool className="w-3.5 h-3.5 text-[#8C7225]" /> }
    default:
      return { label: 'Hörübung', icon: <Play className="w-3.5 h-3.5" /> }
  }
}

export const ListeningExerciseCard: React.FC<ListeningExerciseCardProps> = ({
  exercise,
  bestScore,
  isCompleted,
  onSelectExercise,
}) => {
  const categoryInfo = LISTENING_CATEGORIES[exercise.category]
  const typeInfo = getExerciseTypeLabel(exercise.exerciseType)
  const isAudioReady = exercise.audioStatus === 'available'

  return (
    <article className="skeuo-paper rounded-[8px] border border-[#DEDAD1] p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group hover:border-[#171717]/40">
      {/* Top Meta Header */}
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-7 h-7 rounded-[4px] bg-[#171717] text-white font-mono font-bold text-xs flex items-center justify-center">
              {exercise.level}
            </span>
            <span className="text-[11px] font-semibold text-[#55534F] bg-[#FAF8F5] px-2 py-0.5 rounded border border-[#E8E5DD]">
              {categoryInfo?.titleDe || exercise.category}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {isAudioReady ? (
              <span className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold text-[#2E7D32] bg-[#2E7D32]/10 px-2 py-0.5 rounded">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2E7D32]" />
                Audio
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold text-[#8C7225] bg-[#D7B95D]/20 px-2 py-0.5 rounded">
                Studio
              </span>
            )}

            {isCompleted && (
              <span
                title={`Abgeschlossen mit Bestwert ${bestScore}%`}
                className="inline-flex items-center gap-0.5 text-[10px] font-mono font-bold text-[#2E7D32]"
              >
                ✓ {bestScore}%
              </span>
            )}
          </div>
        </div>

        {/* Title & Subtitle */}
        <div>
          <h3 className="text-sm font-heading font-bold text-[#171717] group-hover:text-[#C83B32] transition-colors leading-snug">
            {exercise.title}
          </h3>
          <p className="text-xs text-[#55534F] mt-1 line-clamp-2 leading-relaxed">
            {exercise.subtitleDe}
          </p>
        </div>
      </div>

      {/* Footer Info & Action */}
      <div className="pt-4 mt-4 border-t border-[#ECE8E0] flex items-center justify-between text-xs">
        <div className="flex items-center gap-3 text-[11px] text-[#89857E]">
          <span className="flex items-center gap-1">
            {typeInfo.icon}
            <span>{typeInfo.label}</span>
          </span>
          <span>&bull;</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-[#D7B95D]" />
            <span>{exercise.estimatedDurationMinutes} Min.</span>
          </span>
        </div>

        <button
          type="button"
          onClick={() => onSelectExercise(exercise)}
          className="inline-flex items-center gap-1 text-xs font-bold text-[#171717] group-hover:text-[#C83B32] transition-colors cursor-pointer"
        >
          <span>{isCompleted ? 'Wiederholen' : 'Starten'}</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </article>
  )
}
