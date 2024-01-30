import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Spinner } from 'shared/ui/Spinner';
import { AppRouter } from 'app/providers/router';
import { useAppDispatch } from 'shared/lib/hooks';
import { authCheck, getAuthLoading, getIsAuth } from 'entities/LoginCard';

import './App.css';

function App() {
  const dispatch = useAppDispatch();
  const isLoading = useSelector(getAuthLoading);
  const isAuth = useSelector(getIsAuth);
  useEffect(() => {
    dispatch(authCheck());
  }, [dispatch]);
  return (
    <div className="App">
      {isLoading && isAuth ? <Spinner /> : <AppRouter />}
    </div>
  );
}

export default App;
