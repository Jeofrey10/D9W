import { useState, useEffect, useRef, useCallback } from 'react'
import { PlaybackSpeed } from '../types/listening.types'

interface UseListeningPlayerProps {
  audioSrc: string
  audioAvailable: boolean
  onEnded?: () => void
}

// Global active audio reference to ensure only one audio track plays at any time
let globalActiveAudioElement: HTMLAudioElement | null = null

export function useListeningPlayer({
  audioSrc,
  audioAvailable,
  onEnded,
}: UseListeningPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [playbackSpeed, setPlaybackSpeed] = useState<PlaybackSpeed>(1.0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isEnded, setIsEnded] = useState(false)

  const playbackSpeedRef = useRef<PlaybackSpeed>(playbackSpeed)
  useEffect(() => {
    playbackSpeedRef.current = playbackSpeed
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackSpeed
    }
  }, [playbackSpeed])

  // Initialize and reset audio instance when audioSrc changes
  useEffect(() => {
    // If an audio element was playing globally, stop it
    if (globalActiveAudioElement && globalActiveAudioElement !== audioRef.current) {
      globalActiveAudioElement.pause()
    }

    if (!audioAvailable || !audioSrc) {
      audioRef.current = null
      return
    }

    const audio = new Audio(audioSrc)
    audioRef.current = audio
    audio.playbackRate = playbackSpeedRef.current

    queueMicrotask(() => {
      setIsLoading(true)
      setError(null)
      setIsEnded(false)
      setCurrentTime(0)
      setIsPlaying(false)
    })

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0)
      setIsLoading(false)
    }

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime)
    }

    const handleCanPlay = () => {
      setIsLoading(false)
    }

    const handleEnded = () => {
      setIsPlaying(false)
      setIsEnded(true)
      if (onEnded) onEnded()
    }

    const handleError = () => {
      setIsLoading(false)
      setIsPlaying(false)
      setError('Audio file could not be loaded.')
    }

    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('canplay', handleCanPlay)
    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('error', handleError)

    return () => {
      audio.pause()
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('canplay', handleCanPlay)
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('error', handleError)
      if (globalActiveAudioElement === audio) {
        globalActiveAudioElement = null
      }
    }
  }, [audioSrc, audioAvailable, onEnded])

  // Playback control functions
  const play = useCallback(async () => {
    if (!audioRef.current || !audioAvailable) return

    try {
      if (globalActiveAudioElement && globalActiveAudioElement !== audioRef.current) {
        globalActiveAudioElement.pause()
      }
      globalActiveAudioElement = audioRef.current
      await audioRef.current.play()
      setIsPlaying(true)
      setIsEnded(false)
    } catch (err: unknown) {
      console.warn('Audio playback failed or was blocked by browser policy:', err)
      setIsPlaying(false)
    }
  }, [audioAvailable])

  const pause = useCallback(() => {
    if (!audioRef.current) return
    audioRef.current.pause()
    setIsPlaying(false)
  }, [])

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pause()
    } else {
      play()
    }
  }, [isPlaying, pause, play])

  const seek = useCallback((timeSeconds: number) => {
    if (!audioRef.current) return
    const clampedTime = Math.max(0, Math.min(timeSeconds, audioRef.current.duration || 0))
    audioRef.current.currentTime = clampedTime
    setCurrentTime(clampedTime)
  }, [])

  const replay = useCallback(() => {
    seek(0)
    play()
  }, [seek, play])

  const skip = useCallback(
    (seconds: number) => {
      if (!audioRef.current) return
      seek(audioRef.current.currentTime + seconds)
    },
    [seek]
  )

  const changeSpeed = useCallback((speed: PlaybackSpeed) => {
    setPlaybackSpeed(speed)
    if (audioRef.current) {
      audioRef.current.playbackRate = speed
    }
  }, [])

  return {
    isPlaying,
    currentTime,
    duration,
    playbackSpeed,
    isLoading,
    error,
    isEnded,
    play,
    pause,
    togglePlay,
    seek,
    replay,
    skip,
    changeSpeed,
  }
}
