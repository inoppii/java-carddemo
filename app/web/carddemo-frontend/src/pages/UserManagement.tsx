import React, { useEffect, useState, useCallback } from 'react';
import { 
  Container, Typography, Paper, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Button, Box, Chip,
  Alert, CircularProgress, IconButton, Dialog, DialogTitle,
  DialogContent, DialogActions, TextField, MenuItem, Switch,
  FormControlLabel
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import PeopleIcon from '@mui/icons-material/People';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

interface AppUser {
  userId: string;
  role: string;
  isActive: boolean;
  lastLogin: string | null;
  createdAt: string;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<AppUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const navigate = useNavigate();

  // 新規ユーザーダイアログ用
  const [open, setOpen] = useState(false);
  const [newUser, setNewUser] = useState({ userId: '', passwordHash: '', role: 'USER' });

  const fetchUsers = useCallback(async () => {
    try {
      const res = await api.get('/users');
      setUsers(res.data);
    } catch (err: any) {
      console.error(err);
      if (err.response?.status === 403) {
        setError('アクセス権限がありません（管理者のみ）。');
      } else {
        setError('ユーザー情報の取得に失敗しました。');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleToggleActive = async (userId: string) => {
    try {
      await api.patch(`/users/${userId}/toggle-active`);
      fetchUsers();
    } catch (err) {
      setMessage({ type: 'error', text: 'ステータスの更新に失敗しました。' });
    }
  };

  const handleDelete = async (userId: string) => {
    if (!window.confirm(`ユーザー ${userId} を削除してもよろしいですか？`)) return;
    try {
      await api.delete(`/users/${userId}`);
      setMessage({ type: 'success', text: 'ユーザーを削除しました。' });
      fetchUsers();
    } catch (err) {
      setMessage({ type: 'error', text: '削除に失敗しました。' });
    }
  };

  const handleCreate = async () => {
    try {
      await api.post('/users', newUser);
      setOpen(false);
      setNewUser({ userId: '', passwordHash: '', role: 'USER' });
      setMessage({ type: 'success', text: 'ユーザーを作成しました。' });
      fetchUsers();
    } catch (err) {
      setMessage({ type: 'error', text: '作成に失敗しました。' });
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

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <PeopleIcon fontSize="large" color="primary" />
          ユーザー管理
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<PersonAddIcon />}
          onClick={() => setOpen(true)}
        >
          新規ユーザー追加
        </Button>
      </Box>

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
              <TableCell>ユーザーID</TableCell>
              <TableCell>ロール</TableCell>
              <TableCell>ステータス</TableCell>
              <TableCell>最終ログイン</TableCell>
              <TableCell>作成日</TableCell>
              <TableCell align="center">有効/無効</TableCell>
              <TableCell align="center">操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((u) => (
              <TableRow key={u.userId}>
                <TableCell sx={{ fontWeight: 'bold' }}>{u.userId}</TableCell>
                <TableCell>
                  <Chip label={u.role} color={u.role === 'ADMIN' ? 'secondary' : 'default'} size="small" />
                </TableCell>
                <TableCell>
                  {u.isActive ? (
                    <Chip label="有効" color="success" variant="outlined" size="small" />
                  ) : (
                    <Chip label="無効" color="error" variant="outlined" size="small" />
                  )}
                </TableCell>
                <TableCell variant="body2" color="text.secondary">
                  {u.lastLogin ? new Date(u.lastLogin).toLocaleString('ja-JP') : '-'}
                </TableCell>
                <TableCell variant="body2" color="text.secondary">
                  {new Date(u.createdAt).toLocaleDateString('ja-JP')}
                </TableCell>
                <TableCell align="center">
                  <Switch 
                    checked={u.isActive} 
                    onChange={() => handleToggleActive(u.userId)}
                    color="success"
                  />
                </TableCell>
                <TableCell align="center">
                  <IconButton color="error" onClick={() => handleDelete(u.userId)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* 新規ユーザー追加ダイアログ */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>新規ユーザー追加</DialogTitle>
        <DialogContent sx={{ minWidth: 400 }}>
          <TextField
            fullWidth
            label="ユーザーID"
            margin="normal"
            value={newUser.userId}
            onChange={(e) => setNewUser({ ...newUser, userId: e.target.value })}
          />
          <TextField
            fullWidth
            label="パスワード"
            type="password"
            margin="normal"
            value={newUser.passwordHash}
            onChange={(e) => setNewUser({ ...newUser, passwordHash: e.target.value })}
          />
          <TextField
            fullWidth
            select
            label="ロール"
            margin="normal"
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          >
            <MenuItem value="USER">USER (一般ユーザー)</MenuItem>
            <MenuItem value="ADMIN">ADMIN (管理者)</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>キャンセル</Button>
          <Button onClick={handleCreate} variant="contained">作成する</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default UserManagement;
