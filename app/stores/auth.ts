import { createAuthClient } from "better-auth/client";

const authClient = createAuthClient();

export const useAuthStore = defineStore("auth", () => {
  const loading = ref(false);

  const signIn = async () => {
    loading.value = true;
    await authClient.signIn.social({
      provider: "github",
      callbackURL: "/dashboard",
      errorCallbackURL: "/error",
    });
    loading.value = false;
  };

  return { loading, signIn };
});
