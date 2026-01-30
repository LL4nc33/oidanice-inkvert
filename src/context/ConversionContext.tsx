import { createContext, useContext, ReactNode } from 'react'
import { useFileQueue } from '../hooks/useFileQueue'
import { useSettings } from '../hooks/useSettings'
import { ConverterFile, ConversionSettings } from '../converters/types'

interface ConversionContextValue {
  files: ConverterFile[]
  addFiles: (files: File[]) => ConverterFile[]
  removeFile: (id: string) => void
  clearAll: () => void
  updateFile: (id: string, updates: Partial<ConverterFile>) => void
  setOutputFormat: (id: string, format: string) => void
  settings: ConversionSettings
  updateSettings: (partial: Partial<ConversionSettings>) => void
  resetSettings: () => void
}

const ConversionContext = createContext<ConversionContextValue | null>(null)

export function ConversionProvider({ children }: { children: ReactNode }) {
  const queue = useFileQueue()
  const settingsHook = useSettings()

  return (
    <ConversionContext.Provider value={{ ...queue, ...settingsHook }}>
      {children}
    </ConversionContext.Provider>
  )
}

export function useConversion() {
  const ctx = useContext(ConversionContext)
  if (!ctx) throw new Error('useConversion must be used within ConversionProvider')
  return ctx
}
