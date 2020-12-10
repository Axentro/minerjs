const argon2 = require('argon2');

function bnToHex(bn) {
    bn = BigInt(bn);
  
    var pos = true;
    if (bn < 0) {
      pos = false;
      bn = bitnot(bn);
    }
  
    var hex = bn.toString(16);
    if (hex.length % 2) { hex = '0' + hex; }
  
    // if (pos && (0x80 & parseInt(hex.slice(0, 2), 16))) {
    //   hex = '00' + hex;
    // }
  
    return hex;
  }

  
  function toBits(byte) { 
    var bits = [];
    for(var x=7; x>=0; x--){
        bits.push((byte&Math.pow(2,x))>>x);
      }
      return bits;
  }

  async function validateNonce(block_hash, block_nonce, difficulty) {
    nonce = bnToHex(block_nonce);

    if (nonce.length % 2 === 1) {
        nonce = '0' + nonce;
    };

    const salt = Buffer.from(nonce);

    const hash = await argon2.hash(block_hash, {
        type: argon2.argon2id,
        hashLength: 512,
        timeCost: 1,
        memoryCost: 65536,
        parallelism: 1,
        raw: true,
        salt
    });

    const bits = Array.from(hash).map(toBits).flat();
    const leading_bits = bits.slice(0, difficulty).join("");
    return leading_bits.split("1")[0].length;
  }

async function f1() {

    const difficulty = 7;
    const block_hash = 'f60db23095ad40a0f5486e5e91e09d3475544dc3d346f4ea1d350f7708b86b0f';
   
    while(true){
      let nonce = Math.floor(Math.random() * 1000000000000);
      const res = await validateNonce(block_hash, nonce, difficulty);
      if(res === difficulty){
        console.log('matched difficulty: ' + res + ' expected difficulty: ' + difficulty + ' with nonce: ' + nonce);
      }
    }
}
  
f1();