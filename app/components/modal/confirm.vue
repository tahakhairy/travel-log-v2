<script setup lang="ts">
const emit = defineEmits(["close"]);
</script>

<template>
  <UModal
    title="Warning"
    :close="{ onClick: () => emit('close', false) }"
    :dismissible="false"
  >
    <template #content>
      <div class="p-9 flex justify-between flex-col items-center gap-5">
        <p>Are you sure you want to leave? All unsaved changes will be lost.</p>

        <div class="flex gap-2 items-center">
          <UButton label="Cancel" variant="outline" @click="emit('close', false)" />
          <UButton label="Leave" @click="emit('close', true)" />
        </div>
      </div>
    </template>
  </UModal>
</template>

<style scoped></style>
