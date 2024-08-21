import { signIn } from '@/auth'

export default function SignIn() {
    return (
        <form action={async () => {
            'use sever'
            await signIn('google', {redirectTo: '/'})
        }}
        >

        </form>
    )
}
