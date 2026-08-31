/**
 * Tipo e stato iniziale del form contatti.
 *
 * Stanno qui e non in actions.ts perché quel file è marcato "use server": da
 * un modulo Server Actions si possono esportare solo funzioni async, e un
 * oggetto esportato da lì arriverebbe al client come undefined.
 */
export type ContactState = {
  status: "idle" | "ok" | "error";
  message: string;
  /** Errori per campo, chiave = attributo name dell'input. */
  errors: Partial<Record<"name" | "email" | "message", string>>;
};

export const initialContactState: ContactState = {
  status: "idle",
  message: "",
  errors: {},
};
