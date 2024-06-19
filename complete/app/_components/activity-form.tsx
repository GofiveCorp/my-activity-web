'use client'

import { Box, Button, CardContent, Grid, Paper, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import DateTimePicker from "./datetime-picker";
import FeelingRating from "./feeling-rating";
import instance from "@/app/_utils/axios";
import { useRouter } from "next/navigation";

interface ActivityFormProps {
    initialData?: {
        id: string;
        title: string;
        description: string;
        type: string;
        startTime: string;
        endTime: string;
        date: string;
        duration: { hours: number; minutes: number };
        barometer: string;
    };
    isEdit?: boolean;
}

const ActivityForm = ({ initialData, isEdit = false }: ActivityFormProps) => {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [date, setDate] = useState('');
    const [duration, setDuration] = useState({ hours: 0, minutes: 0 });
    const [activityType, setActivityType] = useState('Running');
    const [feeling, setFeeling] = useState('Normal');

    const activities = [
        { label: 'Running', icon: '🏃' },
        { label: 'Cycling', icon: '🚴' },
        { label: 'Swimming', icon: '🏊' },
        { label: 'Walking', icon: '🚶' },
        { label: 'Hiking', icon: '🥾' },
        { label: 'Others', icon: '❓' },
    ];

    const [activeIndex, setActiveIndex] = useState(
        activities.findIndex(activity => activity.label === activityType) || 0
    );

    const handleActivityClick = (index: number) => {
        setActiveIndex(index);
        setActivityType(activities[index].label);
    };

    async function onSubmit() {
        if (isEdit) {
            handleEditActivity();
        } else {
            handleAddActivity();
        }
    }

    async function handleAddActivity() {
        const data = {
            title: title === '' ? 'Running' : title,
            description: description,
            type: activityType,
            startTime: startTime,
            endTime: endTime,
            date: date,
            duration: duration,
            barometer: feeling,
        };

        const result = await instance.post('/api/activities', data);

        if (result.status === 204) {
            router.push('/activity');
        }
    }

    async function handleEditActivity() {
        const data = {
            title: title === '' ? 'Running' : title,
            description: description,
            type: activityType,
            startTime: startTime,
            endTime: endTime,
            date: date,
            duration: duration,
            barometer: feeling,
        };

        const result = await instance.put(`/api/activities/${initialData?.id}`, data);

        if (result.status === 204) {
            router.push('/activity');
        }
    }

    useEffect(() => {
        if (initialData === undefined || !isEdit) return;

        setTitle(initialData?.title || '');
        setDescription(initialData?.description || '');
        setActivityType(initialData?.type || 'Running');
        setStartTime(initialData?.startTime || '');
        setEndTime(initialData?.endTime || '');
        const date = new Date(initialData?.date || '');
        const formattedDate = date.toISOString().split('T')[0];
        setDate(formattedDate);
        setDuration(initialData?.duration || { hours: 0, minutes: 0 });
        setFeeling(initialData?.barometer || 'Normal');
    }, [initialData])

    useEffect(() => {
        setActiveIndex(activities.findIndex(activity => activity.label === activityType) || 0);
    }, [activityType]);

    return (
        <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '500px' }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                {isEdit ? 'Edit Activity' : 'Add Activity'}
            </Typography>

            <Box
                component="form"
                noValidate
                autoComplete="off"
                sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            >
                <Box>
                    <Typography variant="h6" gutterBottom>
                        Title
                    </Typography>
                    <TextField
                        id="outlined-controlled"
                        placeholder="Running (default)"
                        value={title}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setTitle(event.target.value);
                        }}
                        fullWidth
                    />
                </Box>

                <Box>
                    <Typography variant="h6" gutterBottom>
                        Description
                    </Typography>
                    <TextField
                        id="outlined-multiline-static"
                        placeholder="Notes for anything (optional)"
                        value={description}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setDescription(event.target.value);
                        }}
                        fullWidth
                        multiline
                        rows={4}
                    />
                </Box>

                <Box><Typography variant="h6" gutterBottom>
                    Activity Type
                </Typography>
                    <Grid container spacing={2}>
                        {activities.map((activity, index) => (
                            <Grid item xs={4} key={index}>
                                <Paper
                                    elevation={3}
                                    onClick={() => handleActivityClick(index)}
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        p: 2,
                                        cursor: 'pointer',
                                        backgroundColor: index === activeIndex ? 'primary.main' : 'background.paper',
                                        color: index === activeIndex ? 'primary.contrastText' : 'text.primary',
                                    }}
                                >
                                    <Typography variant="h4">{activity.icon}</Typography>
                                    <Typography variant="body1">{activity.label}</Typography>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid></Box>
                <DateTimePicker startTime={startTime} endTime={endTime} date={date} duration={duration} setStartTime={setStartTime} setEndTime={setEndTime} setDate={setDate} setDuration={setDuration} />
                <FeelingRating setFeeling={setFeeling} feeling={feeling} />

                <Box sx={{ display: 'flex', justifyContent: 'end', gap: '15px' }}>
                    <Button variant="outlined" color="error" onClick={() => router.push('/')}>Cancel</Button>
                    <Button variant="outlined" color="primary" onClick={onSubmit}>{isEdit ? 'Update Activity' : 'Add Activity'}</Button>
                </Box>
            </Box>
        </CardContent>
    );
}

export default ActivityForm;
