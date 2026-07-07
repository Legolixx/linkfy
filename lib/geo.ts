import { headers } from 'next/headers'

export async function getVisitorCountry(): Promise<string | null> {
  const headersList = await headers()
  // Vercel injeta esse header automaticamente em produção
  return headersList.get('x-vercel-ip-country') ?? null
}