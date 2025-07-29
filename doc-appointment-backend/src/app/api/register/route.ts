import { NextRequest, NextResponse } from 'next/server'
import postgres from 'postgres'

const sql = postgres(process.env.POSTGRES_URL!)

//  Minimal CORS headers
export async function OPTIONS() {
  return new Response(null, { status: 204 });
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, role} = await request.json()

    const [first_name, ...rest] = name.trim().split(' ')
    const last_name = rest.join(' ') || ''

    if (role === 'patient') {
      await sql`
        INSERT INTO patients (first_name, last_name, email, password, phone, role, age, gender, blood_group)
        VALUES (${first_name}, ${last_name}, ${email}, ${password}, '+123-456', ${role}, 34, 'Male', 'A-')
      `
    } else if (role === 'doctor') {
      await sql`
        INSERT INTO doctors (first_name, last_name, email, password, phone, role, specialization, experience, rating, consultation_fee)
        VALUES (${first_name}, ${last_name}, ${email}, ${password}, '+123-456', ${role}, 'General', 5, 4.5, 100)
      `
    } else {
      return NextResponse.json({ error: 'Invalid role' }, { status: 400 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Registration failed', details: (error as Error).message },
      { status: 500 }
    )
  }
}