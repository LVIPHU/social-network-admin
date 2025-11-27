import { ImageIcon, XCircleIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/packages/utils/styles.ts'

export interface ImageUploadProps {
  /** Current image URL or File object */
  value?: string | File | null
  /** Callback when image is selected */
  onValueChange?: (file: File | null) => void
  /** Accept file types (default: image/*) */
  accept?: string | Record<string, Array<string>>
  /** Maximum file size in bytes */
  maxSize?: number
  /** Aspect ratio (default: 'square') */
  aspectRatio?: 'square' | 'video' | 'auto'
  /** Disabled state */
  disabled?: boolean
  /** Additional className */
  className?: string
  /** ID for the input */
  id?: string
  /** Name for the input */
  name?: string
}

/**
 * ImageUpload - Component for uploading images with drag & drop support
 */
export function ImageUpload({
  value,
  onValueChange,
  accept = { 'image/*': ['.png', '.jpg', '.jpeg', '.webp', '.gif'] },
  maxSize,
  aspectRatio = 'square',
  disabled = false,
  className,
  id,
  name,
}: ImageUploadProps) {
  const [isDragActive, setIsDragActive] = useState(false)
  const [isDragAccept, setIsDragAccept] = useState(false)
  const [isDragReject, setIsDragReject] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Get preview URL from value
  const imageUrl =
    value instanceof File
      ? previewUrl || URL.createObjectURL(value)
      : typeof value === 'string'
        ? value
        : null

  // Cleanup preview URL on unmount or when value changes
  useEffect(() => {
    if (value instanceof File && !previewUrl) {
      const url = URL.createObjectURL(value)
      setPreviewUrl(url)
    }

    return () => {
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [value, previewUrl])

  const handleFileSelect = (file: File) => {
    if (maxSize && file.size > maxSize) {
      // TODO: Show error toast
      console.error('File size exceeds maximum allowed size')
      return
    }

    // Cleanup previous preview URL
    if (previewUrl && previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl)
    }

    // Create preview URL for File objects
    const url = URL.createObjectURL(file)
    setPreviewUrl(url)

    onValueChange?.(file)
  }

  const handleRemove = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
      setPreviewUrl(null)
    }
    onValueChange?.(null)
  }

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragActive(true)

    const files = Array.from(e.dataTransfer.items)
    const hasImage = files.some((item) => item.type.startsWith('image/'))
    setIsDragAccept(hasImage)
    setIsDragReject(!hasImage)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragActive(false)
    setIsDragAccept(false)
    setIsDragReject(false)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragActive(false)
    setIsDragAccept(false)
    setIsDragReject(false)

    if (disabled) return

    const files = Array.from(e.dataTransfer.files)
    const imageFile = files.find((file) => file.type.startsWith('image/'))

    if (imageFile) {
      handleFileSelect(imageFile)
    }
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleClick = () => {
    if (!disabled) {
      fileInputRef.current?.click()
    }
  }

  const acceptString =
    typeof accept === 'string'
      ? accept
      : Object.entries(accept)
          .map(
            ([type, extensions]) =>
              `${type}${extensions.map((ext) => `,${ext}`).join('')}`,
          )
          .join(',')

  const aspectRatioClass =
    aspectRatio === 'square'
      ? 'aspect-square'
      : aspectRatio === 'video'
        ? 'aspect-video'
        : ''

  if (imageUrl) {
    return (
      <div
        className={cn('relative aspect-square', aspectRatioClass, className)}
      >
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute top-0 right-0 z-10 translate-x-1/2 -translate-y-1/2 hover:bg-transparent"
          onClick={handleRemove}
          disabled={disabled}
          aria-label="Remove image"
        >
          <XCircleIcon className="h-5 w-5 fill-primary text-primary-foreground" />
        </Button>
        <img
          src={imageUrl}
          alt=""
          className="h-full w-full rounded-md border border-border object-cover"
        />
      </div>
    )
  }

  return (
    <div
      className={cn(
        'flex cursor-pointer items-center justify-center rounded-md border border-dashed transition-colors',
        aspectRatioClass,
        {
          'border-primary bg-secondary': isDragActive && isDragAccept,
          'border-destructive bg-destructive/20': isDragActive && isDragReject,
          'border-border': !isDragActive,
          'cursor-not-allowed opacity-50': disabled,
        },
        className,
      )}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={handleClick}
      role="button"
      tabIndex={disabled ? -1 : 0}
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
          e.preventDefault()
          handleClick()
        }
      }}
      aria-label="Upload image"
    >
      <input
        ref={fileInputRef}
        type="file"
        id={id}
        name={name}
        accept={acceptString}
        onChange={handleFileInputChange}
        disabled={disabled}
        className="hidden"
        aria-label="File input"
      />
      <ImageIcon className="h-16 w-16" strokeWidth={1.25} />
    </div>
  )
}
