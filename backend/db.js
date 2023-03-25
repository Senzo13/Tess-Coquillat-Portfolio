import mysql from "mysql";
const con = mysql.createConnection({
  host: "********",
  user: "******",
  port: "666",
  password: "***********",
  database: "*******",
});

// con.connect(function (err) {
//     if (err) throw err;
//     console.log("Connected!");
// });

setInterval(function () {
  con.query("SELECT 1");
  console.log("ping");
}, 900000);

export { con };
