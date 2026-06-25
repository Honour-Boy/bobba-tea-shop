import axios from "axios";

export const FormApi = {
  site: "https://x8ki-letl-twmt.n7.xano.io/api:Y14Mm9XE",
  Array: [],

  read: async function () {
    const response = await axios.get(`${this.site}/login`);
    return response.data;
  },

  create: async function (data) {
    await axios
      .post(`${this.site}/login`, data)
      .then((res) => {
        this.Array.push(res.status);
      })
      .catch((err) => {
        this.Array.push(err.message);
      });
  },
};
