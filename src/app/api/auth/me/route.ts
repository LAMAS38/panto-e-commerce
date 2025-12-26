import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

export async function GET(request: NextRequest) {
  try {
    const payload = await getPayload({ config })
    
    const { user } = await payload.auth({ headers: request.headers })

    if (!user || user.collection !== 'customers') {
      return NextResponse.json({ user: null }, { status: 200 })
    }

    return NextResponse.json({ 
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      } 
    })
  } catch (error) {
    return NextResponse.json({ user: null }, { status: 200 })
  }
}