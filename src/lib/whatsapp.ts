export const WHATSAPP_NUMBER = "50370000000";

export function createWhatsAppOrderLink(productName?: string) {
  const message = productName
    ? `Hola Long Cha, quiero ordenar:\n${productName}`
    : "Hola Long Cha, quiero hacer una orden.";

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
