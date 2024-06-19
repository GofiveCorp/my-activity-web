import { ChangeEvent, useEffect } from 'react';
import { Box, Grid, Typography } from '@mui/material';

type Props = {
    startTime: string;
    endTime: string;
    date: string;
    duration: { hours: number; minutes: number };
    setStartTime: (startTime: string) => void;
    setEndTime: (endTime: string) => void;
    setDate: (date: string) => void;
    setDuration: (duration: { hours: number; minutes: number }) => void;
}

const DateTimePicker = (props: Props) => {
    const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
        props.setDate(e.target.value);
      };

    const handleStartTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
        props.setStartTime(e.target.value);
    }

    const handleEndTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
        props.setEndTime(e.target.value);
    }

    useEffect(() => {
        if (props.startTime && props.endTime && props.date) {
          const start = new Date(props.date + "T" + props.startTime).getTime();
          let end = new Date(props.date + "T" + props.endTime).getTime();
    
          if (start > end) {
            end += 86400000; // add 1 day (in millisecond)
          }
    
          const time = (end - start) / 1000 / 60;
          const hour = Math.floor(time / 60);
          const minute = time % 60;
    
          props.setDuration({
            hours: hour,
            minutes: minute,
          });
        }
      }, [props.startTime, props.endTime, props.date, props.setDuration]);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Grid container alignItems="center" spacing={1} sx={{ mt: '10px'}}>
          <Grid item>
            <Typography variant="body1">Date:</Typography>
          </Grid>
          <Grid item>
            <input type="date" value={props.date} onChange={handleDateChange} />
          </Grid>
        </Grid>
        <Grid container alignItems="center" spacing={1}>
          <Grid item>
            <Typography variant="body1">From:</Typography>
          </Grid>
          <Grid item>
            <input type="time" value={props.startTime} onChange={handleStartTimeChange} />
          </Grid>
          <Grid item>
            <Typography variant="body1">To:</Typography>
          </Grid>
          <Grid item>
            <input type="time" value={props.endTime} onChange={handleEndTimeChange} />
          </Grid>
        </Grid>
        {props.duration.hours >= 3 && <Typography variant="body2" color="warning">🤔 Duration seems long. Are you sure it's correct?</Typography>}
        {(props.startTime && props.endTime) && (props.startTime === props.endTime) && <Typography variant="body2" color="error">Start time and end time cannot be the same</Typography>}
        <Typography variant="body1">Duration: {props.duration.hours} hours {props.duration.minutes} minutes</Typography>
      </Box>
    );
};

export default DateTimePicker;