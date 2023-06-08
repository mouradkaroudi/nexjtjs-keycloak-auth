import Button from "@/components/Button"
import { signOut } from "next-auth/react"

export function LogoutButton() {
    
    const onLogout = () => {
        signOut()
    }

    return (
        <Button onClick={onLogout}>
            Logout
        </Button>
    )

}