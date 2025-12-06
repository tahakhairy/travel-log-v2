<script setup lang="ts">
const { signOut } = useAuthStore();

onMounted(() => {
  signOut();
});
</script>

<template>
  <div class="flex flex-col justify-center items-center w-full my-10 gap-3">
    <Icon name="tabler:loader-2" class="animate-spin " size="48" />
    Signing out...
  </div>
</template>

<style scoped></style>
