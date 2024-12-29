import { config } from '../../config';

const accessSecret: string = config.accessTokenSecret;
const refreshSecret: string = config.refreshTokenSecret;

export default { accessSecret, refreshSecret };