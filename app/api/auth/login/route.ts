import { NextResponse } from 'next/server'
import fetch from 'node-fetch'
import https from 'https'

export async function POST(request: Request) {
  const { username, password } = await request.json()

  if (!username || !password) {
    return NextResponse.json({ message: 'Username and password are required' }, { status: 400 })
  }

  try {
    const httpsAgent = new https.Agent({
      rejectUnauthorized: false // This disables SSL certificate verification
    })

    const response = await fetch('https://api.finverse3.com/fineract-provider/api/v1/authentication', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'fineract-platform-tenantid': 'default',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
      agent: httpsAgent // Use the agent that bypasses SSL verification
    })

    if (!response.ok) {
      throw new Error('Authentication failed')
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Authentication error:', error)
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}