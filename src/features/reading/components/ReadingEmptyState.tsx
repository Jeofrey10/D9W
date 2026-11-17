import React from 'react'
import { BookX, RotateCcw } from 'lucide-react'

interface ReadingEmptyStateProps {
  onResetFilters: () => void
}

export const ReadingEmptyState: React.FC<ReadingEmptyStateProps> = ({
  onResetFilters,
}) => {
  return (
    <div className="rounded-2xl border border-dashed border-[#DEDAD1] bg-white p-10 sm:p-14 text-center space-y-4">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#FAF8F5] text-[#89857E] border border-[#DEDAD1]">
        <BookX className="h-7 w-7" />
      </div>

      <div className="space-y-1">
        <h3 className="text-lg font-serif font-bold text-[#171717]">
          Keine passenden Texte gefunden
        </h3>
        <p className="text-xs sm:text-sm text-[#55534F] max-w-sm mx-auto">
          Für Ihre aktuelle Filterkombination gibt es keine Lesetexte. Bitte setzen Sie die Filter zurück oder wählen Sie ein anderes Sprachniveau.
        </p>
      </div>

      <button
        type="button"
        onClick={onResetFilters}
        className="inline-flex items-center gap-2 rounded-xl bg-[#171717] px-5 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-[#333333] transition-colors"
      >
        <RotateCcw className="h-4 w-4" />
        Filter zurücksetzen
      </button>
    </div>
  )
}
