'use client'

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { getSession } from "next-auth/react"
import { signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"



export default function SignInPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSignIn = async (event: { preventDefault: () => void }) => {
        event.preventDefault();

        try {
            const SignInSuccess = await signIn('credentials', {
                redirect: false,
                email,
                password,
            });

            if (SignInSuccess?.ok) {
                const session = await getSession();
                console.log('Session:', session);

                if (session?.user?.role) {
                    if (session?.user?.role === 'ADMIN') {
                        console.log('User role:', session.user.role);
                        router.push('/dashboard/admin');
                    }
                    router.push('/');
                } else {
                    console.error('Role is undefined in the session');
                }
            }  else {
                console.error('Sign in failed:', SignInSuccess?.error);
            }
        } catch (error) {
            console.error('An error occurred during sign in:', error);
        }
        console.log('Email:', email);
        console.log('Password:', password); 
    };

    return (
        <div className="mx-auto max-w-[400px] space-y-6 py-12">
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold">Welcome back</h1>
                <p className="text-muted-foreground">Sign in to your account to continue</p>
            </div>
            <div className="space-y-4">
                <Button variant="outline" className="w-full h-14 rounded-xl google-btn" onClick={(e) => { e.preventDefault(); signIn('google') }}>
                    <ChromeIcon className="mr-2 h-5 w-5 " />
                    Sign in with Google
                </Button>
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">Or sign in with</span>
                    </div>
                </div>
                <Card className="mx-auto max-w-sm rounded-xl">
                <CardContent className="space-y-4 py-5">
                    <form className="space-y-4" onSubmit={handleSignIn}>
                        <div className="space-y-4">
                            <Label htmlFor="email">Email</Label>
                            <Input value={email} onChange={(e) => setEmail(e.target.value)} 
                                id="email" name="email"  type="email" placeholder="m@example.com" 
                                className="input rounded-xl" required
                                autoComplete="on" />
                                
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input value={password} onChange={(e) => setPassword(e.target.value)}  
                                id="password" type="password" name="password"  placeholder="••••••••" required  
                                className="input rounded-xl"/>
                        </div>
                        <Button type="submit" className="w-full btn-signin  rounded-xl"> Sign in </Button>
                    </form>
                </CardContent>
                </Card>
            </div>
        </div>
    )
}

export function ChromeIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="https://www.svgrepo.com/show/475656/google-color.svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="4" />
        <line x1="21.17" x2="12" y1="8" y2="8" />
        <line x1="3.95" x2="8.54" y1="6.06" y2="14" />
        <line x1="10.88" x2="15.46" y1="21.94" y2="14" />
        </svg>
    )
}
