import React from 'react'

export default function FormSubmitButton({label}) {
  return (
    <button type="submit" className="rounded-md bg-violet-500 cursor-pointer text-white text-lg w-full text-center py-2 my-3">{label}</button>

  )
}
