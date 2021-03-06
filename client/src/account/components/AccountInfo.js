import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import useAuth from 'context/auth';
import InfoBox from './InfoBox/InfoBox';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const AccountInfo = ({ paramUser, isEditing, handleChange }) => {
  const [first, setFirst] = useState(paramUser.first);
  const [last, setLast] = useState(paramUser.last);
  const [email, setEmail] = useState(paramUser.email);

  const [university, setUniversity] = useState(paramUser.university);

  const { user } = useAuth();

  return (
    <div>
      <Grid
        justifyContent="flex-start"
        alignItems="flex-start"
        textAlign="left"
      >
        <Grid container direction="row" sx={{ paddingTop: '15px' }} spacing={1}>
          <Grid item display="inline" id="first" md={6} xs={12}>
            <InfoBox
              isEditing={isEditing}
              property="First name"
              value={first}
              onChange={(e) => setFirst(e.target.value)}
            />
          </Grid>
          <Grid item display="inline" id="last" md={6} xs={12}>
            <InfoBox
              isEditing={isEditing}
              property="Last name"
              value={last}
              onChange={(e) => setLast(e.target.value)}
            />
          </Grid>
          <Grid item display="inline" id="email" xs={12}>
            <InfoBox
              isEditing={isEditing}
              property="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item display="inline" id="university" xs={12}>
            <InfoBox
              isEditing={isEditing}
              property="Institution"
              value={university}
              onChange={(e) => setUniversity(e.target.value)}
            />
            <Box sx={{ display: 'flex', justifyContent: 'right' }}>
              {user._id === paramUser._id && !isEditing ? (
                <Button
                  variant="contained"
                  sx={{
                    color: '#0583D2',
                    mt: '10px',
                    width: '140px',
                    background: 'white',
                    ':hover': {
                      backgroundColor: 'white',
                    },
                  }}
                  onClick={handleChange}
                >
                  Edit Profile
                </Button>
              ) : null}
              {isEditing ? (
                <Button
                  type="submit"
                  variant="contained"
                  onClick={handleChange}
                  sx={{
                    color: '#0583D2',
                    mt: '10px',
                    width: '140px',
                    background: 'white',
                    ':hover': {
                      backgroundColor: 'white',
                    },
                  }}
                >
                  Done
                </Button>
              ) : null}
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default AccountInfo;
