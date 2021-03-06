import React from 'react';
import ReactDOM from 'react-dom/client';
import 'index.css';
import App from 'App';
import { ThemeProvider } from '@mui/material/styles';
import theme from 'theme/theme';

import PageLayout from 'components/PageLayout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from 'home/SignUp';
import Login from 'home/Login';
import Landing from 'landing/Landing';
import Calendar from 'calendar/Calendar';
import ForgotPassword from 'home/ForgotPassword';
import About from 'about/About';
import RequireAuth from 'components/RequireAuth';
import LoginWrap from 'components/LoginWrap';
import Account from 'account/Account';
import { AuthProvider } from 'context/auth';
import { FeedbackProvider } from 'context/feedback';
import { SocketProvider } from 'context/socket';
import { CalendarProvider } from 'context/calendar';

if (process.env.NODE_ENV !== 'development') {
  console.log = () => {};
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <SocketProvider>
        <AuthProvider>
          <FeedbackProvider>
            <Routes>
              <Route path="/" element={<App />}>
                <Route element={<PageLayout />}>
                  <Route index element={<Landing />} />
                  <Route
                    path="login"
                    element={
                      <LoginWrap>
                        <Login />
                      </LoginWrap>
                    }
                  />
                  <Route
                    path="signup"
                    element={
                      <LoginWrap>
                        <SignUp />
                      </LoginWrap>
                    }
                  />
                  <Route path="forgotpassword" element={<ForgotPassword />} />
                  <Route
                    path="calendar"
                    element={
                      <RequireAuth>
                        <CalendarProvider>
                          <Calendar />
                        </CalendarProvider>
                      </RequireAuth>
                    }
                  />
                  <Route
                    path="account/:id"
                    element={
                      <RequireAuth>
                        <Account />
                      </RequireAuth>
                    }
                  />
                  <Route path="about" element={<About />} />
                </Route>
              </Route>
            </Routes>
          </FeedbackProvider>
        </AuthProvider>
      </SocketProvider>
    </BrowserRouter>
  </ThemeProvider>
);
