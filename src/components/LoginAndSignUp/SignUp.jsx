import React from "react";
import Input from "../InputComponent/Input";
import { useForm } from "react-hook-form";
import authService from "../../appwrite/services";
import { Link } from "react-router-dom";
import { login } from "../../store/authslice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const SignUp = ({ flag }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  function generateslug(slug) {
    return slug
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "-");
  }
  function handelsignup(data) {
    try {
      if (data) {
        data.name = authService
          .createAccount(data)
          .then((authdata) => {
            if (authdata) {
              authService
                .getCurrentUser()
                .then((userdata) => {
                  dispatch(login(userdata));
                  flag
                    ? navigate("/ResProfilePage")
                    : navigate("/NgoProfilePage");
                    window.location.reload();
                  toast.success("Register Successfully");
                })
                .catch((error) => {
                  toast.error(error.message);
                });
            }
          })
          .catch((error) => {
            toast.error(error.message);
          });
      }
    } catch (error) {
      toast.error(error.message);
    }
  }
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="RegisterPage flex flex-col items-center p-2 w-[30vw] h-fit border border-slate-500 rounded-lg">
        <img className="w-14 mb-5" src="src/assets/S2SLogo.png" alt="" />
        <form
          className="flex gap-5 flex-col items-center"
          onSubmit={handleSubmit(handelsignup)}
        >
          <h2 className="text-3xl text-white">Sign Up</h2>
          {flag ? (
            <Input placeholder="Res Name" {...register("name")} />
          ) : (
            <Input placeholder="NGO Name" {...register("name")} />
          )}
          <Input placeholder="Email" {...register("email")} />
          <Input placeholder="Phone Number" {...register("phonenumber")} />
          <Input placeholder="Password" {...register("password")} />
          <button className="btn w-[20vw] btn-active btn-primary">
            Sign Up
          </button>

          <p>
            Don't have an acccount ?
            <Link
              to={flag ? "/ResLoginPage" : "/NgoLoginPage"}
              className="text-blue-600"
            >
              LogIn
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
