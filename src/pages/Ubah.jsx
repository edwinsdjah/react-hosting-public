import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../config";

export default function Ubah() {
  let { id } = useParams();
  const [isLoading, setisLoading] = useState(false);
  const [detailMember, setDetailMember] = useState(null);
  const navigate = useNavigate();

  const loadData = async () => {
    setisLoading(true);
    try {
      const response = await axios.get(`${baseUrl}users/${id}`);
      const hasil = response.data;
      setDetailMember(hasil.data);
    } catch (error) {
      alert(error);
    } finally {
      setisLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const onSubmit = async (data) => {
    setisLoading(true);
    try {
      const response = await axios.post(`${baseUrl}users/${id}`, data);
      console.log(response.data);
      const hasil = response.data;
      alert(hasil.pesan);
      if (hasil.sukses == 1) {
        navigate("/home");
      }
    } catch (error) {
      alert(error);
    } finally {
      setisLoading(false);
    }
  };

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

  return (
    <>
      {isLoading || detailMember == null ? (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Nama"
            {...register("txt_nama", { required: true })}
            defaultValue={detailMember.nama}
          />
          <br />
          {errors.txt_nama?.type === "required" && (
            <>
              <p role="alert" style={style.p}>
                Nama Wajib diisi
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
            defaultValue={detailMember.telp}
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
          <br />
          <button type="submit">Ubah</button>
        </form>
      )}
    </>
  );
}
