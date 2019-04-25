# Innovation-WordPress
## setup
1) Clone the repo
2) Download a local server from here: https://make.wordpress.org/core/handbook/tutorials/installing-a-local-server/
3) Follow the instructions here to set up MAMP and install the website: [here](https://www.wpbeginner.com/wp-tutorials/how-to-install-wordpress-locally-on-mac-using-mamp/)
4) Click on 'Appearance/Themes' and activate 'new' 


## Activating Alexandra's JS functionality
### Activating the Theme
1) Go to 'Appearance/Themes' -> Activate tsetest theme
2) Install Display Post Plugin -> activate it
3) Go to Pages/Add new -> copy and paste the content from "frontpage.html" from the repo's main level <br>
3.1) Change the src of the personas: <br>
     Original src: src="http://<span></span>localhost/tse-wordpress/wp-content/uploads/2019/03/student.png" </br>
     Change it to src="http://<span></span>localhost/ [NAME OF YOUR LOCALHOST]/wp-content/themes/new/img/student.svg" <br> <br>
     In my case, I named the localhost to be 'Innovation-Wordpress'. You can find it easily by looking at the URL, it follows right after "http://<span></span>localhost"  <br>
3.2) Change the src of the ip-script in the header.php file in the same way as above.
### Make the frontpage the landing page
4) Trash all the other pages except the new page you just created
5) Go to Settings/Reading -> Select static page -> choose for homepage the page number assigned to your new page ( in my case it was #36 ). Do the same thing for posts. Save changes.
### Add posts
6) Go to Posts/Add New. Give title and description. Select a category that is present as checkbox in the front page ( the first time doing this, you will need to add a new category and select it thereafter )
