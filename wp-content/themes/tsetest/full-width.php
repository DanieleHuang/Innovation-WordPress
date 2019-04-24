<?php /* Template Name: FullWidth */ ?>
<?php
/**
 * Full width template
 */

get_header();
?>
<div id="content" class="site-content-fw">
	<section id="primary" class="content-area-fw">
		<main id="main" class="site-main-fw">

			<?php

			/* Start the Loop */
			while ( have_posts() ) :
				the_post();

				get_template_part( 'template-parts/content/content', 'page' );

				// If comments are open or we have at least one comment, load up the comment template.
				if ( comments_open() || get_comments_number() ) {
					comments_template();
				}

			endwhile; // End of the loop.
			?>

		</main><!-- #main -->
	</section><!-- #primary -->
</div><!-- site-content-fw -->

<?php
get_footer();
?>