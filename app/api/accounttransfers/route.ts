import { NextResponse } from 'next/server'
import fetch from 'node-fetch'
import https from 'https'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const httpsAgent = new https.Agent({
      rejectUnauthorized: false // This disables SSL certificate verification
    })

    const response = await fetch('https://api.finverse3.com/fineract-provider/api/v1/accounttransfers', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'fineract-platform-tenantid': 'default',
        'Authorization': 'Basic bWlmb3M6cGFzc3dvcmQ='
      },
      body: JSON.stringify(body),
      agent: httpsAgent // Use the agent that bypasses SSL verification
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}