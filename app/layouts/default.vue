<script setup lang="ts">
const { init } = useAuthStore();

await init();
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <AppNavbar />
    <main class="flex-1 flex flex-col">
      <slot />
    </main>
  </div>
</template>

<style scoped></style>
