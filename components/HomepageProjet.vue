<template>
  <div class="projet content">
    <section class="comparison'.liste-projets'">
      <section class="comparisonSection">
        <div class="comparisonImage beforeImage">
          <img :src="imageBefore" alt="before" />
        </div>
        <div class="comparisonImage afterImage">
          <img :src="imageAfter" alt="after" />
        </div>
      </section>
    </section>
    <div class="projet_content">
      <h1>{{ projet.title.rendered }}</h1>
      <div v-html="projet.excerpt.rendered"></div>
      <a class="button" href="">Voir le projet</a>
    </div>
    </div>
  </div>
</template>

<script>
import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(ScrollToPlugin)
export default {
  props: ['projet', 'bkg_color'],
  data() {
    return {
      imageBefore: '',
      imageAfter: '',
    }
  },
  async fetch() {
    await this.$axios
      .$get('api/media/' + this.projet.img_before)
      .then((img) => {
        this.imageBefore = img.media_details.sizes.large.source_url
      })
    await this.$axios
      .$get('api/media/' + this.projet.img_after)
      .then(
        (img) => (this.imageAfter = img.media_details.sizes.large.source_url)
      )
  },
  fetchOnServer: false,
  mounted() {
    const section = this.$el.querySelector('section.comparisonSection')
    const titre = this.$el.querySelector('.projet_content h1')
    const soustitre = this.$el.querySelector('.projet_content div')
    const lienBtn = this.$el.querySelector('.projet_content a')

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'center center',
        // makes the height of the scrolling (while pinning) match the width, thus the speed remains constant (vertical/horizontal)
        end: () => '+=' + section.offsetWidth,
        scrub: true,
        pin: true,
        anticipatePin: 1,
      },
      defaults: { ease: 'none' },
    })

    // animate the '.liste-projets' one way...
    tl.fromTo(
      section.querySelector('.afterImage'),
      { xPercent: 100, x: 0 },
      { xPercent: 0 }
    )
      // ...and the image the opposite way (at the same time)
      .fromTo(
        section.querySelector('.afterImage img'),
        { xPercent: -100, x: 0 },
        { xPercent: 0 },
        0
      )

      .to(titre, 0.5, { x: 0, autoAlpha: 1, ease: 'power2.out' }, 0)
      .to(soustitre, 0.8, { y: 0, autoAlpha: 1, ease: 'power2.out' }, 0)
      .to(lienBtn, 1, { x: 0, ease: 'power2.out' }, 0)
  },
}
</script>
