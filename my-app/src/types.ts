export type Renta = {
  id: number
  cliente: string
  vehiculo: string
  fechaInicio: string
  fechaFin: string
  total: number
}

export type Columna<T> = {
  key: keyof T
  header: string
  render?: (value: any, row: T) => React.ReactNode
} 