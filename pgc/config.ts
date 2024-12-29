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
    mapKey: getEnvironmentVariable("MAPS_API_KEY"),
};