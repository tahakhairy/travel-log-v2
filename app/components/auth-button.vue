<script setup lang="ts">
const { isLoading, user } = storeToRefs(useAuthStore());
const { signIn } = useAuthStore();
</script>

<template>
  <UDropdownMenu
    v-if="!isLoading && user"
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
      :label="`${user.name}`"
      color="neutral"
      variant="outline"
    >
      <template #leading>
        <UAvatar
          v-if="user.image"
          size="md"
          :src="user.image"
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
    :loading="isLoading" :disabled="isLoading" label="Sign In With Github" trailing-icon="tabler:brand-github"
    @click="signIn"
  />
</template>
