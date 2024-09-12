import Link from "next/link";
import { usePathname } from "next/navigation";
import classNames from "classnames";
import { FaCartShopping } from "react-icons/fa6";
import { BiSolidCameraMovie } from "react-icons/bi";
import { signOut, useSession } from "next-auth/react";
import { AiOutlineUser } from "react-icons/ai";
import { getCart } from "@/app/actions/cart";
import { CartProvider, useCart } from "@/context/cartContext";

import { Button } from "@/components/ui/button";
import {
    SheetTrigger,
    SheetContent,
    SheetTitle,
    Sheet,
} from "@/components/ui/sheet";
import React, { useEffect } from "react";
import { Menu } from "lucide-react";

export default function Navbar() {
  
    const { data: session } = useSession();
    const currentPage = usePathname();
    const {cartCount} = useCart();

    const links = [
        { lable: 'Movies', href: '/' },
        { lable: 'Actors', href: '/movies/actors' },
        { lable: 'Contact', href: '/contact' },
    ]

    const [open, setOpen] = React.useState(false);
    return (
        <>
        <nav className="navbar lg:block md:hidden ">
            <div className='container mx-auto flex justify-between space-x-5 items-center h-[100%] text-xl'>
                <Link href='/' className="text-white mx-10c"><span className='flex items-center'><BiSolidCameraMovie className='text-5xl' />Movie<strong>Vault</strong></span></Link>

                <ul className="flex space-x-10">
                    {
                        links.map(link => (
                            <Link key={link.lable} href={link.href}
                                className={classNames({
                                    'hover:text-sky-300 transition-colors': true,
                                    'text-sky-300': link.href === currentPage,
                                    'text-white': link.href !== currentPage
                                })}>{link.lable}
                            </Link>
                        ))
                    }
                </ul>
                <div className='flex space-x-5 items-center'>
                    {session?.user?.role === 'ADMIN' && (
                        <div className='flex items-center text-slate-200'>
                            <Link className='hover:text-sky-300 transition-colors text-white rounded text-center' href='/dashboard/admin'> <AiOutlineUser className='text-3xl' /></Link>

                        </div>
                    )}

                    {session?.user?.role === 'CUSTOMER' && (
                        <Link className='flex items-center text-white px-3 py-1 rounded text-center' href="dashboard/customer"><AiOutlineUser className='text-3xl' /></Link>

                    )}

                    {session ? (
                        <Link className='hover:text-sky-300 transition-colors text-white px-3 py-1 rounded text-center' href={'/'} onClick={() => signOut()}>Sign out</Link>
                    ) : (
                        <div className='flex space-x-5 items-center text-slate-200 login-links'>
                            <Link className='flex items-center px-3 py-1 rounded-xl text-center' href={'/signin'}>Sign in</Link>
                            <Link className='flex items-center px-3 py-1 rounded-xl text-center' href={'/register'}>Register</Link>
                        </div>

                    )}

                    <Link href='/cart' className="text-white mx-10 flex items-center relative"><FaCartShopping className='text-3xl' />
                        <span className='cart-count rounded-full'>{cartCount}</span>
                    </Link>
                </div>
            </div>


        </nav>
        
        <nav className="flex justify-between items-center  lg:hidden  bg-brand  p-3 navbar">

            <div className="flex items-center gap-4">
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild>
                    <Button
                        size="icon"
                        variant="ghost"
                        className="rounded-full text-white"
                    >
                        <Menu className="h-5 w-5" />
                    </Button>
                    </SheetTrigger>
                    <SheetContent side={"left"}>
                    <SheetTitle className="text-lg font-semibold text-foreground text-center w-full mb-4">
                        Menu
                    </SheetTitle>
                    <div className="flex flex-col gap-2 mb-2">
                        <ul>
                        {links.map((link) => (
                            <li key={`${link.href}-sheet-link`}>
                            <Link
                                className="flex items-center border border-slate-50 px-3 py-1 rounded text-center"
                                href={link.href}
                            >
                                {link.lable}
                            </Link>
                            </li>
                        ))}
                        {session ? (
                            <li>
                            <Link
                                className="flex items-center border border-slate-50 px-3 py-1 rounded text-center"
                                href={"/"}
                                onClick={() => signOut()}
                            >
                                Sign out
                            </Link>
                            </li>
                        ) : (
                            <>
                            <li>
                                <Link
                                className="flex items-center border border-slate-50 px-3 py-1 rounded text-center"
                                href={"/signin"}
                                >
                                Sign in
                                </Link>
                            </li>
                            <li>
                                <Link
                                className="flex items-center border border-slate-50 px-3 py-1 rounded text-center"
                                href={"/register"}
                                >
                                Register
                                </Link>
                            </li>
                            </>
                        )}
                        </ul>
                    </div>
                    </SheetContent>
                </Sheet>

                <Link href="/" className="text-white mx-10c">
                    <span className="flex items-center">
                    <BiSolidCameraMovie className="text-3xl" />
                    Movie<strong>Vault</strong>
                    </span>
                </Link>
            </div>

            <div>
                <Link
                    href="/cart"
                    className="text-white mx-10 flex items-center relative"
                >
                    <FaCartShopping className="text-3xl" />
                    <span className="cart-count rounded-full">{cartCount}</span>
                </Link>
            </div>
        </nav>

    </>
  )
}
