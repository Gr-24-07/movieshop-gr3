
'use client'

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

import { useState } from "react"


import { signIn } from "next-auth/react"
import { registerUser } from "@/app/actions/register"
import { ChromeIcon } from "../signin/SigninPage"





export default function RegistrationForm( ) {
    
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="mx-auto max-w-[400px] space-y-6 py-12">
            <Button variant="outline" className="w-full h-14 rounded-xl google-btn" onClick={(e) => { e.preventDefault(); signIn('google') }}>
                <ChromeIcon className="mr-2 h-5 w-5 " />
                Sign in with Google
            </Button>
           
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or register in with</span>
                </div>
            </div>
            <Card className="mx-auto max-w-sm">
                <form action={registerUser}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="username">Name</Label>
                            <Input className="input rounded-xl" type="text"  id="name" name="name"  value={name} placeholder="John Doe" onChange={(e) => setName(e.target.value)} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input className="input rounded-xl" id="email" name="email" type="email" value={email} placeholder="example@example.com" onChange={(e) => setEmail(e.target.value)}  required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input className="input rounded-xl" id="password" name="password" type="password" value={password}  onChange={(e) => setPassword(e.target.value)}  required />
                        </div>
                        <Button type="submit"  className="w-full btn-signin rounded-xl">Register</Button>
                    </CardContent>
                </form>
                
            </Card>
        </div>
    )
}
