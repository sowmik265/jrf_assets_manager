import pool from '../../../lib/db'; // Adjust the path if needed

export async function GET() {
  try {
    // Test query
    const [rows] = await pool.execute('SELECT 1');
    return new Response(JSON.stringify({ message: 'Database connected successfully', rows }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Database connection failed', error: error.message }), {
      status: 500,
    });
  }
}
