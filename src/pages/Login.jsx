import axios from "axios";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../config";
import { LoginContext } from "../context/LoginContext";

export default function Login() {
  const style = {
    p: {
      fontWeight: "bold",
      color: "red",
    },
  };

  const [isLoading, setisLoading] = useState(false);
  const navigate = useNavigate();
  const { dataLogin, setDataLogin } = useContext(LoginContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = async (data) => {
    setisLoading(true);
    try {
      const response = await axios.post(`${baseUrl}login`, data);
      console.log(data);
      const hasil = response.data;
      alert(hasil.pesan);
      if (hasil.sukses == 1) {
        localStorage.setItem("dataLogin", JSON.stringify(hasil.data));
        setDataLogin(hasil.data);
        navigate("/home");
      }
    } catch (error) {
      alert(error);
    } finally {
      setisLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="email"
          {...register("txt_email", { required: true })}
        />
        <br />
        {errors.txt_email?.type === "required" && (
          <>
            <p role="alert" style={style.p}>
              Email wajib diisi
            </p>
          </>
        )}
        <input
          type="password"
          placeholder="Masukkan pasword"
          {...register("txt_password", { required: true })}
        />
        <br />
        {errors.txt_email?.type === "required" && (
          <>
            <p role="alert" style={style.p}>
              Password wajib diisi
            </p>
          </>
        )}
        {isLoading ? (
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          <button type="submit">Login</button>
        )}
      </form>
    </>
  );
}
