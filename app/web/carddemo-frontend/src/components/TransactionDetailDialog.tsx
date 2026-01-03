import React from 'react';
import { 
  Dialog, DialogTitle, DialogContent, DialogActions, 
  Button, Grid, Typography, Divider, Box, Chip
} from '@mui/material';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import StoreIcon from '@mui/icons-material/Store';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PaidIcon from '@mui/icons-material/Paid';

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

interface Props {
  open: boolean;
  onClose: () => void;
  transaction: Transaction | null;
}

const TransactionDetailDialog: React.FC<Props> = ({ open, onClose, transaction }) => {
  if (!transaction) return null;

  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case 'COMPLETED': return 'success';
      case 'PENDING': return 'warning';
      case 'FAILED': return 'error';
      default: return 'default';
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <ReceiptLongIcon color="primary" />
        取引詳細
      </DialogTitle>
      <DialogContent dividers>
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" color="primary" fontWeight="bold">
            {transaction.currency} {transaction.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </Typography>
          <Chip 
            label={transaction.status} 
            color={getStatusColor(transaction.status) as any} 
            variant="outlined" 
          />
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
              <StoreIcon color="action" />
              <Box>
                <Typography variant="caption" color="text.secondary">加盟店情報</Typography>
                <Typography variant="body1" fontWeight="medium">{transaction.merchantName}</Typography>
                <Typography variant="body2" color="text.secondary">{transaction.merchantCity}</Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <AccessTimeIcon color="action" />
              <Box>
                <Typography variant="caption" color="text.secondary">取引日時</Typography>
                <Typography variant="body2">{new Date(transaction.transactionDate).toLocaleString('ja-JP')}</Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <PaidIcon color="action" />
              <Box>
                <Typography variant="caption" color="text.secondary">取引種別</Typography>
                <Typography variant="body2">{transaction.transactionType}</Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
              <Typography variant="caption" color="text.secondary">取引ID</Typography>
              <Typography variant="body2" sx={{ wordBreak: 'break-all', fontFamily: 'monospace' }}>
                {transaction.transactionId}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained">閉じる</Button>
      </DialogActions>
    </Dialog>
  );
};

export default TransactionDetailDialog;
