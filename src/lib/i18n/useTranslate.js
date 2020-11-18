import { useContext } from 'react';
import { Context } from './TranslationProvider';

function useTranslate(){
    const ctx = useContext(Context)
    return [ctx.translate, ctx.locale]
}

export default useTranslate;