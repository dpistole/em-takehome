export const buildTimeVariables = {
  // @REVIEW typecasting as string here unsafe, ive had success in personal
  // projects using zod to parse an object comprised of env variables and
  // exporting that instead, which means we can throw early on missing
  // environment variables
  isDevelopmentEnvironment: import.meta.env.DEV,
  isProductionEnvironment: import.meta.env.PROD,
  // normally we'd source API host from ENV, but for review im setting static
  // apiHost: import.meta.env.VITE_API_HOST as string,
  apiHost: 'http://localhost:3000', 
};
