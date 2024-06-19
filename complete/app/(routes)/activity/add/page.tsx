'use client'

import { Box, Card } from "@mui/material";
import ActivityForm from "@/app/_components/activity-form";

const AddActivityPage = () => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Card>
                <ActivityForm />
            </Card>
        </Box>
    )
}

export default AddActivityPage;
