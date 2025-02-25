import bcrypt from 'bcryptjs';
import pool from '../../../../lib/db'; // MySQL connection file

export async function POST(req) {
  const { firstName, lastName, email, password } = await req.json();

  // Check if the user already exists
  const [existingUser] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
  if (existingUser.length > 0) {
    return new Response(
      JSON.stringify({ message: 'User with this email already exists.' }),
      { status: 400 }
    );
  }

  // Hash the password
  const hashedPassword = bcrypt.hashSync(password, 10); // Hashing with 10 rounds

  try {
    // Insert new user into the database with a default role 'user'
    await pool.execute(
      'INSERT INTO users (first_name, last_name, email, password, role) VALUES (?, ?, ?, ?, ?)',
      [firstName, lastName, email, hashedPassword, 'user']
    );

    return new Response(
      JSON.stringify({ message: 'User registered successfully' }),
      { status: 201 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: 'Error registering user', error: error.message }),
      { status: 500 }
    );
  }
}
