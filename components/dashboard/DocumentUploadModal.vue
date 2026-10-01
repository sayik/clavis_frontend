<script setup lang="ts">
import { FileText, Upload, X } from 'lucide-vue-next'
const emit = defineEmits<{ close: [] }>()
const api = useApi()
const file = ref<File | null>(null)
const loading = ref(false)
const message = ref('')
const error = ref('')
function pick(e: Event) {
  file.value = (e.target as HTMLInputElement).files?.[0] || null
}
async function upload() {
  if (!file.value) return
  loading.value = true
  error.value = ''
  message.value = ''
  try {
    const signed: any = await api('/documents/presign', {
      method: 'POST',
      body: {
        filename: file.value.name,
        content_type: file.value.type,
        size: file.value.size,
      },
    })
    await $fetch(signed.upload_url, {
      method: 'PUT',
      body: file.value,
      headers: {
        'Content-Type': file.value.type || 'application/octet-stream',
      },
    })
    if (signed.document_id)
      await api(`/documents/${signed.document_id}/complete`, { method: 'POST' })
    message.value = 'Document uploaded securely.'
  } catch (e: any) {
    error.value =
      e?.data?.message ||
      'Upload failed. Configure the presigned upload endpoint first.'
  } finally {
    loading.value = false
  }
}
</script>
<template>
  <div class="modal-backdrop" @click.self="emit('close')">
    <div class="modal-card max-w-xl">
      <div
        class="flex items-start justify-between border-b border-[#e6e9e7] p-6"
      >
        <div>
          <p class="eyebrow">Clinical document</p>
          <h2 class="modal-title">Upload report or image</h2>
          <p class="modal-subtitle">
            Files should go directly to secure object storage using a
            short-lived signed URL.
          </p>
        </div>
        <button class="icon-btn" @click="emit('close')">
          <X :size="19" />
        </button>
      </div>
      <div class="p-6">
        <label
          class="flex min-h-44 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-[#ccd6d2] bg-[#fafcfb] text-center hover:bg-[#f5f8f6]"
          ><Upload class="mb-3 text-[#315c53]" :size="28" /><span
            class="font-medium"
            >{{ file ? file.name : 'Choose a PDF, image or report' }}</span
          ><span class="mt-1 text-xs text-slate-400"
            >The backend must validate type and size.</span
          ><input
            type="file"
            class="hidden"
            accept=".pdf,image/*"
            @change="pick"
        /></label>
        <p v-if="error" class="alert-error mt-3">{{ error }}</p>
        <p
          v-if="message"
          class="mt-3 rounded-xl border border-[#d9e8df] bg-[#f3f9f5] px-4 py-3 text-sm text-[#35604b]"
        >
          {{ message }}
        </p>
        <div class="mt-5 flex justify-end gap-2">
          <button class="secondary-btn" @click="emit('close')">Close</button
          ><button
            class="primary-btn"
            :disabled="!file || loading"
            @click="upload"
          >
            {{ loading ? 'Uploading…' : 'Upload document' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
