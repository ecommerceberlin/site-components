import { useEffect } from 'react'
import { useRouter } from 'next/router'
import {pageLoadingStart, pageLoadingEnd } from './redux'
import {useDispatch} from 'react-redux'

const PageLoadingIndicator = ({ children }) => {
    
  const router = useRouter()
  const dispatch = useDispatch();


  const handleStart = (url) => {
      
    // console.log("poczatek", url, router)

    if(url !== router.asPath){
        dispatch(pageLoadingStart());
    }

  }

  const handleComplete = (url) => {

    // console.log("koniec", url, router)

    dispatch(pageLoadingEnd());
  }
  
  useEffect(() => {

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)

    return () => {
        router.events.off('routeChangeStart', handleStart)
        router.events.off('routeChangeComplete', handleComplete)
        router.events.off('routeChangeError', handleComplete)
    }
  }, [router.events])

  return children
}

export default PageLoadingIndicator
