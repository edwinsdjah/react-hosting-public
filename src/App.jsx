import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
// import './App.css'
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { LoginContext } from "./context/LoginContext";

function App() {
  const [dataLogin, setDataLogin] = useState(null);
  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("dataLogin") != null) {
      let backupDataLogin = JSON.parse(localStorage.getItem("dataLogin"));
      setDataLogin(backupDataLogin);
      navigate("/home");
    }
  }, []);

  const logout = () => {
    const yakin = confirm("Apakah Anda yakin mau keluar?");
    if (yakin) {
      localStorage.removeItem("dataLogin");
      setDataLogin(null);
      navigate("/");
    }
  };

  return (
    <>
      <LoginContext.Provider value={{ dataLogin, setDataLogin }}>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              Navbar
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {/* <li className="nav-item">
              <Link className="nav-link " aria-current="page" to="/">Home</Link>
            </li> */}
                {dataLogin == null ? (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link active" to="/">
                        Tentang
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/login">
                        Login
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/register">
                        Register
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link active" to="/">
                        List Member
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" onClick={logout}>
                        Logout
                      </Link>
                    </li>
                  </>
                )}
              </ul>
              {dataLogin != null && <>Selamat Datang, {dataLogin.nama}</>}
            </div>
          </div>
        </nav>

        <div className="container">
          <Outlet />
        </div>
      </LoginContext.Provider>
    </>
  );
}

export default App;
