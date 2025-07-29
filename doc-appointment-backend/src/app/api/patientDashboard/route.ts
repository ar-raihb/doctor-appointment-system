import { NextRequest, NextResponse } from 'next/server'
import postgres from 'postgres'

const sql = postgres(process.env.POSTGRES_URL!)

export async function OPTIONS() {
  return new Response(null, { status: 204 });
}

export async function DELETE(request: NextRequest) {
  const { id } = await request.json();
  try {
    await sql`DELETE FROM patients WHERE id = ${id}`
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Delete failed', details: (error as Error).message },
      { status: 500 }
    )
  }
}
export async function PUT(request: NextRequest) {
  const {id, phone } = await request.json();
  try {
    const result = await sql`
      UPDATE patients
      SET phone = ${phone}
      WHERE id = ${id}
      RETURNING *
    `
    const updatedPatient = result[0];
    return NextResponse.json({ success: true, patient: updatedPatient })
  } catch (error) {
    return NextResponse.json(
      { error: 'Update failed', details: (error as Error).message },
      { status: 500 }
    )
  }
}
