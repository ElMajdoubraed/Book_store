import axios from "axios";

const url = "/api/user";

export const updateProfile = async (params: object) => {
  await axios.post(`${url}/profile`, params);
};

export const updatePassword = async (params: any) => {
  await axios.post(`${url}/password`, params);
};
