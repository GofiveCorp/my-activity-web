'use client'

import { Box } from '@mui/material'
import ActivityForm from '@/app/_components/activity-form'

const AddActivityPage = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', margin: 3 }}>
      <ActivityForm />
    </Box>
  )
}

export default AddActivityPage
