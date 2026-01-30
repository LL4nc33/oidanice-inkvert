import { useState, useEffect } from 'react'
import { ConversionSettings, DEFAULT_SETTINGS } from '../converters/types'

const STORAGE_KEY = 'inkvert-settings'

export function useSettings() {
  const [settings, setSettings] = useState<ConversionSettings>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? { ...DEFAULT_SETTINGS, ...JSON.parse(stored) } : DEFAULT_SETTINGS
    } catch {
      return DEFAULT_SETTINGS
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
  }, [settings])

  const updateSettings = (partial: Partial<ConversionSettings>) => {
    setSettings(prev => ({ ...prev, ...partial }))
  }

  const resetSettings = () => setSettings(DEFAULT_SETTINGS)

  return { settings, updateSettings, resetSettings }
}
