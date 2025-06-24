'use client'

import Image from 'next/image'
import { Activity } from '@/app/_types/activity'
import { deleteActivity, getActivityById } from '@/app/_utils/fetchActivity'
import {
  Box,
  Button,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Typography
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import SprintIcon from '@mui/icons-material/RunningWithErrors'
import ActivityDetailItem from '@/app/_components/activity-detail-item'
import DescriptionIcon from '@mui/icons-material/Description'
import DateRangeIcon from '@mui/icons-material/DateRange'
import ScheduleIcon from '@mui/icons-material/Schedule'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import DeleteIcon from '@mui/icons-material/Delete'
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral'
import { useRouter } from 'next/navigation'

const ActivityDetailPage = ({ params }: { params: { slug: string } }) => {
  const router = useRouter()
  const { slug } = params
  const [activity, setActivity] = useState<Activity>()
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const res = await getActivityById(slug)
      setActivity(res?.data)
    }

    fetchData()
  }, [])

  const handleCloseDeleteDialogOpen = () => {
    setDeleteDialogOpen(false)
  }

  const handleClickDeleteDialogOpen = () => {
    setDeleteDialogOpen(true)
  }

  async function handleDelete() {
    const res = await deleteActivity(slug)

    if (res && res.status === 204) {
      router.push('/')
    }

    handleCloseDeleteDialogOpen()
  }

  return (
    <Box sx={{ p: 2 }}>
      <Box
        sx={{
          display: 'flex',
          maxWidth: '600px',
          margin: 'auto',
          boxShadow: 3,
          borderRadius: 2,
          overflow: 'hidden'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            bgcolor: 'warning.main',
            color: 'white',
            p: 3,
            flex: 1
          }}
        >
          <Typography variant='h5' fontSize='1.5rem' fontWeight='bold'>
            {activity?.type}
          </Typography>
        </Box>
        <CardContent sx={{ width: '100%', p: 2 }}>
          {activity?.image && (
            <Box sx={{ mb: 2 }}>
              <Image
                src={`data:image/png;base64,${activity.image}`}
                alt='Activity Image'
                style={{ borderRadius: '8px' }}
                width={500}
                height={250}
              />
            </Box>
          )}

          <ActivityDetailItem
            iconChildren={<SprintIcon />}
            textChildren={
              <Typography variant='h6' fontWeight='bold'>
                {activity?.title}
              </Typography>
            }
          />

          <ActivityDetailItem
            iconChildren={<DescriptionIcon />}
            textChildren={
              <Typography variant='body2'>
                {activity?.description && activity.description !== '' ? activity.description : 'It was a good effort!'}
              </Typography>
            }
          />

          <ActivityDetailItem
            iconChildren={<DateRangeIcon />}
            textChildren={<Typography variant='body2'>{activity?.date.split('T')[0]}</Typography>}
          />

          <ActivityDetailItem
            iconChildren={<ScheduleIcon />}
            textChildren={
              <Typography variant='body2'>
                {activity?.startTime} - {activity?.endTime}
              </Typography>
            }
          />

          <ActivityDetailItem
            iconChildren={<SentimentNeutralIcon />}
            textChildren={<Typography variant='body2'>Feeling {activity?.barometer}</Typography>}
          />

          <Grid container justifyContent='space-between' spacing={2}>
            <Grid item>
              <IconButton aria-label='back' onClick={() => router.push('/')}>
                <ArrowBackIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <Grid container spacing={1}>
                <Grid item>
                  {/* <IconButton aria-label='add photo' onClick={handleClickUploadDialogOpen}>
                    <ImageIcon />
                  </IconButton> */}
                </Grid>
                {/* <Grid item>
                  <IconButton aria-label='edit' onClick={() => router.push(`/activity/edit/${slug}`)}>
                    <EditIcon />
                  </IconButton>
                </Grid> */}
                <Grid item>
                  <IconButton aria-label='delete' onClick={handleClickDeleteDialogOpen}>
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Box>
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialogOpen}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{'Delete Activity'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Are you sure you want to delete this activity? This cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialogOpen}>Cancel</Button>
          <Button onClick={handleDelete} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default ActivityDetailPage
