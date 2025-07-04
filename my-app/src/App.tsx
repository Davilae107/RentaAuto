import { useState } from 'react'
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

function Tabla<T>({ data, columnas }: { data: T[]; columnas: Columna<T>[] }) {
  return (
    <table className="tabla-renta">
      <thead>
        <tr>
          {columnas.map((col) => (
            <th key={String(col.key)}>{col.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i}>
            {columnas.map((col) => (
              <td key={String(col.key)}>
                {col.render ? col.render(row[col.key], row) : String(row[col.key])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function Modal({ open, onClose, children }: { open: boolean; onClose: () => void; children: React.ReactNode }) {
  if (!open) return null
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>×</button>
        {children}
      </div>
    </div>
  )
}

function FormularioRenta({ onSubmit, onCancel }: { onSubmit: (renta: Omit<Renta, 'id'>) => void; onCancel: () => void }) {
  const [form, setForm] = useState<Omit<Renta, 'id'>>({
    cliente: '',
    vehiculo: '',
    fechaInicio: '',
    fechaFin: '',
    total: 0,
  })
  return (
    <form className="formulario-renta" onSubmit={e => { e.preventDefault(); onSubmit(form) }}>
      <h2>Nueva Renta</h2>
      <input placeholder="Cliente" value={form.cliente} onChange={e => setForm(f => ({ ...f, cliente: e.target.value }))} required />
      <input placeholder="Vehículo" value={form.vehiculo} onChange={e => setForm(f => ({ ...f, vehiculo: e.target.value }))} required />
      <input type="date" value={form.fechaInicio} onChange={e => setForm(f => ({ ...f, fechaInicio: e.target.value }))} required />
      <input type="date" value={form.fechaFin} onChange={e => setForm(f => ({ ...f, fechaFin: e.target.value }))} required />
      <input type="number" placeholder="Total" value={form.total} onChange={e => setForm(f => ({ ...f, total: Number(e.target.value) }))} required />
      <div className="form-actions">
        <button type="submit">Guardar</button>
        <button type="button" onClick={onCancel}>Cancelar</button>
      </div>
    </form>
  )
}

function App() {
  const [rentas, setRentas] = useState<Renta[]>([])
  const [modalAbierto, setModalAbierto] = useState(false)

  const columnas: Columna<Renta>[] = [
    { key: 'cliente', header: 'Cliente' },
    { key: 'vehiculo', header: 'Vehículo' },
    { key: 'fechaInicio', header: 'Inicio' },
    { key: 'fechaFin', header: 'Fin' },
    { key: 'total', header: 'Total', render: (v) => `$${v}` },
  ]

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Renta de Vehículos</h1>
        <button className="nueva-renta-btn" onClick={() => setModalAbierto(true)}>Nueva renta</button>
      </header>
      <Tabla data={rentas} columnas={columnas} />
      <Modal open={modalAbierto} onClose={() => setModalAbierto(false)}>
        <FormularioRenta
          onSubmit={renta => {
            setRentas(rs => [...rs, { ...renta, id: Date.now() }])
            setModalAbierto(false)
          }}
          onCancel={() => setModalAbierto(false)}
        />
      </Modal>
    </div>
  )
}

export default App
