const bcrypt = require("bcrypt");

const plainPassword = "Admin123"; 

bcrypt.hash(plainPassword, 10).then(hash => {
  console.log("Password hash:", hash);
});
