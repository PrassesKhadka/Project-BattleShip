import React from 'react'
import { Github } from 'lucide-react'
import Link from 'next/link'

const Footer=()=>{
    return <div className='absolute bottom-0 mt-10 w-full p-2 bg-zinc-600 text-white text-center flex justify-center items-center'>
        <Link href="https://github.com/PrassesKhadka/Project-BattleShip"><Github/></Link>
    </div>
}

export default Footer