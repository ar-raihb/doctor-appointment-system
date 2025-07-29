import { NextRequest, NextResponse } from 'next/server'
import postgres from 'postgres'

const sql = postgres(process.env.POSTGRES_URL!)

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const patientId = searchParams.get('patient_id')
  try {
    if (!patientId) {
      return NextResponse.json({ error: 'Missing patient_id' }, { status: 400 })
    }
    // Get all appointments for this patient, join doctor info for display
    const appointments = await sql`
      SELECT 
        a.*, 
        d.first_name AS doctor_first_name, 
        d.last_name AS doctor_last_name, 
        d.specialization
      FROM appointments a
      JOIN doctors d ON a.doctor_id = d.id
      WHERE a.patient_id = ${patientId}
      ORDER BY a.date DESC, a.start_time DESC
    `
    console.log(appointments);
    return NextResponse.json(appointments)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch appointments' }, { status: 500 })
  }
}