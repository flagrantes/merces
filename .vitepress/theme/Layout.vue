<template>
  <main class="epk">
    <h1 class="text-8xl m-0">{{ site.name }}</h1>
    <h2 class="mt-0! mb-3">{{ site.tagline }}</h2>

    <img :src="withBase(site.hero.src)" :alt="site.hero.alt" class="h-60 w-full overflow-hidden object-cover" />

    <p v-for="paragraph in site.introduction" :key="paragraph">{{ paragraph }}</p>

    <section v-if="data.media?.length">
      <h2>Media</h2>
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_3fr]">
        <template v-for="media in data.media" :key="media.title">
          <p class="m-0">{{ media.title }}</p>
          <div>
            <span class="flex gap-2" v-for="link in media.links" :key="link.link">
              {{ getIcon(link.type) }}
              <a :href="link.link" target="_blank" rel="noreferrer">{{ link.title }}</a>
            </span>
          </div>
        </template>
      </div>
    </section>

    <section v-if="posts?.length">
      <h2>Photos</h2>
      <ImageGallery :images="posts" />
    </section>

    <section v-if="data.dates?.length">
      <h2>Dates</h2>
      <div class="flex flex-col *:m-0 gap-8 lg:gap-6">
        <article v-for="event in data.dates" :key="event.date + event.title">
          <header class="flex flex-col justify-between lg:flex-row">
            <h3 class="m-0 grid lg:grid-cols-[120px_auto] lg:gap-3">
              <strong>{{ formatDate(event.date) }}</strong>
              <a v-if="event.link" :href="event.link" target="_blank" rel="noreferrer">{{ event.title }}</a>
              <span v-else>{{ event.title }}</span>
            </h3>
            <span>{{ event.venue }} ({{ event.city }})</span>
          </header>
          <span class="text-gray-300" v-if="event.lineup"> — avec {{ event.lineup.join(', ') }}</span>
          <span class="text-gray-500" v-if="event.organizer"> (organisé par {{ event.organizer }})</span>
        </article>
      </div>
    </section>

    <section v-if="site.booking">
      <h2>Booking</h2>
      <p>{{ site.booking.text }} <a :href="`mailto:${site.booking.email}`">{{ site.booking.email }}</a></p>
      <p>{{ site.booking.setlist }}</p>
    </section>

    <section v-if="data.links?.length">
      <h2>Réseaux</h2>
      <ul class="list-none m-0 p-0">
        <li v-for="link in data.links" :key="link.title">
          <a v-if="link.link" :href="link.link" target="_blank" rel="noreferrer">{{ link.title }}</a>
          <span v-else>{{ link.title }}</span>
          · {{ link.link ?? link.info }}
        </li>
      </ul>
    </section>

    <footer class="py-7 self-end text-xs"><hr>➤ {{ site.footer }}</footer>
  </main>
</template>

<script setup>
import { withBase } from 'vitepress'
import ImageGallery from './components/image-gallery.vue'
import { data as posts } from '../../documents.data.ts'
import { data } from '../../dynamic.data.ts'

const site = data.site

function formatDate(date) {
  return new Date(date).toLocaleDateString('fr-FR')
}

function getIcon(type) {
  if (type === 'music') return '🎵'
  if (type === 'video') return '🎬'
  return ''
}
</script>