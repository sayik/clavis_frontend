<template>
  <AuthShell>
    <div>
      <div class="mb-8">
        <p class="mb-2 text-sm font-medium text-[#65716e]">Welcome back</p>
        <h2 class="text-3xl font-semibold tracking-[-0.03em]">Sign in to your account</h2>
        <p class="mt-2 text-sm leading-6 text-[#78837f]">Access your patients, notes and clinical workspace.</p>
      </div>

      <form class="space-y-5" @submit.prevent="login">
        <label class="block">
          <span class="mb-2 block text-sm font-medium">Email address</span>
          <input v-model="form.email" type="email" autocomplete="email" required placeholder="doctor@clinic.com" class="field" />
        </label>

        <label class="block">
          <div class="mb-2 flex items-center justify-between">
            <span class="text-sm font-medium">Password</span>
            <NuxtLink to="/forgot-credentials" class="text-xs font-medium text-[#315c53] hover:underline">Forgot credentials?</NuxtLink>
          </div>
          <div class="relative">
            <input v-model="form.password" :type="showPassword ? 'text' : 'password'" autocomplete="current-password" required placeholder="••••••••" class="field pr-11" />
            <button type="button" class="absolute right-3 top-1/2 -translate-y-1/2 text-[#7a8581]" @click="showPassword = !showPassword">
              <EyeOff v-if="showPassword" class="h-4 w-4" />
              <Eye v-else class="h-4 w-4" />
            </button>
          </div>
        </label>

        <button class="primary-btn w-full" :disabled="loading">
          {{ loading ? 'Signing in…' : 'Sign in' }}
          <ArrowRight class="h-4 w-4" />
        </button>
      </form>

      <div class="my-7 flex items-center gap-4 text-xs text-[#98a09d]"><span class="h-px flex-1 bg-[#e2e6e3]" /><span>OR</span><span class="h-px flex-1 bg-[#e2e6e3]" /></div>

      <button class="secondary-btn w-full"><Chrome class="h-4 w-4" /> Continue with Google</button>

      <p class="mt-8 text-center text-sm text-[#78837f]">Don't have an account? <NuxtLink to="/signup" class="font-semibold text-[#315c53] hover:underline">Create one</NuxtLink></p>

      <p v-if="message" class="mt-5 rounded-xl border border-[#dce8e4] bg-[#f0f6f3] px-4 py-3 text-sm text-[#315c53]">{{ message }}</p>
    </div>
  </AuthShell>
</template>

<script setup lang="ts">
import { ArrowRight, Chrome, Eye, EyeOff } from 'lucide-vue-next'

const showPassword = ref(false)
const loading = ref(false)
const message = ref('')
const form = reactive({ email: '', password: '' })

async function login() {
  loading.value = true
  message.value = ''
  await new Promise(resolve => setTimeout(resolve, 500))
  loading.value = false
  message.value = 'Demo sign-in submitted. Connect this form to your authentication API.'
}
</script>
