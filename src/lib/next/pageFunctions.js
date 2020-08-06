
import { ssrCache as cache } from '../server/cache'
import { END } from 'redux-saga';
import {resourceFetchRequest} from '../components/redux/actions'
import {setSettings} from '../settings/redux/actions'


async function configure(store, config){

  const {settings, preload} = config

  if(settings){
    store.dispatch(setSettings(settings))
  }

  if(preload && Array.isArray(preload)){
    store.dispatch(resourceFetchRequest(preload))
  }

  store.dispatch(END)

  await store.sagaTask.toPromise()

}


 

/**
 *  const postsDirectory = path.join(process.cwd(), 'posts')
  const filenames = fs.readdirSync(postsDirectory)

  const posts = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename)
    const fileContents = fs.readFileSync(filePath, 'utf8')

 */


async function myGetStaticPaths() {
    return {
      paths: [
        { params: {

         } } 
      ],
      fallback: true
    };
  }


/**
 
  The context parameter is an object containing the following keys:
  
  params: If this page uses a dynamic route, params contains the route parameters. If the page name is [id].js , then params will look like { id: ... }. To learn more, take a look at the Dynamic Routing documentation.
  req: The HTTP IncomingMessage object.
  res: The HTTP response object.
  query: The query string.
  preview: preview is true if the page is in the preview mode and false otherwise. See the Preview Mode documentation.
  previewData: The preview data set by setPreviewData. See the Preview Mode documentation.

*/

async function myGetServerSideProps(context){

  console.log("SSProps", Object.keys(context))

    return {
      props: {}, // will be passed to the page component as props
    }
  }

  export  {configure, myGetStaticPaths, myGetServerSideProps};
