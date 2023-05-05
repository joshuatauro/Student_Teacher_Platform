import React from 'react'

const Tag = ({tagName, isFlair}) => {
  return (
    <>
    {
      isFlair ? <div className="text-xs uppercase font-medium font-inter bg-cta text-white px-2 py-1.5 rounded-md">{tagName}</div> : <div className="px-2 py-1 text-xs text-cta font-inter mr-2 rounded-md bg-cta-fade border border-cta">{tagName}</div>
    }
    </>
  )
}

export default Tag