import { Outlet } from 'react-router-dom';
// @mui
import { Grid, Paper, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
// Assets
// import background from '../assets/background.png'
import soal from '../assets/soal_logo.jpeg'
// ----------------------------------------------------------------------

export default function AuthLayout () {

  const StyledRoot = styled('div')({
    display: 'flex',
    minHeight: '100%',
    overflow: 'hidden',
  });

  return (
    <StyledRoot>
      
      <Grid container columns={20}>

        <Grid item xs={0} sm={0} md={11}
          sx={{ 
            background: 'linear-gradient(90deg, rgba(255,200,150,0.2) 0%, rgba(240,80,180,0.2) 50%, rgba(120,30,240,0.2) 100%)',
            backgroundBlendMode: 'soft-light',
            display: { xs: "none", sm: "none", md: "flex"},
            justifyContent: 'center'
          }}
        >
          <Box 
            alignSelf={"center"}
            component="img"
            src={soal}
            alt="Soal Logo"
            sx={{ width: '100px', height: 'auto', borderRadius: 4 }}
          />
        </Grid>

        <Grid item xs={20} sm={20} md={9} component={Paper} elevation={6}>

          <Outlet />

        </Grid>
        
      </Grid> 
    </StyledRoot>
  );
}
