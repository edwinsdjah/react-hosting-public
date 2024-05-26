import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../config";
import { Link } from "react-router-dom";

export default function Beranda() {
  const [isLoading, setisLoading] = useState(false);
  const [dataMember, setdataMember] = useState(null);

  const loadData = async () => {
    setisLoading(true);
    try {
      const response = await axios.get(`${baseUrl}users`);
      const hasil = response.data;
      console.log(hasil.data);
      setdataMember(hasil.data);
    } catch (error) {
      alert(error);
    } finally {
      setisLoading(false);
    }
  };

  const hapusData = async (id, nama) => {
    const yakin = confirm(`Apakah anda yakin ingin menghapus data ${nama}?`);
    if (yakin) {
      setisLoading(true);
      try {
        const response = await axios.delete(`${baseUrl}users/${id}`);
        const hasil = response.data;
        alert(hasil.pesan);
        loadData();
      } catch (error) {
        alert(error);
      } finally {
        setisLoading(false);
      }
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      {isLoading || dataMember == null ? (
        <>
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </>
      ) : (
        <>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">No.</th>
                <th scope="col">Nama</th>
                <th scope="col">Telp</th>
                <th scope="col">Email</th>
                <th scope="col">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {dataMember.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}.</td>
                    <td>{item.nama}</td>
                    <td>{item.telp}</td>
                    <td>{item.email}</td>
                    <td>
                      <a
                        href="javascript:void(0)"
                        className="btn btn-danger"
                        onClick={() => {
                          hapusData(item.id, item.nama);
                        }}
                      >
                        Hapus
                      </a>
                      &nbsp;
                      <Link to={`/ubah/${item.id}`} className="btn btn-info">
                        Ubah
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </>
  );
}
