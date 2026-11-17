import React from 'react'
import { PlaceholderPage } from '@/components/common/PlaceholderPage'
import { Calendar } from 'lucide-react'

export const DailyWordPage: React.FC = () => {
  return (
    <PlaceholderPage
      category="Vocabulary Engine"
      badgeText="Daily Feature"
      badgeVariant="gold"
      title="Daily German Word"
      germanTitle="Wort des Tages"
      description="Expand your vocabulary day by day. Every 24 hours brings a hand-curated German term with grammatical attributes, etymology, real-life conversational context, and memory anchors."
      icon={<Calendar className="w-8 h-8 text-[#C83B32]" />}
      plannedCapabilities={[
        'Automated daily word rotation synced to calendar dates',
        'In-depth morphological breakdown, noun declension, or verb paradigm',
        'Audio pronunciation and natural conversational example sentences',
        'Cultural context and idiomatic expressions associated with the word',
        'Local archive allowing learners to review past days of the week',
      ]}
    />
  )
}
