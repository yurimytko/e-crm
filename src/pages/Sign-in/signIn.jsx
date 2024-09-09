import { useState } from "react"
import "./dist/signIn.css"

import { useSingInMutation } from "../../store/adminApi"


export function SignIn(){

    const [signIn,{data, isLoading, error}] = useSingInMutation()

    const [username, setEmail] = useState()
    const [password, setPassword] = useState()

    const SignIn = async () => {
        try {
          const admin = {
            username,
            password
          };
      
          const response = await signIn(admin).unwrap();
      
          if (response.accessToken) {
            localStorage.setItem("token", response.accessToken);
          }
        } catch (e) {
          console.error(e);
        }
      };


    return(
        <div className="form_page">
            <div className="from">
                <span>Вхід</span>
                <input type="text" placeholder="E-mail" onChange={(e) => {setEmail(e.target.value)}}/>
                <input type="password" placeholder="Пароль" onChange={(e) => {setPassword(e.target.value)}}/>
                <button onClick={SignIn}>Увійти</button>
            </div>
        </div>
    )
}