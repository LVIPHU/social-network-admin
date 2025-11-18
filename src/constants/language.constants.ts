// Languages
export type Language = {
  id: string
  name: string
  subname: string
  locale: string
  editorCode: string
  progress?: number
  currency?: string
}

export const languages: Array<Language> = [
  {
    id: 'en',
    name: 'English',
    subname: 'English',
    editorCode: 'en',
    locale: 'en-US',
    currency: 'USD',
  },
  {
    id: 'vi',
    name: 'Vietnamese',
    subname: 'Tiếng Việt',
    editorCode: 'vi',
    locale: 'vi-VN',
    currency: 'VND',
  },
  {
    id: 'zh-Hans',
    name: 'Chinese (Simplified)',
    subname: '简体中文',
    editorCode: 'zh-Hans',
    locale: 'zh-Hans',
    currency: 'CNY',
  },
  {
    id: 'zh-Hant',
    name: 'Chinese (Traditional)',
    subname: '繁體中文',
    editorCode: 'zh-Hant',
    locale: 'zh-Hant',
    currency: 'TWD',
  },
]
