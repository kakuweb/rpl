"use client";

import { useActionState } from "react";

import { submitContactMessage } from "./actions";
import { initialContactState } from "./contact-state";

export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    submitContactMessage,
    initialContactState,
  );

  // A invio riuscito il form sparisce: non c'è motivo di riscrivere lo stesso
  // messaggio, e la conferma resta l'unica cosa a schermo.
  if (state.status === "ok") {
    return <p className="esito">{state.message}</p>;
  }

  return (
    <form className="form-contatti" action={formAction}>
      {state.status === "error" && state.message && (
        <p className="esito ko">{state.message}</p>
      )}

      <div className="campo">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          aria-describedby={state.errors.name ? "name-error" : undefined}
        />
        {state.errors.name && (
          <span className="errore" id="name-error">
            {state.errors.name}
          </span>
        )}
      </div>

      <div className="campo">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          aria-describedby={state.errors.email ? "email-error" : undefined}
        />
        {state.errors.email && (
          <span className="errore" id="email-error">
            {state.errors.email}
          </span>
        )}
      </div>

      <div className="campo">
        <label htmlFor="affiliation">Affiliation (optional)</label>
        <input
          id="affiliation"
          name="affiliation"
          type="text"
          autoComplete="organization"
        />
      </div>

      <div className="campo">
        <label htmlFor="topic">What is it about?</label>
        <select id="topic" name="topic" defaultValue="general">
          <option value="general">General enquiry</option>
          <option value="thesis">Thesis or PhD position</option>
          <option value="industry">Companies and technology transfer</option>
          <option value="press">Press</option>
        </select>
      </div>

      <div className="campo">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          aria-describedby={state.errors.message ? "message-error" : undefined}
        />
        {state.errors.message && (
          <span className="errore" id="message-error">
            {state.errors.message}
          </span>
        )}
      </div>

      <button type="submit" className="btn-blu" disabled={pending}>
        {pending ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
