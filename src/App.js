import { useState, useCallback, useEffect, useRef } from "react";


function App() {

  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  // use ref hook

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {     // Memoization used here...
        let pass = ""
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

        if (numberAllowed) str += "0123456789"
        if (numberAllowed) str += "!@#$%^&*(){}[]|"

        for (let i = 1; i <= length; i++){
              let char = Math.floor(Math.random() * str.length + 1)
              pass += str.charAt(char);
        }
        setPassword(pass)

  }, [length,numberAllowed,setPassword])


//   passwordGenerator(); // we dosen't call because Too many re-renders. React limits the number of renders to prevent an infinite loop. To overcome this issue we should use another hook like useEffect Hook!

      useEffect(() => {
            passwordGenerator();
      }, [length,numberAllowed,charAllowed,passwordGenerator])


      const copyPasswordToClipboard = useCallback(() => {
            passwordRef.current?.select()
            // passwordRef.current?.setSelectionRange(0,3)
            window.navigator.clipboard.writeText(password)
      },[password])

  return (
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700">
          <h1 className="text-white text-center text-3xl my-3 mx-3">Password Generator!</h1>
          <div className="flex shadow rounded-lg overflow-hidden mb-4">
                <input 
                        type="text" 
                        value={password} 
                        className="outline-none w-full py-1 px-3 rounded-md" 
                        placeholder="Password" 
                        readOnly
                        ref={passwordRef}
                 />
                <button 
                className="text-white bg-blue-800 px-3 py-0.5 shrink-0 rounded-lg outline-none" 
                onClick={copyPasswordToClipboard}>Copy
                </button>
          </div>
          <div className="flex text-sm gap-x-4">
                <div className="flex items-center gap-x-1">
                      <input 
                        type="range" 
                        min={6} 
                        max={100} 
                        value={length} 
                        className="cursor-pointer" 
                        onChange={(e) => {setLength(e.target.value)}}
                      />
                      <label className="text-xl">Length: {length}</label>
                </div>
                <div className="flex items-center gap-x-1">
                      <input
                        type="checkbox"
                        defaultChecked={numberAllowed}
                        onChange={() => {setNumberAllowed((prev) => !prev)}}
                      />
                      <label htmlFor="numberInput">Numbers</label>
                </div>
                <div className="flex items-center gap-x-1">
                      <input
                        type="checkbox"
                        defaultChecked={charAllowed}
                        onChange={() => {setCharAllowed((prev) => !prev)}}
                      />
                      <label htmlFor="characterInput">Characters</label>
                </div>
          </div>
      </div>
  );
}

export default App;
