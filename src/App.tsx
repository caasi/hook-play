import { useState, useContext, useCallback } from 'react'
import { EffectContext } from './contexts'
import { User } from './libs'
import { useCont } from './hooks'

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const { useUser } = useContext(EffectContext)
  const { user, error, isLoading, login, logout } = useUser()
  const [password, setPassword] = useState('')
  const sayHello = useCallback((f: (x: string) => void) => { setTimeout(f, 5000, ':D') }, [])
  const hello = useCont(sayHello, '')

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Effects & Contexts</h1>
      <div className="card">
        {isLoading
          ? 'loading...'
          : User.isEmpty(user)
            ? 'please login'
            : `Hello, ${user.username}.`
        }
      </div>
      <form onSubmit={(e) => {
        e.preventDefault();
        login('john.doe@example.com', password);
      }}>
        <input value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">login</button>
        <button type="button" onClick={() => logout()}>logout</button>
      </form>
      <p className="error">
        {error ? error.message : <span>&nbsp;</span>}
      </p>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <p>{hello}</p>
    </>
  )
}

export default App
