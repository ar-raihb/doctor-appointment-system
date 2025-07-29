import { NextRequest, NextResponse } from 'next/server'
import postgres from 'postgres'

const sql = postgres(process.env.POSTGRES_URL!)

export async function OPTIONS() {
  return new Response(null, { status: 204 });
}

export async function GET() {
  try {
    // Get all doctors
    const doctors = await sql`
      SELECT id, first_name, last_name, email, phone, role, specialization, experience, rating, consultation_fee
      FROM doctors
    `;

    // For each doctor, get their available slots from appointments
    const doctorList = [];
    for (const doc of doctors) {
      const availability = await sql`
        SELECT id, doctor_id, date, start_time, end_time
        FROM appointments
        WHERE doctor_id = ${doc.id}
          AND status = 'available'
          AND patient_id IS NULL
      `;
      doctorList.push({
        id: doc.id,
        name: `${doc.first_name} ${doc.last_name}`,
        email: doc.email,
        phone: doc.phone,
        role: doc.role,
        specialization: doc.specialization,
        experience: doc.experience,
        rating: doc.rating,
        consultationFee: doc.consultation_fee,
        availability: availability.map(slot => ({
          id: slot.id,
          doctorId: slot.doctor_id,
          date: slot.date,
          startTime: slot.start_time,
          endTime: slot.end_time,
          isBooked: false
        }))
      });
    }

    return NextResponse.json(doctorList)
  } catch (error) { 
    return NextResponse.json({ error: 'Failed to fetch doctors' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  const { slot_id, patient_id, symptoms, notes } = await request.json()
  if (!slot_id || !patient_id) {
    return NextResponse.json({ error: "Missing slot_id or patient_id" }, { status: 400 })
  }
  try {
    // Only allow booking if slot is available
    const result = await sql`
      UPDATE appointments
      SET patient_id = ${patient_id}, status = 'pending', symptoms = ${symptoms || null}, notes = ${notes || null}
      WHERE id = ${slot_id} AND patient_id IS NULL AND status = 'available'
      RETURNING *
    `
    if (result.length === 0) {
      return NextResponse.json({ error: "Slot already booked or not available" }, { status: 409 })
    }
    return NextResponse.json(result[0])
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Failed to book slot"  }, { status: 500 })
  }
}