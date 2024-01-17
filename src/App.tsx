import { useSelector } from 'react-redux';
import { Spinner } from 'shared/ui/Spinner';
import { AppRouter } from 'app/providers/router';
import { getAuthLoading, getIsAuth } from 'entities/LoginCard';

import './App.css';

function App() {
  const isLoading = useSelector(getAuthLoading);
  const isAuth = useSelector(getIsAuth);
  // useEffect(() => {
  //   dispatch(authCheck());
  // }, [dispatch]);
  return (
    <div className="App">
      {isLoading && isAuth ? <Spinner /> : <AppRouter />}
    </div>
  );
}

export default App;
