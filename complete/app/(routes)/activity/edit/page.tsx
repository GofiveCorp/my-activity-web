'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

function DefaultEditPage() {
  const router = useRouter()
  useEffect(() => {
    router.push('/')
  }, [])

  return <></>
}

export default DefaultEditPage
