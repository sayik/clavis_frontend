<template>
  <div class="min-h-screen bg-[#f7f8f6] text-[#172321]">
    <div class="mx-auto flex min-h-screen max-w-[1440px]">
      <aside
        class="hidden w-[44%] flex-col justify-between border-r border-[#e2e6e3] bg-[#eef1ee] px-12 py-10 lg:flex"
      >
        <div>
          <ClavisLogo />

          <div class="mt-28 max-w-lg">
            <p
              class="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#61706c]"
            >
              AI-assisted clinical workflow
            </p>
            <h1
              class="text-5xl font-semibold leading-[1.08] tracking-[-0.045em]"
            >
              Less typing.<br />More care.
            </h1>
            <p class="mt-6 max-w-md text-[16px] leading-7 text-[#64716e]">
              Capture consultations, structure clinical notes, and keep
              diagnosis, medicines and tests in one focused workspace.
            </p>
          </div>
        </div>

        <div class="flex items-center justify-between text-xs text-[#78837f]">
          <span>© {{ new Date().getFullYear() }} Clavis</span>
          <div class="flex gap-5">
            <a href="#" class="hover:text-[#17332f]">Privacy</a>
            <a href="#" class="hover:text-[#17332f]">Terms</a>
          </div>
        </div>
      </aside>

      <main class="flex flex-1 items-center justify-center px-5 py-10 sm:px-10">
        <div class="w-full max-w-[480px]">
          <div class="mb-10 lg:hidden">
            <NuxtLink to="/" class="inline-flex items-center gap-3">
              <span
                class="grid h-10 w-10 place-items-center rounded-xl bg-[#17332f] text-white"
              >
                <Cross class="h-5 w-5" />
              </span>
              <span class="font-semibold"
                >Clavis
                <span class="font-normal text-[#78837f]"
                  >Medical Scribe</span
                ></span
              >
            </NuxtLink>
          </div>
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Cross } from 'lucide-vue-next'
</script>
