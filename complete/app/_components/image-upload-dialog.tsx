import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Box, Input } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import instance from '@/app/_utils/axios';

export default function UploadDialog({ open, handleClose, id }: { open: boolean, handleClose: () => void, id: string}) {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (file) {
      const formData = new FormData();
      formData.append('imageFile', file);

      try {
        const res = await instance.post(`/api/activities/${id}/upload-image`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Upload New Image</DialogTitle>
      <DialogContent>
        <Box component="form">
          <Input
            type="file"
            onChange={handleFileChange}
            fullWidth
            inputProps={{ accept: 'image/png, image/jpeg' }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined">Close</Button>
        <Button onClick={handleUpload} variant="outlined">Upload</Button>
      </DialogActions>
    </Dialog>
  );
}
