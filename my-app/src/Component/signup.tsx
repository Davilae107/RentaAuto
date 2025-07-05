import React, { useState } from 'react';
import { Box, Paper, TextField, Button, Typography, Link, InputLabel, FormControl, OutlinedInput } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Signup: React.FC = () => {
  const [form, setForm] = useState({
    nombres: '',
    apellidos: '',
    telefono: '',
    direccion: '',
    password: '',
    confirmPassword: '',
  });
  const [docIdentidad, setDocIdentidad] = useState<File | null>(null);
  const [carnetConducir, setCarnetConducir] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setter: (f: File | null) => void) => {
    const file = e.target.files && e.target.files[0];
    if (file && !['image/jpeg', 'image/png'].includes(file.type)) {
      setError('Solo se permiten imágenes JPG o PNG.');
      setter(null);
      return;
    }
    setter(file || null);
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    // Validaciones básicas
    if (!form.nombres || !form.apellidos || !form.telefono || !form.direccion || !form.password || !form.confirmPassword || !docIdentidad || !carnetConducir) {
      setError('Por favor, completa todos los campos y sube los archivos requeridos.');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }
    setSuccess('¡Registro exitoso!');
    // Aquí iría la lógica para enviar los datos al backend
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#f5f5f5' }}>
      <Paper elevation={6} sx={{ p: 4, width: 400, borderRadius: 3 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Crear cuenta
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            label="Nombres"
            name="nombres"
            variant="outlined"
            fullWidth
            margin="normal"
            value={form.nombres}
            onChange={handleChange}
            required
          />
          <TextField
            label="Apellidos"
            name="apellidos"
            variant="outlined"
            fullWidth
            margin="normal"
            value={form.apellidos}
            onChange={handleChange}
            required
          />
          <TextField
            label="Número de teléfono"
            name="telefono"
            variant="outlined"
            fullWidth
            margin="normal"
            value={form.telefono}
            onChange={handleChange}
            required
          />
          <TextField
            label="Dirección"
            name="direccion"
            variant="outlined"
            fullWidth
            margin="normal"
            value={form.direccion}
            onChange={handleChange}
            required
          />
          <Box sx={{ mt: 2 }}>
            <InputLabel>Documento de identidad (JPG o PNG)</InputLabel>
            <OutlinedInput
              type="file"
              inputProps={{ accept: 'image/jpeg,image/png' }}
              onChange={e => handleFileChange(e, setDocIdentidad)}
              fullWidth
            />
            {docIdentidad && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                Archivo seleccionado: {docIdentidad.name}
              </Typography>
            )}
          </Box>
          <Box sx={{ mt: 2 }}>
            <InputLabel>Carnet de conducir (JPG o PNG)</InputLabel>
            <OutlinedInput
              type="file"
              inputProps={{ accept: 'image/jpeg,image/png' }}
              onChange={e => handleFileChange(e, setCarnetConducir)}
              fullWidth
            />
            {carnetConducir && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                Archivo seleccionado: {carnetConducir.name}
              </Typography>
            )}
          </Box>
          <TextField
            label="Contraseña"
            name="password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={form.password}
            onChange={handleChange}
            required
          />
          <TextField
            label="Confirmar contraseña"
            name="confirmPassword"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />
          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
          {success && (
            <Typography color="primary" sx={{ mt: 2 }}>
              {success}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
          >
            Crear cuenta
          </Button>
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Link component={RouterLink} to="/login" underline="hover">
              ¿Ya tienes una cuenta? Inicia sesión
            </Link>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Signup;
