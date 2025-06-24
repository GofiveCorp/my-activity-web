'use client'

import ActivityCard from '@/app/_components/activity-card'
import { getActivityByType } from '@/app/_utils/fetchActivity'
import { useEffect, useState, MouseEvent } from 'react'
import { Box, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'

const ActivityPage = () => {
  const [data, setData] = useState([])
  const [type, setType] = useState('')

  const fetchData = async (type: string) => {
    const res = await getActivityByType(type)
    setData(res?.data)
  }

  useEffect(() => {
    fetchData(type)
  }, [type])

  return (
    <Box sx={{ margin: '1.25rem', height: '100%' }}>
      <Typography variant='h3' gutterBottom>
        Activities
      </Typography>
      <ActivityToggleButton type={type} setType={setType} />
      {data?.length > 0 ? (
        <ActivityCard data={data} />
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100%' }}>
          <CircularProgress />
        </Box>
      )}
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
