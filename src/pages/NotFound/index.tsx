import React from 'react'
import { Container } from '@/components/common/Container'
import { Button } from '@/components/common/Button'
import { Home, BookOpen, Compass } from 'lucide-react'

export const NotFoundPage: React.FC = () => {
  return (
    <div className="py-20 sm:py-32 flex items-center justify-center">
      <Container size="md" className="text-center">
        {/* Subtle German Color accent badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FBEBEA] border border-[#C83B32]/30 rounded-[4px] text-xs font-semibold text-[#C83B32] uppercase tracking-wider mb-6">
          <span>Fehler 404 &bull; Seite Nicht Gefunden</span>
        </div>

        <h1 className="text-6xl sm:text-8xl font-black font-heading text-[#171717] tracking-tighter mb-4">
          404
        </h1>

        <h2 className="text-xl sm:text-2xl font-bold font-heading text-[#171717] mb-3">
          This Page Does Not Exist in our Lexicon
        </h2>

        <p className="text-sm sm:text-base text-[#55534F] max-w-md mx-auto mb-8 font-sans">
          The link you followed may be outdated, or the course module might have moved within the curriculum.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            to="/"
            variant="primary"
            size="md"
            leftIcon={<Home className="w-4 h-4" />}
          >
            Return to Homepage
          </Button>

          <Button
            to="/learning-hub"
            variant="outline"
            size="md"
            leftIcon={<BookOpen className="w-4 h-4" />}
          >
            Explore Learning Hub
          </Button>

          <Button
            to="/courses"
            variant="ghost"
            size="md"
            leftIcon={<Compass className="w-4 h-4" />}
          >
            View Courses
          </Button>
        </div>
      </Container>
    </div>
  )
}
