import React, { useEffect, useState } from 'react';
import { Box, Typography, Container, Grid, Card, CardContent, Divider, List, ListItem, ListItemText, Paper } from '@mui/material';
import api from '../services/api';

const Dashboard: React.FC = () => {
  const [accounts, setAccounts] = useState<any[]>([]);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    // Demo: Load first 10 accounts
    api.get('/accounts/customer/1').then(res => {
        setAccounts(res.data);
    }).catch(err => console.error(err));
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Welcome, {user.username}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" color="primary" gutterBottom>
              My Accounts
            </Typography>
            <List>
              {accounts.map((acc) => (
                <React.Fragment key={acc.accountId}>
                  <ListItem>
                    <ListItemText 
                        primary={`Account No: ${acc.accountNumber}`} 
                        secondary={`Balance: $${acc.balance} | Limit: $${acc.creditLimit}`} 
                    />
                    <Typography variant="body2" color={acc.accountStatus === 'ACTIVE' ? 'success.main' : 'error'}>
                        {acc.accountStatus}
                    </Typography>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
              {accounts.length === 0 && <Typography variant="body2">No accounts found.</Typography>}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: 'primary.main', color: 'white' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              <Typography variant="body2">
                - View Transactions<br/>
                - Request Credit Increase<br/>
                - Report Lost Card
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
