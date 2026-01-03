import React, { useEffect, useState } from 'react';
import { 
  Container, Typography, Paper, TextField, Button, 
  Box, MenuItem, Alert, Grid, Divider, CircularProgress
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';

const AccountEdit: React.FC = () => {
  const { accountId } = useParams<{ accountId: string }>();
  const [account, setAccount] = useState<any>(null);
  const [customer, setCustomer] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (!accountId) return;
      try {
        const accRes = await api.get(`/accounts/${accountId}`);
        setAccount(accRes.data);
        
        const custRes = await api.get(`/customers/${accRes.data.customerId}`);
        setCustomer(custRes.data);
      } catch (err) {
        console.error(err);
        setError('データの読み込みに失敗しました。');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [accountId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);
    setError(null);
    try {
      // アカウント情報の更新 (限度額、ステータス)
      await api.put(`/accounts/${accountId}`, account);
      
      // 顧客情報の更新 (住所、連絡先)
      await api.put(`/customers/${account.customerId}`, customer);
      
      setSuccess(true);
      window.scrollTo(0, 0);
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (err) {
      console.error(err);
      setError('更新に失敗しました。入力内容を確認してください。');
    }
  };

  if (loading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
      <CircularProgress />
    </Box>
  );

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Button 
        startIcon={<ArrowBackIcon />} 
        onClick={() => navigate('/dashboard')} 
        sx={{ mb: 2 }}
      >
        ダッシュボードへ戻る
      </Button>

      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          アカウント・登録情報変更
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          口座の設定変更および、ご登録住所・連絡先の変更を承ります。
        </Typography>

        {success && <Alert severity="success" sx={{ mb: 2 }}>情報を更新しました。ダッシュボードへ戻ります...</Alert>}
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <Box component="form" onSubmit={handleSubmit}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            口座設定 (アカウントID: {account.accountNumber})
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="与信限度額"
                type="number"
                value={account.creditLimit}
                onChange={(e) => setAccount({ ...account, creditLimit: parseFloat(e.target.value) })}
                margin="normal"
                helperText="新しい限度額を入力してください"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="口座ステータス"
                value={account.accountStatus}
                onChange={(e) => setAccount({ ...account, accountStatus: e.target.value })}
                margin="normal"
              >
                <MenuItem value="ACTIVE">有効 (ACTIVE)</MenuItem>
                <MenuItem value="CLOSED">解約 (CLOSED)</MenuItem>
                <MenuItem value="SUSPENDED">停止 (SUSPENDED)</MenuItem>
              </TextField>
            </Grid>
          </Grid>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h6" gutterBottom>
            お客様登録情報 (住所・連絡先)
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="郵便番号"
                value={customer.zipCode || ''}
                onChange={(e) => setCustomer({ ...customer, zipCode: e.target.value })}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="都道府県"
                value={customer.state || ''}
                onChange={(e) => setCustomer({ ...customer, state: e.target.value })}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="市区町村"
                value={customer.city || ''}
                onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="住所（番地・建物名）"
                value={customer.address || ''}
                onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="電話番号"
                value={customer.phoneNumber || ''}
                onChange={(e) => setCustomer({ ...customer, phoneNumber: e.target.value })}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="メールアドレス"
                type="email"
                value={customer.email || ''}
                onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                margin="normal"
              />
            </Grid>
          </Grid>

          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button variant="outlined" onClick={() => navigate('/dashboard')}>
              キャンセル
            </Button>
            <Button 
              variant="contained" 
              type="submit" 
              startIcon={<SaveIcon />}
              size="large"
            >
              変更を保存する
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default AccountEdit;
