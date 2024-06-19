import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const feelings = [
    { label: 'Very Weak', icon: '😫' },
    { label: 'Weak', icon: '😞' },
    { label: 'Normal', icon: '😐' },
    { label: 'Strong', icon: '🙂' },
    { label: 'Very Strong', icon: '😄' },
];

const FeelingRating = ({ setFeeling, feeling }: { setFeeling: (value: string) => void, feeling: string }) => {
    const [selectedFeeling, setSelectedFeeling] = useState(2);

    const handleFeelingClick = (index: number) => {
        setSelectedFeeling(index);
        setFeeling(feelings[index].label);
    };

    useEffect(() => {
        setSelectedFeeling(feelings.findIndex(item => item.label === feeling));
    }, [feeling]);

    return (
        <Box sx={{display: 'flex', justifyContent: 'center', alignItems:'center', textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
                How did you feel?
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                {feelings.map((feeling, index) => (
                    <Box
                        key={index}
                        onClick={() => handleFeelingClick(index)}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            cursor: 'pointer',
                            color: selectedFeeling === index ? 'primary.main' : 'text.primary',
                        }}
                    >
                        <Typography variant="h4">{feeling.icon}</Typography>
                        <Typography variant="caption">{feeling.label}</Typography>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default FeelingRating;
