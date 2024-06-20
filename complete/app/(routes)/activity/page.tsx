'use client'

import { Box, Button, Card, CardContent, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import { useEffect, useState, MouseEvent } from 'react'
import ActivityCard from '../../_components/activity-card'
import { Activity } from '@/app/_types/activity'
import instance from '@/app/_utils/axios'
import { useRouter } from 'next/navigation'

const ActivityPage = () => {
  const router = useRouter()

  const [data, setData] = useState<Activity[]>([])
  const [type, setType] = useState('')

  const fetchData = async (type: string) => {
    const url = type !== '' ? `/api/activities/api-key?type=${type}` : '/api/activities/api-key'
    const res = await instance.get(url)
    setData(res.data)
  }

  useEffect(() => {
    fetchData(type)
  }, [type])

  return (
    <Box sx={{ margin: '1.25rem', height: '100%' }}>
      <Card sx={{ width: '100%', height: '100%' }}>
        <CardContent>
          <Typography variant='h3' fontWeight='bold' gutterBottom>
            Activities
          </Typography>
          <ActivityToggleButton type={type} setType={setType} />
          {data.length > 0 ? (
            <ActivityCard data={data} />
          ) : (
            <>
              <Typography variant='h6'>No activities found</Typography>
              <Button variant='contained' color='primary' onClick={() => router.push('/activity/add')}>
                Add Activity
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </Box>
  )
}

function ActivityToggleButton({ type, setType }: { type: string; setType: (type: string) => void }) {
  const handleChange = (event: MouseEvent<HTMLElement>, newAlignment: string) => {
    setType(newAlignment)
  }

  return (
    <ToggleButtonGroup
      color='primary'
      value={type}
      exclusive
      onChange={handleChange}
      aria-label='Platform'
      sx={{ marginBottom: '16.8px' }}
    >
      <ToggleButton value=''>All</ToggleButton>
      <ToggleButton value='Running'>Running</ToggleButton>
      <ToggleButton value='Cycling'>Cycling</ToggleButton>
      <ToggleButton value='Swimming'>Swimming</ToggleButton>
      <ToggleButton value='Hiking'>Hiking</ToggleButton>
      <ToggleButton value='Walking'>Walking</ToggleButton>
      <ToggleButton value='Others'>Others</ToggleButton>
    </ToggleButtonGroup>
  )
}

export default ActivityPage
