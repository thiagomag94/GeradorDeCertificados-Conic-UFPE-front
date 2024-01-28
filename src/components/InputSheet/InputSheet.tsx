'use client'

import {useState} from 'react'


const InputSheet = (props:any) => {
    const {sheetName, setSheetName, alert, inputValue} = props

    
    const handleChange = (event:any) =>{
      setSheetName(event.target.value)
    }


    
    return (
          <div className={`flex flex-col items-start justify-center w-full`}>
           
            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome da guia</label>
            <input type="text" value={sheetName} id="first_name" className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ex: Apresentadores" required onChange={(event)=>handleChange(event)}/>
        
          </div>
          
      )
    } 
    
    export default InputSheet;