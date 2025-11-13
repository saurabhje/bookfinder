import { useAuth } from "../context/AuthContext"

export default function Profile(){
    const {user} = useAuth()
    return(
        <div>
            {user? <h2>{user.name}</h2> : <p>No user</p>}    
        </div>
    )
}