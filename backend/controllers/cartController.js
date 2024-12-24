import userModel from "../models/userModel.js";

const addToCart = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;

    const userData = await userModel.findById(userId);
    let cartData = await userData.cartData;

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({
      statusCode: 202,
      message: "added to cart",
    });
  } catch (error) {
    console.error(error);
    res.json({
      statusCode: 500,
      error: error.message,
    });
  }
};

const updateCart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;

    const userData = await userModel.findById(userId);
    let cartData = await userData.cartData;

    cartData[itemId][size] = quantity;

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({
      statusCode: 200,
      message: "Cart Updated",
    });
  } catch (error) {
    console.error(error);
    res.json({
      statusCode: 500,
      error: error.message,
    });
  }
};

const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId);
    let cartData = await userData.cartData;

    res.json({
      statusCode: 202,
      cartData,
    });
  } catch (error) {
    console.error(error);
    res.json({
      statusCode: 500,
      message: error.message,
    });
  }
};

export { addToCart, updateCart, getUserCart };
