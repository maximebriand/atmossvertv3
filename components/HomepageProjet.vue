<template>
  <div class="flex flex-1">
    <section class="comparison'.liste-projets'">
      <section class="comparisonSection">
        <div class="comparisonImage beforeImage">
          <img
            :src="imgUrl + projet.image_avant.formats.large.url"
            alt="before"
          />
        </div>
        <div class="comparisonImage afterImage">
          <img
            :src="imgUrl + projet.image_apres.formats.large.url"
            alt="after"
          />
        </div>
      </section>
    </section>
    <div class="test">
      <h1>{{ projet.titre }}</h1>
      <p>{{ projet.description }}</p>
      <a href="">Voir le projet</a>
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
    return { imgUrl: process.env.imgUrl }
  },
  mounted() {
    const section = this.$el.querySelector('section.comparisonSection')
    const titre = this.$el.querySelector('.test h1')
    const soustitre = this.$el.querySelector('.test p')
    const lienBtn = this.$el.querySelector('.test a')

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
