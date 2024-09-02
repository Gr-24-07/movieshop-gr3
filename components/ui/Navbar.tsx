'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import classNames from 'classnames'
import { FaCartShopping } from "react-icons/fa6";
import { BiSolidCameraMovie } from "react-icons/bi";
import { signOut, useSession } from 'next-auth/react';
import { AiOutlineUser } from "react-icons/ai";


export default function Navbar() {

    const { data: session } = useSession();
    const currentPage = usePathname();
    const links = [
        {lable: 'Movies', href: '/'},
        {lable: 'Actors', href: '/actors'},
        {lable: 'contact', href: '/contact'},
        {lable: 'MoviesDB', href: '/moviesdb-page'},
    ]

  
    return (
        <nav className="navbar">
            <div className='container mx-auto flex justify-between space-x-10 items-center h-20 text-xl'>
                    <Link href='/' className="text-white mx-10c"><span className='flex items-center'><BiSolidCameraMovie className='text-5xl'/>Movie<strong>Vault</strong></span></Link>
            
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
                    {session?.user?.role === 'ADMIN' && (
                        <div className='flex items-center text-slate-200'>
                            <Link className='hover:text-sky-300 transition-colors text-white rounded text-center'  href='/admin/dashboard/'> <AiOutlineUser className='text-3xl'/></Link>
                        
                        </div>
                    )}

                    {session?.user?.role === 'CUSTOMER' && (
                        <Link className='flex items-center text-white px-3 py-1 rounded text-center' href="/customer/dashboard/"><AiOutlineUser className='text-3xl'/></Link>
                        
                    )}
                    
                    {session ? (
                        <Link className='hover:text-sky-300 transition-colors text-white px-3 py-1 rounded text-center' href={'/'}  onClick={() => signOut()}>Sign out</Link> 
                    ) : (
                        <div className='flex space-x-5 items-center text-slate-200'>
                            <Link className='flex items-center border border-slate-50 px-3 py-1 rounded text-center' href={'/signin'}>Sign in</Link>
                            <Link className='flex items-center border border-slate-50 px-3 py-1 rounded text-center' href={'/register'}>Register</Link>
                        </div>
                        
                    )}     
            
                    <Link href='/' className="text-white mx-10"><FaCartShopping /></Link> 
                </div>
            </div>
            
           
        </nav>
    )
}
