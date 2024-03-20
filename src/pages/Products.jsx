import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetch_user, signout } from "../redux/reducers/user_slice";
import Burger from "../components/Burger";
import { error, success } from "../redux/reducers/notification_slice";
import ScrollToTop from "../utilities/ScrollToTop";
import ProductsSkeleton from "../components/ProductsSkeleton";
import { fetch_products } from "../redux/reducers/product_slice";
import { SelectCategory } from "../components/CustomSelect";

export default function Products() {
  const { name, category } = useParams();

  const { user, loading_user, loading_signout } = useSelector(
    (state) => state.user
  );

  const { products, loading_products, error_products, categories, count } =
    useSelector((state) => state.product);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetch_user()).then((res) => {
      if (res.error) {
        handleNavigate("signin");
      } else {
        dispatch(fetch_products({ name, category }));
      }
    });
  }, [loading_signout, name, category]);

  useEffect(() => {
    const loading = loading_user || loading_products;
    document.body.style.overflow = loading ? "hidden" : "auto";
  }, [loading_user, loading_products]);

  const handleNavigate = (to) => {
    if (to === "home") {
      navigate("/");
    } else if (to === "signin") {
      navigate("/authentication/signin");
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

  const Header = () => {
    return (
      <section className="sticky top-0 z-40 text-xl">
        <div className="bg-white border-b border-color1 flex flex-col md:flex-row justify-between py-4">
          <div className="flex justify-between items-center w-full md:w-1/4">
            <div
              className="w-full cursor-pointer text-xl font-semibold"
              onClick={() => handleNavigate("home")}
            >
              RESAYKEL
            </div>
            <div className="w-full flex justify-end">
              <Burger target=".menu" />
            </div>
          </div>
          <div className="menu hidden md:flex w-full">
            <div className="w-full flex justify-end pt-4 md:pt-0 flex-col md:flex-row gap-1 md:gap-4">
              <div
                className="flex justify-start items-center gap-1 cursor-pointer"
                onClick={() => {
                  navigate("/dashboard/manage");
                }}
              >
                <div className="hidden md:flex justify-center items-center p-2 bg-color1 bg-opacity-5 rounded-full hover:bg-opacity-25 transition-all ease-in-out duration-500">
                  <img
                    src="/icons/dashboard.svg"
                    width={25}
                    height={25}
                    alt=""
                  />
                </div>
                <h1 className="block md:hidden">Dashboard</h1>
              </div>
              <div
                className="flex justify-start items-center gap-1 cursor-pointer relative"
                onClick={() => {
                  console.log("open cart modal");
                }}
              >
                <div className="hidden relative md:flex justify-center items-center p-2 bg-color1 bg-opacity-5 rounded-full hover:bg-opacity-25 transition-all ease-in-out duration-500">
                  <img src="/icons/cart.svg" width={25} height={25} alt="" />
                </div>
                <h1 className="block md:hidden">My Cart</h1>
              </div>
              {user ? (
                <div
                  className="flex justify-start items-center gap-1 cursor-pointer "
                  onClick={() => handleSignout()}
                >
                  <div className="hidden md:flex justify-center items-center p-2 bg-color1 bg-opacity-5 rounded-full hover:bg-opacity-25 transition-all ease-in-out duration-500">
                    <img
                      src="/icons/signout.svg"
                      width={25}
                      height={25}
                      alt=""
                    />
                  </div>
                  <h1 className="block md:hidden">Signout</h1>
                </div>
              ) : (
                <div className="flex justify-start items-center gap-1 cursor-pointer ">
                  <div
                    className="hidden md:flex justify-center items-center p-2 bg-color1 bg-opacity-5 rounded-full hover:bg-opacity-25 transition-all ease-in-out duration-500"
                    onClick={() => handleNavigate("signin")}
                  >
                    <img
                      src="/icons/signin.svg"
                      width={25}
                      height={25}
                      alt=""
                    />
                  </div>
                  <h1 className="block md:hidden">Signin</h1>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  };

  const Product = ({ name, desc, image, seller }) => {
    const [expand, setExpand] = useState(false);
    const [imgLoaded, setImgLoaded] = useState(false);
    return (
      <div
        className={`w-full h-[325px] md:h-[300px] lg:h-[275px] xl:h-[250px] bg-white drop-shadow-md rounded-lg overflow-hidden ${
          imgLoaded ? "cursor-pointer" : ""
        }`}
        onMouseEnter={() => {
          if (imgLoaded) {
            setExpand(true);
          }
        }}
        onMouseLeave={() => {
          if (imgLoaded) {
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
            src={`${imgLoaded ? image : "/icons/img-loader.svg"}`}
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
          <h1 className="uppercase text-xl font-bold p-1">{name}</h1>
          <p className="p-1">{desc}</p>
        </div>
        <div className="p-1 h-[15%] flex justify-center items-center w-full">
          {user._id === seller._id ? (
            <button
              className="w-full h-full rounded-lg border border-color1 border-dashed hover:bg-color1 hover:text-white transition-all ease-in-out duration-300"
              onClick={() => navigate("/dashboard/manage")}
            >
              Manage product
            </button>
          ) : (
            <button className="w-full h-full rounded-lg border border-color1 border-dashed hover:bg-color1 hover:text-white transition-all ease-in-out duration-300">
              add to cart
            </button>
          )}
        </div>
      </div>
    );
  };

  const Content = () => {
    const [filterName, setFilterName] = useState(name);

    return (
      <section className="py-4 space-y-4 relative">
        <div className="flex flex-col md:flex-row gap-4">
          <SelectCategory
            options={categories}
            style="w-full md:w-1/2 lg:w-1/4"
            category={category}
            name={filterName}
            navigate={navigate}
          />
          <form
            className="relative flex w-full md:w-1/2 lg:w-1/4"
            onSubmit={(e) => {
              e.preventDefault();
              navigate(
                `/products/search/${category}/${
                  filterName.replace(/\s+/g, "") === "" ? "all" : filterName
                }`
              );
            }}
          >
            <input
              type="text"
              placeholder="Search"
              value={filterName}
              onChange={(e) => {
                setFilterName(e.target.value);
              }}
              className="w-full pl-10 pr-4 rounded-lg focus:outline-none bg-color1 bg-opacity-5 placeholder:text-color1 py-1 hover:bg-opacity-25 transition-colors ease-in-out duration-500"
            />
            <span className="absolute inset-y-0 left-0 pl-2 flex items-center">
              <img src="/icons/search.svg" width={30} height={30} alt="" />
            </span>
          </form>
        </div>
        <>
          {loading_products || loading_user || !user ? (
            <ul className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2">
              <ProductsSkeleton />
            </ul>
          ) : (
            <>
              {products.length > 0 ? (
                <ul className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2">
                  {products.map((product) => {
                    return (
                      <li key={product._id}>
                        <Product {...product} />
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <div className="h-screen w-full flex justify-center items-center">
                  <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col justify-center items-center">
                    <img src="/icons/empty.svg" width={75} height={75} alt="" />
                    <h1>Empty</h1>
                  </div>
                </div>
              )}
            </>
          )}
        </>
      </section>
    );
  };

  return (
    <>
      <ScrollToTop />
      <div className="px-2 xm:px-4 sm:px-8 md:px-16 lg:px-32 xl:px-64 text-color1">
        <Header />
        <Content />
        {loading_user && (
          <div className="fixed inset-0 flex flex-col justify-center items-center z-50">
            <Loading h={75} w={75} text="Authenticating" />
          </div>
        )}
      </div>
    </>
  );
}
