import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { signin, signup } from "../redux/reducers/user_slice";
import Loading from "../components/Loading";
import { error, success } from "../redux/reducers/notification_slice";

export default function Authentication() {
  const { action } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading_signin, loading_signup } = useSelector((state) => state.user);

  const handleNavigate = (to) => {
    navigate(to);
  };

  const Signin = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSignin = (e) => {
      e.preventDefault();
      dispatch(signin({ username, password })).then((res) => {
        if (res.error) {
          dispatch(error(res.error.message));
        } else {
          handleNavigate("/");
        }
      });
    };

    return (
      <div className="h-screen w-full flex justify-center items-center">
        <div
          className=" w-full sm:w-[75%] md:w-[50%] lg:w-[40%] rounded-lg md:border border-color1 border-dashed bg-white p-1 space-y-2"
          onSubmit={handleSignin}
        >
          <div className="w-full h-[25%] bg-color1 rounded-md flex justify-center items-center">
            <h1 className="text-4xl uppercase font-bold text-color4">signin</h1>
          </div>
          <div className="relative flex items-center border border-color1 border-dashed rounded-md">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <img src="/icons/username.svg" width={30} height={30} alt="" />
            </span>
            <input
              type="text"
              placeholder="USERNAME"
              defaultValue={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full py-2 pl-12 pr-2 rounded-md focus:outline-none placeholder:text-color1 focus:bg-black focus:bg-opacity-5"
            />
          </div>
          <div className="relative flex items-center border border-color1 border-dashed rounded-md">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <img src="/icons/password.svg" width={30} height={30} alt="" />
            </span>
            <span
              className="absolute inset-y-0 right-0 flex items-center pr-2"
              onClick={() => {
                setShowPassword(!showPassword);
              }}
            >
              {showPassword ? (
                <img src="/icons/open-pw.svg" width={30} height={30} alt="" />
              ) : (
                <img src="/icons/close-pw.svg" width={30} height={30} alt="" />
              )}
            </span>
            <input
              type={`${showPassword ? "text" : "password"}`}
              placeholder="PASSWORD"
              defaultValue={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full py-2 pl-12 pr-12 rounded-md focus:outline-none placeholder:text-color1 focus:bg-black focus:bg-opacity-5"
            />
          </div>
          <button
            type="submit"
            className={`border border-color1 border-dashed w-full uppercase py-2 rounded-md font-semibold ${
              !username || !password
                ? "cursor-not-allowed"
                : "hover:bg-color1 hover:text-white"
            }`}
            onClick={handleSignin}
          >
            signin
          </button>
          <div className="w-full flex gap-4 justify-center items-center">
            <div className="w-full bg-color1 h-[1px]" />
            <h1>OR</h1>
            <div className="w-full bg-color1 h-[1px]" />
          </div>
          <button
            className="w-full underline "
            onClick={() => navigate("/authentication/signup")}
          >
            register an account
          </button>
        </div>
      </div>
    );
  };

  const Signup = () => {
    const [showPW1, setShowPW1] = useState(false);
    const [showPW2, setShowPW2] = useState(false);
    const [pw1, setPW1] = useState("");
    const [pw2, setPW2] = useState("");
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [image, setImage] = useState(null);
    const [confirm, setConfirm] = useState(false);

    const handleSignup = (e) => {
      e.preventDefault();
      dispatch(signup({ name, username, password: pw1, image })).then((res) => {
        if (res.error) {
          dispatch(error(res.error.message));
        } else {
          handleNavigate("/authentication/signin");
          dispatch(success("Registered an Account Successfully"));
        }
      });
    };

    useEffect(() => {
      if (pw1 === pw2) {
        setConfirm(true);
      } else {
        setConfirm(false);
      }
    }, [pw1, pw2]);

    const FileInput = () => {
      const fileInputRef = useRef(null);

      const handleFileButtonClick = () => {
        fileInputRef.current.click();
      };
      return (
        <div className="flex gap-4 justify-center items-center">
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <div
            className="flex w-full p-1 justify-start items-center border border-color1 border-dashed rounded-lg gap-4 cursor-pointer overflow-hidden"
            onClick={handleFileButtonClick}
          >
            <img src="/icons/profile-icon.svg" width={30} alt="" />
            <h1 className="truncate w-full text-start">
              {image ? "Change" : "Profile Picture"}
            </h1>
          </div>
          <div className="w-full overflow-hidden">
            {image ? (
              <h1 className="truncate underline text-center">{image.name}</h1>
            ) : (
              <h1 className="truncate underline text-center">
                No image selected
              </h1>
            )}
          </div>
        </div>
      );
    };

    return (
      <div className="h-screen w-full flex justify-center items-center">
        <div
          className=" w-full sm:w-[75%] md:w-[50%] lg:w-[40%] rounded-lg md:border border-color1 border-dashed bg-white p-1 space-y-2"
          onSubmit={handleSignup}
        >
          <div className="w-full h-[25%] bg-color1 rounded-md flex justify-center items-center">
            <h1 className="text-4xl uppercase font-bold text-color4">signup</h1>
          </div>
          <div className="relative flex items-center border border-color1 border-dashed rounded-md">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <img src="/icons/name.svg" width={30} height={30} alt="" />
            </span>
            <input
              type="text"
              placeholder="YOUR NAME"
              onChange={(e) => setName(e.target.value)}
              className="w-full py-2 pl-12 pr-2 rounded-md focus:outline-none placeholder:text-color1 focus:bg-black focus:bg-opacity-5"
            />
          </div>
          <div className="relative flex items-center border border-color1 border-dashed rounded-md">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <img src="/icons/username.svg" width={30} height={30} alt="" />
            </span>
            <input
              type="text"
              placeholder="YOUR USERNAME"
              onChange={(e) => setUsername(e.target.value)}
              className="w-full py-2 pl-12 pr-2 rounded-md focus:outline-none placeholder:text-color1 focus:bg-black focus:bg-opacity-5"
            />
          </div>
          <div
            className={`relative flex items-center border ${
              !pw1 || !pw2
                ? "border-color1"
                : confirm
                ? "border-lime-600"
                : "border-red-600"
            } border-dashed rounded-md`}
          >
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <img src="/icons/password.svg" width={30} height={30} alt="" />
            </span>
            <span
              className="absolute inset-y-0 right-0 flex items-center pr-2"
              onClick={() => {
                setShowPW1(!showPW1);
              }}
            >
              {showPW1 ? (
                <img src="/icons/open-pw.svg" width={30} height={30} alt="" />
              ) : (
                <img src="/icons/close-pw.svg" width={30} height={30} alt="" />
              )}
            </span>
            <input
              type={`${showPW1 ? "text" : "password"}`}
              placeholder="PASSWORD"
              onChange={(e) => setPW1(e.target.value)}
              className="w-full py-2 pl-12 pr-12 rounded-md focus:outline-none placeholder:text-color1 focus:bg-black focus:bg-opacity-5"
            />
          </div>
          <div
            className={`relative flex items-center border ${
              !pw1 || !pw2
                ? "border-color1"
                : confirm
                ? "border-lime-600"
                : "border-red-600"
            } border-dashed rounded-md`}
          >
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <img src="/icons/password.svg" width={30} height={30} alt="" />
            </span>
            <span
              className="absolute inset-y-0 right-0 flex items-center pr-2"
              onClick={() => {
                setShowPW2(!showPW2);
              }}
            >
              {showPW2 ? (
                <img src="/icons/open-pw.svg" width={30} height={30} alt="" />
              ) : (
                <img src="/icons/close-pw.svg" width={30} height={30} alt="" />
              )}
            </span>
            <input
              type={`${showPW2 ? "text" : "password"}`}
              placeholder="RE-ENTER PASSWORD"
              onChange={(e) => setPW2(e.target.value)}
              className="w-full py-2 pl-12 pr-12 rounded-md focus:outline-none placeholder:text-color1 focus:bg-black focus:bg-opacity-5"
            />
          </div>
          <FileInput />
          <button
            type="submit"
            className={`border border-color1 border-dashed w-full uppercase py-2 rounded-md font-semibold ${
              !name || !confirm || !username || !image
                ? "cursor-not-allowed"
                : "hover:bg-color1 hover:text-white"
            }`}
            onClick={handleSignup}
          >
            signup
          </button>
          <div className="w-full flex gap-4 justify-center items-center">
            <div className="w-full bg-color1 h-[1px]" />
            <h1>OR</h1>
            <div className="w-full bg-color1 h-[1px]" />
          </div>
          <button
            className="w-full underline "
            onClick={() => handleNavigate("/authentication/signin")}
          >
            signin to an account
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="px-2 xm:px-4 sm:px-8 md:px-16 lg:px-32 xl:px-64 h-screen">
      {action === "signup" ? <Signup /> : <Signin />}
      {loading_signin || loading_signup ? (
        <Loading w={75} text="Please wait" />
      ) : null}
    </div>
  );
}
