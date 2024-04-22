// ========================================================================
// UI FORMS
// ========================================================================
// Signup
export type SignupFormData = {
  name: string;
  email: string;
  phone: string;
  phone_valid: boolean;
  password: string;
  error: {
    name: string | null;
    email: string | null;
    phone: string | null;
    password: string | null;
  };
};
export type phoneHandler = (phone: string, phone_valid: boolean) => void;

// Login
export type LoginFormData = {
  email: string;
  password: string;
  error: {
    email: string | null;
    password: string | null;
  };
};

// Email Verification
export type EmailVerificationFormData = {
  verification_code: string;
  error: {
    verification_code: string | null;
  };
};
export type EmailVerificationPurpose = 'SIGNUP_VERIFICATION' | 'EMAIL_VERIFICATION';

// Send Code
export type SendCodeFormData = {
  email: string;
  error: {
    email: string | null;
  };
};
export type SendCodePurpose = 'EMAIL_VERIFICATION' | 'RESET_PASSWORD';

// Reset Password
export type ResetPasswordFormData = {
  verification_code: string;
  password: string,
  error: {
    verification_code: string | null;
    password: string | null;
  };
};


// ========================================================================
// UTILS
// ========================================================================
export interface ReturnTypeValidationFunction {
  // If error is null it means it is valid, otherwise it is invalid and we will also get error
  error: string | null,
}

// ========================================================================
// CONTEXT API
// ========================================================================

export interface ActionType {
  type: string,
  payload?: any,
}

// Auth
export interface User {
  email: string,
}
export interface UpdateUserInput {
  username?: string,
  email?: string,
}
export interface AuthInitialState {
  user: User | null,
  loading: boolean,
  set_auth_loading?: (value: boolean) => void,
  update_user?: (user: UpdateUserInput) => void,
}

// Alerts
export enum AlertType {
  SUCCESS = 'success',
  ERROR = 'error',
  INFO = 'info',
  WARNING = 'warning',
  LOADING = 'loading'
}
export interface Alert {
  id: string,
  type: AlertType,
  message: string
}
export interface AlertInput {
  type: AlertType,
  message: string
}
export interface AlertInitialState {
  alerts: Alert[],
  add_alert?: (alert: AlertInput) => void,
  clear_alert?: (id: string) => void,
  clear_alert_state?: () => void,
}
