<template>
  <div>
    <div class="loader df aic jcc">
      <div>
        <h1>Loading</h1>
        <h2 class="loader--text">0%</h2>
      </div>
    </div>
    <section class="hero">
      <!--<img src="https://api.atmossvert.fr/wp-content/uploads/2020/06/image.jpeg" alt="" srcset="">-->
      <img src="~/assets/cover.jpeg" alt="" srcset="" />
      <div class="text-heading">
        <h1>
          <span class="hidetext">Atmoss'vert</span>
        </h1>
        <h1>
          <span class="hidetext idee">une idée,</span>
          <span class="hidetext reve">un rêve,</span>
          <span class="hidetext createur">un créateur</span>
        </h1>
      </div>
    </section>
    <ul class="liste-projets">
      <HomepageProjet
        v-for="(item, index) in projets"
        :key="index"
        :data="[item, projets[index + 1]]"
      />
      <!-- <li v-for="projet of projets">
      </li> -->
    </ul>
  </div>
</template>

<script>
import { gsap } from 'gsap'
import ScrollToPlugin from 'gsap/ScrollToPlugin'
import imagesLoaded from 'imagesloaded'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(ScrollToPlugin)
export const projets = ['green', 'orange', 'yellow', 'deeppurple']

export default {
  data() {
    return { projets }
  },
  mounted() {
    const images = gsap.utils.toArray('img')
    const loader = document.querySelector('.loader--text')
    const updateProgress = (instance) =>
      (loader.textContent = `${Math.round(
        (instance.progressedCount * 100) / images.length
      )}%`)
    const showDemo = () => {
      const h1 = document.querySelectorAll('.hero h1 span')
      const tlHeader = gsap.timeline({
        scrollTrigger: {
          trigger: document.querySelector('.hero'),
          onEnter: () => {
            tlHeader.to(h1, {
              delay: 0.4,
              duration: 0.8,
              y: -200,
              rotation: 0,
              transformOrigin: 'bottom 50%',
              opacity: 1,
              stagger: 0.25,
              ease: 'easeInOut',
            })
          },
        },
      })

      document.body.style.overflow = 'auto'
      document.scrollingElement.scrollTo(0, 0)
      // Hide loader
      gsap.to(document.querySelector('.loader'), { autoAlpha: 0 })
    }
    // showDemo();
    imagesLoaded(images).on('progress', updateProgress).on('always', showDemo)
  },
}
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/

.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
