import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { NotFound } from '@swarmion-starter/frontend-shared';

import { Home } from 'pages';

export enum RoutePaths {
  HOME_PAGE = '/',
}

const AppRoutes = (): JSX.Element => (
  <BrowserRouter>
    <Routes>
      <Route path={RoutePaths.HOME_PAGE} element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
