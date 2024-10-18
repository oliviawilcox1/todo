
// @mui
import { styled } from '@mui/material/styles';
import { AppBar, Toolbar, Box } from '@mui/material';
// components
import soal from '../../assets/soal_logo.jpeg'
// ----------------------------------------------------------------------

const HEADER_MOBILE = 64;

const HEADER_DESKTOP = 92;

const StyledRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: "white",
  boxShadow: 'none',
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  justifyContent: "space-between",
  [theme.breakpoints.up('lg')]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

export default function Header({ }) {

  return (
    <StyledRoot>
      <StyledToolbar>
        <Box 
            alignSelf={"left"}
            component="img"
            src={soal}
            alt="Soal Logo"
            sx={{ width: '50px', height: 'auto', borderRadius: 2 }}
        />
      </StyledToolbar>
    </StyledRoot>
  );
}
