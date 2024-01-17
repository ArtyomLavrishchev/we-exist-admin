export { LoginCard } from './ui/LoginCard';

export { authReducer, authActions } from './model/slice/authSlice';

export { registerOrLogin } from './model/services/login/registerOrLogin';
export { logout } from './model/services/logout/logout';
export { authCheck } from './model/services/authCheck/authCheck';
export { loadInitialData } from './model/services/loadInitialData/loadInitialData';

export { getIsAuth } from './model/selectors/getIsAuth/getIsAuth';
export { getAuthLoading } from './model/selectors/getAuthLoading/getAuthLoading';

export type {
  ISuccess,
  IAuthSchema,
  IAuthResponse,
  ILoginPayload,
  IRefreshResponse,
} from './model/types/auth';
