import TableData from '../Component/Table'
import Navbar from '../Component/navbar'
import type { Renta, Columna, RentaAPI } from '../types'
import { useState, useEffect } from 'react'
import { Box, Button, Dialog, DialogTitle, DialogContent, TextField, Typography } from '@mui/material'
import { getRentas, createRenta, updateRenta, deleteRenta } from '../libs/Api/rentaRequest'
import { useNavigate } from 'react-router-dom'
import { FormularioRenta } from '../Component/form'

const columnas: Columna<Renta>[] = [
    { key: 'cliente', header: 'Cliente' },
    { key: 'vehiculo', header: 'Vehículo' },
    { key: 'fechaInicio', header: 'Inicio' },
    { key: 'fechaFin', header: 'Fin' },
    { key: 'total', header: 'Total', render: (v: number) => `$${v}` },
  ]
  
  

  function MainApp() {
    const [rentas, setRentas] = useState<Renta[]>([])
    const [modalAbierto, setModalAbierto] = useState(false)
    const [editando, setEditando] = useState<Renta | null>(null)
    const navigate = useNavigate()
  
    // Cargar rentas desde la API al iniciar
    useEffect(() => {
      cargarRentas()
    }, [])
  
    const cargarRentas = async () => {
      const data = await getRentas()
      if (!data) {
        setRentas([])
        return data
      }
      const mapped = data.map((item: RentaAPI & { total?: number }) => ({
        id: item.rentaID,
        cliente: item.nombre,
        vehiculo: item.vehiculo,
        fechaInicio: item.fechaRenta,
        fechaFin: item.fechaFinal,
        total: item.total ?? 0
      }))
      setRentas(mapped)
    }
  
    const handleGuardar = async (renta: Omit<Renta, 'id'>) => {
      if (editando) {
        await updateRenta(editando.id, renta)
      } else {
        await createRenta(renta)
      }
      setEditando(null)
      setModalAbierto(false)
      cargarRentas()
    }
  
    const handleEditar = (renta: Renta) => {
      setEditando(renta)
      setModalAbierto(true)
    }
  
    const handleEliminar = async (renta: Renta) => {
      await deleteRenta(renta.id)
      cargarRentas()
    }
  
    const handleHomeClick = () => {
      navigate('/')
    }
  
    const handleLogoutClick = () => {
      navigate('/login')
    }
  
    return (
      
      <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5', p: 4 }}>
        <Navbar onHomeClick={handleHomeClick} onLogoutClick={handleLogoutClick} />
        <Box sx={{ boxShadow: 2, bgcolor: 'white', borderRadius: 2, p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h4">Renta de Vehículos</Typography>
            <Button variant="contained" color="primary" onClick={() => { setEditando(null); setModalAbierto(true) }}>
              Nueva renta
            </Button>
          </Box>
          <TableData data={rentas} columnas={columnas} onEdit={handleEditar} onDelete={handleEliminar} />
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

export default MainApp