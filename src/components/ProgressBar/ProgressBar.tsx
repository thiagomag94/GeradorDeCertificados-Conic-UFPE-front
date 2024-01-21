'use client'
import {useEffect} from 'react'
import Image from "next/image";



const ProgressBar = (props:any) => {
    const {value, alert, message} = props

    
    return (
          <div className={` w-full ring-1 ring-purple-300 text-center rounded-full text-slate-200 font-light text-xl h-[2rem] mt-12 overflow-hidden`}>
            <div className='flex flex-col h-full items-center text-center  bg-gradient-to-r from-blue-400 to-purple-600'
            role='progress-bar'
            aria-valuenow={value}
            aria-valuemin={0}
            aria-valuemax={100}
            style={{width: `${value}%`}}
            ><span className='-ml-1'>{`${value>0 ? value+'%' : ''}`}</span></div>
          </div>
             
          
      )
    } 
    
    export default ProgressBar;