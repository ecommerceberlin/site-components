import Settings from '../datasources/Settings';
import Wrapper from '../components/Wrapper';
import {withRouter} from 'next/router'
import Head from '../next/MyHead'

//import dynamic from 'next/dynamic'

//TEMPORARY!
import * as Widgets from './index'


const addGlobalProps = (globals, globalsUsed) => {

    const tests = (item) => {

        return {
            avatar  : item => item.avatar.indexOf('http') > -1,
            logotype : item => item.logotype.indexOf('http') > -1,
            bio : item => item.bio.length > 20
        }
    }

    //let's overwrite props that require global value...
    const addProps = {};
    
    globalsUsed.map(function({internalName, globalName}){

        if(globalName in globals){

            switch (globals[globalName].type) {
                case "condition":

                    if("required" in globals[globalName] && Array.isArray(globals[globalName].required)){

                        switch (globals[globalName]) {

                            case "filterPresenterWithBio":
                                
                                addProps[internalName] = function(item){ 
                                    return  item.avatar.indexOf('http') > -1 && item.logotype.indexOf('http') > -1 && item.bio.length > 20
                                }

                            break;
                        
                            case "featuredPresenters":

                                addProps[internalName] = function(item){
                                    return  item.avatar.indexOf("http") > -1 && item.logotype.indexOf("http") > -1 && item.bio.length > 20 && item.featured > 0
                                }

                            break;
                            default:
                                break;
                        }


                       

                    }

                    break;
            
                default:
                    break;
            }
        }
    })

    return addProps
}

//TODO .... Settings must handle array of names...

const DynamicPage = ({name, url, params}) => {

    return (

    
        <Settings>{ (get) => {

            const pages = get("pages", [])

            if(! (name in pages)){
                return (<Wrapper>Page not found</Wrapper>)
            }


            return (
                <React.Fragment>
                <Head />{

                        pages[name].widgets.map(function(widget){


                            if(! (widget.name in Widgets)){
                                return (<Wrapper>Widget not found</Wrapper>)
                            }
        
                            const Component = Widgets[widget.name]
                            const props = "props" in widget ? widget.props : {}

                            //const Component = dynamic(() => import(`../compositions/${widget.name}`))

                            const globalsUsed = [];

                            //inject global PROP
                            Object.keys(props).map(function(propName){
                                const propValue = props[propName]
                                if( (typeof propValue === 'string' || propValue instanceof String) && propValue.indexOf("@") === 0 ){
                                    globalsUsed.push({ internalName : propName, globalName : propValue.replace("@", "") })  
                                    //otherwise we may encounter fatal error....
                                    delete props[propName]
                                }
                            })

                            if(globalsUsed.length){
                                return ( <Settings key={widget.name}>{(get) => <Component {...props} {...addGlobalProps( get("globals"), globalsUsed) }/>}</Settings> )
                            }else{
                                return ( <Component key={widget.name} {...props }/>)
                            }
        
                        })
                }
                </React.Fragment>
            )


        }}</Settings>
   

    )
}

DynamicPage.defaultProps = {
    name : "index",
    url : "/",
    params : {}
}

export default withRouter(DynamicPage)