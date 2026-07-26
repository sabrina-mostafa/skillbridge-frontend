export const PAYMENT_STATUS = {
  PENDING: "PENDING",
  PAID: "PAID",
  REFUNDED: "REFUNDED",
} as const;

export type PaymentStatus =
  typeof PAYMENT_STATUS[keyof typeof PAYMENT_STATUS];