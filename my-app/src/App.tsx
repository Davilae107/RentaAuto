import { useState } from 'react'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import './App.css'

type Renta = {
  id: number
  cliente: string
  vehiculo: string
  fechaInicio: string
  fechaFin: string
  total: number
}

type Columna<T> = {
  key: keyof T
  header: string
  render?: (value: any, row: T) => React.ReactNode
}

function Tabla<T>({ data, columnas, onEdit, onDelete }: {
  data: T[];
  columnas: Columna<T>[];
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
}) {
  return (
    <TableContainer component={Paper} sx={{ mt: 3 }} className="tabla-responsive">
      <Table>
        <TableHead>
          <TableRow>
            {columnas.map((col) => (
              <TableCell key={String(col.key)}>{col.header}</TableCell>
            ))}
            {(onEdit || onDelete) && <TableCell>Acciones</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, i) => (
            <TableRow key={i}>
              {columnas.map((col) => (
                <TableCell key={String(col.key)}>
                  {col.render ? col.render(row[col.key], row) : String(row[col.key])}
                </TableCell>
              ))}
              {(onEdit || onDelete) && (
                <TableCell>
                  {onEdit && (
                    <IconButton color="primary" onClick={() => onEdit(row)}>
                      <EditIcon />
                    </IconButton>
                  )}
                  {onDelete && (
                    <IconButton color="error" onClick={() => onDelete(row)}>
                      <DeleteIcon />
                    </IconButton>
                  )}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

function FormularioRenta({ onSubmit, onCancel, initial }: {
  onSubmit: (renta: Omit<Renta, 'id'>) => void;
  onCancel: () => void;
  initial?: Omit<Renta, 'id'>
}) {
  const [form, setForm] = useState<Omit<Renta, 'id'>>({
    cliente: initial?.cliente || '',
    vehiculo: initial?.vehiculo || '',
    fechaInicio: initial?.fechaInicio || '',
    fechaFin: initial?.fechaFin || '',
    total: initial?.total || 0,
  })
  return (
    <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 300 }} onSubmit={e => { e.preventDefault(); onSubmit(form) }}>
      <TextField label="Cliente" value={form.cliente} onChange={e => setForm(f => ({ ...f, cliente: e.target.value }))} required />
      <TextField label="Vehículo" value={form.vehiculo} onChange={e => setForm(f => ({ ...f, vehiculo: e.target.value }))} required />
      <TextField type="date" label="Inicio" InputLabelProps={{ shrink: true }} value={form.fechaInicio} onChange={e => setForm(f => ({ ...f, fechaInicio: e.target.value }))} required />
      <TextField type="date" label="Fin" InputLabelProps={{ shrink: true }} value={form.fechaFin} onChange={e => setForm(f => ({ ...f, fechaFin: e.target.value }))} required />
      <TextField type="number" label="Total" value={form.total} onChange={e => setForm(f => ({ ...f, total: Number(e.target.value) }))} required />
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
        <Button type="submit" variant="contained">Guardar</Button>
        <Button type="button" variant="outlined" onClick={onCancel}>Cancelar</Button>
      </Box>
    </Box>
  )
}

function App() {
  const [rentas, setRentas] = useState<Renta[]>([])
  const [modalAbierto, setModalAbierto] = useState(false)
  const [editando, setEditando] = useState<Renta | null>(null)

  const columnas: Columna<Renta>[] = [
    { key: 'cliente', header: 'Cliente' },
    { key: 'vehiculo', header: 'Vehículo' },
    { key: 'fechaInicio', header: 'Inicio' },
    { key: 'fechaFin', header: 'Fin' },
    { key: 'total', header: 'Total', render: (v) => `$${v}` },
  ]

  const handleGuardar = (renta: Omit<Renta, 'id'>) => {
    if (editando) {
      setRentas(rs => rs.map(r => r.id === editando.id ? { ...editando, ...renta } : r))
      setEditando(null)
    } else {
      setRentas(rs => [...rs, { ...renta, id: Date.now() }])
    }
    setModalAbierto(false)
  }

  const handleEditar = (renta: Renta) => {
    setEditando(renta)
    setModalAbierto(true)
  }

  const handleEliminar = (renta: Renta) => {
    setRentas(rs => rs.filter(r => r.id !== renta.id))
  }

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <Box sx={{ width: '100%', maxWidth: 900 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4">Renta de Vehículos</Typography>
          <Button variant="contained" color="primary" onClick={() => { setEditando(null); setModalAbierto(true) }}>
            Nueva renta
          </Button>
        </Box>
        <Tabla data={rentas} columnas={columnas} onEdit={handleEditar} onDelete={handleEliminar} />
      </Box>
      <Dialog open={modalAbierto} onClose={() => { setModalAbierto(false); setEditando(null) }}>
        <DialogTitle>{editando ? 'Editar Renta' : 'Nueva Renta'}</DialogTitle>
        <DialogContent>
          <FormularioRenta
            onSubmit={handleGuardar}
            onCancel={() => { setModalAbierto(false); setEditando(null) }}
            initial={editando ? { ...editando } : undefined}
          />
        </DialogContent>
      </Dialog>
    </Box>
  )
}

export default App
