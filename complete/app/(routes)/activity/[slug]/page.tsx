'use client'

import { useEffect, useState } from 'react';
import { Box, CardContent, Typography, IconButton, Grid, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ImageIcon from '@mui/icons-material/Image';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SprintIcon from '@mui/icons-material/RunningWithErrors';
import DescriptionIcon from '@mui/icons-material/Description';
import DateRangeIcon from '@mui/icons-material/DateRange';
import ScheduleIcon from '@mui/icons-material/Schedule';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import { Activity } from '@/app/_types/activity';
import { useRouter } from 'next/navigation';
import { getDuration } from '@/app/_utils/getDuration';
import UploadDialog from '@/app/_components/image-upload-dialog';
import instance from '@/app/_utils/axios';
import Image from 'next/image';

const ActivityDetail = ({ params }: { params: { slug: string } }) => {
    const router = useRouter()
    const { slug } = params;
    const [activity, setActivity] = useState<Activity>();
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [uploadDialogOpen, setUploadDialogOpen] = useState(false);

    const handleClickDeleteDialogOpenOpen = () => {
        setDeleteDialogOpen(true);
    };

    const handleClickUploadDialogOpen = () => {
        setUploadDialogOpen(true);
    }

    const handleCloseDeleteDialogOpen = () => {
        setDeleteDialogOpen(false);
    };

    const handleCloseUploadDialogOpen = () => {
        setUploadDialogOpen(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            const res = await instance.get(`/api/activities/${slug}`);
            setActivity(res.data);
        };

        fetchData();
    }, []);

    async function handleDelete() {
        const res = await instance.delete(`/api/activities/${slug}`);

        if (res.status === 204) {
            router.push('/');
        }

        handleCloseDeleteDialogOpen();
    }

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    bgcolor: 'background.default',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        width: { xs: '100%', sm: '90%', md: '800px' },
                        maxWidth: '800px',
                        margin: 'auto',
                        boxShadow: 3,
                        borderRadius: 2,
                        overflow: 'hidden',
                        bgcolor: 'background.paper',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            bgcolor: 'warning.main',
                            color: 'white',
                            p: 2,
                            flex: 1
                        }}
                    >
                        <Typography variant="h1" component="div" sx={{ fontSize: '2rem', fontWeight: 'bold' }}>{activity?.type}</Typography>
                    </Box>
                    <CardContent sx={{ width: '100%', p: 2 }}>
                        {activity?.image && (
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    mb: 2,
                                }}
                            >
                                <Image
                                    src={`data:image/png;base64,${activity.image}`}
                                    alt="Activity Image"
                                    style={{ borderRadius: '8px' }}
                                    width={600}
                                    height={300}
                                />
                            </Box>
                        )}

                        <Grid container alignItems="center" spacing={2}>
                            <Grid item>
                                <Box
                                    sx={{
                                        minHeight: 48,
                                        minWidth: 48,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        border: '2px solid',
                                        borderColor: 'grey.300',
                                        borderRadius: '50%',
                                    }}
                                >
                                    <SprintIcon />
                                </Box>
                            </Grid>
                            <Grid item>
                                <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>{activity?.title}</Typography>
                            </Grid>
                        </Grid>

                        <Box sx={{ my: 2, borderBottom: '1px solid', borderColor: 'grey.300' }} />

                        <Grid container alignItems="center" spacing={2}>
                            <Grid item>
                                <Box
                                    sx={{
                                        minHeight: 48,
                                        minWidth: 48,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        border: '2px solid',
                                        borderColor: 'grey.300',
                                        borderRadius: '50%',
                                    }}
                                >
                                    <DescriptionIcon />
                                </Box>
                            </Grid>
                            <Grid item>
                                <Typography variant="body1" component="div">{activity?.description && activity.description !== '' ? activity.description : 'It was a good effort!'}</Typography>
                            </Grid>
                        </Grid>

                        <Box sx={{ my: 2, borderBottom: '1px solid', borderColor: 'grey.300' }} />

                        <Grid container alignItems="center" spacing={2}>
                            <Grid item>
                                <Box
                                    sx={{
                                        minHeight: 48,
                                        minWidth: 48,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        border: '2px solid',
                                        borderColor: 'grey.300',
                                        borderRadius: '50%',
                                    }}
                                >
                                    <DateRangeIcon />
                                </Box>
                            </Grid>
                            <Grid item>
                                <Typography variant="body1" component="div">Tuesday, June 18, 2024</Typography>
                            </Grid>
                        </Grid>

                        <Box sx={{ my: 2, borderBottom: '1px solid', borderColor: 'grey.300' }} />

                        <Grid container alignItems="center" spacing={2}>
                            <Grid item>
                                <Box
                                    sx={{
                                        minHeight: 48,
                                        minWidth: 48,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        border: '2px solid',
                                        borderColor: 'grey.300',
                                        borderRadius: '50%',
                                    }}
                                >
                                    <ScheduleIcon />
                                </Box>
                            </Grid>
                            <Grid item>
                                <Typography variant="body1" component="div">{activity?.startTime} - {activity?.endTime}</Typography>
                                <Typography variant="body2" component="div">{activity?.duration && getDuration(activity.duration)}</Typography>
                            </Grid>
                        </Grid>

                        <Box sx={{ my: 2, borderBottom: '1px solid', borderColor: 'grey.300' }} />

                        <Grid container alignItems="center" spacing={2}>
                            <Grid item>
                                <Box
                                    sx={{
                                        minHeight: 48,
                                        minWidth: 48,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        border: '2px solid',
                                        borderColor: 'grey.300',
                                        borderRadius: '50%',
                                    }}
                                >
                                    <SentimentNeutralIcon />
                                </Box>
                            </Grid>
                            <Grid item>
                                <Typography variant="body1" component="div">Feeling {activity?.barometer}</Typography>
                            </Grid>
                        </Grid>

                        <Box sx={{ my: 2, borderBottom: '1px solid', borderColor: 'grey.300' }} />

                        <Grid container justifyContent="space-between" spacing={2} sx={{ py: 2 }}>
                            <Grid item>
                                <IconButton aria-label="back" onClick={() => router.push('/')}>
                                    <ArrowBackIcon />
                                </IconButton>
                            </Grid>
                            <Grid item>
                                <Grid container spacing={1}>
                                    <Grid item>
                                        <IconButton aria-label="add photo" onClick={handleClickUploadDialogOpen}>
                                            <ImageIcon />
                                        </IconButton>
                                    </Grid>
                                    <Grid item>
                                        <IconButton aria-label="edit" onClick={() => router.push(`/activity/edit/${slug}`)}>
                                            <EditIcon />
                                        </IconButton>
                                    </Grid>
                                    <Grid item>
                                        <IconButton aria-label="delete" onClick={handleClickDeleteDialogOpenOpen}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Box>
            </Box>
            <Dialog
                open={deleteDialogOpen}
                onClose={handleCloseDeleteDialogOpen}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Delete Activity"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this activity?
                        This cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteDialogOpen}>Cancel</Button>
                    <Button onClick={handleDelete} autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
            <UploadDialog open={uploadDialogOpen} handleClose={handleCloseUploadDialogOpen} id={slug} />
        </>
    );
};

export default ActivityDetail;
