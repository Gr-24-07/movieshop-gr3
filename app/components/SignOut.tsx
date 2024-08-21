import { signOut } from '@/auth'


export default function SignIn() {
    return (
        <form action={async () => {
            'use sever'
            await signOut( {redirectTo: '/'})
        }}
        >
        </form>
    )
}
