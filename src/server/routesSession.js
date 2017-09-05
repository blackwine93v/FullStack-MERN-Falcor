const configMongoose = require("./configMongoose");
const User = configMongoose.User;
module.exports = [
  {
    route: ["login"],
    call: (callPath, args) => {
      const { username, password } = args[0];
      const userStatementQuery = {
        $and: [{ username: username }, { password: password }]
      };
    }
  }
];
