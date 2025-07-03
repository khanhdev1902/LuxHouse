import Footer from '@/components/user/footer'
import Header from '@/components/user/header'
import { Outlet } from 'react-router-dom';

export default function CustomerLayout() {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header/>
      <main className='flex-grow px-4 md:px-8 bg-gray-50'>
        <Outlet/>
      </main>
      <Footer/>
    </div>
  )
}
