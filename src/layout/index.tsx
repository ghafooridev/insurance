import Header from '@/components/header'
import React from 'react'

function ContentWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <div className="w-full sm:w-[800px] px-2 lg:px-10 py-10 mx-auto bg-white dark:bg-black">
        {children}
      </div>
    </div>
  )
}

export default ContentWrapper
