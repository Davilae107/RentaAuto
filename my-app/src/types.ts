export type Renta = {
  id: number
  cliente: string
  vehiculo: string
  fechaInicio: string
  fechaFin: string
  total: number
}

export interface RentaAPI {
  rentaID: number
  nombre: string
  vehiculo: string
  fechaRenta: string
  fechaFinal: string
}

export type Columna<T> = {
  key: keyof T
  header: string
  render?: (value: any, row: T) => React.ReactNode
} 