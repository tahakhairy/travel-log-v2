import { createAuthClient } from "better-auth/vue";

const authClient = createAuthClient();

export const useAuthStore = defineStore("auth", () => {
  const session = authClient.useSession();
  const isLoading = computed(() => session.value.isPending || session.value.isRefetching);
  const user = computed(() => session.value.data?.user);

  const signIn = async () => {
    await authClient.signIn.social({
      provider: "github",
      callbackURL: "/dashboard",
      errorCallbackURL: "/error",
    });
  };

  async function signOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess() {
          navigateTo("/");
        },
      },
    });
  }

  return { isLoading, user, signOut, signIn };
});
