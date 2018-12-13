export function loadConfig() {
    const path = require('path');
    let env_path = path.join(__dirname, '/../config', '.env');
    if(process.env.NODE_ENV !== '')
        env_path = path.join(__dirname,'/../config','.env.'+process.env.NODE_ENV);
    console.log(`Loading config parameters from '${env_path}'...\r\n`);
    require('dotenv').config({path: env_path});
}

loadConfig();
