import { Button } from '@mui/material';
import { Box } from '@mui/system';
import { useAsync, useMountEffect } from '@react-hookz/web/esnext';
import { nanoid } from '@reduxjs/toolkit';
import { FormattedMessage } from 'react-intl';

import { getUserContract } from '@sls-monorepo/users-schemas';

import { Title } from 'components';
import client from 'services/networking/client';

const Home = (): JSX.Element => {
  const [{ result, error }, { execute }] = useAsync(() =>
    getUserContract.axiosRequest(client, {
      pathParameters: { userId: nanoid() },
    }),
  );

  useMountEffect(execute);

  if (error) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignContent="center"
        textAlign="center"
        height="100vh"
        maxWidth="100%"
      >
        Error: {error.message}
      </Box>
    );
  }

  return (
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
        <Button variant="contained" onClick={execute}>
          <FormattedMessage id="home.button" />
        </Button>
      </Box>
      <Box marginTop={6}>{JSON.stringify(result?.data)}</Box>
    </Box>
  );
};

export default Home;
