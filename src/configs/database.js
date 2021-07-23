const oracledb = require("oracledb");
let connection;

oracledb.fetchAsBuffer = [oracledb.BLOB];
async function connect(callback) {
  try {
    connection = await oracledb.getConnection({
      user: "IQCDR",
      password: "p455w0rd",
      connectString: "30.30.30.11:1521/ORCLCDB",
    });
    callback(connection);
    console.log("Successfully connected to Oracle!");
  } catch (err) {
    console.log(err);
    callback("error");
  }
}

async function getData(connectionParam, callback) {
  try {
    const result = await connectionParam.execute(
      `SELECT * FROM VIEW_JSON_RESULTS_MSISDN_V01 WHERE MSISDN_REQUEST_ID = 890237`,
      // `SELECT *
      //   FROM JSON_RESULTS_IMEI_V01
      //   WHERE IS_ES = :yesno
      //   AND
      //   PK_ID = :pkid
      //   `,
      {
        // yesno: 0,
        // pkid: 2,
      }
    );
    // console.log(result);
    callback(result);
  } catch (error) {
    console.log(error);
    callback("error");
  }
}

async function getDataSelect(connectionParam, selectValue, callback) {
  try {
    const result = await connectionParam.execute(
      `SELECT * FROM VIEW_JSON_RESULTS_MSISDN_V01 WHERE MSISDN_REQUEST_ID > ${selectValue} AND MSISDN_REQUEST_ID < ${
        parseInt(selectValue) + 5
      }`,
      // `SELECT *
      //   FROM JSON_RESULTS_IMEI_V01
      //   WHERE IS_ES = :yesno
      //   AND
      //   PK_ID = :pkid
      //   `,
      {
        // yesno: 0,
        // pkid: 2,
      }
    );
    // console.log(result);
    callback(result);
  } catch (error) {
    console.log(error);
    callback("error");
  }
}

async function editData(pk_id, connectionParam) {
  try {
    const result = await connectionParam.execute(
      `UPDATE FROM JSON_RESULTS_IMEI_V01 SET IS_ES = 1 WHERE PK_ID = :pk_id`,
      // `SELECT *
      //   FROM JSON_RESULTS_IMEI_V01
      //   WHERE IS_ES = :yesno
      //   AND
      //   PK_ID = :pkid
      //   `,
      {
        // yesno: 0,
        pk_id: pk_id,
      }
    );

    // callback(result);
  } catch (error) {
    // callback("error");
  }
}

exports.connect = connect;
exports.getData = getData;
exports.editData = editData;
exports.getDataSelect = getDataSelect;
// exports.connection = connection;
