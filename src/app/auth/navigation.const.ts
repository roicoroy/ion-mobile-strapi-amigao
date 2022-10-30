export type AppAuthRoutes = {
    login?: string;
    logout?: string;
    register?: string;
    requestPassword?: string;
    resetPassword?: string;
    loginRedirect?: string;
    logoutRedirect?: string;
    requestPasswordRedirect?: string;
    profile?: string;
};

export const authFlow = 'auth/';

export const AUTH_ROUTES: AppAuthRoutes = {
    login: 'login',
    logout: 'logout',
    register: 'register',
    requestPassword: 'request-password',
    resetPassword: 'reset-password',
    loginRedirect: '/',
    logoutRedirect: 'login',
    requestPasswordRedirect: 'login',
    profile: '/profile'
};
