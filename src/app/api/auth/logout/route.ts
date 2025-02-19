import { cookies } from 'next/headers'

export async function GET() {
  const cookieStore = await cookies()

  // @ts-ignore
  cookieStore.delete('token', { path: '/' })

  return new Response(null, {
    status: 302,
    headers: {
      Location: '/login'
    }
  })
}
