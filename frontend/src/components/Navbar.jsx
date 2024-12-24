import { useContext, useState } from "react";
import { assets } from "../assets/frontend_assets/assets.js";
import { NavLink, Link } from "react-router";
import { ShopContext } from "../context/ShopContext.jsx";

const Navbar = () => {
  const [visible, setVisible] = useState(false);

  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
  };

  return (
    <div>
      <div className="flex items-center justify-between py-5 font-medium">
        <Link to="/">
          <img src={assets.logo} className="w-36" />
        </Link>

        <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
          <NavLink to="/" className="flex flex-col items-center gap-1">
            <p>HOME</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
          <NavLink
            to="/collection"
            className="flex flex-col items-center gap-1"
          >
            <p>COLLECTION</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
          <NavLink to="/about" className="flex flex-col items-center gap-1">
            <p>ABOUT</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
          <NavLink to="/contact" className="flex flex-col items-center gap-1">
            <p>CONTACT</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
        </ul>

        <div className="flex items-center gap-6">
          <img
            onClick={() => setShowSearch(true)}
            src={assets.search_icon}
            className="w-5 cursor-pointer"
          />

          <div className="group relative">
            <img
              onClick={() => (token ? null : navigate("/login"))}
              src={assets.profile_icon}
              className="w-5 cursor-pointer"
            />
            {token && (
              <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
                <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                  <p className="cursor-pointer hover:text-black">My Profile</p>
                  <p
                    onClick={() => navigate("/orders")}
                    className="cursor-pointer hover:text-black"
                  >
                    Orders
                  </p>
                  <p
                    onClick={logout}
                    className="cursor-pointer hover:text-black"
                  >
                    Logout
                  </p>
                </div>
              </div>
            )}
          </div>
          <Link to="/cart" className="relative">
            <img src={assets.cart_icon} className="w-5 min-w-5" />
            <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
              {getCartCount()}
            </p>
          </Link>
          <img
            src={assets.menu_icon}
            onClick={() => setVisible(true)}
            className="w-5 cursor-pointer sm:hidden"
          />
        </div>
        <div
          className={`absolute top-0 right-0 bottom-0 bg-white overflow-hidden transition-transform duration-300 ${
            visible ? "translate-x-0 w-full" : "translate-x-full w-0 hidden"
          }`}
        >
          <div className="flex flex-col text-gray-500 text-left pt-2">
            <ul>
              <li className="flex flex-row align-middle items-center gap-3 pl-4">
                <img
                  onClick={() => setVisible(false)}
                  src={assets.dropdown_icon}
                  className="h-4 rotate-180"
                />
                <p>Back</p>
              </li>
              <hr className="w-100 pl-0 mt-2" />
              <NavLink to="/">
                <div
                  onClick={() => setVisible(false)}
                  className="items-center pl-4 py-4"
                >
                  <p>HOME</p>
                </div>
              </NavLink>
              <hr className="w-100 pl-0 " />
              <NavLink to="/collection">
                <div
                  onClick={() => setVisible(false)}
                  className="items-center pl-4 py-4"
                >
                  <p>COLLECTION</p>
                </div>
              </NavLink>
              <hr className="w-100 pl-0 " />
              <NavLink to="/about">
                <div
                  onClick={() => setVisible(false)}
                  className="items-center pl-4 py-4"
                >
                  <p>ABOUT</p>
                </div>
              </NavLink>
              <hr className="w-100 pl-0 " />
              <NavLink to="/contact">
                <div
                  onClick={() => setVisible(false)}
                  className="items-center pl-4 py-4"
                >
                  <p>CONTACT</p>
                </div>
              </NavLink>
              <hr className="w-100 pl-0 " />
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
