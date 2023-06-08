import Button from "@/components/Button";
import { signIn } from "next-auth/react";

export function LoginButton() {
    
    const onSign = async() => {
        const sign = await signIn('keycloak', {redirect: false})
        console.log(sign)
    }

    return (
        <Button onClick={onSign}>
            Login in with keycloak
        </Button>
    )

}