export const buildTimeVariables = {
  // @REVIEW typecasting as string here unsafe, ive had success in personal
  // projects using zod to parse an object comprised of env variables and
  // exporting that instead, which means we can throw early on missing
  // environment variables
  apiHost: import.meta.env.VITE_API_HOST as string,
  isDevelopmentEnvironment: import.meta.env.DEV,
  isProductionEnvironment: import.meta.env.PROD, 
};
