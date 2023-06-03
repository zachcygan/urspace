import React from 'react';
import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';


const MusicCard =({song,i})=>(
    <div className="flex flex-col w-[250px] px-4 bg-white/5 bg-opacity-100 backdrop-blur-sm animate-slideup rounded-lg curson-pointer" key={i}>
        <div className='relative w-full h-56 group'>
            <div className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex`}>
                <h1>hello</h1>
            </div>
        </div>
    </div>
)

    

export default MusicCard;