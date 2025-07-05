import { VscAccount } from 'react-icons/vsc'

export default function Account() {
  return (
    <div className='flex flex-col items-center justify-end group text-col-hover cursor-pointer'>
      <VscAccount className='size-6 group-hover:text-cyan-500'/>
      <span className="hidden lg:inline">Tài khoản</span>
    </div>
  )
}
