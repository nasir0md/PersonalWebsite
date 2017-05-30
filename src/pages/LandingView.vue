<template>
  <div>
    <div id="wrapper">
      <link rel="stylesheet" href="/static/css/main.css" />

      <!-- Header -->
        <header id="header">
          <div class="content">
            <div class="inner">
              <h1>Andrew Szot</h1>
              <p>
                Machine Learning. Full Stack Development
              </p>
            </div>
          </div>
          <nav>
            <ul>
              <li><a href="#about">About</a></li>
              <li><a href="#blog-info">Blog</a></li>
              <li><a href="#work">Work</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#contact">Contact</a></li>
              <!--<li><a href="#elements">Elements</a></li>-->
            </ul>
          </nav>
        </header>

      <!-- Main -->
        <div id="main">

          <!-- Intro -->
          <article id="blog-info"> 
            <blog-info-view></blog-info-view>
          </article>

          <!-- Work -->
          <article id="work">
            <h2 class="major">Work</h2>
            <projects-view load-data-target-loc='work.txt'></projects-view>
          </article>

          <article id="projects">
            <h2 class="major">Projects</h2>
            <projects-view load-data-target-loc='projects.txt'></projects-view>
          </article>

          <!-- About -->
          <article id="about">
            <about-view></about-view>
          </article>

          <!-- Contact -->
          <article id="contact">
            <h2 class="major">Contact</h2>
            <contact-view></contact-view>
          </article>

        </div>

      <!-- Footer -->
        <footer id="footer">
          <p class="copyright">&copy; Andrew Szot. Design Inspired By: <a href="https://html5up.net">HTML5 UP</a>.</p>
        </footer>

    </div>

    <!-- BG -->
    <div id="bg"></div>
    
  </div>

</template>

<style lang='scss'>
    
</style>

<script>
    import ProjectsView from '../components/ProjectsView'
    import AboutView from '../components/AboutView'
    import BlogInfoView from '../components/BlogInfoView'
    import ContactView from '../components/ContactView'

    export default {
        components: {
           ProjectsView,
           AboutView,
           BlogInfoView,
           ContactView
        },
        head: {
            title: {
                inner: "Andrew Szot's Portfolio",
                separator: ' ',
                complement: ''
            },
            meta: [
                { name: 'description', content: "Andrew Szot's portfolio page", id: 'desc' }
            ]
        }
    }
</script>
