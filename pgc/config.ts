const getEnvironmentVariable = (environmentVariable: string): string => {
    const unvalidatedEnvironmentVariable = process.env[environmentVariable];
    if (!unvalidatedEnvironmentVariable) {
      throw new Error(
        `Couldn't find environment variable: ${environmentVariable}`
      );
    } else {
      return unvalidatedEnvironmentVariable;
    }
};

export const config = {
    domain: getEnvironmentVariable("DOMAIN"),
    dbKey: getEnvironmentVariable("DB_URI"),
    sgKey: getEnvironmentVariable("SG_KEY"),
    accessTokenSecret: getEnvironmentVariable("ACCESS_TOKEN_SECRET"),
    refreshTokenSecret: getEnvironmentVariable("REFRESH_TOKEN_SECRET")
};