const argon2 = require('argon2');

async function f1() {
    const hash = await argon2.hash("password");
    console.log(hash);
  }
  
f1();