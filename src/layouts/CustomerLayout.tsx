import Footer from '@/components/user/footer'
import Header from '@/components/user/header'
import { Outlet } from 'react-router-dom';

export default function CustomerLayout() {
  return (
    <div className='flex flex-col min-h-screen h-[1500px]'>
      <Header/>
      <main className='flex-grow'>
        <Outlet/>
      </main>
      <Footer/>
    </div>
  )
}
