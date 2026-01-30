import { useCallback, useRef } from 'react'
import { useConversion } from '../context/ConversionContext'
import { getConverter } from '../converters/registry'
import { downloadBlob } from '../lib/download'
import { getOutputFilename } from '../lib/fileUtils'
import { ConverterFile, ConversionSettings } from '../converters/types'

export function useConverter() {
  const { files, updateFile, settings } = useConversion()

  const filesRef = useRef(files)
  filesRef.current = files
  const settingsRef = useRef(settings)
  settingsRef.current = settings

  const convertFile = useCallback(async (fileId: string) => {
    const file = filesRef.current.find((f: ConverterFile) => f.id === fileId)
    if (!file || file.status !== 'queued') return

    updateFile(fileId, { status: 'converting', progress: 0 })

    try {
      const currentSettings: ConversionSettings = settingsRef.current
      const converter = await getConverter(file.category)
      const result = await converter.convert(
        file.file,
        file.outputFormat,
        currentSettings,
        (progress) => updateFile(fileId, { progress })
      )

      updateFile(fileId, { status: 'done', progress: 100, result })

      if (currentSettings.general.autoDownload) {
        downloadBlob(result, getOutputFilename(file.name, file.outputFormat))
      }
    } catch (err) {
      updateFile(fileId, {
        status: 'error',
        error: err instanceof Error ? err.message : 'Conversion failed',
      })
    }
  }, [updateFile])

  const convertAll = useCallback(async () => {
    const queued = filesRef.current
      .filter((f: ConverterFile) => f.status === 'queued')
      .map((f: ConverterFile) => f.id)

    const running = new Set<Promise<void>>()

    for (const id of queued) {
      const task = convertFile(id)
      running.add(task)
      task.finally(() => running.delete(task))

      if (running.size >= 2) {
        await Promise.race(running)
      }
    }

    await Promise.all(running)
  }, [convertFile])

  return { convertFile, convertAll }
}
