<?php $head_title="404 - Car Service & Repair HTML5 Template"?>
<?php require_once('template-parts/layout/top-layout.php'); ?>
<?php require_once('template-parts/header/header.php'); ?>
<?php
$page_title = "Page Not Found";
require_once('template-parts/page-title.php');
?>
<div class="blog-area">
    <div class="container">
        <div class="row">
            <div class="col-xl-8 offset-xl-2">
                <div class="error-404 not-found mb-20">
                    <div class="page-content">
                        <div class="error-404-content text-center">
                            <h1 class="error-404-title">404</h1>
                            <h2 class="error-title">Page not found</h2>
                            <div class="error-content">
                                <div class="error-text">
                                    <span>Oops! The page you are looking for does not exist. It might have been moved or deleted</span>
                                </div>
                                <div class="error-btn-bh">
                                    <a href="index.php" class="te-theme-btn">
                                        Back To Home<i class="fa-solid fa-angle-right"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<?php require_once('template-parts/footer/footer.php'); ?>
<?php require_once('template-parts/layout/bottom-layout.php'); ?>