import { Route, Routes } from 'react-router-dom';

import { NAVIGATION_PATHS } from './constants/navigation';

import Home from '@/views/Home/Home';

function App() {
  return (
    <>
      <Routes>
        <Route index path={NAVIGATION_PATHS.HOME_PATH} element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
