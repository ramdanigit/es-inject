const elasticsearch = require("elasticsearch");
// const data = require("./data");

const client = new elasticsearch.Client({
  hosts: ["http://30.30.30.10:9200"],
});

function connect(callback) {
  client.ping(
    {
      requestTimeout: 3000,
    },
    function (error) {
      if (error) {
        callback("error");
      } else {
        callback("work");
      }
    }
  );
}

function createIndex() {
  client.indices.create(
    {
      index: "cdr_test",
      // requestTimeout: Infinity,
    },
    function (error, response, status) {
      console.log(status);
      // if (error) {
      //   callback("error")
      //   console.log("create index error or index has been create");
      // } else {
      //   callback()
      //   console.log("created a new index");
      // }
    }
  );
}

async function selectData(value = []) {
  const response = await client.msearch({
    body: [
      { index: "cdr_test", type: "_doc" },
      { query: { query_string: { query: '"890221"' } } },
    ],
  });
  console.log(response);
  // client.g
  // client.index(
  //   {
  //     index: "testing",
  //     // id: "1s",
  //     body: {
  //       Key1: "Content for key one",
  //       Key2: "Content for key two",
  //       Key3: "Content for key two",
  //       Key4: "Content for key two",
  //     },
  //   },
  //   function (err, resp, status) {
  //     console.log(resp);
  //     console.log(status);
  //   }
  // );
}

function addData(value = []) {
  // data.data.result.map((value) => {
  // client.index(
  //   {
  //     index: "testing",
  //     // id: "1s",
  //     body: {
  //       date: value[0],
  //       time: value[1],
  //       Duration: value[2],
  //       ANumber: value[3],
  //       AImei: value[4],
  //       AImeiType: value[5],
  //       AImsi: value[6],
  //       Alaccid: value[7],
  //       ASitename: value[8],
  //       BNumber: value[9],
  //       BImei: value[10],
  //       BImeiType: value[11],
  //       BImsi: value[12],
  //       Blaccid: value[13],
  //       BSitename: value[14],
  //       Calltype: value[15],
  //       direction: value[16],
  //       C_number: value[17],
  //       Alatitude: value[18],
  //       Alongitude: value[19],
  //       Blatitude: value[20],
  //       Blongitude: value[21],
  //       Key23: value[22],
  //       Key24: value[23],
  //       Key25: value[24],
  //       Key26: value[25],
  //       Key27: value[26],
  //       Key28: value[27],
  //       Key29: value[28],
  //     },
  //   },
  //   function (err, resp, status) {
  //     console.log(resp);
  //     console.log(err);
  //     // console.log(status);
  //   }
  // );
  // console.log(value[27]);
  // });
  // console.log(value[0]);
  client.index(
    {
      index: "cdr_test",
      // id: "1s",
      body: {
        MSISDN_REQUEST_ID: value[0],
        date: value[1],
        time: value[2],
        Duration: value[3],
        ANumber: value[4],
        AImei: value[5],
        AImeiType: value[6],
        AImsi: value[7],
        Alaccid: value[8],
        ASitename: value[9],
        BNumber: value[10],
        BImei: value[11],
        BImeiType: value[12],
        BImsi: value[13],
        Blaccid: value[14],
        BSitename: value[15],
        Calltype: value[16],
        direction: value[17],
        C_number: value[18],
        Alatitude: value[19],
        Alongitude: value[120],
        Blatitude: value[21],
        Blongitude: value[21],
        AContact: value[22],
        BContact: value[23],
        // Key25: value[24],
        // Key26: value[25],
        // Key27: value[26],
        // Key28: value[27],
        // Key29: value[28],
      },
    },
    function (err, resp, status) {
      // console.log(resp);
      // console.log(status);
    }
  );
}

exports.connect = connect;
exports.createIndex = createIndex;
exports.addData = addData;
exports.selectData = selectData;
