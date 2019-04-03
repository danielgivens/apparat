<?php
	$GLOBALS[ 'template_directory' ] = get_bloginfo('template_directory'); 	
?>
<!DOCTYPE html>
<html class="fixed">
	<head class="front">
		<meta charset="utf-8">
		<title>Apparat</title>
		<meta name="viewport" content="width=device-width, user-scalable=no" />
		<meta property="og:title" content="Apparat.net">
		<meta property="og:description" content="v5.0_Beta">
		<meta property="og:image" content="<?php echo $GLOBALS[ 'template_directory' ]; ?><?php echo $GLOBALS[ 'template_directory' ]; ?>/assets/images/countdown-social.jpg">
		<meta property="og:image:url" content="<?php echo $GLOBALS[ 'template_directory' ]; ?><?php echo $GLOBALS[ 'template_directory' ]; ?>/assets/images/countdown-social.jpg">
		<meta property="og:image:secure_url" content="https://i.ibb.co/CQMM1Q2/countdown-social.jpg">
		<meta property="og:image:type" content="image/jpeg" />
		<meta property="og:image:width" content="994" />
		<meta property="og:image:height" content="994" />
		<meta property="og:url" content="http://apparat.net/">
		<meta property="og:site_name" content="Apparat">
		<meta property="og:type" content="website">
		<meta name="description" content="Turn on your sound. Press and hold. [warning: flashing images]">
		<meta itemprop="name" content="Apparat">
		<meta itemprop="description" content="Turn on your sound. Press and hold. [warning: flashing images]">
		<meta name="twitter:card" content="summary">
		<meta name="twitter:title" content="Apparat">
		<meta name="twitter:description" content="Turn on your sound. Press and hold. [warning: flashing images]">
		<meta name="twitter:site" content="@apparatofficial">
		<meta name="twitter:creator" content="@apparatofficial">
		<meta name="twitter:image:src" content="<?php echo $GLOBALS[ 'template_directory' ]; ?><?php echo $GLOBALS[ 'template_directory' ]; ?>/assets/images/countdown-social.jpg">
		<script type="text/javascript">
			$root = '<?php echo site_url(); ?>';
			$templateDirectory = '<?php echo $GLOBALS[ 'template_directory' ] ?>';
		</script>
		<link rel="apple-touch-icon-precomposed" sizes="57x57" href="<?php echo $GLOBALS[ 'template_directory' ]; ?><?php echo $GLOBALS[ 'template_directory' ]; ?>/assets/images/favicon/apple-touch-icon-57x57.png" />
		<link rel="apple-touch-icon-precomposed" sizes="114x114" href="<?php echo $GLOBALS[ 'template_directory' ]; ?>/assets/images/favicon/apple-touch-icon-114x114.png" />
		<link rel="apple-touch-icon-precomposed" sizes="72x72" href="<?php echo $GLOBALS[ 'template_directory' ]; ?>/assets/images/favicon/apple-touch-icon-72x72.png" />
		<link rel="apple-touch-icon-precomposed" sizes="144x144" href="<?php echo $GLOBALS[ 'template_directory' ]; ?>/assets/images/favicon/apple-touch-icon-144x144.png" />
		<link rel="apple-touch-icon-precomposed" sizes="60x60" href="<?php echo $GLOBALS[ 'template_directory' ]; ?>/assets/images/favicon/apple-touch-icon-60x60.png" />
		<link rel="apple-touch-icon-precomposed" sizes="120x120" href="<?php echo $GLOBALS[ 'template_directory' ]; ?>/assets/images/favicon/apple-touch-icon-120x120.png" />
		<link rel="apple-touch-icon-precomposed" sizes="76x76" href="<?php echo $GLOBALS[ 'template_directory' ]; ?>/assets/images/favicon/apple-touch-icon-76x76.png" />
		<link rel="apple-touch-icon-precomposed" sizes="152x152" href="<?php echo $GLOBALS[ 'template_directory' ]; ?>/assets/images/favicon/apple-touch-icon-152x152.png" />
		<link rel="icon" type="image/png" href="<?php echo $GLOBALS[ 'template_directory' ]; ?>/assets/images/favicon/favicon-196x196.png" sizes="196x196" />
		<link rel="icon" type="image/png" href="<?php echo $GLOBALS[ 'template_directory' ]; ?>/assets/images/favicon/favicon-96x96.png" sizes="96x96" />
		<link rel="icon" type="image/png" href="<?php echo $GLOBALS[ 'template_directory' ]; ?>/assets/images/favicon/favicon-32x32.png" sizes="32x32" />
		<link rel="icon" type="image/png" href="<?php echo $GLOBALS[ 'template_directory' ]; ?>/assets/images/favicon/favicon-16x16.png" sizes="16x16" />
		<link rel="icon" type="image/png" href="<?php echo $GLOBALS[ 'template_directory' ]; ?>/assets/images/favicon/favicon-128.png" sizes="128x128" />
		<meta name="application-name" content="&nbsp;"/>
		<meta name="msapplication-TileColor" content="#000000" />
		<meta name="msapplication-TileImage" content="<?php echo $GLOBALS[ 'template_directory' ]; ?>/assets/images/favicon/mstile-144x144.png" />
		<meta name="msapplication-square70x70logo" content="<?php echo $GLOBALS[ 'template_directory' ]; ?>/assets/images/favicon/mstile-70x70.png" />
		<meta name="msapplication-square150x150logo" content="<?php echo $GLOBALS[ 'template_directory' ]; ?>/assets/images/favicon/mstile-150x150.png" />
		<meta name="msapplication-wide310x150logo" content="<?php echo $GLOBALS[ 'template_directory' ]; ?>/assets/images/favicon/mstile-310x150.png" />
		<meta name="msapplication-square310x310logo" content="<?php echo $GLOBALS[ 'template_directory' ]; ?>/assets/images/favicon/mstile-310x310.png" />
		<link rel="stylesheet" media="screen" href="<?php echo $GLOBALS[ 'template_directory' ]; ?>/assets/css/style.css" />
		<script async src="https://www.googletagmanager.com/gtag/js?id=UA-128342743-1"></script>
		<script>
		  window.dataLayer = window.dataLayer || [];
		  function gtag(){dataLayer.push(arguments);}
		  gtag('js', new Date());
		  gtag('config', 'UA-128342743-1');
		</script>
	</head>
	<body class="app">	
		<section class="main" data-scrollbar>
		<header class="global">
			<h1>APPARAT</h1>
			<span class="version">VERSION 5.0</span>
		</header>
		<div class="window shown tall" id="tour">
			<header class="toolbar">
				<h2>Calendar</h2>
				<span class="close">x</span>
			</header>
			<div class="scroll">
				<ul>
			<?php if( have_rows('upcoming', 8) ):
			    while ( have_rows('upcoming', 8) ) : the_row(); ?>
					<li><a href="<?php the_sub_field('link'); ?>" target="_blank"><?php the_sub_field('date'); ?> - <?php the_sub_field('country'); ?> - <?php the_sub_field('city'); ?> - <?php the_sub_field('venue'); ?></a></li>			
			   <?php endwhile;
			endif; ?>	
				</ul>
			</div>		
		</div>
		<div class="window shown" id="notes">
			<header class="toolbar">
				<h2>Notes</h2>
				<span class="close">x</span>
			</header>		
			<div class="scroll">
				<ul>
					<li>201904012132: Welcome to the new apparat.net! Please make yourself at home.</li>
				</ul>
			</div>
		</div>
		<div class="window shown small focus" id="cookies">
			<header class="toolbar">
				<h2>Alert</h2>
				<span class="close">x</span>
			</header>
			<div class="scroll">
				<div class="wysiwyg center">
					<div class="container">
						<p>This site would like to use cookies to tailor your experience.</p>
						<a href="#" id="cookie-accept">Click here to accept</a> 
					</div>
				</div>
			</div>
		</div>
		<div class="window shown square" id="discography">
			<header class="toolbar">
				<h2>Discography</h2>
				<span class="close">x</span>
			</header>		
			<div class="scroll">
			<?php if( have_rows('releases') ):
			    while ( have_rows('releases') ) : the_row(); ?>
			    <div class="release">
					<h2><?php the_sub_field('title'); ?></h2>		
					<h3><?php the_sub_field('year'); ?></h3>	
					<div class="wysiwyg">
						<?php the_sub_field('details'); ?>
					</div>	
			    </div>
			   <?php endwhile;
			endif; ?>	
				
				
			</div>
		</div>
		<?php if( have_rows('embeds') ):
		    while ( have_rows('embeds') ) : the_row();
		    $size = get_sub_field('size'); ?>
			<div class="window shown embed" style="width:<?php echo $size['width']; ?>px;height:<?php echo $size['height'] + 24; ?>px;">
				<header class="toolbar">
					<h2><?php the_sub_field('title'); ?></h2>
					<span class="close">x</span>
				</header>		
				<div class="scroll">
					<?php the_sub_field('embed'); ?>
				</div>
			</div>		
		   <?php endwhile;
		endif; ?>	
		</section>	
		<script src="<?php echo $GLOBALS[ 'template_directory' ]; ?>/assets/js/app.libs.min.js"></script>
		<script src="<?php echo $GLOBALS[ 'template_directory' ]; ?>/assets/js/app.js"></script>
	</body>
</html>