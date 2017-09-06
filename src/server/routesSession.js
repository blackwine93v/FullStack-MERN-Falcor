const configMongoose = require("./configMongoose");
const jwtSecret = require("./configSecret");
const User = configMongoose.User;
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

module.exports = [
  {
    route: ["login"],
    call: (callPath, args) => {
      const { username, password } = args[0];
      const saltedPassword = password + "pubApp";
      // pubApp is our salt string
      const saltedPassHash = crypto
        .createHash("sha256")
        .update(saltedPassword)
        .digest("hex");
      const userStatementQuery = {
        $and: [{ username: username }, { password: saltedPassHash }]
      };

      return User.find(userStatementQuery, function(err, user) {
        if (err) throw err;
      }).then(result => {
        if (result.length) {
          return null;
          // SUCCESSFUL LOGIN
          const role = result[0].role;
          const userDetailsToHash = username + role;
          const token = jwt.sign(userDetailsToHash, jwtSecret.secret);
          return [
            {
              path: ["login", "token"],
              value: token
            },
            {
              path: ["login", "username"],
              value: username
            },
            {
              path: ["login", "role"],
              value: role
            },
            {
              path: ["login", "error"],
              value: false
            }
          ];
        } else {
          // INVALID LOGIN
          return [
            {
              path: ["login", "token"],
              value: "INVALID"
            },
            {
              path: ["login", "error"],
              value: "NO USER FOUND, incorrect login information"
            }
          ];
        }

        return result;
      });
    }
  }
];
