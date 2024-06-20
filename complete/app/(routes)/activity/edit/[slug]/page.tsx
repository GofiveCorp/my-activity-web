'use client'

import { Box } from '@mui/material'
import ActivityForm from '@/app/_components/activity-form'
import { useEffect, useState } from 'react'
import { Activity } from '@/app/_types/activity'
import { getActivityById } from '@/app/_utils/fetchActivity'

const EditActivityPage = ({ params }: { params: { slug: string } }) => {
  const { slug } = params
  const [activity, setActivity] = useState<Activity>()

  useEffect(() => {
    const fetchData = async () => {
      const res = await getActivityById(slug)
      setActivity(res?.data)
    }

    fetchData()
  }, [])

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', margin: 3 }}>
      <ActivityForm isEdit={true} initialData={activity} />
    </Box>
  )
}

export default EditActivityPage
