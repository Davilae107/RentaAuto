import { Box, Button, TextField } from "@mui/material";
import type { Renta } from "../types";
import { useState } from "react";


export function FormularioRenta({ onSubmit, onCancel, initial }: {
    onSubmit: (renta: Omit<Renta, 'id'>) => void,
    onCancel: () => void,
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
  