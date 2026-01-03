import React, { useEffect, useState } from 'react';
import { 
  Box, Typography, Container, Grid, Card, CardContent, 
  Divider, List, ListItem, ListItemText, Paper, Button, Chip 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import HistoryIcon from '@mui/icons-material/History';
import EditIcon from '@mui/icons-material/Edit';

const Dashboard: React.FC = () => {
  const [accounts, setAccounts] = useState<any[]>([]);
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const navigate = useNavigate();

  useEffect(() => {
    // デモ用: 顧客ID 1 の口座を取得
    api.get('/accounts/customer/1').then(res => {
        setAccounts(res.data);
    }).catch(err => console.error(err));
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        ようこそ、{user.username} 様
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
              <AccountBalanceWalletIcon color="primary" />
              <Typography variant="h6" color="primary">
                保有口座一覧
              </Typography>
            </Box>
            <List>
              {accounts.map((acc) => (
                <React.Fragment key={acc.accountId}>
                  <ListItem 
                    sx={{ py: 2 }}
                    secondaryAction={
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Button 
                            variant="outlined" 
                            size="small" 
                            startIcon={<HistoryIcon />}
                            onClick={() => navigate(`/transactions/${acc.accountId}`)}
                          >
                            取引履歴
                          </Button>
                          <Button 
                            variant="outlined" 
                            size="small" 
                            color="secondary" 
                            startIcon={<EditIcon />}
                            onClick={() => navigate(`/accounts/edit/${acc.accountId}`)}
                          >
                            情報変更
                          </Button>
                        </Box>
                        <Button 
                          variant="contained" 
                          size="small" 
                          color="info" 
                          startIcon={<CreditCardIcon />}
                          onClick={() => navigate(`/cards/${acc.accountId}`)}
                        >
                          カード管理
                        </Button>
                      </Box>
                    }
                  >
                    <ListItemText 
                        primary={
                          <Typography variant="subtitle1" fontWeight="bold">
                            口座番号: {acc.accountNumber}
                          </Typography>
                        } 
                        secondary={
                          <Box sx={{ mt: 1 }}>
                            <Typography component="span" variant="body1" color="text.primary">
                              残高: ¥{parseFloat(acc.balance).toLocaleString()} | 限度額: ¥{parseFloat(acc.creditLimit).toLocaleString()}
                            </Typography>
                            <Box sx={{ mt: 1 }}>
                              <Chip 
                                label={acc.accountStatus === 'ACTIVE' ? '有効' : acc.accountStatus} 
                                color={acc.accountStatus === 'ACTIVE' ? 'success' : 'error'} 
                                size="small"
                                variant="outlined"
                              />
                            </Box>
                          </Box>
                        }
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
              {accounts.length === 0 && <Typography variant="body2" sx={{ p: 2 }}>口座情報が見つかりませんでした。</Typography>}
            </List>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: 'primary.main', color: 'white', mb: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                クイックアクション
              </Typography>
              <Typography variant="body2" component="div">
                <ul>
                  <li>取引履歴の確認</li>
                  <li>限度額引き上げ申請</li>
                  <li>カードの紛失・盗難連絡</li>
                  <li>登録住所の変更</li>
                </ul>
              </Typography>
            </CardContent>
          </Card>
          
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle2" gutterBottom color="text.secondary">
              お知らせ
            </Typography>
            <Typography variant="body2">
              システムメンテナンスのお知らせ (2026/02/01)
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
