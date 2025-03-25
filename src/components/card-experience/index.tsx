import Image from 'next/image';
import { IPropsCardExperience } from './types';

export default function CardExperience({
    companyName, 
    jobTitle,
    jobPeriod,
    imageSrc,
    imageDescription,
}: IPropsCardExperience) {
  return (
    <div className='flex flex-col items-start md:flex-row items-center gap-5'>
      <div className='p-3 bg-white rounded-xl shadow-md'>
        <div className='relative w-10 h-10'>
          <Image
            src={imageSrc}
            alt={imageDescription}
            fill
            className='object-contain'
          />
        </div>
      </div>
      <div>
        <h1 className='text-lg font-bold'>{companyName}</h1>
        <h1 className='text-sm text-gray-500'>
          {jobTitle}
        </h1>
        <h1 className='text-sm text-gray-500'>{jobPeriod}</h1>
      </div>
    </div>
  );
}
