/**
 * Centralized Business Information Configuration for D9W German Language Institute.
 * Contains official contact details, physical address, verified digital channels,
 * and contextual communication templates.
 */

export interface AddressInfo {
  street: string
  landmark: string
  area: string
  city: string
  state: string
  postalCode: string
  country: string
  full: string
  short: string
}

export interface BusinessInfo {
  name: string
  shortName: string
  tagline: string
  address: AddressInfo
  phone: string
  phoneRaw: string
  phoneHref: string
  whatsapp: string
  whatsappNumber: string
  whatsappUrl: string
  email: string
  emailHref: string
  website: string
  instagramDisplay: string
  instagramUrl: string | null
  googleMapsUrl: string
  messages: {
    generalEnquiry: string
    courseEnquiry: string
    demoEnquiry: string
  }
}

export const businessInfo: BusinessInfo = {
  name: 'D9W German Language Institute',
  shortName: 'D9W German Institute',
  tagline: 'Learn German. Shape Your Future.',
  address: {
    street: '27/6, 20th Extension Road',
    landmark: 'Behind Sebastiar Church',
    area: 'New Ellis Nagar',
    city: 'Madurai',
    state: 'Tamil Nadu',
    postalCode: '625016',
    country: 'India',
    full: '27/6, 20th Extension Road, Behind Sebastiar Church, New Ellis Nagar, Madurai, Tamil Nadu 625016, India',
    short: 'New Ellis Nagar, Madurai, Tamil Nadu 625016, India',
  },
  phone: '+91 80566 57640',
  phoneRaw: '8056657640',
  phoneHref: 'tel:+918056657640',
  whatsapp: '+91 80566 57640',
  whatsappNumber: '918056657640',
  whatsappUrl: 'https://wa.me/918056657640',
  email: 'info@d9wgermanlanguage.com',
  emailHref: 'mailto:info@d9wgermanlanguage.com',
  website: 'https://d9wgermanlanguage.com/',
  instagramDisplay: 'D9W@Madurai',
  instagramUrl: null, // Configurable: keep null until official URL is confirmed
  googleMapsUrl: 'https://maps.app.goo.gl/7wUPQwBsAdHszEwg9',
  messages: {
    generalEnquiry: 'Hello D9W German Language Institute! I would like to know more about your German language courses.',
    courseEnquiry: 'Hello D9W! I am interested in joining your German language course. Please share the available levels, batch timings and admission details.',
    demoEnquiry: 'Hello D9W! I would like to enquire about attending a free German language demo class.',
  },
}

/**
 * Builds a WhatsApp click-to-chat URL with optional prefilled message text.
 */
export function getWhatsAppUrl(customMessage?: string): string {
  if (!customMessage || !customMessage.trim()) {
    return businessInfo.whatsappUrl
  }
  return `https://wa.me/${businessInfo.whatsappNumber}?text=${encodeURIComponent(customMessage.trim())}`
}

/**
 * Convenience helper for general course enquiry.
 */
export function getGeneralEnquiryWhatsAppUrl(): string {
  return getWhatsAppUrl(businessInfo.messages.generalEnquiry)
}

/**
 * Convenience helper for specific course level enquiry.
 */
export function getCourseEnquiryWhatsAppUrl(level?: string): string {
  if (level) {
    return getWhatsAppUrl(
      `Hello D9W! I am interested in joining your ${level} German language course. Please share the available batch timings, syllabus, and admission details.`
    )
  }
  return getWhatsAppUrl(businessInfo.messages.courseEnquiry)
}

/**
 * Convenience helper for free demo class booking.
 */
export function getDemoEnquiryWhatsAppUrl(): string {
  return getWhatsAppUrl(businessInfo.messages.demoEnquiry)
}
