<script setup lang="ts">
import { Download, FileText, Sparkles, X } from 'lucide-vue-next'
const emit = defineEmits<{ close: [] }>()
const api = useApi()
const templates = ref<any[]>([])
const loading = ref(true)
const error = ref('')
onMounted(async () => {
  try {
    templates.value = await api<any[]>('/treatment-templates')
  } catch (e: any) {
    error.value = e?.data?.message || 'Treatment templates could not be loaded.'
  } finally {
    loading.value = false
  }
})
</script>
<template>
  <div class="modal-backdrop" @click.self="emit('close')">
    <div class="modal-card max-w-4xl">
      <div
        class="flex items-start justify-between border-b border-[#e6e9e7] p-6"
      >
        <div>
          <p class="eyebrow">Plans & prescribing</p>
          <h2 class="modal-title">Treatment Templates</h2>
          <p class="modal-subtitle">
            AI-generated and clinic-approved plans supplied by the backend.
          </p>
        </div>
        <button class="icon-btn" @click="emit('close')">
          <X :size="19" />
        </button>
      </div>
      <div class="max-h-[70vh] overflow-auto p-6">
        <div v-if="loading" class="py-12 text-center text-sm text-slate-500">
          Loading templates…
        </div>
        <p v-else-if="error" class="alert-error">{{ error }}</p>
        <div
          v-else-if="!templates.length"
          class="rounded-2xl border border-dashed border-[#dce2df] p-10 text-center"
        >
          <Sparkles class="mx-auto mb-3 text-[#315c53]" />
          <p class="font-medium">No templates yet</p>
          <p class="mt-1 text-sm text-slate-500">
            AI-generated and clinic-approved templates will appear here.
          </p>
        </div>
        <div v-else class="grid gap-3 md:grid-cols-2">
          <div
            v-for="template in templates"
            :key="template.id"
            class="template-card"
          >
            <div class="flex items-start gap-3">
              <div class="template-icon"><FileText :size="18" /></div>
              <div class="min-w-0 flex-1">
                <h3 class="font-semibold">{{ template.title }}</h3>
                <p class="mt-1 text-sm text-slate-500">
                  {{ template.description }}
                </p>
                <div
                  class="mt-3 flex items-center gap-2 text-[11px] text-slate-400"
                >
                  <span>{{ template.type || 'Treatment plan' }}</span
                  ><span>·</span
                  ><span>{{ template.updated_at || 'Recently updated' }}</span>
                </div>
              </div>
            </div>
            <a
              v-if="template.pdf_url"
              :href="template.pdf_url"
              target="_blank"
              rel="noopener"
              class="secondary-btn mt-4 h-9 w-full text-xs"
              ><Download :size="14" /> Open PDF</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
