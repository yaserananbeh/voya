import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function LogoutBtn() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userType')

    void navigate('/home', { replace: true })
  }

  return <Button onClick={handleLogout}>Logout</Button>
}
