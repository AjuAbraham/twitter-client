import React, { useEffect } from 'react'
import ReactPortal from './ReactPortal';

interface ModelConfig {
    children: any;
    isOpen: boolean;
    handleClose: ()=> void
}
const PostModel = ({children,isOpen,handleClose}:ModelConfig) => {
  //close on escape key
  useEffect(()=>{
    const closeOnEscapekey = (e: KeyboardEvent)=> e.key==="Escape"? handleClose():null;
    document.body.addEventListener("keydown",closeOnEscapekey)
    return ()=> document.body.removeEventListener('keydown',closeOnEscapekey)
  },[handleClose])


  //disable scroll 
  useEffect(()=>{
    document.body.style.overflow = 'hidden';
    return ():void => {document.body.style.overflow= 'unset' }
  },[])


  if(!isOpen) return null
  return (
    <ReactPortal wrapperId='react-portal-post'>
    <>
    <div className='fixed top-0 left-0 w-screen h-screen z-40 bg-[#252d35] opacity-50'/>
    <div className='fixed md:top-[8%] lg:left-[35%] md:left-[15%]  top-0 left-0 w-screen h-screen bg-[#000101] md:w-[560px] md:h-[250px] rounded-3xl z-50 overflow-hidden'>
    {children}
      </div>
      <div className='fixed rounded flex flex-col box-border min-w-fit overflow-hidden p-5'>
     
     </div>
    </>
    </ReactPortal>
  )
}

export default PostModel
