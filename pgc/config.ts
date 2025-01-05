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
    dbKey: getEnvironmentVariable("DB_URI"),
    sgKey: getEnvironmentVariable("SG_KEY"),
    accessTokenSecret: getEnvironmentVariable("TOKEN_SECRET"),
  };