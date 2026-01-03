import React, { useEffect, useState } from 'react';
import { Box, Typography, Container, Grid, Card, CardContent, Divider, List, ListItem, ListItemText, Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Dashboard: React.FC = () => {
  const [accounts, setAccounts] = useState<any[]>([]);
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const navigate = useNavigate();

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
                  <ListItem 
                    secondaryAction={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Button variant="outlined" size="small" sx={{ mr: 1 }} onClick={() => navigate(`/transactions/${acc.accountId}`)}>
                          History
                        </Button>
                        <Button variant="outlined" size="small" color="secondary" onClick={() => navigate(`/accounts/edit/${acc.accountId}`)}>
                          Edit
                        </Button>
                      </Box>
                    }
                  >
                    <ListItemText 
                        primary={`Account No: ${acc.accountNumber}`} 
                        secondary={
                          <React.Fragment>
                            <Typography component="span" variant="body2" color="text.primary">
                              Balance: ${acc.balance} | Limit: ${acc.creditLimit}
                            </Typography>
                            <br />
                            <Typography component="span" variant="caption" color={acc.accountStatus === 'ACTIVE' ? 'success.main' : 'error'} fontWeight="bold">
                              Status: {acc.accountStatus}
                            </Typography>
                          </React.Fragment>
                        }
                    />
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
