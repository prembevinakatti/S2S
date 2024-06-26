import React from "react";
import Input from "../InputComponent/Input";
import { useForm } from "react-hook-form";
import authService from "../../appwrite/services";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../store/authslice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const Login = ({ flag }) => {
  console.log(flag);
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  function hadelLogin(data) {
    if (data) {
      try {
        authService
          .login(data)
          .then((authdata) => {
            if (authdata) {
              authService
                .getCurrentUser()
                .then((curuserdata) => {
                  dispatch(login(curuserdata));
                  flag ? navigate("/ResHomePage") : navigate("/NgoHomePage");
                  window.location.reload()
                  toast.success("Login Successfull");
                })
                .catch((err) => {
                  toast.error(err.message);
                });
            }
          })
          .catch((err) => {
            toast.error(err.message);
          });
      } catch (error) {
        toast.error(error.message);
      }
    }
  }
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="LoginPage flex flex-col items-center p-2 w-[30vw] h-[60vh] border border-slate-500 rounded-lg">
        <img className="w-14 mb-5" src="src/assets/S2SLogo.png" alt="" />
        <form
          className="flex gap-5 flex-col items-center"
          onSubmit={handleSubmit(hadelLogin)}
        >
          <h2 className="text-3xl text-white">Login</h2>
          <Input placeholder="Email" {...register("email")} />
          <Input placeholder="Password" {...register("password")} />
          <button className="btn w-[20vw] btn-active btn-primary">Login</button>

          <p>
            Don't have an acccount ?{" "}
            <Link
              to={flag ? "/ResRegPage" : "/NgoRegPage"}
              className="text-blue-600"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
