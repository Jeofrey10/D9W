import React from 'react'
import {
  ReadingPreferences,
  ReadingFontSize,
  ReadingLineSpacing,
  ReadingMode,
} from '../types/reading.types'
import { cn } from '@/lib/utils'
import { Type, AlignLeft, BookOpen, Sparkles, CheckCircle2 } from 'lucide-react'

interface ReadingSettingsProps {
  preferences: ReadingPreferences
  onFontSizeChange: (size: ReadingFontSize) => void
  onLineSpacingChange: (spacing: ReadingLineSpacing) => void
  onModeChange: (mode: ReadingMode) => void
  onToggleAssistance: () => void
}

export const ReadingSettings: React.FC<ReadingSettingsProps> = ({
  preferences,
  onFontSizeChange,
  onLineSpacingChange,
  onModeChange,
  onToggleAssistance: _onToggleAssistance,
}) => {
  return (
    <div className="rounded-xl border border-[#DEDAD1] bg-white p-4 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-[#EFECE6] pb-2">
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#89857E]">
          Lese-Einstellungen
        </h3>
        <span className="text-[11px] text-[#89857E]">Lokale Einstellungen</span>
      </div>

      {/* 1. Reading Mode */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-[#55534F] flex items-center gap-1.5">
          <BookOpen className="h-3.5 w-3.5 text-[#C83B32]" />
          Lese-Modus
        </label>
        <div className="grid grid-cols-3 gap-1 rounded-lg bg-[#F7F5F0] p-1 border border-[#DEDAD1]">
          <button
            type="button"
            onClick={() => onModeChange('reading')}
            className={cn(
              'rounded-md py-1.5 text-xs font-medium transition-all text-center',
              preferences.mode === 'reading'
                ? 'bg-white text-[#171717] shadow-sm font-semibold'
                : 'text-[#89857E] hover:text-[#171717]'
            )}
          >
            Lesen
          </button>
          <button
            type="button"
            onClick={() => onModeChange('learning')}
            className={cn(
              'rounded-md py-1.5 text-xs font-medium transition-all text-center flex items-center justify-center gap-1',
              preferences.mode === 'learning'
                ? 'bg-white text-[#171717] shadow-sm font-semibold'
                : 'text-[#89857E] hover:text-[#171717]'
            )}
          >
            <Sparkles className="h-3 w-3 text-[#D7B95D]" />
            Lernen
          </button>
          <button
            type="button"
            onClick={() => onModeChange('review')}
            className={cn(
              'rounded-md py-1.5 text-xs font-medium transition-all text-center flex items-center justify-center gap-1',
              preferences.mode === 'review'
                ? 'bg-white text-[#171717] shadow-sm font-semibold'
                : 'text-[#89857E] hover:text-[#171717]'
            )}
          >
            <CheckCircle2 className="h-3 w-3 text-[#15803D]" />
            Review
          </button>
        </div>
      </div>

      {/* 2. Text Size */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-[#55534F] flex items-center gap-1.5">
          <Type className="h-3.5 w-3.5 text-[#89857E]" />
          Schriftgröße
        </label>
        <div className="grid grid-cols-3 gap-1 rounded-lg bg-[#F7F5F0] p-1 border border-[#DEDAD1]">
          <button
            type="button"
            onClick={() => onFontSizeChange('sm')}
            className={cn(
              'rounded-md py-1 text-xs transition-all',
              preferences.fontSize === 'sm'
                ? 'bg-white text-[#171717] shadow-sm font-semibold'
                : 'text-[#89857E] hover:text-[#171717]'
            )}
          >
            A- (Klein)
          </button>
          <button
            type="button"
            onClick={() => onFontSizeChange('md')}
            className={cn(
              'rounded-md py-1 text-xs transition-all',
              preferences.fontSize === 'md'
                ? 'bg-white text-[#171717] shadow-sm font-semibold'
                : 'text-[#89857E] hover:text-[#171717]'
            )}
          >
            A (Normal)
          </button>
          <button
            type="button"
            onClick={() => onFontSizeChange('lg')}
            className={cn(
              'rounded-md py-1 text-xs transition-all',
              preferences.fontSize === 'lg'
                ? 'bg-white text-[#171717] shadow-sm font-semibold'
                : 'text-[#89857E] hover:text-[#171717]'
            )}
          >
            A+ (Groß)
          </button>
        </div>
      </div>

      {/* 3. Line Spacing */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-[#55534F] flex items-center gap-1.5">
          <AlignLeft className="h-3.5 w-3.5 text-[#89857E]" />
          Zeilenabstand
        </label>
        <div className="grid grid-cols-3 gap-1 rounded-lg bg-[#F7F5F0] p-1 border border-[#DEDAD1]">
          <button
            type="button"
            onClick={() => onLineSpacingChange('compact')}
            className={cn(
              'rounded-md py-1 text-xs transition-all',
              preferences.lineSpacing === 'compact'
                ? 'bg-white text-[#171717] shadow-sm font-semibold'
                : 'text-[#89857E] hover:text-[#171717]'
            )}
          >
            Kompakt
          </button>
          <button
            type="button"
            onClick={() => onLineSpacingChange('comfortable')}
            className={cn(
              'rounded-md py-1 text-xs transition-all',
              preferences.lineSpacing === 'comfortable'
                ? 'bg-white text-[#171717] shadow-sm font-semibold'
                : 'text-[#89857E] hover:text-[#171717]'
            )}
          >
            Angenehm
          </button>
          <button
            type="button"
            onClick={() => onLineSpacingChange('relaxed')}
            className={cn(
              'rounded-md py-1 text-xs transition-all',
              preferences.lineSpacing === 'relaxed'
                ? 'bg-white text-[#171717] shadow-sm font-semibold'
                : 'text-[#89857E] hover:text-[#171717]'
            )}
          >
            Weit
          </button>
        </div>
      </div>
    </div>
  )
}
