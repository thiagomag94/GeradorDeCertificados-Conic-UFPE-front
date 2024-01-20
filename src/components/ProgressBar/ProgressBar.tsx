'use client'
import {useEffect} from 'react'
import Image from "next/image";



const ProgressBar = (props:any) => {
    const {value, alert, message} = props

    
    return (
          <div className={` w-full bg-slate-50 text-center rounded-full text-slate-200 font-light text-xl h-[2rem] mt-12`}>
            <div className='flex flex-col h-full items-center rounded-full bg-gradient-to-r from-blue-400 to-purple-600'
            role='progress-bar'
            aria-valuenow={value}
            aria-valuemin={0}
            aria-valuemax={100}
            style={{width: `${value}%`}}
            >{`${value>0 ? value+'%' : ''}`}</div>
          </div>
             
          
      )
    } 
    
    export default ProgressBar;