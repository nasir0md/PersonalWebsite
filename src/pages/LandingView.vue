<template>
    <div id="page-top" data-spy="scroll" data-target=".navbar-fixed-top">
        <nav class="navbar navbar-custom navbar-fixed-top" role="navigation">
            <div class="container">
                

                <!-- Collect the nav links, forms, and other content for toggling -->
                <div class="collapse navbar-collapse navbar-right navbar-main-collapse">
                    <ul class="nav navbar-nav">
                        <!-- Hidden li included to remove active class from about link when scrolled up past about section -->
                        <li class="hidden">
                            <a href="#page-top"></a>
                        </li>
                        <li>
                            <a class="page-scroll" href="#about">About</a>
                        </li>
                        <li>
                            <a class="page-scroll" href="#blog">Blog</a>
                        </li>
                        <li>
                            <a class="page-scroll" href="#contact">Contact</a>
                        </li>
                        <li>
                            <a class="page-scroll" href="#portfolio">Portfolio</a>
                        </li>
                    </ul>
                </div>
                <!-- /.navbar-collapse -->
            </div>
            <!-- /.container -->
        </nav>

        <!-- Intro Header -->
        <header class="intro">
            <div class="intro-body">
                <div class="container">
                    <div class="row">
                        <div class="col-md-8 col-md-offset-2">
                            <h1 class="brand-heading">Andrew Szot</h1>
                            <p class="intro-text">
                                Machine Learning, Full Stack Development
                            </p>
                            
                            <a href="#about" class="btn btn-circle page-scroll">
                                <i class="fa fa-angle-double-down animated"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </header>

        <!-- About Section -->
        <section id="about" class="container content-section text-center">
            <div class="row">
                <div class="col-lg-8 col-lg-offset-2">
                    <h2>About Me</h2>
                    <p>
                        I am a versatile and motivated software engineer well versed with full stack solutions and applications of machine learning. I have extensive experience developing backend web platforms using modern frameworks and building frontend applications for web and mobile. I also have a passion for applications of machine learning and data science and continue to further learn in the field through implementation and study.  
                    </p>
                    <p>
                        I currently study CS at USC, however, pursue the majority of my interest outside of the class through independent projects, study, and work experience. 
                    </p>
                    <p>
                        Scroll down to learn more about me.
                    </p>
                </div>
            </div>
        </section>

        <!-- Download Section -->
        <section id="blog" class="content-section text-center">
            <div class="download-section">
                <div class="container">
                    <div class="col-lg-8 col-lg-offset-2">
                        <h2>My Blog</h2>
                        <p>A technical blog on primarily machine learning and web development. Learning how to be a software engineer is a lot. I hope to document my progress and what I have learned here.</p>
                        <p>I hope others find the information and tutorials I post to be helpful.</p>
                        <a href="http://startbootstrap.com/template-overviews/grayscale/" class="btn btn-default btn-lg">Visit Blog</a>
                    </div>
                </div>
            </div>
        </section>

        <!-- Contact Section -->
        <section id="contact" class="container content-section text-center">
            <div class="row">
                <div class="col-lg-8 col-lg-offset-2">
                    <h2>Contact Me</h2>
                    <p>Reach out to me on social media or send me a email.</p>
                    <p><a href="mailto:feedback@startbootstrap.com">me@andrewszot.com</a>
                    </p>
                    <ul class="list-inline banner-social-buttons">
                        <li>
                            <a href="https://www.linkedin.com/in/andrew-szot-89451a126" class="btn btn-default btn-lg"><i class="fa fa-linkedin fa-fw"></i> <span class="network-name">LinkedIn</span></a>
                        </li>
                        <li>
                            <a href="https://github.com/ASzot" class="btn btn-default btn-lg"><i class="fa fa-github fa-fw"></i> <span class="network-name">Github</span></a>
                        </li>
                    </ul>
                </div>
            </div>
        </section>

        <projects-view></projects-view>

        <!-- Footer -->
        <footer>
            <div class="container text-center">
                <p>Copyright &copy; Andrew Szot, 2017</p>
            </div>
        </footer>

    </div>
</template>

<style lang='scss'>
    @import '../../static/sass/landing.scss';
    .landing-view {
    }
</style>

<script>
    import ProjectsView from '../components/ProjectsView'

    export default {
        components: {
           ProjectsView 
        }
    }
</script>
