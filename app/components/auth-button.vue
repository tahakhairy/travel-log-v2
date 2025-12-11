<script setup lang="ts">
const authStore = useAuthStore();
</script>

<template>
  <UDropdownMenu
    v-if="!authStore.isLoading && authStore.user"
    size="lg"
    :items="[{
      label: 'Sign Out',
      slot: 'icon' as const,
      onSelect() {
        navigateTo('/sign-out')
      },
    }]"
  >
    <UButton
      :label="`${authStore.user.name}`"
      color="neutral"
      variant="outline"
    >
      <template #leading>
        <UAvatar
          v-if="authStore.user.image"
          size="md"
          :src="authStore.user.image"
        />
      </template>
    </UButton>

    <template #icon-leading>
      <Icon
        name="tabler:logout-2"
        size="24"
        class="text-error-500"
      />
    </template>
  </UDropdownMenu>
  <UButton
    v-else
    :loading="authStore.isLoading" :disabled="authStore.isLoading" label="Sign In With Github" trailing-icon="tabler:brand-github"
    @click="authStore.signIn"
  />
</template>
