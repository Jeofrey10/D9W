import React from 'react'
import { Headphones, RotateCcw } from 'lucide-react'
import { Button } from '@/components/common/Button'

interface ListeningEmptyStateProps {
  onResetFilters: () => void
}

export const ListeningEmptyState: React.FC<ListeningEmptyStateProps> = ({ onResetFilters }) => {
  return (
    <div className="skeuo-paper rounded-[8px] p-8 sm:p-12 border border-dashed border-[#DCD7CD] text-center space-y-4">
      <div className="w-14 h-14 rounded-full bg-[#FAF8F5] border border-[#DEDAD1] flex items-center justify-center mx-auto text-[#89857E]">
        <Headphones className="w-7 h-7" />
      </div>

      <div className="space-y-1 max-w-sm mx-auto">
        <h3 className="text-base font-heading font-bold text-[#171717]">
          Keine Übungen gefunden
        </h3>
        <p className="text-xs text-[#55534F] leading-relaxed">
          Für Ihre aktuelle Filter- und Suchkombination liegen keine Hörübungen vor. Setzen Sie die Filter zurück, um das gesamte Angebot zu sehen.
        </p>
      </div>

      <div className="pt-2">
        <Button onClick={onResetFilters} variant="secondary" size="sm">
          <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
          <span>Filter zurücksetzen</span>
        </Button>
      </div>
    </div>
  )
}
