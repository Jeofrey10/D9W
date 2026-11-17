import React from 'react'
import {
  Play,
  Pause,
  RotateCcw,
  VolumeX,
  FastForward,
  Rewind,
  AlertCircle,
  Loader2,
  Radio,
} from 'lucide-react'
import { useListeningPlayer } from '../hooks/useListeningPlayer'
import { PlaybackSpeed, AudioStatus } from '../types/listening.types'
import { formatAudioTime } from '../utils/listeningScoring'

interface ListeningAudioPlayerProps {
  audioSrc: string
  audioDurationSeconds: number
  audioStatus: AudioStatus
  title: string
  className?: string
}

const SPEED_OPTIONS: PlaybackSpeed[] = [0.75, 1.0, 1.25, 1.5]

export const ListeningAudioPlayer: React.FC<ListeningAudioPlayerProps> = ({
  audioSrc,
  audioDurationSeconds,
  audioStatus,
  title,
  className = '',
}) => {
  const isAudioAvailable = audioStatus === 'available'

  const {
    isPlaying,
    currentTime,
    duration,
    playbackSpeed,
    isLoading,
    error,
    togglePlay,
    seek,
    replay,
    skip,
    changeSpeed,
  } = useListeningPlayer({
    audioSrc,
    audioAvailable: isAudioAvailable,
  })

  const effectiveDuration = duration > 0 ? duration : audioDurationSeconds
  const progressPercent =
    effectiveDuration > 0 ? Math.min(100, (currentTime / effectiveDuration) * 100) : 0

  return (
    <div
      className={`skeuo-recessed-dark rounded-[8px] p-5 sm:p-6 text-[#F7F5F0] border border-[#333333] relative overflow-hidden shadow-md select-none ${className}`}
    >
      {/* Decorative Top Acoustic Edge */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#171717] via-[#C83B32] to-[#D7B95D]" />

      <div className="flex flex-col gap-4">
        {/* Header Bar: Status Indicator & Track Title */}
        <div className="flex items-center justify-between border-b border-[#2C2C2C] pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-[#242424] border border-[#3D3D3D] flex items-center justify-center text-[#D7B95D]">
              <Radio className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#89857E] block">
                German Audio Engine &bull; Native Acoustics
              </span>
              <h4 className="text-xs sm:text-sm font-heading font-bold text-white truncate max-w-[240px] sm:max-w-md">
                {title}
              </h4>
            </div>
          </div>

          <div>
            {isAudioAvailable ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold bg-[#2E7D32]/20 text-[#4CAF50] border border-[#2E7D32]/40">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4CAF50] animate-pulse" />
                Audio Ready
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold bg-[#D7B95D]/20 text-[#D7B95D] border border-[#D7B95D]/30">
                Studio Recording Scheduled
              </span>
            )}
          </div>
        </div>

        {/* Unavailable Audio Notice */}
        {!isAudioAvailable ? (
          <div className="p-3.5 rounded-[6px] bg-[#242424] border border-[#3A3A3A] flex items-start gap-3 text-xs text-[#A09D95]">
            <AlertCircle className="w-4 h-4 text-[#D7B95D] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <strong className="text-white block font-semibold">
                Audio Recording in Production
              </strong>
              <p className="text-[11px] leading-relaxed">
                The authentic German voice recording for this curriculum module is currently being finalized in the D9W studio. The full structured transcript, vocabulary list, and comprehension questions are available below for study.
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Audio Progress Track */}
            <div className="space-y-1.5">
              <div className="relative flex items-center group">
                <input
                  type="range"
                  min={0}
                  max={effectiveDuration || 1}
                  step={0.1}
                  value={currentTime}
                  onChange={(e) => seek(parseFloat(e.target.value))}
                  aria-label="Audio scrubber"
                  className="w-full h-2 rounded-full appearance-none cursor-pointer bg-[#262626] border border-[#383838] focus:outline-none accent-[#C83B32]"
                  style={{
                    background: `linear-gradient(to right, #C83B32 ${progressPercent}%, #262626 ${progressPercent}%)`,
                  }}
                />
              </div>

              {/* Time Indicators */}
              <div className="flex items-center justify-between text-[11px] font-mono text-[#89857E]">
                <span>{formatAudioTime(currentTime)}</span>
                <span>{formatAudioTime(effectiveDuration)}</span>
              </div>
            </div>

            {/* Controls Bar: Playback Controls & Speed Selector */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              {/* Primary Transport Buttons */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={replay}
                  title="Replay from start (0:00)"
                  className="p-2 rounded-[5px] bg-[#252525] hover:bg-[#333333] border border-[#3D3D3D] text-[#DEDAD1] hover:text-white transition-all active:translate-y-0.5 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => skip(-5)}
                  title="Rewind 5 seconds"
                  className="p-2 rounded-[5px] bg-[#252525] hover:bg-[#333333] border border-[#3D3D3D] text-[#DEDAD1] hover:text-white transition-all active:translate-y-0.5 cursor-pointer"
                >
                  <Rewind className="w-4 h-4" />
                </button>

                {/* Main Embossed Play/Pause Button */}
                <button
                  type="button"
                  onClick={togglePlay}
                  title={isPlaying ? 'Pause (Space)' : 'Play (Space)'}
                  className="px-5 py-2.5 rounded-[6px] skeuo-button-primary text-white font-bold flex items-center gap-2 shadow-md transition-all active:translate-y-0.5 cursor-pointer"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin text-[#D7B95D]" />
                  ) : isPlaying ? (
                    <>
                      <Pause className="w-4 h-4" />
                      <span className="text-xs">Pause</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-current" />
                      <span className="text-xs">Play Audio</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => skip(5)}
                  title="Fast forward 5 seconds"
                  className="p-2 rounded-[5px] bg-[#252525] hover:bg-[#333333] border border-[#3D3D3D] text-[#DEDAD1] hover:text-white transition-all active:translate-y-0.5 cursor-pointer"
                >
                  <FastForward className="w-4 h-4" />
                </button>
              </div>

              {/* Physical Speed Selector Buttons */}
              <div className="flex items-center gap-1 bg-[#222222] p-1 rounded-[6px] border border-[#363636]">
                <span className="text-[10px] font-mono text-[#89857E] px-2 hidden sm:inline">
                  Speed:
                </span>
                {SPEED_OPTIONS.map((speed) => {
                  const isActive = playbackSpeed === speed
                  return (
                    <button
                      type="button"
                      key={speed}
                      onClick={() => changeSpeed(speed)}
                      className={`px-2.5 py-1 rounded-[4px] text-xs font-mono font-bold transition-all ${
                        isActive
                          ? 'bg-[#C83B32] text-white shadow-inner translate-y-0.5'
                          : 'bg-[#2B2B2B] text-[#A09D95] hover:text-white hover:bg-[#383838]'
                      }`}
                    >
                      {speed}x
                    </button>
                  )
                })}
              </div>
            </div>

            {error && (
              <p className="text-xs text-[#C83B32] font-semibold mt-1 flex items-center gap-1.5">
                <VolumeX className="w-3.5 h-3.5" />
                <span>{error}</span>
              </p>
            )}
          </>
        )}
      </div>
    </div>
  )
}
