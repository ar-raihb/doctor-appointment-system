import { NextRequest, NextResponse } from "next/server";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!);

//  Minimal CORS headers
export async function OPTIONS() {
  return new Response(null, { status: 204 });
}

export async function POST(request: NextRequest) {
  console.log("Received POST request for login");
  try {
    const { email, password, role } = await request.json();
    let result : any[] = [];
    if (role === "patient") {
      result = await sql`
        SELECT *
        FROM patients
        WHERE email = ${email} AND password = ${password}
        LIMIT 1
      `;
    } else if (role === "doctor") {
      result = await sql`
        SELECT *
        FROM doctors
        WHERE email = ${email} AND password = ${password}
        LIMIT 1
      `;
    }
    // console.log("SQL Query Result in backend:", result);
    const user = result[0];
    console.log("User found:", user);
    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }
  
    if(user.role === "patient") {
      return NextResponse.json(
        {
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name, 
          email: user.email,
          phone: user.phone, 
          role: "patient",
          age: user.age,
          gender: user.gender,
          blood_group: user.blood_group,
        },
        { status: 200 }
      );
    } else if (user.role === "doctor") {
      return NextResponse.json(
        {
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          phone: user.phone,
          role: "doctor",
          age: user.age,
          specilization: user.specialization,
          experience: user.experience,
          rating: user.rating,
          consultation_fee: user.consultation_fee,
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}



// import { NextRequest, NextResponse } from 'next/server';
// import postgres from 'postgres';

// const sql = postgres(process.env.POSTGRES_URL!); // Remove ssl if local without SSL

// // Handle CORS preflight request
// export async function OPTIONS() {
//   return new NextResponse(null, {
//     status: 204,
//     headers: {
//       'Access-Control-Allow-Origin': '*',
//       'Access-Control-Allow-Methods': 'POST, OPTIONS',
//       'Access-Control-Allow-Headers': 'Content-Type',
//     },
//   });
// }

// export async function POST(request: NextRequest) {
//   try {
//     console.log("Received POST request");
//     const { email, password } = await request.json();
//     console.log("Parsed request body:", { email, password });

//     const result = await sql`
//       SELECT "Email" FROM patient
//       WHERE "Name" = 'Abc';
//     `;

//     console.log("SQL Query Result:", result);

//     const user = result[0];

//  if (!user) {
//   return NextResponse.json(
//     { error: 'Invalid email or password' },
//     { status: 401, headers: { 'Access-Control-Allow-Origin': '*' } }
//   );
// }

//     console.log("User found:", user);

// return NextResponse.json(
//   {
//     id: user.ID,
//     email: user.Email,
//     role: 'patient', // hardcoded
//     name: user.Name, // if you want to return the name
//   },
//   {
//     status: 200,
//     headers: { 'Access-Control-Allow-Origin': '*' },
//   }
// );
//   } catch (error) {
//     console.error("Server error:", error); // 🔥 IMPORTANT
//     return NextResponse.json(
//       {
//         error: "Database error",
//         details: (error as Error).message,
//       },
//       {
//         status: 500,
//         headers: { "Access-Control-Allow-Origin": "*" },
//       }
//     );
//   }
// }

