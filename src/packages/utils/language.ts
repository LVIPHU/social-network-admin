// Languages
export type Language = {
  id: string
  name: string
  locale: string
  editorCode: string
  progress?: number
}

export const languages: Array<Language> = [
  { id: 'en', name: 'English', editorCode: 'en', locale: 'en-US' },
  { id: 'vi', name: 'Vietnamese', editorCode: 'vi', locale: 'vi-VN' },
  {
    id: 'zh-Hans',
    name: 'Chinese (Simplified)',
    editorCode: 'zh-Hans',
    locale: 'zh-Hans',
  },
  {
    id: 'zh-Hant',
    name: 'Chinese (Traditional)',
    editorCode: 'zh-Hant',
    locale: 'zh-Hant',
  },
]
