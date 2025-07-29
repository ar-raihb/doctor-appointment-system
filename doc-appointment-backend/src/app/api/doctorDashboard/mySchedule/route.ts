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
    const slots = await sql`
      SELECT id, doctor_id, date, start_time, end_time, patient_id, status
      FROM appointments
      WHERE doctor_id = ${doctorId}
      ORDER BY date DESC, start_time DESC
    `
    return NextResponse.json(slots)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch schedule' }, { status: 500 })
  }
}

// Add a new slot (POST)
export async function POST(request: NextRequest) {
  const { doctor_id, date, start_time, end_time } = await request.json();
  if (!doctor_id || !date || !start_time || !end_time) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  try {
    const result = await sql`
      INSERT INTO appointments (doctor_id, date, start_time, end_time, status)
      VALUES (${doctor_id}, ${date}, ${start_time}, ${end_time}, 'available')
      RETURNING *
    `;
    return NextResponse.json(result[0]);
  } catch (error) {
    return NextResponse.json({ error: "Failed to add slot" }, { status: 500 });
  }
}

// Edit a slot (PUT)
export async function PUT(request: NextRequest) {
  const { id, date, start_time, end_time } = await request.json();
  if (!id || !date || !start_time || !end_time) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  try {
    const result = await sql`
      UPDATE appointments
      SET date = ${date}, start_time = ${start_time}, end_time = ${end_time}
      WHERE id = ${id} AND patient_id IS NULL
      RETURNING *
    `;
    if (result.length === 0) {
      return NextResponse.json({ error: "Slot not found or already booked" }, { status: 404 });
    }
    return NextResponse.json(result[0]);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update slot" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const { id } = await request.json();
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }
  try {
    const result = await sql`
      DELETE FROM appointments
      WHERE id = ${id} AND patient_id IS NULL
      RETURNING *
    `;
    if (result.length === 0) {
      return NextResponse.json({ error: "Slot not found or already booked" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete slot" }, { status: 500 });
  }
}