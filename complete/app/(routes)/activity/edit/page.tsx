'use client'

import { useRouter } from "next/navigation"
import { useEffect } from "react"

function defaultEditPage () {
    const router = useRouter()
    useEffect(() => {
        router.push('/')
    }, [])

    return <></>
}

export default defaultEditPage