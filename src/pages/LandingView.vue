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
                        <a href='/blog' class="btn btn-default btn-lg">Visit Blog</a>
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
    @import '../../static/sass/_variables';
    @import '../../static/sass/main';

    #page-top {
        width: 100%;
        height: 100%;

        .light {
            font-weight: 400;
        }

        .navbar-custom {
            margin-bottom: 0;
            border-bottom: 1px solid rgba(white, 0.3);
            text-transform: uppercase;
            font-family: "Montserrat","Helvetica Neue",Helvetica,Arial,sans-serif;
            background-color: black;
            .navbar-toggle {
                padding: 4px 6px;
                font-size: 16px;
                color: white;
                &:focus,
                &:active {
                    outline: none;
                }
            }
            .navbar-brand {
                font-weight: 700;
                &:focus {
                    outline: none;
                }
            }
            a {
                color: white;
            }
            .nav {
                li {
                    a {
                        -webkit-transition: background .3s ease-in-out;
                        -moz-transition: background .3s ease-in-out;
                        transition: background .3s ease-in-out;
                        &:hover {
                            color: rgba(white, 0.8);
                            outline: none;
                            background-color: transparent;
                        }
                        &:focus,
                        &:active {
                            outline: none;
                            background-color: transparent;
                        }
                    }
                    &.active {
                        outline: none;
                        a {
                            background-color: rgba(white, 0.3);
                            &:hover {
                                color: white;
                            }
                        }
                    }
                }
            }
            @media(min-width:768px) {
                padding: 20px 0;
                border-bottom: none;
                letter-spacing: 1px;
                background: transparent;
                -webkit-transition: background .5s ease-in-out,padding .5s ease-in-out;
                -moz-transition: background .5s ease-in-out,padding .5s ease-in-out;
                transition: background .5s ease-in-out,padding .5s ease-in-out;
                &.top-nav-collapse {
                    padding: 0;
                    background: black;
                    border-bottom: 1px solid rgba(white, 0.3);
                }
            }
        }

        .intro {
            display: table;
            width: 100%;
            height: auto;
            padding: 100px 0;
            text-align: center;
            color: white;
            background: linear-gradient(to bottom, rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0.5) 59%, rgba(0, 0, 0, 1.0) 100%), url(/static/img/intro-bg.jpg) no-repeat bottom center scroll;
            background-color: black;
            -webkit-background-size: cover;
            -moz-background-size: cover;
            background-size: cover;
            -o-background-size: cover;
            .intro-body {
                display: table-cell;
                vertical-align: middle;
                .brand-heading {
                    font-size: 40px;
                }
                .intro-text {
                    font-size: 18px;
                }
            }
            @media(min-width:768px) {
                height: 100%;
                padding: 0;
                .intro-body {
                    .brand-heading {
                        font-size: 100px;
                    }
                    .intro-text {
                        font-size: 26px;
                    }
                }
            }
        }

        .btn-circle {
            width: 70px;
            height: 70px;
            margin-top: 15px;
            padding: 7px 16px;
            border: 2px solid white;
            border-radius: 100% !important;
            font-size: 40px;
            color: white;
            background: transparent;
            -webkit-transition: background .3s ease-in-out;
            -moz-transition: background .3s ease-in-out;
            transition: background .3s ease-in-out;
            &:hover,
            &:focus {
                outline: none;
                color: white;
                background: rgba(white, 0.1);
            }
            i.animated {
                -webkit-transition-property: -webkit-transform;
                -webkit-transition-duration: 1s;
                -moz-transition-property: -moz-transform;
                -moz-transition-duration: 1s;
            }
            &:hover {
                i.animated {
                    -webkit-animation-name: pulse;
                    -moz-animation-name: pulse;
                    -webkit-animation-duration: 1.5s;
                    -moz-animation-duration: 1.5s;
                    -webkit-animation-iteration-count: infinite;
                    -moz-animation-iteration-count: infinite;
                    -webkit-animation-timing-function: linear;
                    -moz-animation-timing-function: linear;
                }
            }
        }

        .content-section {
            padding-top: 100px;
        }

        .download-section {
            width: 100%;
            padding: 50px 0;
            color: white;
            background-color: $secondary-background;
            -webkit-background-size: cover;
            -moz-background-size: cover;
            background-size: cover;
            -o-background-size: cover;
        }

        #map {
            width: 100%;
            height: 200px;
            margin-top: 100px;
        }

        @media(min-width:767px) {
            .content-section {
                padding-top: 250px;
            }

            .download-section {
                padding: 100px 0;
            }

            #map {
                height: 400px;
                margin-top: 250px;
            }
        }
    }
</style>

<script>
    import ProjectsView from '../components/ProjectsView'

    export default {
        components: {
           ProjectsView 
        },
        head: {
            title: {
                inner: 'Home'
            },
            meta: [
                { name: 'description', content: "Andrew Szot's portfolio page", id: 'desc' }
            ]
        }
    }
</script>
