<script setup lang="ts">
import type { FetchError } from "ofetch";
import type * as z from "zod";

import { LazyModalConfirm } from "#components";
import { insertLocationSchema } from "~~/lib/db/shcema";

type LocationValues = z.output<typeof insertLocationSchema>;
const { $csrfFetch } = useNuxtApp();
const toast = useToast();

const locationForm = useTemplateRef("locationForm");
const isSubmitting = ref(false);
const submitted = ref(false);

const formValues = reactive<Partial<LocationValues>>({
  name: undefined,
  description: undefined,
  lat: undefined,
  long: undefined,
});

const overlay = useOverlay();

const modal = overlay.create(LazyModalConfirm);

async function onSubmit() {
  try {
    isSubmitting.value = true;
    await $csrfFetch("/api/locations", {
      method: "POST",
      body: formValues,
    });
    submitted.value = true;
    navigateTo("/dashboard");
  }
  catch (e) {
    const serverError = e as FetchError;

    toast.add({
      color: "error",
      title: "Error",
      description: serverError.statusMessage || "An unknown error occurred.",
    });
  }
  finally {
    isSubmitting.value = false;
  }
}

onBeforeRouteLeave(async () => {
  let isConfirmed: boolean | null = null;
  if (!submitted.value && locationForm.value?.dirty) {
    const instance = modal.open();
    isConfirmed = (await instance.result) as boolean;
    return isConfirmed;
  }
  return true;
});
</script>

<template>
  <div class="mx-auto max-w-96 mt-5">
    <div class="w-full flex flex-col">
      <h1 class="text-lg font-semibold">
        Add Location
      </h1>
      <p class="text-sm">
        A location is a place you have traveled or will travel to. It can be a city,
        country, state or point of interest. You can add specific times you visited this
        location after adding it
      </p>
      <UForm
        ref="locationForm"
        :state="formValues"
        :schema="insertLocationSchema"
        class="space-y-4 mt-4"
        @submit.prevent="onSubmit"
      >
        <UFormField label="Name" name="name">
          <UInput v-model="formValues.name" class="w-full" variant="outline" />
        </UFormField>

        <UFormField label="Description" name="desc">
          <UTextarea v-model="formValues.description" class="w-full" :rows="5" />
        </UFormField>

        <UFormField label="Latitude" name="lat">
          <UInput
            v-model="formValues.lat"
            class="w-full"
            variant="outline"
            type="number"
          />
        </UFormField>

        <UFormField label="Longitude" name="long">
          <UInput
            v-model="formValues.long"
            class="w-full"
            variant="outline"
            type="number"
          />
        </UFormField>

        <div class="space-x-2 flex items-center justify-end">
          <UButton
            icon="tabler:arrow-left"
            type="button"
            variant="outline"
            @click="$router.back()"
          >
            Cancel
          </UButton>
          <UButton icon="tabler:circle-plus-filled" type="submit" :loading="isSubmitting">
            Add
          </UButton>
        </div>
      </UForm>
    </div>
  </div>
</template>

<style scoped></style>
