import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material'
import { Home, Logout } from '@mui/icons-material'

interface NavbarProps {
  onHomeClick?: () => void
  onLogoutClick?: () => void
}

const Navbar = ({ onHomeClick, onLogoutClick }: NavbarProps) => {
  return (
    <AppBar position="static" sx={{ mb: 3 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          RentaAuto (Administrador)
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            color="inherit" 
            startIcon={<Home />}
            onClick={onHomeClick}
          >
            Home
          </Button>
          <Button 
            color="inherit" 
            startIcon={<Logout />}
            onClick={onLogoutClick}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
