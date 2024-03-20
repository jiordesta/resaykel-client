import React, { useEffect, useRef, useState } from "react";
import CustomModal from "../components/CustomModal";
import ScrollToTop from "../utilities/ScrollToTop";
import { useDispatch, useSelector } from "react-redux";
import Burger from "../components/Burger";
import { useNavigate } from "react-router-dom";
import {
  create_product,
  delete_product,
  fetch_my_products,
  update_product,
} from "../redux/reducers/product_slice";
import { fetch_user, signout } from "../redux/reducers/user_slice";
import Loading from "../components/Loading";
import ProductsSkeleton from "../components/ProductsSkeleton";
import { CreateSelect } from "../components/CustomSelect";
import { error, success } from "../redux/reducers/notification_slice";

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [createProduct, setCreateProduct] = useState(false);
  const { user, loading_user, loading_signout } = useSelector(
    (state) => state.user
  );
  const { products, loading_products, categories } = useSelector(
    (state) => state.product
  );

  const [loading_create, set_loading_create] = useState(false);

  const handleNavigate = (to) => {
    if (to === "home") {
      navigate("/");
    } else if (to === "signin") {
      navigate("/authentication/signin");
    } else if ("products") {
      navigate("/products/search/all/all");
    }
  };

  const handleSignout = () => {
    dispatch(signout()).then((res) => {
      if (res.error) {
        dispatch(error(res.error.message));
      } else {
        dispatch(success("Signed out successfully"));
      }
    });
  };

  useEffect(() => {
    const loading = loading_user || loading_products || loading_create;
    document.body.style.overflow = loading ? "hidden" : "auto";
  }, [loading_user, loading_products, loading_create]);

  useEffect(() => {
    dispatch(fetch_user()).then((res) => {
      if (res.error) {
        handleNavigate("signin");
      } else {
        dispatch(fetch_my_products());
      }
    });
  }, [loading_create, loading_signout]);

  const Header = () => {
    return (
      <section className="sticky top-0 z-40 text-xl">
        <div className="bg-white border-b border-color1 flex flex-col md:flex-row justify-between py-4">
          <div className="flex justify-between items-center w-full md:w-1/4">
            <img
              src="/icons/return.svg"
              className="cursor-pointer"
              width={45}
              height={45}
              alt=""
              onClick={() => handleNavigate("products")}
            />
            <div className="w-full flex justify-end">
              <Burger target=".menu" />
            </div>
          </div>
          <div className="menu hidden md:flex w-full">
            <div className="w-full flex justify-end pt-4 md:pt-0 flex-col md:flex-row gap-1 md:gap-4">
              <div
                className="flex justify-start items-center gap-1 cursor-pointer "
                onClick={() => handleSignout()}
              >
                <div className="hidden md:flex justify-center items-center p-2 bg-color1 bg-opacity-5 rounded-full hover:bg-opacity-25 transition-all ease-in-out duration-500">
                  <img src="/icons/signout.svg" width={25} height={25} alt="" />
                </div>
                <h1 className="block md:hidden">Signout</h1>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  const Product = (product) => {
    const [updating, setUpdating] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [update, setUpdate] = useState(false);
    const [expand, setExpand] = useState(false);
    const [imgLoaded, setImgLoaded] = useState(false);

    const [name, setName] = useState(product.name);
    const [desc, setDesc] = useState(product.desc);

    return (
      <div
        className={`relative w-full h-[325px] md:h-[300px] lg:h-[275px] xl:h-[250px] bg-white drop-shadow-md rounded-lg overflow-hidden ${
          imgLoaded ? "cursor-pointer" : ""
        }`}
        onMouseEnter={() => {
          if (imgLoaded && !update) {
            setExpand(true);
          }
        }}
        onMouseLeave={() => {
          if (imgLoaded && !update) {
            setExpand(false);
          }
        }}
      >
        <div
          className={`w-full ${
            expand ? "h-[10%]" : "h-full"
          } transition-height ease-in-out duration-500 relative`}
        >
          <img
            src={`${imgLoaded ? product.image : "/icons/img-loader.svg"}`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            onLoad={() => setImgLoaded(true)}
          />
          <div className="absolute inset-0 bottom-0 flex justify-center items-end">
            <div className="w-full flex justify-center">
              {expand ? (
                <img src="/icons/notexpand.svg" width={25} alt="" />
              ) : (
                <img src="/icons/expand.svg" width={25} alt="" />
              )}
            </div>
          </div>
        </div>
        <div className={`w-full h-[75%] p-1 overflow-hidden`}>
          <textarea
            rows={2}
            className={`${
              update
                ? "bg-black bg-opacity-10 focus:bg-opacity-5"
                : "bg-transparent uppercase text-xl font-bold"
            } placeholder:text-color1 focus:outline-none p-1 w-full`}
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={!update}
          />
          <textarea
            rows={5}
            className={`${
              update
                ? "bg-black bg-opacity-10 focus:bg-opacity-5"
                : "bg-transparent"
            } placeholder:text-color1 focus:outline-none p-1 w-full`}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            disabled={!update}
          />
        </div>
        {update ? (
          <div className="p-1 h-[15%] flex justify-center items-center w-full gap-1">
            <button
              className="w-full h-full rounded-lg border border-color1 border-dashed hover:bg-color1 hover:text-white transition-all ease-in-out duration-300"
              onClick={() => {
                const inputs = {};
                if (
                  name.replace(/\s/g, "") !== product.name.replace(/\s/g, "") &&
                  name.replace(/\s/g, "") !== ""
                ) {
                  inputs["name"] = name;
                }
                if (
                  desc.replace(/\s/g, "") !== product.desc.replace(/\s/g, "") &&
                  desc.replace(/\s/g, "") !== ""
                ) {
                  inputs["desc"] = desc;
                }
                inputs["_id"] = product._id;

                if (
                  name.replace(/\s/g, "") === product.name.replace(/\s/g, "") &&
                  desc.replace(/\s/g, "") === product.desc.replace(/\s/g, "")
                ) {
                  dispatch(error("No changes"));
                } else {
                  setUpdating(true);
                  dispatch(update_product(inputs)).then((res) => {
                    if (res.error) {
                      dispatch(error(res.error.message));
                    } else {
                      dispatch(success("Updated"));
                      setUpdate(false);
                    }
                    setUpdating(false);
                  });
                }
              }}
            >
              Update
            </button>
            <button
              className="w-full h-full rounded-lg border border-color1 border-dashed hover:bg-color1 hover:text-white transition-all ease-in-out duration-300"
              onClick={() => {
                setName(product.name);
                setDesc(product.desc);
                setUpdate(false);
              }}
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="p-1 h-[15%] flex justify-center items-center w-full gap-1">
            <button
              className="w-full h-full rounded-lg border border-color1 border-dashed hover:bg-color1 hover:text-white transition-all ease-in-out duration-300"
              onClick={() => setUpdate(true)}
            >
              Enable update
            </button>
            <button
              className="w-full h-full rounded-lg border border-color1 border-dashed hover:bg-color1 hover:text-white transition-all ease-in-out duration-300"
              onClick={() => {
                setDeleting(true);
                dispatch(delete_product(product._id)).then((res) => {
                  if (res.error) {
                    dispatch(error(res.error.message));
                  } else {
                    dispatch(success("Deleted"));
                    dispatch(fetch_my_products());
                  }
                  setDeleting(false);
                });
              }}
            >
              delete
            </button>
          </div>
        )}
        {updating && <Loading w={35} h={35} text="Updating" />}
        {deleting && <Loading w={35} h={35} text="Deleting" />}
      </div>
    );
  };

  const Content = () => {
    return (
      <section className="pt-4 space-y-4">
        <div className="w-full flex justify-end items-center">
          <div className="w-full md:w-1/4 flex justify-evenly items-center gap-2">
            <button
              className="w-full border border-color1 border-dashed hover:bg-color1 hover:text-white py-1 rounded-lg"
              onClick={() => setCreateProduct(true)}
            >
              New
            </button>
          </div>
        </div>
        <div>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {loading_products ? (
              <ProductsSkeleton />
            ) : (
              products.map((product) => {
                return (
                  <li key={product._id}>
                    <Product {...product} />
                  </li>
                );
              })
            )}
          </ul>
        </div>
      </section>
    );
  };

  const CreateNewProduct = () => {
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState(null);

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
      <CustomModal
        show={createProduct}
        setShow={setCreateProduct}
        style="relative"
      >
        <div className="w-full bg-color1 rounded-md flex justify-center items-center">
          <h1 className="text-4xl uppercase font-bold text-color4">
            Product Info
          </h1>
        </div>
        <div className="relative flex items-center border border-color1 border-dashed rounded-md">
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <img src="/icons/product-name.svg" width={30} height={30} alt="" />
          </span>
          <input
            type="text"
            placeholder="PRODUCT NAME"
            onChange={(e) => setName(e.target.value)}
            className="w-full py-2 pl-12 pr-2 rounded-md focus:outline-none placeholder:text-color1 focus:bg-black focus:bg-opacity-5"
          />
        </div>
        <div className="relative flex items-center border border-color1 border-dashed rounded-md">
          <textarea
            rows={5}
            placeholder="PRODUCT DESCRIPTION"
            onChange={(e) => setDesc(e.target.value)}
            className="w-full rounded-md focus:outline-none placeholder:text-color1 focus:bg-black focus:bg-opacity-5 p-2"
          />
        </div>
        <div className="relative flex items-center border border-color1 border-dashed rounded-md">
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <img src="/icons/product-price.svg" width={30} height={30} alt="" />
          </span>
          <input
            type="number"
            placeholder="PRODUCT PRICE"
            onChange={(e) => setPrice(e.target.value)}
            className="w-full py-2 pl-12 pr-2 rounded-md focus:outline-none placeholder:text-color1 focus:bg-black focus:bg-opacity-5"
          />
        </div>
        <FileInput />
        <CreateSelect
          options={categories}
          category={category}
          setCategory={setCategory}
        />
        <button
          className="border border-color1 border-dashed w-full py-1 rounded-lg hover:bg-color1 hover:text-white"
          onClick={() => {
            set_loading_create(true);
            dispatch(
              create_product({ name, desc, price, image, category })
            ).then((res) => {
              if (res.error) {
                dispatch(error(res.error.message));
              } else {
                dispatch(success("Success"));
              }
              set_loading_create(false);
              setCreateProduct(false);
            });
          }}
        >
          Create
        </button>
        {loading_create && <Loading text="creating product" />}
      </CustomModal>
    );
  };

  return (
    <>
      <ScrollToTop />
      <div className="relative px-2 xm:px-4 sm:px-8 md:px-16 lg:px-32 xl:px-64 text-color1">
        <Header />
        <Content />
        {loading_user && (
          <div className="fixed inset-0 flex flex-col justify-center items-center z-50">
            <Loading h={75} w={75} text="Authenticating" />
          </div>
        )}
        <CreateNewProduct />
      </div>
    </>
  );
}
