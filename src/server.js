const express = require("express");
const formData = require("express-form-data");
const elasticsearch = require("elasticsearch");
const database = require("./configs/database");
const elastic = require("./configs/elastic");
const elasticsql = require("./configs/elasticsearch");

// database.connect((connection) => {
//   if (connection === "error") {
//     console.log("Error to connect database oracle.");
//   } else {
//     database.getData(connection, (data) => {
//       if (data === "error") {
//         console.log("select data on oracledb error !!");
//       } else {
//         elastic.connect((statusElastic) => {
//           if (statusElastic === "error") {
//             console.log("Elastic not Connected");
//           } else {
//             // console.log(data.rows);
//             data.rows.map((values, index) => {
//               const dataBlobRow = JSON.parse(values[3].toString());
//               // console.log(dataBlobRow);
//               dataBlobRow.result.map((valuesDataRow) => {
//                 // console.log(valuesDataRow[1]);
//                 elastic.addData(valuesDataRow);
//               });
//               // database.editData(values[0], connection);
//             });
//           }
//         });
//       }
//     });
//   }
// });

const app = express();
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: true }));
app.use(formData.parse());

const port = 3000;
app.get("/", (req, res) => {
  res.send("elastic searcj ingest");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
  // console.log(database.getData());
  // database.connect((connection) => {
  //   database.getData(connection);
  // });
  // database.getData();
  // elastic.connect();
  // elastic.createIndex();
  // elastic.addData();
  // elastic.addData();
  database.connect((connection) => {
    // console.log(connection);
    if (connection === "error") {
      console.log("Error to connect database oracle.");
    } else {
      elastic.connect((statusElastic) => {
        if (statusElastic === "error") {
          console.log("Elastic not Connected");
        } else {
          elasticsql.select((valueSelect) => {
            database.getDataSelect(connection, `${valueSelect}`, (data) => {
              data.rows.map((datas) => {
                elastic.addData(datas);
              });
              // console.log(data);
            });
          });
        }
      });
      // database.getData(connection, (data) => {
      //   // console.log(data);
      //   // data.rows.map((datas) => {
      //   //   elastic.addData(datas);
      //   // });
      //   // elastic.selectData();
      //   // elasticsql.select();

      //   // elastic.createIndex();
      //   // if (data === "error") {
      //   //   console.log("select data on oracledb error !!");
      //   // } else {
      //   //   elastic.connect((statusElastic) => {
      //   //     if (statusElastic === "error") {
      //   //       console.log("Elastic not Connected");
      //   //     } else {
      //   //       // console.log(data.rows);
      //   //       data.rows.map((values, index) => {
      //   //         const dataBlobRow = JSON.parse(values[3].toString());
      //   //         // console.log(dataBlobRow);
      //   //         dataBlobRow.result.map((valuesDataRow) => {
      //   //           // console.log(valuesDataRow[1]);
      //   //           elastic.addData(valuesDataRow);
      //   //         });
      //   //         // database.editData(values[0], connection);
      //   //       });
      //   //     }
      //   //   });
      //   // }
      // });
    }
  });
});

// const oracledb = require("oracledb");
// let connection;

// oracledb.fetchAsBuffer = [oracledb.BLOB];
// async function connect() {
//   try {
//     connection = await oracledb.getConnection({
//       user: "IQCDR",
//       password: "p455w0rd",
//       connectString: "30.30.30.11:1521/ORCLCDB",
//     });
//     // return connection;
//     // const result = await connection.execute(
//     //   `SELECT *
//     //   FROM JSON_RESULTS_IMEI_V01
//     //   WHERE IS_ES = :yesno
//     //   AND
//     //   PK_ID = :pkid
//     //   `,
//     //   {
//     //     yesno: 0,
//     //     pkid: 2,
//     //   }
//     // );

//     // const re = JSON.parse(result.rows[0][3].toString());
//     // console.log(re.result[0]);
//     // console.log(re.result[0][0]);
//     // console.log(re.result[0][1]);
//     console.log("Successfully connected to Oracle!");
//   } catch (err) {
//     return false;
//   }
// }

// // function getData() {
// //   console.log(connection);
// //   // if (connect() === false) {
// //   //   console.log("Error oracle db. ");
// //   // } else {
// //   //   const result = await connect().execute(
// //   //     `SELECT *
// //   //   FROM JSON_RESULTS_IMEI_V01
// //   //   WHERE IS_ES = :yesno
// //   //   AND
// //   //   PK_ID = :pkid
// //   //   `,
// //   //     {
// //   //       yesno: 0,
// //   //       pkid: 2,
// //   //     }
// //   //   );

// //   //   const re = JSON.parse(result.rows[0][3].toString());
// //   //   console.log(result);
// //   // }
// // }

// // connect();
// // getData();
