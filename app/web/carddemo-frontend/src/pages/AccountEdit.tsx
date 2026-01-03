import React, { useEffect, useState } from 'react';
import { Container, Typography, Paper, TextField, Button, Box, MenuItem, Alert } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

const AccountEdit: React.FC = () => {
  const { accountId } = useParams<{ accountId: string }>();
  const [account, setAccount] = useState<any>(null);
  const [limit, setLimit] = useState('');
  const [status, setStatus] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (accountId) {
      api.get(`/accounts/${accountId}`).then(res => {
        setAccount(res.data);
        setLimit(res.data.creditLimit.toString());
        setStatus(res.data.accountStatus);
      });
    }
  }, [accountId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.put(`/accounts/${accountId}`, {
        ...account,
        creditLimit: parseFloat(limit),
        accountStatus: status
      });
      setSuccess(true);
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (err) {
      console.error(err);
    }
  };

  if (!account) return <Typography>Loading...</Typography>;

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>Edit Account: {account.accountNumber}</Typography>
        {success && <Alert severity="success" sx={{ mb: 2 }}>Account updated successfully! Redirecting...</Alert>}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Credit Limit"
            type="number"
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            select
            label="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            margin="normal"
          >
            <MenuItem value="ACTIVE">ACTIVE</MenuItem>
            <MenuItem value="CLOSED">CLOSED</MenuItem>
            <MenuItem value="SUSPENDED">SUSPENDED</MenuItem>
          </TextField>
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="outlined" onClick={() => navigate('/dashboard')}>Cancel</Button>
            <Button variant="contained" type="submit">Save Changes</Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default AccountEdit;
