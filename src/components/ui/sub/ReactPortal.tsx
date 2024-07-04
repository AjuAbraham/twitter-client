import React, { ReactElement, useLayoutEffect, useState } from 'react'
import { createPortal } from 'react-dom';

const ReactPortal = ({children,wrapperId}:{children:ReactElement; wrapperId:string}) => {
    const [wrapperElement, setWrapperElement] = useState<HTMLElement>()
    const createDivAppentoBody = (wrapperId:string)=>{
         if(!document) return null
         const wrapperElement = document.createElement('div');
         wrapperElement.setAttribute("id",wrapperId);
         document.body.appendChild(wrapperElement);
         return wrapperElement;
    }
    useLayoutEffect(()=>{
        let element = document.getElementById(wrapperId);
        let systemCreate = false;

        if(!element){
            systemCreate= true;
            element = createDivAppentoBody(wrapperId);
        }
        setWrapperElement(element!)
        return ()=>{
            if(systemCreate && element?.parentNode){
                element.parentNode.removeChild(element);
            }
        }
    },[wrapperId])
  
    if(!wrapperElement) return null
    return createPortal(children,wrapperElement);
}

export default ReactPortal
