import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import { Activity } from '@/app/_types/activity'
import { getDuration } from '../_utils/getDuration'
import { useRouter } from 'next/navigation'

type Props = {
  data: Activity[]
}

export default function ActivityCard({ data }: Props) {
  const router = useRouter()

  return (
    <Grid container spacing={2}>
      {data.map((activity: Activity) => (
        <Grid item xs={6} sm={4} md={2} key={activity.id}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              sx={{ height: 140 }}
              image={activity.image ? 'data:image/png;base64,' + activity.image : '/images/bg.jpg'}
              title='Activity Image'
            />
            <CardContent>
              <Typography gutterBottom variant='h5'>
                {activity.title}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                {getDuration(activity.duration)}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                {activity.date.split('T')[0]} at {activity.startTime}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size='small' onClick={() => router.push(`/activity/${activity.id}`)}>
                Detail
              </Button>
              <Button size='small' onClick={() => router.push(`/activity/edit/${activity.id}`)}>
                Edit
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}
