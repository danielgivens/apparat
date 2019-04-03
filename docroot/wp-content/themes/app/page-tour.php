<?php
	$GLOBALS[ 'template_directory' ] = get_bloginfo('template_directory'); 	
?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>Apparat - Tour</title>
		<meta name=viewport content="width=device-width, initial-scale=1">
		<meta name="description" content="dates + tickets">
		<meta itemprop="name" content="Apparat - Tour">
		<meta itemprop="description" content="dates + tickets">
		<meta name="twitter:card" content="summary">
		<meta name="twitter:title" content="Apparat - Tour">
		<meta name="twitter:description" content="dates + tickets">
		<meta name="twitter:site" content="@apparatofficial">
		<meta name="twitter:creator" content="@apparatofficial">
		<meta name="twitter:image:src" content="http://apparat.net<?php echo $GLOBALS[ 'template_directory' ]; ?>/promo/assets/images/background-tour-fallback.jpg">
		<meta name="og:title" content="Apparat - Tour">
		<meta name="og:description" content="dates + tickets">
		<meta name="og:image" content="http://apparat.net<?php echo $GLOBALS[ 'template_directory' ]; ?>/promo/assets/images/background-tour-fallback.jpg">
		<meta name="og:url" content="http://apparat.net/">
		<meta name="og:site_name" content="Apparat - Tour">
		<meta name="og:type" content="website">
		<link rel="apple-touch-icon-precomposed" sizes="57x57" href="<?php echo $GLOBALS[ 'template_directory' ]; ?>/promo/assets/images/favicon/apple-touch-icon-57x57.png" />
		<link rel="apple-touch-icon-precomposed" sizes="114x114" href="<?php echo $GLOBALS[ 'template_directory' ]; ?>/promo/assets/images/favicon/apple-touch-icon-114x114.png" />
		<link rel="apple-touch-icon-precomposed" sizes="72x72" href="<?php echo $GLOBALS[ 'template_directory' ]; ?>/promo/assets/images/favicon/apple-touch-icon-72x72.png" />
		<link rel="apple-touch-icon-precomposed" sizes="144x144" href="<?php echo $GLOBALS[ 'template_directory' ]; ?>/promo/assets/images/favicon/apple-touch-icon-144x144.png" />
		<link rel="apple-touch-icon-precomposed" sizes="60x60" href="<?php echo $GLOBALS[ 'template_directory' ]; ?>/promo/assets/images/favicon/apple-touch-icon-60x60.png" />
		<link rel="apple-touch-icon-precomposed" sizes="120x120" href="<?php echo $GLOBALS[ 'template_directory' ]; ?>/promo/assets/images/favicon/apple-touch-icon-120x120.png" />
		<link rel="apple-touch-icon-precomposed" sizes="76x76" href="<?php echo $GLOBALS[ 'template_directory' ]; ?>/promo/assets/images/favicon/apple-touch-icon-76x76.png" />
		<link rel="apple-touch-icon-precomposed" sizes="152x152" href="<?php echo $GLOBALS[ 'template_directory' ]; ?>/promo/assets/images/favicon/apple-touch-icon-152x152.png" />
		<link rel="icon" type="image/png" href="<?php echo $GLOBALS[ 'template_directory' ]; ?>/promo/assets/images/favicon/favicon-196x196.png" sizes="196x196" />
		<link rel="icon" type="image/png" href="<?php echo $GLOBALS[ 'template_directory' ]; ?>/promo/assets/images/favicon/favicon-96x96.png" sizes="96x96" />
		<link rel="icon" type="image/png" href="<?php echo $GLOBALS[ 'template_directory' ]; ?>/promo/assets/images/favicon/favicon-32x32.png" sizes="32x32" />
		<link rel="icon" type="image/png" href="<?php echo $GLOBALS[ 'template_directory' ]; ?>/promo/assets/images/favicon/favicon-16x16.png" sizes="16x16" />
		<link rel="icon" type="image/png" href="<?php echo $GLOBALS[ 'template_directory' ]; ?>/promo/assets/images/favicon/favicon-128.png" sizes="128x128" />
		<meta name="application-name" content="&nbsp;"/>
		<meta name="msapplication-TileColor" content="#000000" />
		<meta name="msapplication-TileImage" content="<?php echo $GLOBALS[ 'template_directory' ]; ?>/promo/assets/images/favicon/mstile-144x144.png" />
		<meta name="msapplication-square70x70logo" content="<?php echo $GLOBALS[ 'template_directory' ]; ?>/promo/assets/images/favicon/mstile-70x70.png" />
		<meta name="msapplication-square150x150logo" content="<?php echo $GLOBALS[ 'template_directory' ]; ?>/promo/assets/images/favicon/mstile-150x150.png" />
		<meta name="msapplication-wide310x150logo" content="<?php echo $GLOBALS[ 'template_directory' ]; ?>/promo/assets/images/favicon/mstile-310x150.png" />
		<meta name="msapplication-square310x310logo" content="<?php echo $GLOBALS[ 'template_directory' ]; ?>/promo/assets/images/favicon/mstile-310x310.png" />
		<script type="text/javascript">
			$root = '<?php echo site_url(); ?>';
			$templateDirectory = '<?php echo $GLOBALS[ 'template_directory' ] ?>';
		</script>
		<link rel="stylesheet" media="screen" href="<?php echo $GLOBALS[ 'template_directory' ]; ?>/promo/assets/css/style.css" />
		<script async src="https://www.googletagmanager.com/gtag/js?id=UA-128342743-1"></script>
		<script>
		  window.dataLayer = window.dataLayer || [];
		  function gtag(){dataLayer.push(arguments);}
		  gtag('js', new Date());
		  gtag('config', 'UA-128342743-1');
		</script>
	</head>
	<body class="tour">	
		<canvas id="scene"></canvas>
		<section class="scroll" data-scrollbar>
			<nav class="global fixed">
				<div><a href="http://apparat.net">Apparat<span class="hide-mobile">.net</span></a></div>
				<div class="cta">Loading...</div>
				<div><a href="#" class="info-toggle">Info<span class="hide-mobile">rmation</span></a></div>
			</nav>
			<a href="#" class="hit fixed" target="_blank"><span>Get Tickets</span></a>
			<div class="vert">
				<!--<div class="layer intro">
					<h1><span class="line-1">APPARAT.NET</h1>
					<div class="content"></div>
				</div>-->
				<?php if( have_rows('upcoming') ):
				    while ( have_rows('upcoming') ) : the_row(); ?>
						<div class="layer show">
							<h1><span class="line-1"><?php the_sub_field('date'); ?> - <?php the_sub_field('country'); ?> - <?php the_sub_field('city'); ?></span><span> - </span><span class="line-2"><?php the_sub_field('venue'); ?></span></h1>
							<div class="content"><a href="<?php the_sub_field('link'); ?>" target="_blank"><?php the_sub_field('label'); ?></a></div>
						</div>				
				   <?php endwhile;
				endif; ?>
				<div class="layer social">
					<h1><span class="line-1">Follow</span><span class="line-2">@apparatofficial</span></h1>
					<div class="content"><a href="https://twitter.com/apparatofficial" target="_blank">Twitter</a></div>
				</div>
				<div class="layer social">
					<h1><span class="line-1">Like</span><span class="line-2">/apparat.official</span></h1>
					<div class="content"><a href="https://www.facebook.com/apparat.official/" target="_blank">Facebook</a></div>
				</div>
				<div class="layer blank">
					<h1></h1>
					<div class="content"><3</div>
				</div>
				<div class="layer blank">
					<h1></h1>
					<div class="content">...</div>
				</div>
				<div class="layer blank">
					<h1></h1>
					<div class="content">?</div>
				</div>
				<div class="layer blank">
					<h1></h1>
					<div class="content">Returning</div>
				</div>
			</div>
		</section>
		<section class="info-panel">
			<a href="#" class="info-toggle btn">Go Back</a>
			<div class="container">
				<h1>Dates</h1>
				<div class="grid dates"></div>
				<h1>Social</h1>
				<div class="grid social"></div>
			</div>
		</section>		
		<script src="<?php echo $GLOBALS[ 'template_directory' ]; ?>/promo/assets/js/libs.min.js"></script>
		<script src="<?php echo $GLOBALS[ 'template_directory' ]; ?>/promo/assets/js/tour.min.js"></script>
	</body>
</html>