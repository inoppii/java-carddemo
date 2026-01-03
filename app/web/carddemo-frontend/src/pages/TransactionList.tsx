import React, { useEffect, useState, useCallback } from 'react';
import { 
  Container, Typography, Paper, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Button, Grid, TextField,
  TablePagination, Box, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import TransactionDetailDialog from '../components/TransactionDetailDialog';

interface Transaction {
  transactionId: string;
  transactionType: string;
  amount: number;
  merchantName: string;
  merchantCity: string;
  currency: string;
  transactionDate: string;
  status: string;
}

const TransactionList: React.FC = () => {
  const { accountId } = useParams<{ accountId: string }>();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [totalElements, setTotalElements] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  // フィルタステート
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [type, setType] = useState('');
  const [merchant, setMerchant] = useState('');

  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const fetchTransactions = useCallback(() => {
    if (!accountId) return;

    const params: any = {
      page: page,
      size: rowsPerPage,
      sort: 'transactionDate,desc'
    };

    if (startDate) params.startDate = `${startDate}T00:00:00`;
    if (endDate) params.endDate = `${endDate}T23:59:59`;
    if (type) params.transactionType = type;
    if (merchant) params.merchantName = merchant;

    api.get(`/transactions/account/${accountId}`, { params })
      .then(res => {
        setTransactions(res.data.content);
        setTotalElements(res.data.totalElements);
      })
      .catch(err => console.error(err));
  }, [accountId, page, rowsPerPage, startDate, endDate, type, merchant]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const handleOpen = (tx: Transaction) => {
    setSelectedTx(tx);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedTx(null);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = () => {
    setPage(0);
    fetchTransactions();
  };

  const handleClear = () => {
    setStartDate('');
    setEndDate('');
    setType('');
    setMerchant('');
    setPage(0);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Button onClick={() => navigate('/dashboard')} sx={{ mb: 2 }}>ダッシュボードへ戻る</Button>
      
      <Typography variant="h4" gutterBottom>
        取引履歴
      </Typography>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={3}>
            <TextField
              label="開始日"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="終了日"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <FormControl fullWidth>
              <InputLabel>種別</InputLabel>
              <Select
                value={type}
                label="種別"
                onChange={(e) => setType(e.target.value)}
              >
                <MenuItem value="">すべて</MenuItem>
                <MenuItem value="Purchase">購入</MenuItem>
                <MenuItem value="Payment">支払い</MenuItem>
                <MenuItem value="Cash">現金</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              label="加盟店名"
              fullWidth
              value={merchant}
              onChange={(e) => setMerchant(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button variant="contained" onClick={handleSearch} fullWidth>検索</Button>
              <Button variant="outlined" onClick={handleClear} fullWidth>クリア</Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>日付</TableCell>
              <TableCell>加盟店</TableCell>
              <TableCell>種別</TableCell>
              <TableCell align="right">金額</TableCell>
              <TableCell>ステータス</TableCell>
              <TableCell align="center">操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((tx) => (
              <TableRow key={tx.transactionId}>
                <TableCell>{new Date(tx.transactionDate).toLocaleDateString('ja-JP')}</TableCell>
                <TableCell>{tx.merchantName}</TableCell>
                <TableCell>{tx.transactionType}</TableCell>
                <TableCell align="right">{tx.currency} {tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</TableCell>
                <TableCell>{tx.status}</TableCell>
                <TableCell align="center">
                  <Button size="small" onClick={() => handleOpen(tx)}>詳細</Button>
                </TableCell>
              </TableRow>
            ))}
            {transactions.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">取引履歴が見つかりませんでした。</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalElements}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="表示件数:"
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} / 全 ${count}`}
        />
      </TableContainer>

      <TransactionDetailDialog 
        open={open} 
        onClose={handleClose} 
        transaction={selectedTx} 
      />
    </Container>
  );
};

export default TransactionList;
