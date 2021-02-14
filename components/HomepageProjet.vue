<template>
  <div class="flex flex-1">
    <section class="comparisonContainer">
      <section class="comparisonSection">
        <div class="comparisonImage beforeImage">
          <img src="https://picsum.photos/id/1/1200/900" alt="before" />
        </div>
        <div class="comparisonImage afterImage">
          <img src="https://picsum.photos/id/2/1200/900" alt="after" />
        </div>
      </section>
    </section>
    <div class="test">
      <h1>Titre du projet</h1>
      <p>Super projet par Marvin Laurand</p>
      {{ data }}
      <a href="">Voir le projet</a>
    </div>
  </div>
</template>

<script>
import { gsap } from 'gsap'
import ScrollToPlugin from 'gsap/ScrollToPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(ScrollToPlugin)
export default {
  props: ['data'],
  mounted() {
    console.log(this.data);
    const section = this.$el.querySelector('section.comparisonSection')
    const titre = this.$el.querySelector('.test h1')
    const soustitre = this.$el.querySelector('.test p')
    const lienBtn = this.$el.querySelector('.test a')

    let tl = gsap.timeline({
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
    // tl.to('body', 0.2, {
    //   backgroundColor: this.data
    // })
    tl.fromTo('body', 0.2, 
    {
      backgroundColor: this.data[0]
    },
    {
      backgroundColor: this.data[1]
    }
    )
    // animate the container one way...
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
    tl.to(titre, 0.5, { x: 0, autoAlpha: 1, ease: 'power2.out' }, 0)
    tl.to(soustitre, 0.8, { y: 0, autoAlpha: 1, ease: 'power2.out' }, 0)
    tl.to(lienBtn, 1, { x: 0, ease: 'power2.out' }, 0)
  },
}
</script>