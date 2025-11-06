const axios = require("axios");
const { BASE_STORE_URL, SHOPIFY_ACCESS_TOKEN } = require("../utils/config");

const shopifyApi = axios.create({
  baseURL: `${BASE_STORE_URL}/admin/api/2023-10`,
  headers: {
    "X-Shopify-Access-Token": SHOPIFY_ACCESS_TOKEN,
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

module.exports = shopifyApi;
