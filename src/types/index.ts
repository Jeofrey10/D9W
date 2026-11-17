import { type ReactNode } from 'react'

export type CefrLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1'

export interface NavItem {
  label: string
  href: string
  isExternal?: boolean
  badge?: string
}

export interface CourseSummary {
  id: string
  level: CefrLevel
  title: string
  subtitle: string
  targetAudience: string
  description: string
  durationWeeks: number
  hoursTotal: number
  examTarget: string
  highlights: string[]
  mode: 'Online' | 'Offline' | 'Hybrid'
}

export type LearningToolCategory = 'Vocabulary' | 'Grammar' | 'Communication' | 'Personal Learning'

export interface LearningToolItem {
  id: string
  name: string
  slug: string
  description: string
  category: LearningToolCategory
  levelRange: string
  iconName: string
  status: 'Ready' | 'Preview' | 'Planned'
}

export interface TestimonialItem {
  id: string
  quote: string
  name: string
  role: string
  targetExam: string
  verified: boolean
  sourceContext?: string
}

export interface CommonComponentProps {
  className?: string
  children?: ReactNode
}
