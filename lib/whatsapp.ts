/**
 * Monta a URL padrão do WhatsApp Click-to-Chat.
 * Formato: https://wa.me/<código país + DDD + número>?text=<mensagem opcional>
 */
export function buildWhatsappUrl(phone: string, message?: string): string {
  const digitsOnly = phone.replace(/\D/g, '')
  const base = `https://wa.me/${digitsOnly}`
  if (!message?.trim()) return base
  return `${base}?text=${encodeURIComponent(message.trim())}`
}

/**
 * Faz o caminho inverso: se a URL salva já for um link wa.me,
 * extrai telefone e mensagem de volta pra edição.
 */
export function parseWhatsappUrl(url: string): { phone: string; message: string } | null {
  try {
    const parsed = new URL(url)
    if (!parsed.hostname.includes('wa.me')) return null

    const phone = parsed.pathname.replace('/', '')
    const message = parsed.searchParams.get('text') ?? ''
    return { phone, message }
  } catch {
    return null
  }
}

export function isValidWhatsappPhone(phone: string): boolean {
  const digitsOnly = phone.replace(/\D/g, '')
  // mínimo razoável: código país (1-3) + DDD (2) + número (8-9) = ~11-14 dígitos
  return digitsOnly.length >= 10 && digitsOnly.length <= 15
}