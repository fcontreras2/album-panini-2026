'use client'

import { useState, useEffect, useCallback } from 'react'
import { AlbumState, AlbumStats, FilterType, Language } from '@/types'
import { allStickers } from '@/data/stickers'
import { loadAlbum, saveAlbum } from '@/lib/storage'

export function useAlbum() {
  const [state, setState] = useState<AlbumState>({})
  const [filter, setFilter] = useState<FilterType>('all')
  const [search, setSearch] = useState('')
  const [lang, setLang] = useState<Language>('es')
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setState(loadAlbum())
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (hydrated) saveAlbum(state)
  }, [state, hydrated])

  const getCount = useCallback((id: string): number => state[id] ?? 0, [state])

  const increment = useCallback((id: string) => {
    setState(prev => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }))
  }, [])

  const decrement = useCallback((id: string) => {
    setState(prev => {
      const current = prev[id] ?? 0
      if (current <= 0) return prev
      const next = current - 1
      const updated = { ...prev }
      if (next === 0) delete updated[id]
      else updated[id] = next
      return updated
    })
  }, [])

  const reset = useCallback(() => {
    setState({})
  }, [])

  const importState = useCallback((newState: AlbumState) => {
    setState(newState)
  }, [])

  const stats: AlbumStats = {
    total: allStickers.length,
    have: allStickers.filter(s => (state[s.id] ?? 0) >= 1).length,
    missing: allStickers.filter(s => (state[s.id] ?? 0) === 0).length,
    duplicates: allStickers.filter(s => (state[s.id] ?? 0) >= 2).length,
    completionPct: Math.round(
      (allStickers.filter(s => (state[s.id] ?? 0) >= 1).length / allStickers.length) * 100
    ),
  }

  const toggleLang = useCallback(() => {
    setLang(prev => prev === 'es' ? 'en' : 'es')
  }, [])

  return {
    state,
    filter, setFilter,
    search, setSearch,
    lang, toggleLang,
    hydrated,
    getCount,
    increment,
    decrement,
    reset,
    importState,
    stats,
  }
}
