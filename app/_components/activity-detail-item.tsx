import { Box, Divider, Grid } from '@mui/material'
import { ReactElement } from 'react'

const ActivityDetailItem = ({
  iconChildren,
  textChildren
}: {
  iconChildren: ReactElement
  textChildren: ReactElement
}) => {
  return (
    <>
      <Grid container alignItems='center' spacing={2}>
        <Grid item>
          <Box
            sx={{
              minHeight: 40,
              minWidth: 40,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid',
              borderColor: 'grey.300',
              borderRadius: '50%'
            }}
          >
            {iconChildren}
          </Box>
        </Grid>
        <Grid item>{textChildren}</Grid>
      </Grid>

      <Divider sx={{ my: 1 }} />
    </>
  )
}

export default ActivityDetailItem
