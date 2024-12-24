import { v2 as cloudinary } from "cloudinary";
import productModel from "./../models/productModel.js";

const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    const productData = {
      name,
      description,
      category,
      subCategory,
      price: Number(price),
      bestseller: bestseller === "true" ? true : false,
      sizes: JSON.parse(sizes),
      image: imagesUrl,
      date: Date.now(),
    };

    const product = new productModel(productData);
    await product.save();

    res.json({
      statusCode: 200,
      message: "product added",
      product,
    });
  } catch (error) {
    console.error(error);

    res.json({
      status: 300,
      message: error.message,
    });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await productModel.find({});

    res.json({
      statusCode: 200,
      message: "here are the products",
      products,
    });
  } catch (error) {
    console.error(error);
    res.json({
      statusCode: 400,
      message: error.message,
    });
  }
};

const getTheProduct = async (req, res) => {
  try {

    const {productId} = req.body

    const product = await productModel.findById(productId)

    res.json({
      statusCode: 200,
      message: "this is the product",
      product,
    });
  } catch (error) {
    console.error(error);
    res.json({
      statusCode: 300,
      message: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);

    res.json({
      statusCode: 200,
      message: "deleted",
    });
  } catch (error) {
    console.error(error);

    res.json({
      statusCode: 404,
      message: error.message,
    });
  }
};

export { addProduct, getProducts, getTheProduct, deleteProduct };
