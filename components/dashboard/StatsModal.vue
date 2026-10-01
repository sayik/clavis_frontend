<script setup lang="ts">
import { BarChart3, PieChart, TrendingUp, X } from 'lucide-vue-next'
const emit = defineEmits<{ close: [] }>()
const api = useApi()
const data = ref<any | null>(null)
const loading = ref(true)
const error = ref('')
onMounted(async () => {
  try {
    data.value = await api('/statistics/overview')
  } catch (e: any) {
    error.value = e?.data?.message || 'Statistics could not be loaded.'
  } finally {
    loading.value = false
  }
})
const bars = computed(() => data.value?.diagnoses || [])
const maxBar = computed(() =>
  Math.max(...bars.value.map((x: any) => Number(x.value) || 0), 1),
)
</script>
<template>
  <div class="modal-backdrop" @click.self="emit('close')">
    <div class="modal-card max-w-4xl">
      <div
        class="flex items-start justify-between border-b border-[#e6e9e7] p-6"
      >
        <div>
          <p class="eyebrow">Practice insights</p>
          <h2 class="modal-title">Statistics</h2>
          <p class="modal-subtitle">
            Usage analytics populated from the backend.
          </p>
        </div>
        <button class="icon-btn" @click="emit('close')">
          <X :size="19" />
        </button>
      </div>
      <div class="p-6">
        <div v-if="loading" class="py-12 text-center text-sm text-slate-500">
          Loading statistics…
        </div>
        <p v-else-if="error" class="alert-error">{{ error }}</p>
        <div v-else class="space-y-5">
          <div class="grid gap-3 sm:grid-cols-3">
            <div class="stat-card">
              <span>Patients seen</span
              ><strong>{{ data?.patients_seen ?? '—' }}</strong
              ><small>Selected period</small>
            </div>
            <div class="stat-card">
              <span>Notes completed</span
              ><strong>{{ data?.notes_completed ?? '—' }}</strong
              ><small>AI-assisted documentation</small>
            </div>
            <div class="stat-card">
              <span>Avg. note time</span
              ><strong>{{ data?.avg_note_time ?? '—' }}</strong
              ><small>Compared with baseline</small>
            </div>
          </div>
          <div class="grid gap-5 lg:grid-cols-2">
            <div class="chart-card">
              <div class="flex items-center gap-2">
                <BarChart3 :size="18" /><b>Diagnosis distribution</b>
              </div>
              <div class="mt-6 space-y-3">
                <div v-for="item in bars" :key="item.label">
                  <div class="mb-1 flex justify-between text-xs">
                    <span>{{ item.label }}</span
                    ><span>{{ item.value }}</span>
                  </div>
                  <div class="h-2 rounded-full bg-[#edf0ee]">
                    <div
                      class="h-2 rounded-full bg-[#315c53]"
                      :style="{ width: `${(item.value / maxBar) * 100}%` }"
                    />
                  </div>
                </div>
                <div
                  v-if="!bars.length"
                  class="py-10 text-center text-sm text-slate-400"
                >
                  No diagnosis analytics yet.
                </div>
              </div>
            </div>
            <div class="chart-card flex min-h-64 flex-col">
              <div class="flex items-center gap-2">
                <PieChart :size="18" /><b>Care activity mix</b>
              </div>
              <div
                class="m-auto grid h-36 w-36 place-items-center rounded-full border-[22px] border-[#dfe8e4]"
              >
                <div class="text-center">
                  <strong class="block text-xl">{{
                    data?.activity_mix_total ?? '—'
                  }}</strong
                  ><span class="text-[10px] text-slate-400">activities</span>
                </div>
              </div>
            </div>
          </div>
          <div class="chart-card">
            <div class="flex items-center gap-2">
              <TrendingUp :size="18" /><b>Clinical workload trend</b>
            </div>
            <div class="mt-6 flex h-32 items-end gap-2">
              <div
                v-for="(v, i) in data?.trend || []"
                :key="i"
                class="flex-1 rounded-t-md bg-[#315c53]/80"
                :style="{ height: `${Math.max(Number(v), 8)}%` }"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
