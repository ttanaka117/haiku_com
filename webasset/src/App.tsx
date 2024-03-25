// import logo from "./logo.svg";
import "./global.scss";
import { Header } from "./components/atoms/Header";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { AppDispatch, RootState } from ".";
import Modal from "react-modal";
import toast, { Toaster } from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { GlobalLoader } from "./components/molecules/GlobalLoader";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (location.pathname == "/") {
      setIsOpen(true);
    }
  }, [dispatch]);

  const handleCheckPass = () => {
    if (input != "tomoyuki") {
      return toast("不正な値です。");
    }
    setIsOpen(false);
    return navigate("/top");
  };
  return (
    <div className="App">
      <Header />
      <div className="App-container">
        <Outlet />
      </div>
      <Modal
        isOpen={isOpen}
        contentLabel="Check Stg Modal"
        style={{
          overlay: {
            zIndex: 1000,
            backgroundColor: "#fff",
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            backgroundColor: "#fff",
            transform: "translate(-50%, -50%)",
          },
        }}
      >
        <div>
          <div>STG環境用のパスワードを入力してください</div>
          <input
            onChange={(event) => {
              setInput(event.target.value);
            }}
            onKeyDown={(event) => {
              if (event.code == "Enter") {
                handleCheckPass();
              }
            }}
          ></input>
          <button onClick={() => handleCheckPass()}>確認</button>
        </div>
      </Modal>
      <Toaster
        containerStyle={{
          zIndex: 100000000,
        }}
      />
    </div>
  );
}

export default App;
