import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Input } from '@mui/material'
import { ChangeEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { uploadImage } from '../_utils/fetchActivity'

export default function UploadDialog({
  open,
  handleClose,
  id
}: {
  open: boolean
  handleClose: () => void
  id: string
}) {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (file) {
      const formData = new FormData()
      formData.append('imageFile', file)

      const res = await uploadImage(id, formData)

      if (res && res.status === 200) {
        location.reload()
      }
    }
    handleClose()
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Upload New Image</DialogTitle>
      <DialogContent>
        <Input type='file' onChange={handleFileChange} fullWidth inputProps={{ accept: 'image/png, image/jpeg' }} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant='outlined'>
          Close
        </Button>
        <Button onClick={handleUpload} variant='outlined'>
          Upload
        </Button>
      </DialogActions>
    </Dialog>
  )
}
