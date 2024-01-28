'use client'

import {useState, useEffect} from 'react'


const InputCol = (props:any) => {
    const {nameCol, setNameCol, alert, inputValue} = props
    
    useEffect(()=>{
      if(alert==='submitted'){
        
      }
    }, [alert])
    const handleChange = (event:any)=>{
      const NamesString = event.target.value
      const NamesArray = NamesString.split(',')
      setNameCol(NamesArray)
      
    }

    


    return (
          <div className={`flex flex-col items-start justify-center w-full`}>
            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome das colunas (entre vírgulas)</label>
            <input type="text" id="first_name" value={nameCol} className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ex: Nome, Titulo_do_Projeto, Orientador" required onChange={(event)=>handleChange(event)}/>
          </div>
          
      )
    } 
    
    export default InputCol;