import React, { useState } from "react";

export default function Tentang() {
  let angkaVar = 0;
  const [angkaState, setAngkaState] = useState(0); //Contoh Hook State
  const [isLoading, setisLoading] = useState(false);
  const [nama, setnama] = useState("");

  const handleNama = (e) => {
    setnama(e.target.value);
  };

  const tambahAngka = () => {
    angkaVar += 1;
    setAngkaState(angkaState + 1);
    setisLoading(true);
  };
  const kurangAngka = () => {
    angkaVar -= 1;
    setAngkaState(angkaState - 1);
    setisLoading(false);
  };
  return (
    <>
      AngkaVar: {angkaVar}
      <br />
      AngkaState: {angkaState}
      <br />
      {isLoading ? (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <>Tampil Data</>
      )}
      <br />
      <button className="btn btn-primary" onClick={tambahAngka}>
        Tambah AngkaVar
      </button>
      &nbsp;
      <button className="btn btn-danger" onClick={kurangAngka}>
        Kurangi AngkaVar
      </button>
      <br />
      <input type="text" placeholder="masukkan Nama" onChange={handleNama} />
      <br />
      {nama}
    </>
  );
}
