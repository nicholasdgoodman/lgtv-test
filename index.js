const process = require('process');
const { LGTV } = require('lgtv-ip-control');

console.log('LG TV Tester');

const tvs = [
    new LGTV('10.11.120.231', 'B4:B2:91:E3:45:6A', 'XLDHS44P'),
    new LGTV('10.11.120.232', 'B0:37:95:0C:E9:2C', 'RYP6JO74'),
    new LGTV('10.11.120.233', 'B4:B2:91:E3:45:62', 'MAJFD6MY'),
    new LGTV('10.11.120.239', 'B4:B2:91:E3:44:A0', 'Z9M2G60Z'),
];

const command = process.argv[2];

switch (command) {
    case 'on':
        testOn();
        break;
    case 'connect':
        testConnect();
        break;
    case 'off':
        testOff();
        break;
}

async function testOn() {
    for(let n = 0; n < tvs.length; n++) {
        console.log('Attempting to power on TV', n);
        tvs[n].powerOn();
        await new Promise(rs => setTimeout(rs, 1000));
    }
}

async function testConnect() {
    for(let n = 0; n < tvs.length; n++) {
        console.log('Attempting to connect to TV', n);
        try {
            await tvs[n].connect();
            console.log('Connected to TV', n);
        } catch {
            console.log('Could not connect to TV', n);
        }
        
        await new Promise(rs => setTimeout(rs, 1000));
    }
}

async function testOff() {
    for(let n = 0; n < tvs.length; n++) {
        console.log('Attempting to power off TV', n);
        try {
            await tvs[n].connect();
            await tvs[n].powerOff();
            console.log('Power off command sent to TV', n);
        } catch {
            console.log('Could not power off TV', n);
        }
        
        await new Promise(rs => setTimeout(rs, 1000));
    }
}