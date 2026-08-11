
<template>
  <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
    <article
      v-for="img of images"
      :key="img.filename"
      class="flex items-center justify-center rounded aspect-square overflow-hidden bg-black hover:bg-gray-50 hover:border-gray-50 border border-transparent border-solid hover:cursor-pointer transition-all"
      @click="open(img)"
    >
      <img :src="img.src" :alt="img.filename" class="w-full h-full object-cover" />
    </article>
  </div>

  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="selected"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
        @click.self="close"
      >
        <div
          class="absolute top-4 right-4 text-white/80 hover:text-white text-3xl leading-none transition-colors hover:cursor-pointer"
          aria-label="Close"
          @click="close"
        >
          &times;
        </div>

        <img
          :src="selected.src"
          :alt="selected.filename"
          class="max-w-full max-h-[85vh] object-contain rounded shadow-2xl"
        />

        <button
          class="absolute bottom-6 flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm border border-white/20 backdrop-blur-sm transition-colors hover:cursor-pointer"
          @click.stop="download(selected)"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
        </button>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  // Array of { src, filename }
  images: { type: Array, required: true }
})

const selected = ref(null)

function open(img) {
  selected.value = img
}

function close() {
  selected.value = null
}

function onKeydown(e) {
  if (e.key === 'Escape') close()
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))

async function download(img) {
  try {
    // Fetch as a blob so the download works even if the browser
    // would otherwise navigate to the image instead of saving it.
    const response = await fetch(img.src)
    const blob = await response.blob()
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = img.filename || 'image'
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  } catch (err) {
    // Fallback for cross-origin images blocked by CORS: open in a new tab
    window.open(img.src, '_blank')
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
