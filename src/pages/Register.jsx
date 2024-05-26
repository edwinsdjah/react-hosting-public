import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { baseUrl } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [isLoading, setisLoading] = useState(false);
  const navigate = useNavigate();

  const style = {
    p: {
      fontWeight: "bold",
      color: "red",
    },
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = async (data) => {
    setisLoading(true);
    try {
      const response = await axios.post(`${baseUrl}register`, data);
      console.log(response.data);
      const hasil = response.data;
      alert(hasil.pesan);
      if (hasil.sukses == 1) {
        navigate("/login");
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
          placeholder="Nama"
          {...register("txt_nama", { required: true })}
        />
        <br />
        {errors.txt_nama?.type === "required" && (
          <>
            <p role="alert" style={style.p}>
              Nama Wajib diisi
            </p>
          </>
        )}
        <input
          type="text"
          placeholder="Email"
          {...register("txt_email", { required: true, pattern: /^\S+@\S+$/i })}
        />
        {errors.txt_email?.type === "required" && (
          <>
            <p role="alert" style={style.p}>
              Email Wajib diisi
            </p>
          </>
        )}
        {errors.txt_email?.type === "pattern" && (
          <>
            <p role="alert" style={style.p}>
              Format email anda tidak valid
            </p>
          </>
        )}
        <br />
        <input
          type="text"
          placeholder="Telp"
          {...register("txt_telp", {
            required: true,
            maxLength: 13,
            minLength: 8,
            pattern: /^\d*$/i,
          })}
        />
        <br />
        {errors.txt_telp?.type === "required" && (
          <>
            <p role="alert" style={style.p}>
              Telp harus diisi
            </p>
          </>
        )}
        {errors.txt_telp?.type === "pattern" && (
          <>
            <p role="alert" style={style.p}>
              Telp harus diisi angka
            </p>
          </>
        )}
        {errors.txt_telp?.type === "maxLength" && (
          <>
            <p role="alert" style={style.p}>
              Telp harus diisi maksimal 13 angka
            </p>
          </>
        )}
        {errors.txt_telp?.type === "minLength" && (
          <>
            <p role="alert" style={style.p}>
              Telp harus diisi minimal 8 angka
            </p>
          </>
        )}
        <input
          type="password"
          placeholder="Password"
          {...register("txt_password", {
            required: true,
          })}
        />
        <br />
        {errors.txt_password?.type === "required" && (
          <>
            <p role="alert" style={style.p}>
              Password wajib diisi
            </p>
          </>
        )}
        <input
          type="password"
          placeholder="Ulangi Password"
          {...register("ulangi", {
            required: true,
          })}
        />
        <br />
        {errors.ulangi?.type === "required" && (
          <>
            <p role="alert" style={style.p}>
              Ulangi Password wajib diisi
            </p>
          </>
        )}
        {watch("ulangi") !== watch("txt_password") && (
          <>
            <p role="alert" style={style.p}>
              Ulangi Password harus sama dengan password
            </p>
          </>
        )}
        {isLoading ? (
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          <button type="submit">Daftar</button>
        )}
      </form>
    </>
  );
}
