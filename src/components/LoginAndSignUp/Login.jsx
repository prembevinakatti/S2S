import React from "react";
import Input from "../InputComponent/Input";
import { useForm } from "react-hook-form";
import authService from "../../appwrite/services"
const Login = () => {
  const{register,handleSubmit}=useForm()
  function hadellogin(data){
    if(data){
      try {
        authService.login(...data).then((authdata)=>{
            if(authdata){
              authService.getCurrentUser().then((curuserdata)=>{
                  console.log(curuserdata)
              })
            }
        })
        
      } catch (error) {
        
      }
    }

  }
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="LoginPage flex flex-col items-center p-2 w-[30vw] h-[80vh] border border-slate-500 rounded-lg">
        <img className="w-14 mb-5" src="src/assets/S2SLogo.png" alt="" />
        <form className="flex gap-5 flex-col items-center" onClick={handleSubmit(hadellogin)}>
            <h2 className="text-3xl text-white">Login</h2>
          <Input placeholder="Email" {...register("email")} />
          <Input placeholder="Password"{...register("password")} />
          <div className="divider">OR</div>
            <button className="btn w-[20vw]"><img className="w-7" src="src/assets/google.png" alt="" />Continue with Google</button>
            <button className="btn w-[20vw] btn-active btn-primary">Login</button>

            <p>Don't have an acccount <span  className="text-blue-600">Sign Up</span></p>
        </form>
      </div>
    </div>
  );
};

export default Login;
