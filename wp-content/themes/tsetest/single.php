<?php
/**
 * The template for displaying all single posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package WordPress
 * @subpackage Twenty_Nineteen
 * @since 1.0.0
 */

get_header();
?>
<div class="site-content-ps">
	<section id="primary" class="content-area">
		<main id="main" class="site-main">

			<div class="post-title">
				<h1><?php single_post_title(); ?></h1>
			</div>
			
			<?php

			/* Start the Loop */
			while ( have_posts() ) :
				the_post();

				get_template_part( 'template-parts/content/content', 'single' );

			endwhile; // End of the loop.
			?>

		</main><!-- #main -->
	</section><!-- #primary -->
</div><!-- site-content-ps -->

<?php
get_footer();
?>