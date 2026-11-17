import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { CefrLevel } from '@/types'
import { SyllabusDocument, ALL_SYLLABUS_LEVELS } from '@/data/syllabus'
import { resolveCefrLevel, getSyllabusByLevel, triggerSyllabusPrint } from '../utils/syllabusUtils'

export interface UseSyllabusResult {
  selectedLevel: CefrLevel
  syllabus: SyllabusDocument
  expandedModules: Set<string>
  selectLevel: (level: CefrLevel) => void
  toggleModule: (moduleId: string) => void
  expandAllModules: () => void
  collapseAllModules: () => void
  downloadPdf: () => void
}

export function useSyllabus(initialLevel: CefrLevel = 'A1'): UseSyllabusResult {
  const [searchParams, setSearchParams] = useSearchParams()
  const levelParam = searchParams.get('level')

  // Derive level from URL or initial parameter
  const selectedLevel = useMemo(() => {
    return resolveCefrLevel(levelParam || initialLevel)
  }, [levelParam, initialLevel])

  const syllabus = useMemo(() => {
    return getSyllabusByLevel(selectedLevel)
  }, [selectedLevel])

  // Track user-expanded modules per level, defaulting to the first module of each level
  const [expandedPerLevel, setExpandedPerLevel] = useState<Record<CefrLevel, Set<string>>>({
    A1: new Set(['a1-mod-1']),
    A2: new Set(['a2-mod-1']),
    B1: new Set(['b1-mod-1']),
    B2: new Set(['b2-mod-1']),
    C1: new Set(['c1-mod-1']),
  })

  const expandedModules = useMemo(() => {
    const existing = expandedPerLevel[selectedLevel]
    if (existing) return existing
    const firstMod = syllabus.modules[0]?.id
    return new Set(firstMod ? [firstMod] : [])
  }, [expandedPerLevel, selectedLevel, syllabus])

  const selectLevel = (level: CefrLevel) => {
    if (!ALL_SYLLABUS_LEVELS.includes(level)) return
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      next.set('level', level.toLowerCase())
      return next
    })
  }

  const toggleModule = (moduleId: string) => {
    setExpandedPerLevel((prev) => {
      const currentSet = new Set(prev[selectedLevel] || [])
      if (currentSet.has(moduleId)) {
        currentSet.delete(moduleId)
      } else {
        currentSet.add(moduleId)
      }
      return {
        ...prev,
        [selectedLevel]: currentSet,
      }
    })
  }

  const expandAllModules = () => {
    setExpandedPerLevel((prev) => ({
      ...prev,
      [selectedLevel]: new Set(syllabus.modules.map((m) => m.id)),
    }))
  }

  const collapseAllModules = () => {
    setExpandedPerLevel((prev) => ({
      ...prev,
      [selectedLevel]: new Set(),
    }))
  }

  const downloadPdf = () => {
    triggerSyllabusPrint(selectedLevel)
  }

  return {
    selectedLevel,
    syllabus,
    expandedModules,
    selectLevel,
    toggleModule,
    expandAllModules,
    collapseAllModules,
    downloadPdf,
  }
}
