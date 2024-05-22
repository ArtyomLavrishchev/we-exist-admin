export { RegisterOrLoginCard } from './ui/RegisterOrLoginCard';

export { authReducer, authActions } from './model/slice/authSlice';

export { register } from './model/services/register/register';
export { login } from './model/services/login/login';
export { logout } from './model/services/logout/logout';
export { authCheck } from './model/services/authCheck/authCheck';

export { getIsAuth } from './model/selectors/getIsAuth/getIsAuth';
export { getIsAdmin } from './model/selectors/getIsAdmin/getIsAdmin';
export { getAuthToken } from './model/selectors/getAuthToken/getAuthToken';
export { getAuthLoading } from './model/selectors/getAuthLoading/getAuthLoading';

export type {
  ISuccess,
  IAuthSchema,
  IAuthResponse,
  ILoginPayload,
  IRegisterPayload,
  IRefreshResponse,
} from './model/types/auth';
