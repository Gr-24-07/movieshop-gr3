
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Card } from "./card"

export default function signin() {
    return (
        <div className="mx-auto max-w-[400px] space-y-6 py-12 Signin">
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold">Welcome back</h1>
                <p className="text-muted-foreground">Sign in to your account to continue</p>
            </div>
            <div className="space-y-4">
                <Button variant="outline" className="w-full h-15 rounded-xl google-btn">
                    <ChromeIcon className="mr-2 h-10 w-5" />
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
                    <form className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="m@example.com" className="input rounded-xl" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" required  className="input rounded-xl"/>
                        </div>
                        <Button type="submit" className="w-full btn-signin  rounded-xl"> Sign in </Button>
                    </form>
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
