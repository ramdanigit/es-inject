const { Client } = require("@elastic/elasticsearch");
const client = new Client({ node: "http://30.30.30.10:9200" });

async function select(callback) {
  const { body } = await client.sql.query({
    body: {
      query:
        'SELECT MSISDN_REQUEST_ID FROM "cdr_test" ORDER BY MSISDN_REQUEST_ID DESC LIMIT 1',
    },
  });
  console.log(body);
  callback(body.rows[0][0]);
}

exports.select = select;
