import { NextRequest, NextResponse } from 'next/server'
import postgres from 'postgres'

const sql = postgres(process.env.POSTGRES_URL!)

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const doctorId = searchParams.get('doctor_id')
  if (!doctorId) {
    return NextResponse.json({ error: 'Missing doctor_id' }, { status: 400 })
  }
  try {
    const appointments = await sql`
    SELECT 
        a.*, 
        p.first_name AS patient_first_name, 
        p.last_name AS patient_last_name, 
        p.email AS patient_email,
        p.age AS patient_age,
        p.gender AS patient_gender,
        p.blood_group AS patient_blood_group
    FROM appointments a
    JOIN patients p ON a.patient_id = p.id
    WHERE a.doctor_id = ${doctorId}
            AND a.patient_id IS NOT NULL
    ORDER BY a.date DESC, a.start_time DESC
    `
    return NextResponse.json(appointments)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch appointments' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  const { id, status } = await request.json();
  if (!id || !status) {
    return NextResponse.json({ error: "Missing id or status" }, { status: 400 });
  }
  try {
    await sql`
      UPDATE appointments
      SET status = ${status}
      WHERE id = ${id}
    `;
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update appointment" }, { status: 500 });
  }
}