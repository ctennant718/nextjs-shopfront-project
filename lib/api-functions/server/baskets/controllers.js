import { addBasketSchema, updateBasketSchema } from "@/lib/validation/index";
import {
  fetchBasket,
  fetchBaskets,
  add,
  update,
  remove,
} from "@/lib/api-functions/server/baskets/queries";
import Basket from "@/lib/api-functions/server/baskets/model";

const getBaskets = async (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  console.log("🚀 ~ file: controllers.js:9 ~ getBaskets ~ id:", id);

  try {
    let data = [];
    if (id) {
      data = await fetchBasket(id);
    } else {
      data = await fetchBaskets();
    }
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const addBasket = async (req, res, isAdmin) => {
  let BasketData = { ...req.body };

  if (BasketData.image === "") {
    delete BasketData.image;
  }
  console.info(BasketData);

  try {
    BasketData = await addBasketSchema.validate(BasketData);
  } catch (err) {
    return res.status(400).json(err);
  }

  try {
    const result = await add(BasketData);
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

const updateBasket = async (req, res, isAdmin) => {
  const { id } = req.params;
  console.log(id);

  if (!id) {
    return res.status(400).json({ message: "No id provided to update" });
  }

  let updates = { ...req.body };

  try {
    updates = await updateBasketSchema.validate(updates);
  } catch (err) {
    return res.status(400).json(err);
  }

  try {
    const result = await update(id, updates);
    if (result.n === 0) return res.status(404).send({ message: "Not Found" });
    return res.status(200).send({ message: "Updated" });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

const removeBasket = async (req, res) => {
  const { id } = req.params;
  console.log("🚀 ~ file: controllers.js:99 ~ removeBasket ~ id:", id);

  if (!id) {
    return res.status(400).json({ message: "No id provided to delete" });
  }

  const query = {
    _id: id,
  };

  // if (!isAdmin) {
  //   query.owner = req.user.sub;
  // }

  try {
    const result = await remove(id);
    if (result.n === 0) return res.status(404).send({ message: "Not Found" });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

export { getBaskets, addBasket, updateBasket, removeBasket };
