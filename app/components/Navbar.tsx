'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { usePathname } from 'next/navigation'
import classNames from 'classnames'
import { FaCartShopping } from "react-icons/fa6";
import { BiSolidCameraMovie } from "react-icons/bi";
import { AiOutlineUser } from "react-icons/ai";

const Navbar = () => {
    const [login, setLogin] = useState(false)
    const currentPage = usePathname();
    const links = [
        {lable: 'Movies', href: '/'},
        {lable: 'Actors', href: '/actors'},
        {lable: 'contact', href: '/contact'},
        {lable: 'MoviesDB', href: '/moviesdb-page'},
    ]
    return (
        <nav className='flex space-x-10 items-center h-20 text-xl navbar'>
            
            <Link href='/' className="text-white mx-10c"><span className='flex gap-2 items-center'><BiSolidCameraMovie className='text-5xl' />Movie<strong>Vault</strong></span></Link>
          
            <ul className="flex space-x-10"> 
                {
                    links.map(link => (
                        <Link key={link.lable} href={link.href} 
                            className={ classNames({
                                'hover:text-sky-300 transition-colors': true,
                                'text-sky-300' : link.href === currentPage,
                                'text-white' : link.href !== currentPage
                            })}>{link.lable}
                        </Link>
                    ))
                }
            </ul>
            <div className='flex space-x-5 items-center'>
                {
                    login ? 
                        <div>
                
                            <Link href={'api/auth/signout'}><AiOutlineUser className='text-5xl' /></Link> 
                            
                        </div>
                        
                    : 
                        <Link className='flex items-center border border-slate-50 px-3 py-1 rounded-xl text-center' href={'api/auth/signin'}><AiOutlineUser className='text-2xl text-slate-50'/></Link>
                }
                <Link href='/' className="text-white mx-10"><FaCartShopping /></Link>
            </div>
           
        </nav>
    )
}

export default Navbar