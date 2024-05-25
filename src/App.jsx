
import { useCallback, useState, useRef, useEffect } from 'react'

import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [number, setNumber] = useState(false)
  const [character, setCharacter] = useState(false)
  const [password, setPassword] = useState("")

  const passRef = useRef(null)

  const passwordGenerator = useCallback(() =>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(number) str += "0123456789"
    if(character) str += "!@#$%^&*?~"

    for (let i = 0; i < length; i++) {
      let char = Math.floor((Math.random() * str.length + 1));
      pass += str.charAt(char)
    }
    setPassword(pass);

  }, [length, number, character])

  const copyPassword = () =>{
    passRef.current?.select();
    window.navigator.clipboard.writeText(password)
  }

  useEffect(()=>{
    passwordGenerator()
  }, [length, number, character])

  return (
    <>
      <div className='w-full h-screen bg-slate-600 flex items-center justify-center'>
        <div className='w-1/2 mx-auto bg-slate-400 rounded-lg '>
          <div className='m-5'>
            <div className='p-5 text-center'>
              <h1 className='text-4xl text-black'>Password generator</h1>
            </div>
            <div className='flex justify-between items-center  bg-green-300 rounded-lg overflow-hidden'>
              <input
                type="text"
                value={password}
                placeholder='Password'
                className='w-full  px-2 py-2 outline-none'
                readOnly
                ref={passRef}
              />
              <button className='bg-blue-400 px-2 py-2 outline-none shrink-0' onClick={copyPassword}>copy</button>
            </div>
            <div className='flex items-center gap-4 my-4 align-middle'>
            <div className='flex items-center'>
              <input type="range"
              min={8}
              max={50}
              value = {length}
              onChange = {(e) => setLength(e.target.value)}
              className = 'cursor-pointer'
              />
               <label htmlFor="range">Length : {length}</label>
              </div>
              <div>
              <input type="checkbox" 
              defaultChecked = {number}
              id = 'inputNumber'
              onChange={()=> {
                return setNumber((prev) => !prev )
              }}
              />
              <label htmlFor="inputNumber">Number</label>
              </div>
             
              <div>
              <input type="checkbox" 
              defaultChecked = {character}
              id = 'inputCharacter'
              onChange={()=> {
                return setCharacter((prev) => !prev )
              }}
              />
              <label htmlFor="inputCharacter">Characters</label>
              </div>
             
            </div>
          </div>
        </div>
      </div>
    </>

  )
}

export default App



