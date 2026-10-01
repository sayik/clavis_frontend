<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import {
  Bell,
  Bot,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  FileText,
  FlaskConical,
  HelpCircle,
  Home,
  LayoutTemplate,
  Menu,
  Mic,
  Paperclip,
  Pill,
  Search,
  Send,
  Settings,
  Sun,
  UserRound,
  BarChart3,
  Sparkles,
  X,
} from 'lucide-vue-next'
import PatientModal from '~/components/dashboard/PatientModal.vue'
import NotificationsModal from '~/components/dashboard/NotificationsModal.vue'
import ModelsModal from '~/components/dashboard/ModelsModal.vue'
import StatsModal from '~/components/dashboard/StatsModal.vue'
import TemplatesModal from '~/components/dashboard/TemplatesModal.vue'
import ResourceSearchModal from '~/components/dashboard/ResourceSearchModal.vue'
import DocumentUploadModal from '~/components/dashboard/DocumentUploadModal.vue'

const api = useApi()
const leftCollapsed = ref(false),
  rightCollapsed = ref(false),
  mobileLeft = ref(false),
  activeModal = ref(''),
  profileOpen = ref(false)
const query = ref(''),
  message = ref(''),
  recording = ref(false),
  commonDiagnoses = ref<any[]>([]),
  diagnosisLoading = ref(true),
  diagnosisError = ref('')
const resourceModal = ref('')
const patient = ref<any>({
  name: '',
  age: '',
  gender: '',
  id: '',
  phone: '',
  allergies: [],
  conditions: [],
  last_visit: '',
})
const nav = [
  ['Home', Home, ''],
  ['Patient', UserRound, 'Identify & Manage'],
  ['Notifications', Bell, 'Alerts & Preferences'],
  ['AI Models', Bot, 'Select & Configure'],
  ['Statistics', BarChart3, 'Insights & Reports'],
  ['Treatment Templates', LayoutTemplate, 'Plan & Prescribe'],
]
const filtered = computed(() =>
  commonDiagnoses.value.filter((d) =>
    (d.name || d.title || '').toLowerCase().includes(query.value.toLowerCase()),
  ),
)
async function loadCommonDiagnoses() {
  diagnosisLoading.value = true
  diagnosisError.value = ''
  try {
    commonDiagnoses.value = await api<any[]>('/diagnoses/common')
  } catch (e: any) {
    diagnosisError.value =
      e?.data?.message || 'Could not load common diagnoses.'
    commonDiagnoses.value = []
  } finally {
    diagnosisLoading.value = false
  }
}
onMounted(loadCommonDiagnoses)
function openNav(label: string) {
  if (label === 'Home') return
  activeModal.value = label
  mobileLeft.value = false
}
function send() {
  if (!message.value.trim()) return
  message.value = ''
}
function selectPatient(p: any) {
  patient.value = { ...patient.value, ...p }
  activeModal.value = ''
}
</script>
<template>
  <div class="flex min-h-screen overflow-hidden bg-[#f8f9f7] text-[#172321]">
    <div
      v-if="mobileLeft"
      class="fixed inset-0 z-40 bg-black/20 lg:hidden"
      @click="mobileLeft = false"
    ></div>
    <aside
      :class="[
        'sidebar',
        leftCollapsed ? 'sidebar-collapsed' : '',
        'mobile-sidebar',
        mobileLeft ? 'mobile-sidebar-open' : '',
      ]"
    >
      <div class="mb-8 flex items-center justify-between px-2">
        <div class="flex items-center gap-3 overflow-hidden">
          <div class="brand-mark"><span /><span /></div>
          <div v-if="!leftCollapsed">
            <div class="text-[25px] font-semibold leading-none tracking-tight">
              Clavis
            </div>
            <div class="mt-1 text-sm text-slate-500">Medical Scribe</div>
          </div>
        </div>
        <button
          class="collapse-btn lg:flex"
          @click="leftCollapsed = !leftCollapsed"
        >
          <ChevronLeft v-if="!leftCollapsed" :size="17" /><ChevronRight
            v-else
            :size="17"
          /></button
        ><button class="collapse-btn lg:hidden" @click="mobileLeft = false">
          <X :size="17" />
        </button>
      </div>
      <nav class="space-y-2">
        <button
          v-for="[label, Icon, sub] in nav"
          :key="label"
          @click="openNav(label)"
          :class="['nav-item', activeModal === label ? 'nav-active' : '']"
        >
          <component :is="Icon" :size="21" :stroke-width="1.8" />
          <div v-if="!leftCollapsed" class="min-w-0">
            <div class="text-[14px] font-medium">{{ label }}</div>
            <div v-if="sub" class="mt-0.5 text-[10px] text-slate-500">
              {{ sub }}
            </div>
          </div>
        </button>
      </nav>
      <div class="mt-auto">
        <div class="space-y-1 border-t border-[#e5e8e6] pt-5">
          <button class="nav-item">
            <Settings :size="20" /><span v-if="!leftCollapsed"
              >Settings</span
            ></button
          ><button class="nav-item">
            <HelpCircle :size="20" /><span v-if="!leftCollapsed"
              >Help & Support</span
            >
          </button>
        </div>
        <div v-if="!leftCollapsed" class="px-3 pb-1 pt-7">
          <div class="text-[17px] font-medium leading-tight">
            Less typing.<br />More care.
          </div>
          <div class="my-4 h-px w-6 bg-[#263b37]" />
          <p class="text-xs leading-5 text-slate-500">
            Clavis helps you focus<br />on what matters.
          </p>
        </div>
      </div>
    </aside>

    <main
      class="h-screen min-w-0 flex-1 overflow-auto px-3 py-3 sm:px-5 sm:py-4"
    >
      <header class="mb-3 flex h-[58px] items-center gap-2 sm:gap-4">
        <button
          class="collapse-btn border bg-white lg:hidden"
          @click="mobileLeft = true"
        >
          <Menu :size="19" />
        </button>
        <div
          class="flex h-11 flex-1 items-center gap-3 rounded-xl border border-[#e5e8e6] bg-white px-4 shadow-[0_8px_28px_rgba(20,35,33,.045)]"
        >
          <Search :size="19" /><input
            class="w-full text-sm outline-none placeholder:text-slate-400"
            placeholder="Search patients, notes, diagnosis, medications..."
          />
        </div>
        <button
          class="hidden h-11 w-11 items-center justify-center rounded-full hover:bg-white sm:flex"
        >
          <Sun :size="20" />
        </button>
        <div class="relative">
          <button
            class="flex h-11 items-center gap-2 rounded-xl pl-1 pr-2 hover:bg-white"
            @click="profileOpen = !profileOpen"
          >
            <div class="relative">
              <div
                class="flex h-10 w-10 items-center justify-center rounded-full bg-[#d9e5e0] font-semibold text-[#21403a]"
              >
                AN
              </div>
              <span
                class="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-[#6e9c84]"
              />
            </div>
            <div class="hidden text-left leading-tight md:block">
              <div class="text-[14px] font-semibold">Dr. Arjun Nair</div>
              <div class="mt-1 text-[10px] text-slate-500">
                General Medicine
              </div>
            </div>
            <ChevronDown :size="17" />
          </button>
          <div
            v-if="profileOpen"
            class="absolute right-0 top-12 z-30 w-64 rounded-xl border border-[#e5e8e6] bg-white p-3 shadow-xl"
          >
            <div class="p-3">
              <div class="font-semibold">Dr. Arjun Nair</div>
              <div class="mt-1 text-xs text-slate-500">General Medicine</div>
              <div class="mt-3 text-xs text-slate-500">
                Account details, clinic profile, subscription and sign out can
                be connected here.
              </div>
            </div>
          </div>
        </div>
      </header>

      <div
        :class="['dashboard-grid', rightCollapsed ? 'right-is-collapsed' : '']"
      >
        <section class="min-w-0">
          <div
            class="mb-3 flex items-center justify-between gap-3 rounded-xl border border-[#e5e8e6] bg-white px-4 py-4 shadow-[0_8px_28px_rgba(20,35,33,.045)] sm:px-5"
          >
            <div class="flex min-w-0 items-center gap-3">
              <div
                class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#e0edf5] font-semibold text-[#31627b] sm:h-14 sm:w-14"
              >
                {{
                  patient.name ? patient.name.slice(0, 2).toUpperCase() : 'PT'
                }}
              </div>
              <div class="min-w-0">
                <div
                  class="truncate text-lg font-semibold tracking-tight sm:text-[21px]"
                >
                  {{ patient.name || 'No patient selected' }}
                </div>
                <div class="mt-1 truncate text-[11px] text-slate-500">
                  {{ patient.age || '—' }} years · {{ patient.gender || '—' }} ·
                  ID: {{ patient.id || '—' }} · {{ patient.phone || '—' }}
                </div>
                <div class="mt-2 flex gap-2 overflow-auto">
                  <span
                    v-for="c in patient.conditions"
                    :key="c"
                    class="whitespace-nowrap rounded-full border border-[#e5e8e6] bg-[#f3f5f4] px-2.5 py-1 text-[9px]"
                    >{{ c }}</span
                  ><span
                    v-for="a in patient.allergies"
                    :key="a"
                    class="whitespace-nowrap rounded-full border border-[#eadfD5] bg-[#fbf4ee] px-2.5 py-1 text-[9px]"
                    >Allergy: {{ a }}</span
                  >
                </div>
              </div>
            </div>
            <div class="hidden shrink-0 gap-2 sm:flex">
              <button
                class="secondary-btn h-9 px-3 text-xs"
                @click="activeModal = 'Patient'"
              >
                View / Change
              </button>
            </div>
          </div>
          <div
            class="flex min-h-[calc(100vh-260px)] flex-col rounded-xl border border-[#e5e8e6] bg-white shadow-[0_8px_28px_rgba(20,35,33,.045)]"
          >
            <div class="flex-1 space-y-5 overflow-auto p-4 sm:p-7">
              <div class="flex max-w-[88%] gap-3">
                <div
                  class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#e7ecea]"
                >
                  <Sparkles :size="16" />
                </div>
                <div
                  class="rounded-2xl rounded-tl-md bg-[#f3f4f3] p-4 text-sm leading-6"
                >
                  <p>Hello Dr. Arjun,</p>
                  <p class="mt-2">
                    Select a patient and dictate, type, or upload information. I
                    can help draft clinical notes and surface suggestions for
                    review.
                  </p>
                  <span class="mt-2 block text-[10px] text-slate-400"
                    >AI assistant</span
                  >
                </div>
              </div>
              <div class="flex justify-end">
                <div
                  class="max-w-[82%] rounded-2xl rounded-tr-md bg-[#e5ece8] p-4 text-sm leading-6"
                >
                  Patient encounter details will appear here as you dictate or
                  enter them.
                  <span class="mt-2 block text-[10px] text-slate-400"
                    >Draft encounter</span
                  >
                </div>
              </div>
            </div>
            <div class="px-3 pb-4 sm:px-5">
              <div class="flex gap-2">
                <button
                  class="flex h-12 w-12 items-center justify-center rounded-xl border border-[#e5e8e6] sm:h-14 sm:w-14"
                  title="Upload document"
                >
                  <Paperclip :size="20" />
                </button>
                <div
                  class="flex h-12 flex-1 items-center rounded-xl border border-[#e5e8e6] bg-white px-3 sm:h-14 sm:px-4"
                >
                  <input
                    v-model="message"
                    @keyup.enter="send"
                    class="flex-1 text-sm outline-none placeholder:text-slate-400"
                    placeholder="Type a message or start dictating..."
                  /><button
                    @click="send"
                    class="flex h-10 w-10 items-center justify-center rounded-lg bg-[#18312e] text-white"
                  >
                    <Send :size="18" />
                  </button>
                </div>
              </div>
              <div class="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-5">
                <button class="utility" @click="resourceModal = 'document'">
                  <FileText :size="21" /><b>Upload Document</b
                  ><span>Lab reports, images</span></button
                ><button class="utility" @click="recording = !recording">
                  <Mic :size="21" /><b>{{
                    recording ? 'Stop Recording' : 'Start Recording'
                  }}</b
                  ><span>Voice to note</span></button
                ><button class="utility" @click="resourceModal = 'medicine'">
                  <Pill :size="21" /><b>Search Medicines</b
                  ><span>Brand / Generic</span></button
                ><button class="utility" @click="resourceModal = 'diagnosis'">
                  <Search :size="21" /><b>Search Diagnosis</b
                  ><span>Available in area</span></button
                ><button class="utility" @click="resourceModal = 'tests'">
                  <FlaskConical :size="21" /><b>Order Tests</b
                  ><span>Lab / Imaging</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        <aside v-if="!rightCollapsed" class="diagnosis-panel">
          <div class="mb-3 flex items-center justify-between">
            <h2 class="text-[17px] font-semibold">Common Diagnosis</h2>
            <button
              class="icon-btn"
              @click="rightCollapsed = true"
              title="Collapse panel"
            >
              <ChevronRight :size="17" />
            </button>
          </div>
          <div class="search-field mb-3">
            <Search :size="16" /><input
              v-model="query"
              placeholder="Search diagnosis..."
            />
          </div>
          <div
            v-if="diagnosisLoading"
            class="py-10 text-center text-xs text-slate-400"
          >
            Loading diagnoses…
          </div>
          <div v-else-if="diagnosisError" class="alert-error text-xs">
            {{ diagnosisError }}
          </div>
          <div v-else class="flex-1 overflow-auto pr-1">
            <button
              v-for="d in filtered"
              :key="d.id || d.code || d.name"
              class="diagnosis-row"
            >
              <span>{{ d.name || d.title }}</span
              ><ChevronRight :size="15" class="shrink-0 text-slate-400" />
            </button>
            <div v-if="!filtered.length" class="p-3 text-xs text-slate-400">
              No diagnosis found.
            </div>
          </div>
        </aside>
        <button
          v-else
          class="right-expand hidden lg:flex"
          @click="rightCollapsed = false"
        >
          <ChevronLeft :size="18" />
        </button>
      </div>
    </main>

    <div v-if="activeModal === 'Patient'">
      <PatientModal @close="activeModal = ''" @select="selectPatient" />
    </div>
    <NotificationsModal
      v-if="activeModal === 'Notifications'"
      @close="activeModal = ''"
    />
    <ModelsModal v-if="activeModal === 'AI Models'" @close="activeModal = ''" />
    <StatsModal v-if="activeModal === 'Statistics'" @close="activeModal = ''" />
    <TemplatesModal
      v-if="activeModal === 'Treatment Templates'"
      @close="activeModal = ''"
    />
    <ResourceSearchModal
      v-if="resourceModal === 'medicine'"
      title="Search Medicines"
      subtitle="Search your approved formulary or connected medicine database."
      endpoint="/medicines/search"
      placeholder="Medicine name, generic, brand…"
      @close="resourceModal = ''"
    />
    <ResourceSearchModal
      v-if="resourceModal === 'diagnosis'"
      title="Search Diagnosis"
      subtitle="Find diagnosis options available in the configured clinical area."
      endpoint="/diagnoses/search"
      placeholder="Diagnosis, ICD code…"
      @close="resourceModal = ''"
    />
    <ResourceSearchModal
      v-if="resourceModal === 'tests'"
      title="Search Tests"
      subtitle="Search connected laboratory and imaging services."
      endpoint="/tests/search"
      placeholder="Test, panel, imaging…"
      @close="resourceModal = ''"
    />
    <DocumentUploadModal
      v-if="resourceModal === 'document'"
      @close="resourceModal = ''"
    />
  </div>
</template>
