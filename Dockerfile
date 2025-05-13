# Use official PHP + Apache image
FROM php:8.1-apache

# Enable mod_rewrite (if your .htaccess or routing needs it)
RUN a2enmod rewrite

# Copy all files from the current repo into Apache's web root
COPY . /var/www/html/

# Set permissions (optional, helps prevent permission errors)
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html

# Expose port 80 (used by Apache)
EXPOSE 80
