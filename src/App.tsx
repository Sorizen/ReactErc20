import '@/styles/app.scss'

import { useState } from 'react'

import { AppButton } from '@/common'
import { InputField } from '@/fields'

function App() {
    const [input, setInput] = useState('')

  return (
    <>
        <AppButton text="hi!" buttonSize="medium" color="primary" />
        <InputField scheme="primary" value={input} inputHandler={setInput} />
    </>
  )
}

export default App
