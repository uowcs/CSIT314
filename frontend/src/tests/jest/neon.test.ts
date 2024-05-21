// Polyfills for Node environment
if (typeof setImmediate === 'undefined') {
  global.setImmediate = (fn, ...args) => setTimeout(fn, 0, ...args);
  global.clearImmediate = clearTimeout;
}

import postgres from 'postgres';

describe('Database Connection Tests', () => {
  it('should connect to the database and run a basic query', async () => {
    const sql = postgres(process.env.DATABASE_URL, {
      ssl: { rejectUnauthorized: false }, // Necessary for secure connections
      max: 1 // Use just one connection for testing
    });

    try {
      const result = await sql`SELECT NOW() AS current_time;`;  // Basic test query
      expect(result).toBeDefined();                             // Ensure result is defined
      expect(result.length).toBeGreaterThan(0);                 // Check if any row is returned
      expect(result[0]).toHaveProperty('current_time');         // Check for the expected property
    } catch (error) {
      console.error('Database connection test failed:', error);
      throw error;  // Rethrow to let Jest know the test failed
    } finally {
      await sql.end();  // Clean up the connection
    }
  }, 20000); // Increased timeout for database operations
});
