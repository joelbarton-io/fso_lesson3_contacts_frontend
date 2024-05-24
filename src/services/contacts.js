import axios from "axios";
const BaseURL = "/api/persons";

const getAll = async () => {
  const { data } = await axios.get(BaseURL);
  return data;
};

const create = async (newContact) => {
  const { data } = await axios.post(BaseURL, newContact);
  return data;
};

const remove = async (id) => {
  const { data } = await axios.delete(`${BaseURL}/${id}`);
  return data;
};

const update = async (id, updatedContact) => {
  const { data } = await axios.put(`${BaseURL}/${id}`, updatedContact);
  return data;
};
export default {
  getAll,
  create,
  remove,
  update,
};
