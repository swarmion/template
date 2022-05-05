import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { NotFound } from '@swarmion-starter/frontend-shared';

const Home = React.lazy(() => import('pages/Home/Home'));

export enum RoutePaths {
  HOME_PAGE = '/',
}

const AppRoutes = (): JSX.Element => (
  <Suspense fallback={NotFound}>
    <BrowserRouter>
      <Routes>
        <Route path={RoutePaths.HOME_PAGE} element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </Suspense>
);

export default AppRoutes;
