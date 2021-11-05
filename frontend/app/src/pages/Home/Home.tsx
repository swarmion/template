import { Button } from '@mui/material';
import { Box } from '@mui/system';
import { FormattedMessage } from 'react-intl';

import { Title } from 'components';

const Home = (): JSX.Element => (
  <Box
    display="flex"
    flexDirection="column"
    justifyContent="center"
    alignContent="center"
    textAlign="center"
    height="100vh"
    maxWidth="100%"
  >
    <Title />
    <Box marginTop={6}>
      <Button variant="contained">
        <FormattedMessage id="home.button" />
      </Button>
    </Box>
  </Box>
);

export default Home;
