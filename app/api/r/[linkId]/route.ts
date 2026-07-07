import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { detectDevice } from '@/lib/device-detection'
import { getVisitorCountry } from '@/lib/geo'

export async function GET(request: NextRequest, { params }: { params: Promise<{ linkId: string }> }) {
  const { linkId } = await params
  const supabase = await createClient()

  const { data: link } = await supabase
    .from('links')
    .select('id, url, profile_id, enabled')
    .eq('id', linkId)
    .single()

  if (!link || !link.enabled) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  const userAgent = request.headers.get('user-agent')
  const referrer = request.headers.get('referer')
  const country = await getVisitorCountry()

  // registra o clique e incrementa o contador denormalizado, em paralelo
  await Promise.all([
    supabase.from('link_events').insert({
      profile_id: link.profile_id,
      link_id: link.id,
      event_type: 'click',
      referrer,
      country,
      device: detectDevice(userAgent),
    }),
    supabase.rpc('increment_link_clicks', { link_id_input: link.id }),
  ])

  return NextResponse.redirect(link.url, { status: 302 })
}