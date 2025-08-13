import bcrypt from "bcrypt";

const plainPassword = "Admin123"; // password yang kamu masukkan di form
const hashFromDB = "$2b$10$GqIKRTNJkSLz3FfmUJwjG.SV/UpibLBrAkcukbkET/L6BvZ432udO"; // paste hash dari kolom password_hash

bcrypt.compare(plainPassword, hashFromDB).then(match => {
  console.log("Password cocok?", match);
});
