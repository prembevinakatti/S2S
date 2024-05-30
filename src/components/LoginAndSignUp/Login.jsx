import React from "react";
import Input from "../InputComponent/Input";

const Login = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="LoginPage flex flex-col items-center p-2 w-[30vw] h-[80vh] border border-slate-500 rounded-lg">
        <img className="w-14 mb-5" src="src/assets/S2SLogo.png" alt="" />
        <form className="flex gap-5 flex-col items-center">
            <h2 className="text-3xl text-white">Login</h2>
          <Input placeholder="Email" />
          <Input placeholder="Password" />
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
