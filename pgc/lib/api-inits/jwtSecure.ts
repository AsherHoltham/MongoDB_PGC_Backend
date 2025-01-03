import { config } from '../../config';

const accessSecret: string = config.accessTokenSecret;
const refreshSecret: string = config.refreshTokenSecret;

export default { accessSecret, refreshSecret };

//import secrets from '../../lib/api-inits/jwtSecure';
//const { accessSecret, refreshSecret } = secrets;