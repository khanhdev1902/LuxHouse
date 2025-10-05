import { cn } from '@/lib/utils'
import { IoStorefrontOutline } from 'react-icons/io5'

export default function Store() {
  return (
    <div className={cn("text-col-hover cursor-pointer group flex flex-col items-center")}>
      <IoStorefrontOutline className='size-6 group-hover:text-cyan-500'/>
      <span className={cn("hidden","lg:inline")}>Cửa hàng</span>
    </div>
  )
}
