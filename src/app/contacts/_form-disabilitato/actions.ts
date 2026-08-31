"use server";

import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import type { ContactTopic } from "@/lib/types";

import type { ContactState } from "./contact-state";

const topics: ContactTopic[] = ["general", "thesis", "industry", "press"];

// Volutamente permissiva: serve a intercettare gli errori di battitura,
// non a decidere quali indirizzi esistano davvero.
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function submitContactMessage(
  _previous: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const affiliation = String(formData.get("affiliation") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const rawTopic = String(formData.get("topic") ?? "general");
  const topic = topics.includes(rawTopic as ContactTopic)
    ? (rawTopic as ContactTopic)
    : "general";

  const errors: ContactState["errors"] = {};
  if (name.length < 2) errors.name = "Please enter your name.";
  if (!emailPattern.test(email))
    errors.email = "Please enter a valid email address.";
  if (message.length < 20)
    errors.message =
      "Please write at least a couple of sentences (20 characters).";

  if (Object.keys(errors).length > 0) {
    return { status: "error", message: "Please check the fields below.", errors };
  }

  if (!isSupabaseConfigured) {
    return {
      status: "error",
      message:
        "The database is not configured, so the message was not saved. Please write to us directly by email.",
      errors: {},
    };
  }

  try {
    const db = await createClient();
    const { error } = await db.from("contact_messages").insert({
      name,
      email,
      affiliation: affiliation || null,
      topic,
      message,
    });

    if (error) throw error;
  } catch (error) {
    console.error("[contacts] insert fallita:", error);
    return {
      status: "error",
      message:
        "Something went wrong on our side. Please try again, or email us directly.",
      errors: {},
    };
  }

  return {
    status: "ok",
    message:
      "Thank you — your message has reached the lab. We usually reply within a few days.",
    errors: {},
  };
}
