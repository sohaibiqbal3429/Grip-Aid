<?php $head_title="Contact Us - Car Service & Repair HTML5 Template"?>
<?php require_once('template-parts/layout/top-layout.php'); ?>
<?php require_once('template-parts/header/header.php'); ?>
<?php
$page_title = "Contact Us";
require_once('template-parts/page-title.php');
?>
<!-- Contact Form Section Start -->
    <div class="contact-form-area">
        <div class="container">
            <div class="row">
                <div class="col-lg-6 order-2 order-lg-1">
                    <div class="te-map-widget">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d423284.04409246973!2d-118.74137159485794!3d34.020608470699536!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c75ddc27da13%3A0xe22fdf6f254608f4!2sLos%20Angeles%2C%20CA%2C%20USA!5e0!3m2!1sen!2sbd!4v1692992084415!5m2!1sen!2sbd" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                </div>
                <div class="col-lg-6 order-1 order-lg-2">
                    <!-- Contact Info Section Start !-->
                    <div class="te-contact-info-wrapper">
                        <div class="te-title-wrapper">
                            <h2 class="title">Let Us Know About Your <br/> Next Project</h2>
                        </div>
                        <div class="te-contact-info">
                            <div class="te-icon-card style-2">
                                <div class="icon">
                                    <i class="fa-solid fa-location-dot"></i>
                                </div>
                                <div class="content">
                                    <h3 class="title">Location</h3>
                                    <span class="desc">Dhaka 102, utl 1216, road 45 house of street</span>
                                </div>
                            </div>
                            <div class="te-icon-card style-2">
                                <div class="icon">
                                    <i class="fa-solid fa-phone"></i>
                                </div>
                                <div class="content">
                                    <h3 class="title">Phone number</h3>
                                    <a href="tel:0123456789" class="desc">+88 0123456789</a>
                                    <a href="tel:0123456789" class="desc">1234 - 000 - 000 </a>
                                </div>
                            </div>
                            <div class="te-icon-card style-2">
                                <div class="icon">
                                    <i class="fa-solid fa-envelope"></i>
                                </div>
                                <div class="content">
                                    <h3 class="title">Emails</h3>
                                    <a href="mailto:info@exampleyourmail.com" class="desc">info@exampleyourmail.com</a>
                                </div>
                            </div>
                        </div>
                        <div class="te-social-profile-link">
                            <a href="#"><i class="fa-brands fa-facebook-f"></i></a>
                            <a href="#"><i class="fa-brands fa-twitter"></i></a>
                            <a href="#"><i class="fa-brands fa-linkedin-in"></i></a>
                            <a href="#"><i class="fa-brands fa-youtube"></i></a>
                        </div>
                    </div>
                    <!-- Contact Info Section End -->
                </div>
            </div>
        </div>
    </div>
    <!-- Contact Form Section End -->
    <div class="contact-form te-pb-120">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <!-- Comment Form Start -->
                    <div class="te-comment-respond mt-0">
                        <form action="mail.php" method="post" class="te-comment-form">
                            <h3>We Can Take Your <br/> Business To Growth</h3>
                            <div class="row gx-4">
                                <div class="col-xl-6">
                                    <div class="te-contacts-email">
                                        <input name="email" type="email" placeholder="Your Email*">
                                    </div>
                                </div>
                                <div class="col-xl-6">
                                    <div class="te-contacts-name">
                                        <input name="phone" type="text" placeholder="Your Phone">
                                    </div>
                                </div>
                                <div class="col-xl-12">
                                    <div class="te-contacts-message">
                                        <textarea name="message" cols="20" rows="3" placeholder="Write your Message here"></textarea>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <button class="te-theme-btn style-2" type="submit">SEND NOW</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <!-- Comment Form End -->
                </div>
            </div>
        </div>
    </div>
<?php require_once('template-parts/footer/footer.php'); ?>
<?php require_once('template-parts/layout/bottom-layout.php'); ?>