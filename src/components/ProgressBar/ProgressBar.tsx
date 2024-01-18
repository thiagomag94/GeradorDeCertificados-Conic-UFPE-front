'use client'
import {useEffect} from 'react'
import Image from "next/image";



const ProgressBar = (props:any) => {
    const {value, alert, message} = props
  
    
    return (
          <div className={`relative ${( message!=="Arquivos enviados...aguarde os certificados")? 'block': 'hidden'} w-full h-[1.65rem] bg-gray-400 rounded-lg mt-4`}>
            <div   className={` absolute rounded-lg bg-gray-400  transition-all  ease-in-out duration-1000 w-full h-full pl-4 text-slate-50 flex justify-center items-center py-2`}>{value}%</div> 
            <div   className={` absolute ${ (value>0 && message==="Arquivos enviados...aguarde os certificados" ) ?'block'  : 'hidden'} rounded-lg bg-gradient-to-r  via-purple-800 from-indigo-600 to-cyan-400  transition-w  ease-in-out duration-1000 w-0 w-[${value+'%'}] h-full pl-4 text-slate-50 flex justify-center items-center py-2`}>{value}%</div> 
          </div>    
             
          
      )
    } 
    
    export default ProgressBar;