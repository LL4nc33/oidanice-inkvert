import { useState, useCallback } from 'react'
import { ConverterFile, ConversionStatus } from '../converters/types'
import { detectCategory, getExtension, getOutputFormats } from '../lib/formats'

let fileIdCounter = 0

export function useFileQueue() {
  const [files, setFiles] = useState<ConverterFile[]>([])

  const addFiles = useCallback((newFiles: File[]) => {
    const converterFiles: ConverterFile[] = newFiles
      .map(file => {
        const category = detectCategory(file)
        if (!category) return null
        const inputFormat = getExtension(file.name)
        const outputOptions = getOutputFormats(category)
        const defaultOutput = outputOptions.find(f => f.extension !== inputFormat)?.extension ?? outputOptions[0]?.extension ?? inputFormat

        return {
          id: `file-${++fileIdCounter}`,
          file,
          name: file.name,
          size: file.size,
          category,
          inputFormat,
          outputFormat: defaultOutput,
          status: 'queued' as ConversionStatus,
          progress: 0,
        }
      })
      .filter((f): f is ConverterFile => f !== null)

    setFiles(prev => [...prev, ...converterFiles])
    return converterFiles
  }, [])

  const removeFile = useCallback((id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id))
  }, [])

  const clearAll = useCallback(() => setFiles([]), [])

  const updateFile = useCallback((id: string, updates: Partial<ConverterFile>) => {
    setFiles(prev => prev.map(f => f.id === id ? { ...f, ...updates } : f))
  }, [])

  const setOutputFormat = useCallback((id: string, format: string) => {
    updateFile(id, { outputFormat: format })
  }, [updateFile])

  return { files, addFiles, removeFile, clearAll, updateFile, setOutputFormat }
}
