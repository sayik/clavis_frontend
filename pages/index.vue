<script setup lang="ts">
import {
  ArrowRight,
  BellRing,
  Brain,
  CalendarClock,
  Check,
  ChevronRight,
  FileText,
  HeartPulse,
  Mic,
  ShieldCheck,
  Stethoscope,
  TestTube2,
  UserRound,
} from 'lucide-vue-next'

const features = [
  {
    icon: Mic,
    title: 'AI-assisted scribing',
    text: 'Turn consultation conversations into structured clinical notes with less typing.',
  },
  {
    icon: Brain,
    title: 'Diagnosis support',
    text: 'Surface relevant diagnosis options and clinical context for the doctor to review.',
  },
  {
    icon: HeartPulse,
    title: 'Treatment support',
    text: 'Build treatment plans from patient information, with the doctor always in control.',
  },
  {
    icon: BellRing,
    title: 'Patient & doctor alerts',
    text: 'Keep patients and doctors informed about important follow-ups, results and care events.',
  },
  {
    icon: CalendarClock,
    title: 'Care reminders',
    text: 'Track scan dates, appointments and medicine times so important steps are not missed.',
  },
  {
    icon: TestTube2,
    title: 'Test monitoring',
    text: 'Flag concerning test results for doctor review when connected clinical data crosses configured thresholds.',
  },
]

const steps = [
  ['01', 'Capture', 'Dictate, type or upload the encounter information.'],
  [
    '02',
    'Assist',
    'Clavis structures the information and surfaces useful clinical options.',
  ],
  [
    '03',
    'Review',
    'The doctor reviews and approves the clinical record and plan.',
  ],
  [
    '04',
    'Follow up',
    'Clavis helps track reminders, results and important care events.',
  ],
]
</script>

<template>
  <div class="min-h-screen bg-[#f8f9f7] text-[#172321]">
    <header
      class="sticky top-0 z-50 border-b border-[#e5e8e6]/80 bg-[#f8f9f7]/95 backdrop-blur"
    >
      <div
        class="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-5 sm:px-8"
      >
        <NuxtLink to="/" class="flex items-center gap-3">
          <ClavisLogo />
        </NuxtLink>
        <nav class="hidden items-center gap-7 text-sm text-slate-600 md:flex">
          <a href="#how-it-works" class="hover:text-[#17332f]">How it works</a>
          <a href="#features" class="hover:text-[#17332f]">Features</a>
          <a href="#pricing" class="hover:text-[#17332f]">Pricing</a>
        </nav>
        <div class="flex items-center gap-2">
          <NuxtLink
            to="/login"
            class="hidden rounded-xl px-4 py-2.5 text-sm font-medium text-[#263432] hover:bg-white sm:block"
            >Log in</NuxtLink
          >
          <NuxtLink to="/signup" class="primary-btn h-10 px-4"
            >Get started <ArrowRight :size="16"
          /></NuxtLink>
        </div>
      </div>
    </header>

    <main>
      <section
        class="mx-auto max-w-6xl px-5 pb-20 pt-20 sm:px-8 sm:pb-28 sm:pt-28"
      >
        <div class="max-w-4xl">
          <div class="eyebrow">AI-assisted medical scribe</div>
          <h1
            class="mt-5 text-5xl font-semibold leading-[1.02] tracking-[-0.045em] sm:text-7xl"
          >
            Less typing.<br /><span class="text-[#315c53]"
              >More clinical clarity.</span
            >
          </h1>
          <p class="mt-7 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
            Clavis helps doctors capture consultations accurately, review
            diagnosis and treatment options, and keep patient care on track
            after the visit.
          </p>
          <div class="mt-9 flex flex-wrap gap-3">
            <a href="#pricing" class="primary-btn h-12 px-5"
              >See pricing <ArrowRight :size="17"
            /></a>
            <NuxtLink to="/login" class="secondary-btn h-12 px-5"
              >Doctor login</NuxtLink
            >
          </div>
        </div>
      </section>

      <section id="features" class="border-y border-[#e5e8e6] bg-white">
        <div class="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <div class="max-w-xl">
            <div class="eyebrow">What Clavis does</div>
            <h2 class="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              One workspace for the consultation and what comes after.
            </h2>
          </div>
          <div class="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <article
              v-for="feature in features"
              :key="feature.title"
              class="rounded-2xl border border-[#e4e8e6] bg-[#fbfcfb] p-5"
            >
              <div
                class="grid h-10 w-10 place-items-center rounded-xl bg-[#e9f0ed] text-[#315c53]"
              >
                <component :is="feature.icon" :size="20" />
              </div>
              <h3 class="mt-5 text-[16px] font-semibold">
                {{ feature.title }}
              </h3>
              <p class="mt-2 text-sm leading-6 text-slate-500">
                {{ feature.text }}
              </p>
            </article>
          </div>
        </div>
      </section>

      <section
        id="how-it-works"
        class="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20"
      >
        <div class="grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:gap-20">
          <div>
            <div class="eyebrow">Simple workflow</div>
            <h2 class="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Designed around the doctor.
            </h2>
            <p class="mt-5 max-w-md text-sm leading-7 text-slate-500">
              Clavis assists with the work around a consultation. It does not
              replace the doctor’s judgement. Clinical actions remain
              review-and-approve.
            </p>
          </div>
          <div class="grid gap-3 sm:grid-cols-2">
            <div
              v-for="step in steps"
              :key="step[0]"
              class="rounded-2xl border border-[#e4e8e6] bg-white p-5"
            >
              <div class="text-xs font-semibold tracking-widest text-[#6b7b76]">
                {{ step[0] }}
              </div>
              <div class="mt-4 text-lg font-semibold">{{ step[1] }}</div>
              <p class="mt-2 text-sm leading-6 text-slate-500">{{ step[2] }}</p>
            </div>
          </div>
        </div>
      </section>

      <section class="bg-[#18312e] text-white">
        <div
          class="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-2 lg:items-center"
        >
          <div>
            <div
              class="text-xs font-semibold uppercase tracking-[.16em] text-[#a8beb7]"
            >
              Care after the consultation
            </div>
            <h2 class="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Don't let the important things happen outside the system.
            </h2>
            <p class="mt-5 max-w-xl text-sm leading-7 text-[#c7d3d0]">
              Appointments, scans, medicine schedules and test results can
              become follow-up events. Clavis is built to surface them to the
              right person at the right time.
            </p>
          </div>
          <div class="grid gap-3 sm:grid-cols-2">
            <div class="rounded-2xl border border-white/10 bg-white/5 p-5">
              <CalendarClock :size="20" />
              <div class="mt-4 font-semibold">Scan & appointment dates</div>
              <p class="mt-2 text-xs leading-5 text-[#b9c9c5]">
                Keep scheduled care visible.
              </p>
            </div>
            <div class="rounded-2xl border border-white/10 bg-white/5 p-5">
              <BellRing :size="20" />
              <div class="mt-4 font-semibold">Medicine reminders</div>
              <p class="mt-2 text-xs leading-5 text-[#b9c9c5]">
                Alert patients about configured medication times.
              </p>
            </div>
            <div class="rounded-2xl border border-white/10 bg-white/5 p-5">
              <TestTube2 :size="20" />
              <div class="mt-4 font-semibold">Test result alerts</div>
              <p class="mt-2 text-xs leading-5 text-[#b9c9c5]">
                Bring concerning results back to the doctor's attention.
              </p>
            </div>
            <div class="rounded-2xl border border-white/10 bg-white/5 p-5">
              <Stethoscope :size="20" />
              <div class="mt-4 font-semibold">Doctor review</div>
              <p class="mt-2 text-xs leading-5 text-[#b9c9c5]">
                Keep the clinician in control of decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" class="border-b border-[#e5e8e6] bg-white">
        <div class="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <div class="max-w-2xl">
            <div class="eyebrow">Pricing</div>
            <h2 class="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Straightforward plans. Talk to us for the right fit.
            </h2>
            <p class="mt-4 text-sm leading-6 text-slate-500">
              We keep the landing page simple. Pricing and deployment can be
              discussed directly with your clinic or practice.
            </p>
          </div>
          <div class="mt-10 grid max-w-4xl gap-4 md:grid-cols-2">
            <div
              class="rounded-2xl border border-[#d8e1dd] bg-[#f8fbf9] p-6 shadow-[0_8px_28px_rgba(20,35,33,.045)]"
            >
              <div class="flex items-start justify-between">
                <div>
                  <div class="text-lg font-semibold">Clavis</div>
                  <div class="mt-1 text-sm text-slate-500">
                    For individual doctors
                  </div>
                </div>
                <UserRound :size="20" class="text-[#315c53]" />
              </div>
              <div class="mt-7 text-3xl font-semibold">Talk to us</div>
              <p class="mt-2 text-sm text-slate-500">
                We'll configure the plan around your workflow.
              </p>
              <ul class="mt-6 space-y-3 text-sm text-slate-600">
                <li class="flex gap-2">
                  <Check :size="16" class="mt-0.5 text-[#315c53]" /> AI-assisted
                  clinical notes
                </li>
                <li class="flex gap-2">
                  <Check :size="16" class="mt-0.5 text-[#315c53]" /> Patient and
                  care alerts
                </li>
                <li class="flex gap-2">
                  <Check :size="16" class="mt-0.5 text-[#315c53]" /> Diagnosis,
                  medicine and test tools
                </li>
              </ul>
              <NuxtLink to="/signup" class="primary-btn mt-7 w-full"
                >Create doctor account <ArrowRight :size="16"
              /></NuxtLink>
            </div>
            <div class="rounded-2xl border border-[#e4e8e6] bg-[#fbfcfb] p-6">
              <div class="flex items-start justify-between">
                <div>
                  <div class="text-lg font-semibold">Clinic / Team</div>
                  <div class="mt-1 text-sm text-slate-500">
                    For multiple doctors
                  </div>
                </div>
                <ShieldCheck :size="20" class="text-[#315c53]" />
              </div>
              <div class="mt-7 text-3xl font-semibold">Custom</div>
              <p class="mt-2 text-sm text-slate-500">
                Discuss seats, deployment and integrations.
              </p>
              <ul class="mt-6 space-y-3 text-sm text-slate-600">
                <li class="flex gap-2">
                  <Check :size="16" class="mt-0.5 text-[#315c53]" /> Multiple
                  doctor accounts
                </li>
                <li class="flex gap-2">
                  <Check :size="16" class="mt-0.5 text-[#315c53]" /> Clinic
                  workflows and templates
                </li>
                <li class="flex gap-2">
                  <Check :size="16" class="mt-0.5 text-[#315c53]" /> Backend and
                  clinical integrations
                </li>
              </ul>
              <a href="tel:+0000000000" class="secondary-btn mt-7 w-full"
                >Call to discuss</a
              >
            </div>
          </div>
        </div>
      </section>

      <section class="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <div
          class="flex flex-col gap-5 rounded-2xl border border-[#e4e8e6] bg-[#f3f6f4] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8"
        >
          <div>
            <div class="text-lg font-semibold">Ready to see Clavis?</div>
            <p class="mt-1 text-sm text-slate-500">
              Create an account or log in to the doctor workspace.
            </p>
          </div>
          <div class="flex flex-wrap gap-2">
            <NuxtLink to="/signup" class="primary-btn"
              >Sign up <ArrowRight :size="16" /></NuxtLink
            ><NuxtLink to="/login" class="secondary-btn">Log in</NuxtLink>
          </div>
        </div>
      </section>
    </main>

    <footer class="border-t border-[#e5e8e6] bg-white">
      <div
        class="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-7 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-8"
      >
        <ClavisLogo compact />
        <div class="flex gap-5">
          <NuxtLink to="/login" class="hover:text-[#17332f]">Login</NuxtLink
          ><NuxtLink to="/signup" class="hover:text-[#17332f]">Sign up</NuxtLink
          ><NuxtLink to="/payment" class="hover:text-[#17332f]"
            >Billing</NuxtLink
          >
        </div>
      </div>
    </footer>
  </div>
</template>
