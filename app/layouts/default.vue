<script setup lang="ts">
const authStore = useAuthStore();

await authStore.init();
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <AppNavbar />
    <main class="p-5">
      <slot />
    </main>
  </div>
</template>

<style scoped></style>
