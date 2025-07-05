import { API_URL } from '../ApiConfig'


export const getRentas = async () => {
    try {
        const response = await fetch(`${API_URL}/Renta/RentaGet`);
        if (!response.ok) throw new Error('Error en la solicitud');

        const rentas = await response.json();
        return rentas;
      } catch (error) {
        console.error('Error obteniendo tarjetas:', error)
    
        return null
      }
}


export const createRenta = async (renta) => {
    // Mapeo de campos para el backend
    const rentaBackend = {
        nombre: renta.cliente,
        vehiculo: renta.vehiculo,
        fechaRenta: renta.fechaInicio,
        fechaFinal: renta.fechaFin,
        total: renta.total // Si el backend lo usa
    }
    const response = await fetch(`${API_URL}/Renta/RentaPost`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(rentaBackend)
    })
    return response.json()
}

export const updateRenta = async (id, renta) => {
    // Mapeo de campos para el backend
    const rentaBackend = {
        nombre: renta.cliente,
        vehiculo: renta.vehiculo,
        fechaRenta: renta.fechaInicio,
        fechaFinal: renta.fechaFin,
        total: renta.total // Si el backend lo usa
    }
    const response = await fetch(`${API_URL}/Renta/RentaPut/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(rentaBackend)
    })
    return response.json()
}

export const deleteRenta = async (id) => {
    const response = await fetch(`${API_URL}/Renta/RentaDelete/${id}`, {
        method: 'DELETE'
    })
    if (response.status === 204) {
        return true
    }
    return response.json()
}

