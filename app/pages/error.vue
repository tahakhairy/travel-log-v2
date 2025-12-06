<script setup lang="ts">
const route = useRoute();
const error = route.query.error?.toString() || "An unknown error ouccured";
</script>

<template>
  <UContainer class="rounded-2xl container mx-auto space-y-5 flex flex-col items-center justify-center">
    <UAlert color="error" variant="subtle" title="Oh no!" :description="error" icon="i-lucide-terminal" />

    <UButton label="Go Home" icon="tabler:arrow-left" to="/" />
  </UContainer>
</template>
