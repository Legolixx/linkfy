"use server";

import { createClient } from "@/lib/supabase/server";

type SignUpInput = {
  username: string;
  email: string;
  password: string;
  emailRedirectTo: string;
};

type SignUpResult = {
  success: boolean;
  error?: string;
};

export async function signUp({
  username,
  email,
  password,
  emailRedirectTo,
}: SignUpInput): Promise<SignUpResult> {
  const supabase = await createClient();

  // Limpeza
  username = username.trim().toLowerCase();

  // Validação
  const usernameRegex = /^[a-z0-9_-]{3,30}$/;

  if (!usernameRegex.test(username)) {
    return {
      success: false,
      error:
        "Username must contain only lowercase letters, numbers, '_' or '-'.",
    };
  }

  // Verifica se o username já existe
  const { data: existingUser, error: usernameError } = await supabase
    .from("profiles")
    .select("id")
    .eq("username", username)
    .maybeSingle();

  if (usernameError) {
    return {
      success: false,
      error: "Unable to validate username.",
    };
  }

  if (existingUser) {
    return {
      success: false,
      error: "Username already taken.",
    };
  }

  // Cria usuário no Auth
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo,
      data: {
        username,
        display_name: username,
      },
    },
  });

  if (error) {
    if (error.message.includes("rate limit")) {
      return {
        success: false,
        error:
          "Too many signup attempts. Please wait a few minutes and try again.",
      };
    }

    return {
      success: false,
      error: error.message,
    };
  }

  return {
    success: true,
  };
}
