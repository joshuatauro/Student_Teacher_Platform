import React from 'react'

const Tag = ({tagName}) => {
  return (
    <div className="px-2 py-1 text-xs text-cta font-inter mr-2 rounded-md bg-cta-fade border border-cta">{tagName}</div>
  )
}

export default Tag