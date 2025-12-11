import { createAuthClient } from "better-auth/vue";

const authClient = createAuthClient();

export const useAuthStore = defineStore("auth", () => {
  const session = ref<Awaited<ReturnType<typeof authClient.useSession>> | null>(null);
  const user = computed(() => session.value?.data?.user);
  const isLoading = computed(() => session.value?.isPending);

  async function init() {
    const data = await authClient.useSession(useFetch);
    session.value = data;
  }

  async function signIn() {
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

  return { isLoading, user, signOut, signIn, init };
});
