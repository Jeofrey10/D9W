import React from 'react'
import { PlaceholderPage } from '@/components/common/PlaceholderPage'
import { Headphones } from 'lucide-react'

export const ListeningPage: React.FC = () => {
  return (
    <PlaceholderPage
      category="Communication Engine"
      badgeText="A1–B2 Audio"
      badgeVariant="accent"
      title="German Listening Practice"
      germanTitle="Hörverstehen-Trainer"
      description="Train your ear for German accents, train station announcements, telephone dialogs, and academic lectures with variable speed playback and instant comprehension checks."
      icon={<Headphones className="w-8 h-8 text-[#C83B32]" />}
      plannedCapabilities={[
        'Graded audio passages aligned to official Goethe & telc listening exam parts (Teil 1–4)',
        'Native Web Speech Synthesis & curated German MP3 dialog sequences',
        'Speed adjustment toggle (0.75x slow, 1.0x natural, 1.25x rapid)',
        'Synchronized transcript with click-to-translate vocabulary words',
      ]}
    />
  )
}
