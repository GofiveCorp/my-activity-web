import React from 'react'
import { Box, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import { Activity } from '../_types/activity'
import { useRouter } from 'next/navigation'

const ActivityCard = ({ data }: { data: Activity[] }) => {
  const router = useRouter()

  function getDefaultImage(type: string) {
    switch (type) {
      case 'Running':
        return 'running.png'
      case 'Cycling':
        return 'cycling.png'
      case 'Swimming':
        return 'swimming.png'
      case 'Walking':
        return 'walking.png'
      case 'Hiking':
        return 'hiking.png'
    }
  }

  return (
    <Box>
      <Grid container spacing={2}>
        {data.map((item: Activity, index: number) => (
          <Grid item xs={7} sm={4} md={3} xl={2} key={item.id}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                sx={{
                  height: 140,
                  backgroundColor: item.type === 'Others' ? '#f5f5f5' : 'transparent'
                }}
                image={
                  item.image
                    ? `data:image/png;base64,${item.image}`
                    : item.type !== 'Others'
                      ? `/images/${getDefaultImage(item.type)}`
                      : undefined
                }
                title='Activity Image'
              />
              <CardContent>
                <Typography gutterBottom variant='h5'>
                  {item.title}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  {item.date.split('T')[0]} at {item.startTime}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size='small' onClick={() => router.push(`/activity/${item.id}`)}>
                  Detail
                </Button>
                <Button size='small'>Edit</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default ActivityCard
