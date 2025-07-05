import { RiShoppingCartLine } from 'react-icons/ri'

export default function Cart() {
  return (
    <div className='flex flex-col items-center justify-end text-col-hover group  cursor-pointer'>
      <RiShoppingCartLine className='size-6 group-hover:text-cyan-500'/>
      <span className="hidden lg:inline">Giỏ hàng</span>
    </div>
  )
}
