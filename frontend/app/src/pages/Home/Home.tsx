import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useAsync } from '@react-hookz/web/esnext';
import { nanoid } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import { getUserContract } from '@sls-monorepo/users-schemas';

import { Title } from 'components';
import client from 'services/networking/client';
import { getUser, setUser } from 'store/user';

const Home = (): JSX.Element => {
  const dispatch = useDispatch();
  const userFromRedux = useSelector(getUser);
  const [{ result, error }, { execute }] = useAsync(() =>
    getUserContract.axiosRequest(client, {
      pathParameters: { userId: nanoid() },
    }),
  );

  useEffect(() => {
    if (result === undefined) {
      return;
    }
    dispatch(setUser(result.data));
  }, [dispatch, result]);

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
      <Typography variant="h5">User from api call</Typography>
      <Box marginTop={6}>{JSON.stringify(result?.data)}</Box>
      <Typography variant="h5">User from redux</Typography>
      <Box marginTop={6}>{JSON.stringify(userFromRedux)}</Box>
    </Box>
  );
};

export default Home;
