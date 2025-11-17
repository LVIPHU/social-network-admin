// Languages
export type Language = {
  id: string
  name: string
  subname: string
  locale: string
  editorCode: string
  progress?: number
}

export const languages: Array<Language> = [
  {
    id: 'en',
    name: 'English',
    subname: 'English',
    editorCode: 'en',
    locale: 'en-US',
  },
  {
    id: 'vi',
    name: 'Vietnamese',
    subname: 'Tiếng Việt',
    editorCode: 'vi',
    locale: 'vi-VN',
  },
  {
    id: 'zh-Hans',
    name: 'Chinese (Simplified)',
    subname: '简体中文',
    editorCode: 'zh-Hans',
    locale: 'zh-Hans',
  },
  {
    id: 'zh-Hant',
    name: 'Chinese (Traditional)',
    subname: '繁體中文',
    editorCode: 'zh-Hant',
    locale: 'zh-Hant',
  },
]
