const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js')
   .js('resources/js/delete_account.js', 'public/js')
   .js('resources/js/likes.js', 'public/js')
   .js('resources/js/user_name_change.js', 'public/js')
   .js('resources/js/password_change.js', 'public/js')
   .js('resources/js/display_switch.js', 'public/js')
   .js('resources/js/tag_search.js', 'public/js')
   .js('resources/js/all_post_display.js', 'public/js')
   .js('resources/js/user_search.js', 'public/js')
   .js('resources/js/applications.js', 'public/js')
   .js('resources/js/search_bar.js', 'public/js')
   .js('resources/js/email_change.js', 'public/js')
   .js('resources/js/chat.js', 'public/js')
   .sass('resources/sass/app.scss', 'public/css')
   .version()
   .sourceMaps();