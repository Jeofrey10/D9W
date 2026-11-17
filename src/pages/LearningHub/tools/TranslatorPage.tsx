import React from 'react'
import { PlaceholderPage } from '@/components/common/PlaceholderPage'
import { Languages } from 'lucide-react'

export const TranslatorPage: React.FC = () => {
  return (
    <PlaceholderPage
      category="Personal Learning"
      badgeText="Grammar Assistant"
      badgeVariant="stone"
      title="German Contextual Translator"
      germanTitle="Kontextueller Übersetzer"
      description="A learning-oriented bilingual translation companion that doesn't just translate words, but dissects the underlying grammatical cases (Nominativ, Akkusativ, Dativ, Genitiv) and syntax."
      icon={<Languages className="w-8 h-8 text-[#C83B32]" />}
      plannedCapabilities={[
        'Bidirectional English <-> German sentence translation with grammatical breakdown',
        'Visual color-coding of noun cases (e.g. Dative object in gold, Accusative in red)',
        'Preposition trigger analysis (e.g. "mit" always triggers Dative)',
        'Tone indicator: Formal (Sie) versus Informal (du/ihr)',
      ]}
    />
  )
}
