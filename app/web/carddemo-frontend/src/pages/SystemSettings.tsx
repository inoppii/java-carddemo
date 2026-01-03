import React, { useEffect, useState, useCallback } from 'react';
import { 
  Container, Typography, Paper, Button, Box, Grid,
  Alert, CircularProgress, Divider, Switch, FormControlLabel,
  Card, CardContent, List, ListItem, ListItemText, ListItemIcon
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import SettingsIcon from '@mui/icons-material/Settings';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import InfoIcon from '@mui/icons-material/Info';
import StorageIcon from '@mui/icons-material/Storage';

const SystemSettings: React.FC = () => {
  const [info, setInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [executing, setExecuting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const navigate = useNavigate();

  const fetchInfo = useCallback(async () => {
    try {
      const res = await api.get('/admin/system-info');
      setInfo(res.data);
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInfo();
  }, [fetchInfo]);

  const handleToggleMaintenance = async (enabled: boolean) => {
    try {
      await api.post('/admin/maintenance-mode', { enabled });
      fetchInfo();
      setMessage({ type: 'success', text: `メンテナンスモードを ${enabled ? '有効' : '無効'} にしました。` });
    } catch (err) {
      setMessage({ type: 'error', text: '設定の変更に失敗しました。' });
    }
  };

  const runJob = async (jobEndpoint: string, jobName: string) => {
    setExecuting(true);
    setMessage(null);
    try {
      const res = await api.post(`/admin/jobs/${jobEndpoint}`);
      setMessage({ type: 'success', text: `${jobName}: ${res.data.message}` });
    } catch (err) {
      setMessage({ type: 'error', text: `${jobName} の実行に失敗しました。` });
    } finally {
      setExecuting(false);
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

      <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <SettingsIcon fontSize="large" color="primary" />
        システム設定・管理
      </Typography>

      {message && (
        <Alert 
          severity={message.type} 
          sx={{ mb: 2 }} 
          onClose={() => setMessage(null)}
        >
          {message.text}
        </Alert>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <InfoIcon />
                システムステータス
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon><StorageIcon /></ListItemIcon>
                  <ListItemText primary="システム状態" secondary={info.status === 'UP' ? '正常稼働中' : info.status} />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem>
                  <ListItemIcon><InfoIcon /></ListItemIcon>
                  <ListItemText primary="バージョン" secondary={info.version} />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem>
                  <ListItemIcon><SettingsIcon /></ListItemIcon>
                  <ListItemText primary="Java バージョン" secondary={info.javaVersion} />
                </ListItem>
              </List>
              
              <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                <FormControlLabel
                  control={
                    <Switch 
                      checked={info.maintenanceMode} 
                      onChange={(e) => handleToggleMaintenance(e.target.checked)} 
                    />
                  }
                  label="メンテナンスモード"
                />
                <Typography variant="caption" display="block" color="text.secondary">
                  有効にすると、一般ユーザーのアクセスが制限されます。
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PlayCircleOutlineIcon />
                バッチ処理・管理操作 (シミュレーション)
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                システム管理タスクを手動で実行します。
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button 
                  variant="outlined" 
                  fullWidth 
                  startIcon={<PlayCircleOutlineIcon />}
                  disabled={executing}
                  onClick={() => runJob('interest-calculation', '利息計算')}
                >
                  利息計算バッチ実行
                </Button>
                
                <Button 
                  variant="outlined" 
                  fullWidth 
                  startIcon={<PlayCircleOutlineIcon />}
                  disabled={executing}
                  onClick={() => runJob('daily-posting', '日次ポスティング')}
                >
                  日次ポスティング実行
                </Button>
                
                {executing && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, justifyContent: 'center' }}>
                    <CircularProgress size={20} />
                    <Typography variant="body2">処理を実行中...</Typography>
                  </Box>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SystemSettings;
