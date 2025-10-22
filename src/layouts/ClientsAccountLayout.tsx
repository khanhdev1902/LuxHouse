import SideBar from '@/components/clients/sidebar'
import Container from '@/components/ui/Container'
import { Outlet } from 'react-router-dom'

export default function ClientsAccountLayout() {
  return (
    <Container className='flex'>
        <SideBar/>
        <Outlet/>
    </Container>
  )
}
