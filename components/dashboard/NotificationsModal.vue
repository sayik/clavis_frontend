<script setup lang="ts">
import {
  Bell,
  CreditCard,
  ShieldAlert,
  UserRound,
  X,
  Info,
} from 'lucide-vue-next'
const emit = defineEmits<{ close: [] }>()
const api = useApi()
const loading = ref(true)
const error = ref('')
const items = ref<any[]>([])
const types: any = {
  subscription: { icon: CreditCard, cls: 'notice-info' },
  patient: { icon: UserRound, cls: 'notice-success' },
  alert: { icon: ShieldAlert, cls: 'notice-critical' },
  info: { icon: Info, cls: 'notice-neutral' },
}
onMounted(async () => {
  try {
    items.value = await api<any[]>('/notifications')
  } catch (e: any) {
    error.value = e?.data?.message || 'Notifications could not be loaded.'
  } finally {
    loading.value = false
  }
})
</script>
<template>
  <div class="modal-backdrop" @click.self="emit('close')">
    <div class="modal-card max-w-2xl">
      <div
        class="flex items-start justify-between border-b border-[#e6e9e7] p-6"
      >
        <div>
          <p class="eyebrow">Inbox</p>
          <h2 class="modal-title">Notifications</h2>
          <p class="modal-subtitle">
            Subscription, patient, system and clinical alerts.
          </p>
        </div>
        <button class="icon-btn" @click="emit('close')">
          <X :size="19" />
        </button>
      </div>
      <div class="max-h-[70vh] overflow-auto p-5">
        <div v-if="loading" class="py-12 text-center text-sm text-slate-500">
          Loading notifications…
        </div>
        <p v-else-if="error" class="alert-error">{{ error }}</p>
        <div
          v-else-if="!items.length"
          class="py-12 text-center text-sm text-slate-500"
        >
          <Bell class="mx-auto mb-3" />No notifications right now.
        </div>
        <div v-else class="space-y-3">
          <div
            v-for="item in items"
            :key="item.id"
            :class="['notice', types[item.type]?.cls || 'notice-neutral']"
          >
            <component :is="types[item.type]?.icon || Info" :size="19" />
            <div class="flex-1">
              <div class="font-semibold">{{ item.title }}</div>
              <p class="mt-1 text-sm opacity-80">{{ item.message }}</p>
              <time class="mt-2 block text-[11px] opacity-60">{{
                item.created_at
              }}</time>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
