<!-- Page Header Start !-->
<div class="page-breadcrumb-area">
    <div class="page-bg">
        <div class="page-overlay" style="background-color: rgba(23, 23, 23, 0.0);"></div>
        <img src="images/section-bg/page-header.jpg" alt="page header">
    </div>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="breadcrumb-wrapper">
                    <div class="page-heading">
                        <h3 class="page-title"><?php if(isset($page_title)&&!empty($page_title)) { echo $page_title; } ?></h3>
                    </div>
                    <div class="breadcrumb-list">
                        <ul>
                            <li><a href="index.php">Home</a></li>
                            <li class="active"><?php if(isset($page_title)&&!empty($page_title)) { echo $page_title; } ?></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- Page Header End !-->