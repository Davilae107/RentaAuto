import React, { useState } from 'react';
import { Box, Paper, TextField, Button, Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom'


const handlesignupClick = () => {
    navigate('/signup')
  }

interface LoginProps {
    onLogin?: (username: string, password: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!username || !password) {
            setError('Please enter both username and password.');
            return;
        }
        setError('');
        if (onLogin) {
            onLogin(username, password);
        }
        // Add your authentication logic here
    };

    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#f5f5f5' }}>
            <Paper elevation={6} sx={{ p: 4, width: 350, borderRadius: 3 }}>
                <Typography variant="h5" align="center" gutterBottom>
                    Iniciar Sesión
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                    <TextField
                        label="Usuario"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        autoFocus
                    />
                    <TextField
                        label="Contraseña"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    {error && (
                        <Typography color="error" sx={{ mt: 1, mb: 1 }}>
                            {error}
                        </Typography>
                    )}
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Entrar
                    </Button>
                    <Box sx={{ mt: 3, textAlign: 'center' }}>
                        <Link component={RouterLink} to="/signup" underline="hover">
                            ¿No tienes una cuenta? Crea una
                        </Link>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
};

export default Login;