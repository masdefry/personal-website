import { IPropsCardAward } from './types';
import { LiaAwardSolid } from 'react-icons/lia';
export default function CardAward({
  title,
  description,
  year,
}: IPropsCardAward) {
  return (
    <div className='flex flex-col items-start md:flex-row items-center gap-5'>
      <div className='p-3 bg-white rounded-xl shadow-md'>
        <LiaAwardSolid className='text-3xl text-yellow-500' />
      </div>
      <div>
        <h1 className='text-lg font-bold text-black'>{title}</h1>
        <h1 className='text-sm text-gray-500'>{description} - {year}</h1>
      </div>
    </div>
  );
}
