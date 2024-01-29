'use client'

import {useState, useEffect} from 'react'
import InputCol from '../InputCol/InputCol'
import InputSheet from '../InputSheet/InputSheet'



const InputForm = (props:any) => {
    const {excelArray, setExcelArray, alert, setAlert} = props
    const [nameCol, setNameCol] = useState<string[]>([])
    const [sheetName, setSheetName] = useState<string>('')
    
  
    useEffect(()=>{
      console.log(nameCol)

    }, [nameCol])

    useEffect(()=>{
      console.log(excelArray)

    }, [excelArray])

    useEffect(()=>{
      console.log(sheetName)
    }, [sheetName])

    


    const handleSubmit = (event:any) =>{
      event.preventDefault()
      setExcelArray([nameCol, sheetName])
      setAlert('submitted')
      setNameCol([])
      setSheetName('')
      
    }

    return (
          <form className={`relative flex  items-center justify-center w-full p-2.5 gap-4 mt-8  rounded-lg`} onSubmit={(event)=>handleSubmit(event)}>
            <InputCol setNameCol={setNameCol} nameCol={nameCol} alert={alert} />
            <InputSheet setSheetName={setSheetName} sheetName={sheetName} alert={alert} />
            <button type='submit' className='p-2.5 bg-blue-400 rounded-lg mt-6 text-slate-50 right-0'>Enviar</button>
          </form>
          
      )
    } 
    
    export default InputForm;