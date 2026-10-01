<template>
  <AuthShell
    ><div>
      <div class="mb-8">
        <p class="mb-2 text-sm font-medium text-[#65716e]">Account recovery</p>
        <h2 class="text-3xl font-semibold tracking-[-0.03em]">
          Forgot your credentials?
        </h2>
        <p class="mt-2 text-sm leading-6 text-[#78837f]">
          Enter the email associated with your doctor account and we’ll send
          recovery instructions.
        </p>
      </div>
      <form class="space-y-5" @submit.prevent="submit">
        <label
          ><span class="label">Email address</span
          ><input
            v-model="email"
            type="email"
            autocomplete="email"
            required
            placeholder="doctor@clinic.com"
            class="field" /></label
        ><button class="primary-btn w-full" :disabled="loading">
          {{ loading ? 'Sending…' : 'Send recovery link' }}
        </button>
      </form>
      <p
        v-if="message"
        class="mt-5 rounded-xl border border-[#dce8e4] bg-[#f0f6f3] px-4 py-3 text-sm text-[#315c53]"
      >
        {{ message }}
      </p>
      <p class="mt-8 text-center text-sm text-[#78837f]">
        <NuxtLink
          to="/login"
          class="font-semibold text-[#315c53] hover:underline"
          >Back to sign in</NuxtLink
        >
      </p>
    </div></AuthShell
  >
</template>
<script setup lang="ts">
const api = useApi()
const email = ref('')
const loading = ref(false)
const message = ref('')
async function submit() {
  loading.value = true
  message.value = ''
  try {
    await api('/auth/forgot-password', {
      method: 'POST',
      body: { email: email.value },
    })
    message.value =
      'If an account exists for that email, recovery instructions have been sent.'
  } catch (e: any) {
    message.value =
      e?.data?.message || 'Unable to process the request right now.'
  } finally {
    loading.value = false
  }
}
</script>
