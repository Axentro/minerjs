const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:3000/peer');
const M_TYPE_MINER_HANDSHAKE = 0x0001;
const CORE_VERSION = 1;
const PUBLIC_KEY = "d64f0636919b011ea396f70ae31dffce8dda51a11c3aa0b7be2728d0f3bf7dda";

ws.on('open', function open() {
  content = {
    "version": CORE_VERSION, 
    "mid": "535061bddb0549f691c8b9c012a55ee2", 
    "address": "VDBjY2NmOGMyZmQ0MDc4NTIyNDBmYzNmOWQ3M2NlMzljODExOTBjYTQ0ZjMxMGFl"
    };
  m = {"type": M_TYPE_MINER_HANDSHAKE, 
      "content": JSON.stringify(content)};
  ws.send(JSON.stringify(m));
});

ws.on('message', function incoming(data) {
  data = JSON.parse(data);
  console.log(`TnxnType: ${data.type}`);
  content = JSON.parse(data.content);
  console.log(content);
  console.log(content.block.transactions);
});