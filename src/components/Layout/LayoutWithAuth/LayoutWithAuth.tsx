import * as React from 'react'

interface Props {
  children: React.ReactElement
}

export function LayoutWithAuth({ children }: Props) {
  return (
    <>
      <h4>Layout With Auth</h4>
      {children}
    </>
  )
}
