import React, { useEffect, useState, useCallback } from 'react';
import { 
  Container, Typography, Paper, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Button, Box, Chip,
  Alert, CircularProgress, Dialog, DialogTitle, DialogContent,
  DialogContentText, DialogActions
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BlockIcon from '@mui/icons-material/Block';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AutorenewIcon from '@mui/icons-material/Autorenew';

interface Card {
  cardId: number;
  cardNumber: string;
  cardType: string;
  cardStatus: string;
  expirationDate: string;
}

const CardList: React.FC = () => {
  const { accountId } = useParams<{ accountId: string }>();
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const navigate = useNavigate();

  // 確認ダイアログ用
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<{ card: Card, action: string } | null>(null);

  const fetchCards = useCallback(async () => {
    if (!accountId) return;
    try {
      const res = await api.get(`/cards/account/${accountId}`);
      setCards(res.data);
    } catch (err) {
      console.error(err);
      setError('カード情報の取得に失敗しました。');
    } finally {
      setLoading(false);
    }
  }, [accountId]);

  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  const handleActionClick = (card: Card, action: string) => {
    setConfirmAction({ card, action });
    setConfirmOpen(true);
  };

  const handleConfirmAction = async () => {
    if (!confirmAction) return;
    const { card, action } = confirmAction;
    setConfirmOpen(false);
    
    let newStatus = '';
    if (action === 'SUSPEND') newStatus = 'SUSPENDED';
    else if (action === 'ACTIVATE') newStatus = 'ACTIVE';
    else if (action === 'REISSUE') newStatus = 'REISSUE_REQ';

    try {
      await api.put(`/cards/${card.cardId}`, { ...card, cardStatus: newStatus });
      setMessage({ type: 'success', text: 'リクエストを処理しました。' });
      fetchCards();
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: 'エラーが発生しました。' });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case 'ACTIVE': return 'success';
      case 'SUSPENDED': return 'error';
      case 'REISSUE_REQ': return 'warning';
      default: return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status.toUpperCase()) {
      case 'ACTIVE': return '有効';
      case 'SUSPENDED': return '一時停止中';
      case 'REISSUE_REQ': return '再発行申請中';
      default: return status;
    }
  };

  if (loading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
      <CircularProgress />
    </Box>
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Button 
        startIcon={<ArrowBackIcon />} 
        onClick={() => navigate('/dashboard')} 
        sx={{ mb: 2 }}
      >
        ダッシュボードへ戻る
      </Button>

      <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <CreditCardIcon fontSize="large" color="primary" />
        カード管理
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {message && (
        <Alert 
          severity={message.type} 
          sx={{ mb: 2 }} 
          onClose={() => setMessage(null)}
        >
          {message.text}
        </Alert>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>カード番号</TableCell>
              <TableCell>種別</TableCell>
              <TableCell>有効期限</TableCell>
              <TableCell>ステータス</TableCell>
              <TableCell align="center">操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cards.map((card) => (
              <TableRow key={card.cardId}>
                <TableCell sx={{ fontFamily: 'monospace', fontWeight: 'bold' }}>
                  {card.cardNumber.replace(/\d(?=\d{4})/g, "*")}
                </TableCell>
                <TableCell>{card.cardType}</TableCell>
                <TableCell>{card.expirationDate}</TableCell>
                <TableCell>
                  <Chip 
                    label={getStatusLabel(card.cardStatus)} 
                    color={getStatusColor(card.cardStatus) as any} 
                    size="small"
                  />
                </TableCell>
                <TableCell align="center">
                  <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                    {card.cardStatus === 'ACTIVE' ? (
                      <Button 
                        variant="outlined" 
                        color="error" 
                        size="small" 
                        startIcon={<BlockIcon />}
                        onClick={() => handleActionClick(card, 'SUSPEND')}
                      >
                        一時停止
                      </Button>
                    ) : card.cardStatus === 'SUSPENDED' ? (
                      <Button 
                        variant="outlined" 
                        color="success" 
                        size="small" 
                        startIcon={<CheckCircleOutlineIcon />}
                        onClick={() => handleActionClick(card, 'ACTIVATE')}
                      >
                        利用再開
                      </Button>
                    ) : null}
                    
                    <Button 
                      variant="outlined" 
                      color="primary" 
                      size="small" 
                      startIcon={<AutorenewIcon />}
                      onClick={() => handleActionClick(card, 'REISSUE')}
                      disabled={card.cardStatus === 'REISSUE_REQ'}
                    >
                      再発行申請
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
            {cards.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">登録されているカードはありません。</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* 確認ダイアログ */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>
          {confirmAction?.action === 'SUSPEND' ? 'カードの一時停止' : 
           confirmAction?.action === 'ACTIVATE' ? 'カードの利用再開' : 
           'カードの再発行申請'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {confirmAction?.action === 'SUSPEND' ? 'このカードを一時停止しますか？停止中はすべての取引が拒否されます。' : 
             confirmAction?.action === 'ACTIVATE' ? 'このカードの利用を再開しますか？' : 
             'カードの再発行を申請しますか？新しいカード番号が発行されます。'}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>キャンセル</Button>
          <Button onClick={handleConfirmAction} variant="contained" autoFocus>
            実行する
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CardList;
