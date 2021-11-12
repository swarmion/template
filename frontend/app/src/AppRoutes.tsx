import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Home } from 'pages';

export enum RoutePaths {
  HOME_PAGE = '/',
}

const AppRoutes = (): JSX.Element => (
  <BrowserRouter>
    <Routes>
      <Route path={RoutePaths.HOME_PAGE} element={<Home />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
