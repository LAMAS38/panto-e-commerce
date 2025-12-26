import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

export async function POST(request: NextRequest) {
  try {
    const payload = await getPayload({ config })
    const body = await request.json()
    
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Login avec Payload
    const result = await payload.login({
      collection: 'customers',
      data: { email, password },
    })

    // Créer la réponse avec le cookie
    const response = NextResponse.json({
      success: true,
      message: 'Logged in successfully',
      user: result.user,
    })

    // Définir le cookie
    if (result.token) {
      response.cookies.set('payload-token', result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 jours
        path: '/',
      })
    }

    return response
  } catch (error) {
    console.error('Login error:', error)
    
    return NextResponse.json(
      { error: 'Invalid email or password' },
      { status: 401 }
    )
  }
}