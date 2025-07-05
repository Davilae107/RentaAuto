import type { Columna } from '../types'
import {
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
import '../App.css'

function TableData<T>({ data, columnas, onEdit, onDelete }: {
  data: T[];
  columnas: Columna<T>[];
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
}) {
  
  return (
    <TableContainer component={Paper} sx={{ mt: 3, width: '100%', overflowX: 'auto' }} className="tabla-responsive">
      <Table sx={{ minWidth: 650 }} size="small">
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

export default TableData
