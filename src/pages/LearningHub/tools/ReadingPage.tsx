import React from 'react'
import { PlaceholderPage } from '@/components/common/PlaceholderPage'
import { FileText } from 'lucide-react'

export const ReadingPage: React.FC = () => {
  return (
    <PlaceholderPage
      category="Communication Engine"
      badgeText="A1–C1 Comprehension"
      badgeVariant="das"
      title="German Reading Practice"
      germanTitle="Leseverstehen-Trainer"
      description="Improve German reading comprehension through authentic texts: classified ads, apartment rental notices, office emails, newspaper reports, and scientific essays."
      icon={<FileText className="w-8 h-8 text-[#C83B32]" />}
      plannedCapabilities={[
        'CEFR-graded authentic texts formatted like official Goethe & TestDaF reading modules',
        'Interactive inline glossary for complex German idioms and compound nouns',
        'Timed reading comprehension challenges with instant answer verification',
        'Annotation highlighter to tag grammar patterns and connectors in the text',
      ]}
    />
  )
}
