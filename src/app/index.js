import { useCallback, useContext, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import useSelector from '../hooks/use-selector';
import Main from './main';
import Basket from './basket';
import Article from './article';
import Profile from './profile';
import ProtectedRoute from './protected-route';
import Login from './login';

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {
  const activeModal = useSelector(state => state.modals.name);
  const authUser = useSelector(state => state.user.token) ? true : false;

  return (
    <>
      <Routes>
        <Route path={''} element={<Main />} />
        <Route path={'/articles/:id'} element={<Article />} />
        <Route path={'/login'} element={
          <ProtectedRoute user = { !authUser } redirectPath = '/profile'>
            <Login />
          </ProtectedRoute>
        } />
        <Route path={'/profile'} element = {
          <ProtectedRoute user = { authUser } redirectPath = '/login'>
              <Profile />
          </ProtectedRoute>
        } />
      </Routes>

      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
