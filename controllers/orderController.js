const ExcelJS = require("exceljs");
const path = require("path");
const fs = require("fs");
const orderServices = require("../services/orderServices");
const shopifyApi = require("../services/shopifyApi");

const orderController = {
  getAllOrders: async (req, res) => {
    try {
      // const { email, username, password } = req.body;
      const response = await orderServices.getAllOrders();

      return res
        .status(200)
        .json({ message: "Orders Retrieved", orders: response });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  // getShopOrders: async (req, res) => {
  //   //   try {
  //   //     const query = `
  //   //     query {
  //   //       orders(first: 100) {
  //   //         edges {
  //   //           node {
  //   //             id
  //   //             createdAt
  //   //             name
  //   //             totalPriceSet {
  //   //               shopMoney {
  //   //                 amount
  //   //                 currencyCode
  //   //               }
  //   //             }
  //   //             customer {
  //   //               id
  //   //               firstName
  //   //               lastName
  //   //               email
  //   //               numberOfOrders
  //   //               orders(first: 5, sortKey: CREATED_AT, reverse: false) {
  //   //                 edges {
  //   //                   node {
  //   //                     createdAt
  //   //                     totalPriceSet {
  //   //                       shopMoney {
  //   //                         amount
  //   //                       }
  //   //                     }
  //   //                   }
  //   //                 }
  //   //               }
  //   //             }
  //   //           }
  //   //         }
  //   //       }
  //   //     }
  //   //   `;

  //   //     const response = await shopifyApi.post("/graphql.json", { query });

  //   //     const orders = response.data.data.orders.edges.map(({ node }) => {
  //   //       const customer = node.customer;
  //   //       const totalOrders = customer?.numberOfOrders || 0;
  //   //       const orderEdges = customer?.orders?.edges || [];

  //   //       // Extract timestamps
  //   //       const dates = orderEdges
  //   //         .map((o) => new Date(o.node.createdAt))
  //   //         .sort((a, b) => a - b);

  //   //       // Compute expected reorder interval (avg days between orders)
  //   //       let reorderInterval = null;
  //   //       if (dates.length > 1) {
  //   //         const gaps = [];
  //   //         for (let i = 1; i < dates.length; i++) {
  //   //           const diffDays = (dates[i] - dates[i - 1]) / (1000 * 60 * 60 * 24);
  //   //           gaps.push(diffDays);
  //   //         }
  //   //         reorderInterval = (
  //   //           gaps.reduce((a, b) => a + b, 0) / gaps.length
  //   //         ).toFixed(1);
  //   //       } else {
  //   //         reorderInterval = "N/A";
  //   //       }

  //   //       const lastOrderValue = parseFloat(node.totalPriceSet.shopMoney.amount);
  //   //       const avgOrderValue =
  //   //         totalOrders > 0 ? (lastOrderValue / totalOrders).toFixed(2) : 0;

  //   //       // Generate sample behavioral data
  //   //       const visits = totalOrders * 3 + Math.floor(Math.random() * 5); // e.g. 3 visits/order
  //   //       const pastAvgVisits = Math.max(
  //   //         1,
  //   //         Math.round(visits / (totalOrders || 1))
  //   //       );
  //   //       const complaints = Math.floor(Math.random() * 3); // 0–2 complaints

  //   //       return {
  //   //         customer_id: customer?.id,
  //   //         first_purchase_date: dates[0] ? dates[0].toISOString() : null,
  //   //         last_purchase_date: dates[dates.length - 1]
  //   //           ? dates[dates.length - 1].toISOString()
  //   //           : null,
  //   //         total_orders: totalOrders,
  //   //         avg_order_value: avgOrderValue,
  //   //         last_order_value: lastOrderValue,
  //   //         visits,
  //   //         past_avg_visits: pastAvgVisits,
  //   //         complaints,
  //   //         expected_reorder_interval: reorderInterval,
  //   //       };
  //   //     });

  //   //     return res.status(200).json({ orders });
  //   //   } catch (error) {
  //   //     console.error(
  //   //       "Shopify API Error:",
  //   //       error.response?.data || error.message
  //   //     );
  //   //     return res.status(500).json({
  //   //       message: "Failed to fetch orders from Shopify",
  //   //       error: error.response?.data || error.message,
  //   //     });
  //   //   }
  //   // },
  //   try {
  //     const query = `
  //       query {
  //         orders(first: 100) {
  //           edges {
  //             node {
  //               id
  //               createdAt
  //               name
  //               totalPriceSet {
  //                 shopMoney {
  //                   amount
  //                   currencyCode
  //                 }
  //               }
  //               customer {
  //                 id
  //                 firstName
  //                 lastName
  //                 email
  //                 numberOfOrders
  //                 orders(first: 5, sortKey: CREATED_AT, reverse: false) {
  //                   edges {
  //                     node {
  //                       createdAt
  //                       totalPriceSet {
  //                         shopMoney {
  //                           amount
  //                         }
  //                       }
  //                     }
  //                   }
  //                 }
  //               }
  //             }
  //           }
  //         }
  //       }
  //     `;

  //     const response = await shopifyApi.post("/graphql.json", { query });

  //     const orders = response.data.data.orders.edges.map(({ node }) => {
  //       const customer = node.customer;
  //       const totalOrders = customer?.numberOfOrders || 0;
  //       const orderEdges = customer?.orders?.edges || [];

  //       const dates = orderEdges
  //         .map((o) => new Date(o.node.createdAt))
  //         .sort((a, b) => a - b);

  //       let reorderInterval = "N/A";
  //       if (dates.length > 1) {
  //         const gaps = [];
  //         for (let i = 1; i < dates.length; i++) {
  //           const diffDays = (dates[i] - dates[i - 1]) / (1000 * 60 * 60 * 24);
  //           gaps.push(diffDays);
  //         }
  //         reorderInterval = (
  //           gaps.reduce((a, b) => a + b, 0) / gaps.length
  //         ).toFixed(1);
  //       }

  //       const lastOrderValue = parseFloat(node.totalPriceSet.shopMoney.amount);
  //       const avgOrderValue =
  //         totalOrders > 0 ? (lastOrderValue / totalOrders).toFixed(2) : 0;

  //       const visits = totalOrders * 3 + Math.floor(Math.random() * 5);
  //       const pastAvgVisits = Math.max(
  //         1,
  //         Math.round(visits / (totalOrders || 1))
  //       );
  //       const complaints = Math.floor(Math.random() * 3);

  //       return {
  //         Customer_ID: customer?.id || "N/A",
  //         Customer_Name: `${customer?.firstName || ""} ${
  //           customer?.lastName || ""
  //         }`.trim(),
  //         Email: customer?.email || "N/A",
  //         First_Purchase_Date: dates[0]
  //           ? dates[0].toISOString().split("T")[0]
  //           : "N/A",
  //         Last_Purchase_Date: dates[dates.length - 1]
  //           ? dates[dates.length - 1].toISOString().split("T")[0]
  //           : "N/A",
  //         Total_Orders: totalOrders,
  //         Avg_Order_Value: avgOrderValue,
  //         Last_Order_Value: lastOrderValue,
  //         Visits: visits,
  //         Past_Avg_Visits: pastAvgVisits,
  //         Complaints: complaints,
  //         Expected_Reorder_Interval: reorderInterval,
  //       };
  //     });

  //     // ✅ Create Excel workbook
  //     const workbook = new ExcelJS.Workbook();
  //     const worksheet = workbook.addWorksheet("Shop Orders");

  //     // Add columns (Excel header)
  //     worksheet.columns = Object.keys(orders[0]).map((key) => ({
  //       header: key.replace(/_/g, " "),
  //       key,
  //       width: 22,
  //     }));

  //     // Add rows
  //     worksheet.addRows(orders);

  //     // Auto-style header
  //     worksheet.getRow(1).eachCell((cell) => {
  //       cell.font = { bold: true };
  //       cell.alignment = { vertical: "middle", horizontal: "center" };
  //     });

  //     // Save Excel file temporarily
  //     const filePath = path.join(__dirname, "../exports/shop_orders.xlsx");
  //     fs.mkdirSync(path.dirname(filePath), { recursive: true });

  //     await workbook.xlsx.writeFile(filePath);

  //     // Send the file as a download
  //     return res.download(filePath, "shop_orders.xlsx", (err) => {
  //       if (err) {
  //         console.error("File download error:", err);
  //         res.status(500).send("Error downloading the file");
  //       } else {
  //         // Optional: delete file after sending
  //         fs.unlinkSync(filePath);
  //       }
  //     });
  //   } catch (error) {
  //     console.error(
  //       "Shopify API Error:",
  //       error.response?.data || error.message
  //     );
  //     return res.status(500).json({
  //       message: "Failed to fetch or export orders from Shopify",
  //       error: error.response?.data || error.message,
  //     });
  //   }
  // },
  getShopOrders: async (req, res) => {
    try {
      const query = `
        query {
          orders(first: 100) {
            edges {
              node {
                id
                createdAt
                name
                totalPriceSet {
                  shopMoney {
                    amount
                    currencyCode
                  }
                }
                customer {
                  id
                  firstName
                  lastName
                  email
                  numberOfOrders
                  orders(first: 5, sortKey: CREATED_AT, reverse: false) {
                    edges {
                      node {
                        createdAt
                        totalPriceSet {
                          shopMoney {
                            amount
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `;

      const response = await shopifyApi.post("/graphql.json", { query });

      const orders = response.data.data.orders.edges.map(({ node }) => {
        const customer = node.customer;
        const totalOrders = customer?.numberOfOrders || 0;
        const orderEdges = customer?.orders?.edges || [];

        const dates = orderEdges
          .map((o) => new Date(o.node.createdAt))
          .sort((a, b) => a - b);

        let reorderInterval = null;
        if (dates.length > 1) {
          const gaps = [];
          for (let i = 1; i < dates.length; i++) {
            const diffDays = (dates[i] - dates[i - 1]) / (1000 * 60 * 60 * 24);
            gaps.push(diffDays);
          }
          reorderInterval = (
            gaps.reduce((a, b) => a + b, 0) / gaps.length
          ).toFixed(1);
        } else {
          reorderInterval = "N/A";
        }

        const lastOrderValue = parseFloat(node.totalPriceSet.shopMoney.amount);
        const avgOrderValue =
          totalOrders > 0 ? (lastOrderValue / totalOrders).toFixed(2) : 0;

        // const visits = totalOrders * 3 + Math.floor(Math.random() * 5);
        // const pastAvgVisits = Math.max(
        //   1,
        //   Math.round(visits / (totalOrders || 1))
        // );
        const visits = totalOrders * 3 + Math.floor(Math.random() * 5);

        // Prevent division by zero
        let pastAvgVisits;
        if (totalOrders > 0) {
          pastAvgVisits = Math.round(visits / totalOrders);
        } else {
          pastAvgVisits = 0; // or "N/A" if you prefer
        }
        const complaints = Math.floor(Math.random() * 3);
        return {
          customer_id: customer?.id || "N/A",
          first_purchase_date: dates[0] ? dates[0].toISOString() : "N/A",
          last_purchase_date: dates[dates.length - 1]
            ? dates[dates.length - 1].toISOString()
            : "N/A",
          total_orders: totalOrders || 0,
          avg_order_value: avgOrderValue || 0,
          last_order_value: lastOrderValue || 0,
          visits: visits || 0,
          past_avg_visits: pastAvgVisits || 0,
          complaints: complaints || 0,
          expected_reorder_interval:
            reorderInterval && reorderInterval !== "N/A"
              ? reorderInterval
              : "N/A",
        };
      });

      // ---- Write to Excel ----
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Shopify Orders");

      worksheet.columns = Object.keys(orders[0] || {}).map((key) => ({
        header: key,
        key,
        width: 20,
      }));

      orders.forEach((order) => worksheet.addRow(order));

      // Ensure export folder exists
      const exportDir = path.join(__dirname, "../exports");
      if (!fs.existsSync(exportDir)) fs.mkdirSync(exportDir);

      // Write file locally
      const filePath = path.join(exportDir, `shop_orders_${Date.now()}.xlsx`);
      await workbook.xlsx.writeFile(filePath);

      console.log(`✅ Excel file created: ${filePath}`);

      return res.status(200).json({
        message: "Excel file created successfully",
        filePath,
        count: orders.length,
      });
    } catch (error) {
      console.error(
        "Shopify API Error:",
        error.response?.data || error.message
      );
      return res.status(500).json({
        message: "Failed to fetch orders from Shopify",
        error: error.response?.data || error.message,
      });
    }
  },
};

module.exports = orderController;
