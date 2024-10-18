const GREY = {
    0: '#FFFFFF',
    100: '#F9FAFB',
    200: '#F4F6F8',
    300: '#DFE3E8',
    400: '#C4CDD5',
    500: '#919EAB',
    600: '#637381',
    700: '#454F5B',
    800: '#212B36',
    900: '#161C24',
  };

  const PRIMARY = {
    lighter: "#E3D9F8",  
    light: "#A98CED",   
    main: "#7545D6",     
    dark: "#4A2FA6",    
    darker: "#311E74", 
    contrastText: '#FFFFFF',
  };
  
  const SUCCESS = {
    lighter: '#E9FCD4',
    light: '#AAF27F',
    main: '#54D62C',
    dark: '#229A16',
    darker: '#08660D',
    contrastText: GREY[800],
  };
  
  const ERROR = {
    lighter: '#FFE7D9',
    light: '#FFA48D',
    main: '#FF4842',
    dark: '#B72136',
    darker: '#7A0C2E',
  };
  
  // const WARNING = {
  //   lighter: '#FFF7CD',
  //   light: '#FFE16A',
  //   main: '#FFC107',
  //   dark: '#B78103',
  //   darker: '#7A4F01',
  // }
  
  const palette = {
    common: { black: '#000', white: '#fff' },
    primary: PRIMARY,
    success: SUCCESS,
    warning: WARNING,
    error: ERROR,
    text: {
      primary: "#212021",
      secondary: "#666666",
      disabled: "#9E9E9E",
    },
    grey: GREY,
    background: {
      paper: '#fff',
      default: "#FFFFFF",
    },
  };
  
  export default palette;
  