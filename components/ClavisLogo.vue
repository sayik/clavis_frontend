<template>
  <NuxtLink
    to="/"
    class="inline-flex items-center gap-3"
    aria-label="Clavis Medical Scribe"
  >
    <!-- Clavis mark -->
    <span
      class="grid h-11 w-11 shrink-0 place-items-center rounded-[13px] bg-[#173b36]"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 24 24"
        class="h-6 w-6 text-white"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9 4.5C9 3.672 9.672 3 10.5 3h3C14.328 3 15 3.672 15 4.5V9h4.5C20.328 9 21 9.672 21 10.5v3c0 .828-.672 1.5-1.5 1.5H15v4.5c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5V15H4.5C3.672 15 3 14.328 3 13.5v-3C3 9.672 3.672 9 4.5 9H9V4.5Z"
          stroke="currentColor"
          stroke-width="2"
          stroke-linejoin="round"
        />
      </svg>
    </span>

    <!-- Wordmark -->
    <span class="leading-none">
      <span
        class="block text-[20px] font-semibold tracking-[-0.025em] text-[#173b36]"
      >
        Clavis
      </span>

      <span
        class="mt-1 block text-[12px] font-normal text-[#65716e]"
      >
        Medical Scribe
      </span>
    </span>
  </NuxtLink>
</template>