import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import Title from "./../components/Title";
import RelatedProducts from "./../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [leadImage, setLeadImage] = useState("");
  const [size, setSize] = useState("");

  const fetchProductData = () => {
    const product = products.find((item) => item._id === productId);
    if (product) {
      setProductData(product);
      setLeadImage(product.image[0]);
    } else {
      console.error("Product not found");
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex flex-col gap-12 sm:flex-row">
        {/* LEFT SIDE */}
        <div className="flex-1 flex flex-col-reverse sm:flex-row gap-3">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.75%] w-full">
            {productData.image.map((item, index) => {
              return (
                <img
                  onClick={() => setLeadImage(item)}
                  className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                  src={item}
                  key={index}
                />
              );
            })}
          </div>
          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto" src={leadImage} />
          </div>
        </div>

        {/* PRODUCT INFO */}

        <div className="flex-1">
          <p className="font-medium text-2xl mt-2">{productData.name}</p>
          <div className="flex items-center gap-1 mt-2">
            <img className="w-3.5" src={assets.star_icon} />
            <img className="w-3.5" src={assets.star_icon} />
            <img className="w-3.5" src={assets.star_icon} />
            <img className="w-3.5" src={assets.star_icon} />
            <img className="w-3.5" src={assets.star_dull_icon} />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">
            {productData.description}
          </p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => {
                return (
                  <button
                    onClick={() => setSize(item)}
                    key={index}
                    className={`border bg-gray-100 py-2 px-4 ${
                      item === size ? "border-orange-500" : ""
                    } `}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </div>
          <button
            onClick={() => addToCart(productData._id, size)}
            className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
          >
            ADD TO CART
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="flex flex-col text-sm text-gray-500 mt-5 gap-1">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* BELOW PART */}

      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews(122)</p>
        </div>

        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>
            An e-commerce website is an online platform that facilitates the
            buying and selling of products or services over the internet. It
            serves as a virtual marketplace where businesses and individuals can
            showcase their products, interact with customers, and conduct
            transactions without the need for a physical presence. E-commerce
            websites have gained immense popularity due to their convenience,
            accessibility, and the global reach they offer.
          </p>
          <p>
            E-commerce websites typically display products or services along
            with detailed descriptions, images, prices, and any available
            variations (e.g., sizes, colors). Each product usually has its own
            dedicated page with relevant information.
          </p>
        </div>
      </div>

      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  ) : null;
};

export default Product;
