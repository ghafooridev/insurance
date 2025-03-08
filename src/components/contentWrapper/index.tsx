import React from 'react'

function ContentWrapper({ children }: { children: React.ReactNode }) {
  return <div className="w-full px-10 py-10">{children}</div>
}

export default ContentWrapper
