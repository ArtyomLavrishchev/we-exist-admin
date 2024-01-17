import LoginPage from 'pages/LoginPage';
import { MainPage } from 'pages/MainPage';
import { AccountPage } from 'pages/AccountPage';
import { ProfilePage } from 'pages/ProfilePage';
import { NotFoundPage } from 'pages/NotFoundPage';
import { AccountsPage } from 'pages/AccountsPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Navigation, ProtectedRoutes } from 'app/providers/router';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <div className="content">
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoutes>
                <Navigation />
              </ProtectedRoutes>
            }
          >
            <Route index element={<MainPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="/accounts">
              <Route path="" element={<AccountsPage />} />
              <Route path=":accountName" element={<AccountPage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Route>
          <Route path="login" element={<LoginPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default AppRouter;
