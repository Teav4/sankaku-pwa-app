import * as React from 'react'

interface Props {
  children: React.ReactElement
}

export function LayoutWithNoAuth({ children }: Props) {
  return (
    <>
      <h4>Layout With No Auth</h4>
      {children}
    </>
  )
}
