import { FaArrowLeftLong } from 'react-icons/fa6'

const BackBtn = () => {
  return (
    <button onClick={() => window.history.back()} className='absolute top-18 left-6 cursor-pointer hover:bg-white/10 rounded-full p-2'>
        <FaArrowLeftLong size={24} className="text-blue-500" />
    </button>
  )
}

export default BackBtn