<template>
  <div class="min-h-screen bg-[#f7f8f6] text-[#172321]">
    <header class="border-b border-[#e2e6e3] bg-white/90 backdrop-blur">
      <div
        class="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-5 sm:px-8"
      >
        <NuxtLink to="/" class="inline-flex items-center gap-3">
          <span
            class="grid h-9 w-9 place-items-center rounded-xl bg-[#17332f] text-white"
            ><Cross class="h-5 w-5"
          /></span>
          <span class="font-semibold"
            >Clavis
            <span class="font-normal text-[#78837f]">Medical Scribe</span></span
          >
        </NuxtLink>
        <NuxtLink to="/" class="text-sm text-[#68736f] hover:text-[#17332f]"
          >Back to dashboard</NuxtLink
        >
      </div>
    </header>

    <main class="mx-auto max-w-5xl px-5 py-12 sm:px-8">
      <div class="mb-10 text-center">
        <p
          class="text-xs font-semibold uppercase tracking-[0.18em] text-[#61706c]"
        >
          Subscription
        </p>
        <h1 class="mt-2 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
          Choose your Clavis plan
        </h1>
        <p class="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#78837f]">
          Start with the workspace that fits your practice. Upgrade or cancel
          whenever you need.
        </p>
      </div>

      <div class="mb-8 grid gap-4 md:grid-cols-3">
        <button
          v-for="plan in plans"
          :key="plan.id"
          class="plan-card text-left"
          :class="selected === plan.id ? 'plan-selected' : ''"
          @click="selected = plan.id"
        >
          <div class="flex items-start justify-between gap-3">
            <div>
              <p class="font-semibold">{{ plan.name }}</p>
              <p class="mt-1 text-xs text-[#78837f]">{{ plan.description }}</p>
            </div>
            <span
              class="grid h-5 w-5 place-items-center rounded-full border"
              :class="
                selected === plan.id
                  ? 'border-[#17332f] bg-[#17332f]'
                  : 'border-[#cbd3d0]'
              "
              ><span
                v-if="selected === plan.id"
                class="h-2 w-2 rounded-full bg-white"
            /></span>
          </div>
          <p class="mt-6 text-2xl font-semibold">
            ${{ plan.price
            }}<span class="text-xs font-normal text-[#78837f]"> / month</span>
          </p>
          <p class="mt-3 text-xs text-[#65716e]">{{ plan.detail }}</p>
        </button>
      </div>

      <div class="grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
        <section
          class="rounded-2xl border border-[#e1e6e3] bg-white p-6 shadow-[0_12px_40px_rgba(23,35,33,.05)] sm:p-8"
        >
          <div class="mb-6 flex items-center gap-3">
            <span
              class="grid h-9 w-9 place-items-center rounded-xl bg-[#eef3f0]"
              ><CreditCard class="h-4 w-4 text-[#315c53]"
            /></span>
            <div>
              <h2 class="font-semibold">Payment details</h2>
              <p class="text-xs text-[#78837f]">
                Secure checkout powered by Stripe.
              </p>
            </div>
          </div>
          <form class="space-y-5" @submit.prevent="checkout">
            <label
              ><span class="label">Cardholder name</span
              ><input
                v-model="payment.name"
                required
                class="field"
                placeholder="Dr. Arjun Nair"
            /></label>
            <label
              ><span class="label">Card number</span>
              <div class="relative">
                <input
                  v-model="payment.card"
                  required
                  inputmode="numeric"
                  maxlength="19"
                  class="field pr-11"
                  placeholder="4242 4242 4242 4242"
                /><Lock
                  class="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#89938f]"
                /></div
            ></label>
            <div class="grid grid-cols-2 gap-4">
              <label
                ><span class="label">Expiry</span
                ><input
                  v-model="payment.expiry"
                  required
                  class="field"
                  placeholder="MM / YY" /></label
              ><label
                ><span class="label">CVC</span
                ><input
                  v-model="payment.cvc"
                  required
                  maxlength="4"
                  class="field"
                  placeholder="123"
              /></label>
            </div>
            <label
              ><span class="label">Billing country</span
              ><select v-model="payment.country" class="field">
                <option>India</option>
                <option>United States</option>
                <option>United Kingdom</option>
                <option>Germany</option>
              </select></label
            >
            <button class="primary-btn w-full" :disabled="loading">
              {{
                loading
                  ? 'Opening secure checkout…'
                  : `Continue — $${currentPlan.price}/month`
              }}
              <ArrowRight class="h-4 w-4" />
            </button>
          </form>
          <p
            class="mt-4 flex items-center justify-center gap-2 text-[11px] text-[#8a9490]"
          >
            <ShieldCheck class="h-3.5 w-3.5" /> Your payment details should be
            handled by Stripe Checkout in production.
          </p>
        </section>

        <aside
          class="h-fit rounded-2xl border border-[#e1e6e3] bg-[#eef1ee] p-6 sm:p-7"
        >
          <p
            class="text-xs font-semibold uppercase tracking-[0.16em] text-[#68746f]"
          >
            Order summary
          </p>
          <div class="mt-5 flex items-start justify-between">
            <div>
              <p class="font-semibold">{{ currentPlan.name }}</p>
              <p class="mt-1 text-xs text-[#78837f]">
                {{ currentPlan.description }}
              </p>
            </div>
            <p class="font-semibold">${{ currentPlan.price }}</p>
          </div>
          <div class="my-6 h-px bg-[#dce1de]" />
          <div class="space-y-3 text-sm">
            <div class="flex justify-between text-[#68736f]">
              <span>Subtotal</span><span>${{ currentPlan.price }}</span>
            </div>
            <div class="flex justify-between text-[#68736f]">
              <span>Tax</span><span>Calculated at checkout</span>
            </div>
          </div>
          <div class="my-6 h-px bg-[#dce1de]" />
          <div class="flex justify-between">
            <span class="font-semibold">Due today</span
            ><span class="font-semibold">${{ currentPlan.price }}</span>
          </div>
          <ul class="mt-7 space-y-3 text-xs text-[#65716e]">
            <li
              v-for="feature in currentPlan.features"
              :key="feature"
              class="flex gap-2"
            >
              <Check class="h-4 w-4 shrink-0 text-[#315c53]" /> {{ feature }}
            </li>
          </ul>
        </aside>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import {
  ArrowRight,
  Check,
  CreditCard,
  Cross,
  Lock,
  ShieldCheck,
} from 'lucide-vue-next'

const plans = [
  {
    id: 'solo',
    name: 'Solo',
    price: 29,
    description: 'For individual doctors',
    detail: '1 clinician · Core AI scribe',
    features: [
      'AI clinical notes',
      'Patient workspace',
      'Diagnosis & medicine search',
    ],
  },
  {
    id: 'practice',
    name: 'Practice',
    price: 79,
    description: 'For growing practices',
    detail: 'Up to 5 clinicians · Advanced AI',
    features: ['Everything in Solo', 'Shared templates', 'Practice analytics'],
  },
  {
    id: 'clinic',
    name: 'Clinic',
    price: 149,
    description: 'For larger teams',
    detail: 'Up to 15 clinicians · Team controls',
    features: [
      'Everything in Practice',
      'Team administration',
      'Priority support',
    ],
  },
]

const selected = ref('practice')
const loading = ref(false)
const payment = reactive({
  name: '',
  card: '',
  expiry: '',
  cvc: '',
  country: 'India',
})
const currentPlan = computed(
  () => plans.find((plan) => plan.id === selected.value) ?? plans[1],
)

async function checkout() {
  loading.value = true
  // Replace this with a call to your server endpoint that creates a Stripe Checkout Session.
  await new Promise((resolve) => setTimeout(resolve, 700))
  loading.value = false
  alert(
    'Connect this button to /api/payments/create-checkout-session. Do not process raw card details on your own server.',
  )
}
</script>

<style scoped>
.plan-card {
  border: 1px solid #e1e6e3;
  background: white;
  border-radius: 16px;
  padding: 20px;
  transition: 0.18s ease;
  box-shadow: 0 5px 20px rgba(23, 35, 33, 0.025);
}
.plan-card:hover {
  border-color: #bcc9c4;
  transform: translateY(-1px);
}
.plan-selected {
  border-color: #315c53;
  box-shadow:
    0 0 0 1px #315c53,
    0 10px 30px rgba(23, 35, 33, 0.06);
}
</style>
