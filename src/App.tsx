import { useState } from 'react';

import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import '@fontsource/poppins/300.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/700.css';

import { WithAuth } from '~/layouts';
import {
  CivilService,
  EducationalForm,
  EmployeeDetails,
  EmployeeList,
  FamilyBg,
  ForgotPassword,
  Login,
  LoyaltyPay,
  NotFound,
  OrganizationForm,
  OtherInfo,
  PersonalInfo,
  Promotions,
  SignUp,
  StepIncrement,
  TrainingProg,
  WorkExperience,
} from '~/pages';
import CustomTheme from '~/theme';
import { IPage } from '~/types';

const Pages: IPage[] = [
  { path: '/', Component: Login, requireAuth: false, requireAdmin: false },
  {
    path: '/sign-up',
    Component: SignUp,
    requireAuth: false,
    requireAdmin: false,
  },
  {
    path: '/forgot-password',
    Component: ForgotPassword,
    requireAuth: false,
    requireAdmin: false,
  },
  {
    path: '/employee-list',
    Component: EmployeeList,
    requireAuth: true,
    requireAdmin: false,
  },
  {
    path: '/step-increment',
    Component: StepIncrement,
    requireAuth: true,
    requireAdmin: false,
  },
  {
    path: '/promotions',
    Component: Promotions,
    requireAuth: false,
    requireAdmin: false,
  },
  {
    path: '/loyalty-pay',
    Component: LoyaltyPay,
    requireAuth: false,
    requireAdmin: false,
  },
  { path: '*', Component: NotFound, requireAuth: false, requireAdmin: false },
  {
    path: '/personal-info',
    Component: PersonalInfo,
    requireAuth: false,
    requireAdmin: false,
  },

  {
    path: '/family-bg',
    Component: FamilyBg,
    requireAuth: false,
    requireAdmin: false,
  },
  {
    path: '/educational-form',
    Component: EducationalForm,
    requireAuth: false,
    requireAdmin: false,
  },
  {
    path: '/civil-service',
    Component: CivilService,
    requireAuth: false,
    requireAdmin: false,
  },
  {
    path: '/work-experience',
    Component: WorkExperience,
    requireAuth: false,
    requireAdmin: false,
  },
  {
    path: '/organization-form',
    Component: OrganizationForm,
    requireAuth: false,
    requireAdmin: false,
  },
  {
    path: '/training-prog',
    Component: TrainingProg,
    requireAuth: false,
    requireAdmin: false,
  },
  {
    path: '/other-info',
    Component: OtherInfo,
    requireAuth: false,
    requireAdmin: false,
  },
  {
    path: '/employee-details',
    Component: EmployeeDetails,
    requireAuth: false,
    requireAdmin: false,
  },
];

function App() {
  const [darkMode, setDarkMode] = useState<boolean>(
    localStorage.getItem('darkMode') === null
      ? true
      : localStorage.getItem('darkMode') === 'true'
      ? true
      : false
  );

  const clientId =
    (import.meta as any).env.VITE_APP_PAYPAL_CLIENT_ID ||
    'AXv0bXQgDlWJJvvsO_7aBxSlwoByie-N9ROT2qtLE9eBeDKZRxuC4C5uSRXh2xDDoAktahoUTGexmPqC';
  const theme = darkMode ? CustomTheme.darkTheme : CustomTheme.lightTheme;

  const toggleTheme = () => {
    setDarkMode((curr) => {
      localStorage.setItem('darkMode', JSON.stringify(!curr));
      return !curr;
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <PayPalScriptProvider options={{ clientId }}>
        <Router>
          <Routes>
            {Pages.map(({ path, Component, requireAuth, requireAdmin }) => (
              <Route
                key={path}
                path={path}
                element={
                  requireAuth ? (
                    <WithAuth
                      requireAdmin={requireAdmin}
                      Component={Component}
                    />
                  ) : (
                    <Component darkMode={darkMode} toggleTheme={toggleTheme} />
                  )
                }
              />
            ))}
          </Routes>
        </Router>
      </PayPalScriptProvider>
    </ThemeProvider>
  );
}

export default App;
