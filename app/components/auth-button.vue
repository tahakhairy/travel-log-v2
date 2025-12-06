<script setup lang="ts">
const { loading: isLoading } = storeToRefs(useAuthStore());
const { signIn } = useAuthStore();
</script>

<template>
  <UButton
    :loading="isLoading" :disabled="isLoading" label="Sign In With Github" trailing-icon="tabler:brand-github"
    @click="signIn"
  />
</template>
