

export const DEFAULT_LOCALE = `${ process.env.NEXT_PUBLIC_DEFAULT_LOCALE || "en" }` ;

export * from './redux/types'
export * from './redux/actions'

export { default as translate } from './translate';
export { default as Translate } from './TranslateRender';
export { default as TranslationProvider, Context } from './TranslationProvider';
export { default as DetectLocale } from './DetectLocale';
export { default as useTranslate } from './useTranslate';

