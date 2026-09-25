export function validateEnvironment() {
  if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
    throw new Error("JWT_SECRET must be set to at least 32 characters.");
  }
}
