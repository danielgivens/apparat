<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'app' );

/** MySQL database username */
define( 'DB_USER', 'root' );

/** MySQL database password */
define( 'DB_PASSWORD', 'root' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'J7~|0&hnvDD?=I-I<pGfI~=ESmQTAZJOEC&] &sI#..CG9Ctpb~o.Qa}TMC%dcUD' );
define( 'SECURE_AUTH_KEY',  'qZvx>L)m24{d3a7{MDc3f`@Ff}#q_p[9{@Y{IfNOyT>ubp]I?rAQX-3TpIyr$J|3' );
define( 'LOGGED_IN_KEY',    'xEKm2azZdeK+Wl mb)(MSAiB T*IdcbH1N#$Z8Yl&K/Qr?.c#FR)$ebypJN13X.3' );
define( 'NONCE_KEY',        '&HU-p7u:O2%)4n1_7pEA>&g~9(7c)O}%q,k^LijI-Hl5gAC%@$vJ~bc]+Cp@Csp&' );
define( 'AUTH_SALT',        '`J[DLD+w@>?hL4zFj M+C<R+x~u3pu2a7{)(}xUyu~JT8X~wit}W(((#9+U!1=I_' );
define( 'SECURE_AUTH_SALT', 'EXGW$JES7WGnDXJ}L qmqlGwaDjr^1 Zh<%5@^YYJ?U>uK9*lv|>s%<XpDw:;>LQ' );
define( 'LOGGED_IN_SALT',   'cUtA9fbV#J.P.AnEN~&PVEfX3F@Ye,*j5.k:[0mLHEWVM{gRW,rx8{hjXim%pN#O' );
define( 'NONCE_SALT',       'PCTw6z_jhj[/lP28;AM`x- 7/?kLnbIFnIdcn.3@]SSF.nLXy?^5J|Yu:BJW{#Po' );

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define( 'WP_DEBUG', false );

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', dirname( __FILE__ ) . '/' );
}

/** Sets up WordPress vars and included files. */
require_once( ABSPATH . 'wp-settings.php' );
