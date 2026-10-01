<script setup lang="ts">
import { Search, UserPlus, X, HeartPulse } from 'lucide-vue-next'
const emit = defineEmits<{ close: []; select: [patient: any] }>()
const api = useApi()
const query = ref('')
const loading = ref(false)
const error = ref('')
const results = ref<any[]>([])
const showAdd = ref(false)
const form = reactive({
  name: '',
  phone: '',
  email: '',
  caretaker_name: '',
  date_of_birth: '',
  notes: '',
})
async function search() {
  if (!query.value.trim()) return
  loading.value = true
  error.value = ''
  try {
    results.value = await api<any[]>('/patients/search', {
      query: { q: query.value.trim() },
    })
  } catch (e: any) {
    error.value = e?.data?.message || 'Could not reach the patient service.'
    results.value = []
  } finally {
    loading.value = false
  }
}
async function addPatient() {
  loading.value = true
  error.value = ''
  try {
    const p = await api<any>('/patients', { method: 'POST', body: form })
    results.value = [p]
    showAdd.value = false
    Object.assign(form, {
      name: '',
      phone: '',
      email: '',
      caretaker_name: '',
      date_of_birth: '',
      notes: '',
    })
  } catch (e: any) {
    error.value = e?.data?.message || 'Could not create the patient.'
  } finally {
    loading.value = false
  }
}
</script>
<template>
  <div class="modal-backdrop" @click.self="emit('close')">
    <div class="modal-card relative max-w-4xl">
      <div
        class="flex items-start justify-between border-b border-[#e6e9e7] p-6"
      >
        <div>
          <p class="eyebrow">Patient workspace</p>
          <h2 class="modal-title">Find a patient</h2>
          <p class="modal-subtitle">
            Search by name, phone, email or caretaker name.
          </p>
        </div>
        <button class="icon-btn" @click="emit('close')">
          <X :size="19" />
        </button>
      </div>
      <div class="p-6">
        <div class="flex flex-col gap-2 sm:flex-row">
          <div class="search-field flex-1">
            <Search :size="18" /><input
              v-model="query"
              @keyup.enter="search"
              placeholder="e.g. Rahul Kumar, +91…, email, caretaker…"
            />
          </div>
          <button class="primary-btn" @click="search">
            <Search :size="16" /> Search</button
          ><button class="secondary-btn" @click="showAdd = true">
            <UserPlus :size="16" /> Add patient
          </button>
        </div>
        <p v-if="error" class="alert-error mt-3">{{ error }}</p>
        <div v-if="loading" class="py-12 text-center text-sm text-slate-500">
          Working…
        </div>
        <div v-else-if="results.length" class="mt-5 space-y-2">
          <button
            v-for="patient in results"
            :key="patient.id"
            class="patient-result"
            @click="emit('select', patient)"
          >
            <div class="avatar">
              {{ (patient.name || 'P').slice(0, 2).toUpperCase() }}
            </div>
            <div class="min-w-0 flex-1 text-left">
              <div class="font-semibold">{{ patient.name }}</div>
              <div class="mt-1 text-xs text-slate-500">
                {{ patient.id || '—' }} · {{ patient.phone || 'No phone' }} ·
                {{ patient.email || 'No email' }}
              </div>
            </div>
            <div class="hidden text-xs text-slate-500 sm:block">
              Caretaker: {{ patient.caretaker_name || '—' }}
            </div>
          </button>
        </div>
        <div
          v-else-if="query && !error"
          class="py-12 text-center text-sm text-slate-500"
        >
          No patients found.
        </div>
        <div
          v-else
          class="mt-8 rounded-2xl border border-dashed border-[#dce2df] p-10 text-center"
        >
          <HeartPulse class="mx-auto mb-3 text-[#315c53]" :size="28" />
          <p class="font-medium">Search your patient registry</p>
          <p class="mt-1 text-sm text-slate-500">
            Patient records are loaded from your backend; nothing is hard-coded
            in this dashboard.
          </p>
        </div>
      </div>
      <div v-if="showAdd" class="absolute inset-0 rounded-2xl bg-white p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="eyebrow">Patient registry</p>
            <h3 class="text-xl font-semibold">Add new patient</h3>
          </div>
          <button class="icon-btn" @click="showAdd = false">
            <X :size="19" />
          </button>
        </div>
        <form
          class="mt-5 grid gap-4 sm:grid-cols-2"
          @submit.prevent="addPatient"
        >
          <label
            ><span class="label">Full name</span
            ><input v-model="form.name" class="field" required /></label
          ><label
            ><span class="label">Phone</span
            ><input v-model="form.phone" class="field" /></label
          ><label
            ><span class="label">Email</span
            ><input v-model="form.email" type="email" class="field" /></label
          ><label
            ><span class="label">Caretaker name</span
            ><input v-model="form.caretaker_name" class="field" /></label
          ><label
            ><span class="label">Date of birth</span
            ><input
              v-model="form.date_of_birth"
              type="date"
              class="field" /></label
          ><label class="sm:col-span-2"
            ><span class="label">Notes</span
            ><textarea v-model="form.notes" class="field min-h-24" />
          </label>
          <div class="flex justify-end gap-2 sm:col-span-2">
            <button
              type="button"
              class="secondary-btn"
              @click="showAdd = false"
            >
              Cancel</button
            ><button class="primary-btn" :disabled="loading">
              {{ loading ? 'Saving…' : 'Create patient' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
