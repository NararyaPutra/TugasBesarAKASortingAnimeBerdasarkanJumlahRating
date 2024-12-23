import React from "react";

const CardProfile = ({src, alt, nama, nim, kelas, role}) => {
    return (
        <div className='bg-[#FFF5D7] m-4 p-1 rounded-lg w-max h-max'>
                <div className='flex justify-center m-2'>
                     <img src={src} alt={alt} className='rounded-2xl bg-center w-[74px] h-[96px] border-2 border-rose-400' />
                </div>
                <div className='text-[#E195AB] text-opacity-90 text-lg font-semibold bg-gray-300 m-2 text-center rounded-lg px-2'>{nama}</div>
                <div className='text-[#E195AB] text-opacity-65 text-lg font-semibold bg-gray-300 m-2 text-center rounded-lg px-2'>{nim}</div>
                <div className='text-[#E195AB] text-opacity-65 text-lg font-semibold bg-gray-300 m-2 text-center rounded-lg px-2'>{kelas}</div>
                <div className='text-[#E195AB] text-opacity-65 text-lg font-semibold bg-gray-300 m-2 text-center rounded-lg px-2'>{role}</div>
        </div>
    );
};

export default CardProfile;