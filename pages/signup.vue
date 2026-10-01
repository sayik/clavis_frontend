<template>
  <AuthShell>
    <div>
      <div class="mb-8">
        <p class="mb-2 text-sm font-medium text-[#65716e]">Get started</p>
        <h2 class="text-3xl font-semibold tracking-[-0.03em]">
          Create your Clavis account
        </h2>
        <p class="mt-2 text-sm leading-6 text-[#78837f]">
          Set up your clinical workspace in a few minutes.
        </p>
      </div>

      <form class="space-y-4" @submit.prevent="signup">
        <div class="grid gap-4 sm:grid-cols-2">
          <label
            ><span class="label">First name</span
            ><input
              v-model="form.firstName"
              required
              class="field"
              placeholder="Arjun"
          /></label>
          <label
            ><span class="label">Last name</span
            ><input
              v-model="form.lastName"
              required
              class="field"
              placeholder="Nair"
          /></label>
        </div>
        <label
          ><span class="label">Work email</span
          ><input
            v-model="form.email"
            type="email"
            autocomplete="email"
            required
            class="field"
            placeholder="doctor@clinic.com"
        /></label>
        <label
          ><span class="label">Clinic / practice name</span
          ><input
            v-model="form.clinic"
            required
            class="field"
            placeholder="Nair Family Clinic"
        /></label>
        <label
          ><span class="label">Password</span
          ><input
            v-model="form.password"
            type="password"
            autocomplete="new-password"
            required
            minlength="8"
            class="field"
            placeholder="At least 8 characters"
        /></label>

        <label
          class="flex items-start gap-3 pt-1 text-xs leading-5 text-[#78837f]"
        >
          <input
            v-model="form.terms"
            type="checkbox"
            required
            class="mt-1 h-4 w-4 rounded border-[#cbd3d0] accent-[#17332f]"
          />
          <span
            >I agree to the
            <a href="#" class="font-medium text-[#315c53]">Terms of Service</a>
            and
            <a href="#" class="font-medium text-[#315c53]">Privacy Policy</a
            >.</span
          >
        </label>

        <button class="primary-btn w-full">
          Create account <ArrowRight class="h-4 w-4" />
        </button>
      </form>

      <p class="mt-7 text-center text-sm text-[#78837f]">
        Already have an account?
        <NuxtLink
          to="/login"
          class="font-semibold text-[#315c53] hover:underline"
          >Sign in</NuxtLink
        >
      </p>
      <p
        v-if="message"
        class="mt-5 rounded-xl border border-[#dce8e4] bg-[#f0f6f3] px-4 py-3 text-sm text-[#315c53]"
      >
        {{ message }}
      </p>
    </div>
  </AuthShell>
</template>

<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'

const message = ref('')
const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  clinic: '',
  password: '',
  terms: false,
})

async function signup() {
  message.value =
    'Demo account creation submitted. Connect this form to your user/auth API.'
}
</script>
