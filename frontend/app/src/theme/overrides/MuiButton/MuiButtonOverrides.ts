import { ComponentsOverrides } from '@mui/material';

const MuiButtonOverrides: ComponentsOverrides['MuiButton'] = {
  root: {
    textTransform: 'none',
    fontsize: '15px',
    boxShadow: 'none',
    '&:hover': {
      boxShadow: 'none',
    },
  },
};

export default MuiButtonOverrides;
