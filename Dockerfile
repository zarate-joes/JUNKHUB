FROM php:8.1-apache

# Install system dependencies required to build PHP extensions
RUN apt-get update && apt-get install -y \
    libonig-dev \
    libzip-dev \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    pkg-config \
    zip \
    unzip

# Force pkg-config to find oniguruma
RUN ln -s /usr/lib/x86_64-linux-gnu/pkgconfig/libonig.pc /usr/lib/x86_64-linux-gnu/pkgconfig/oniguruma.pc || true

# Install PHP extensions
# Split up the extension installation to make debugging easier if one fails
RUN docker-php-ext-install pdo pdo_mysql
RUN docker-php-ext-configure mbstring --with-onig=/usr
RUN docker-php-ext-install mbstring
RUN docker-php-ext-install zip gd

# Enable Apache modules
RUN a2enmod rewrite

# Copy all files into Apache's web root
COPY . /var/www/html/

# Set working directory
WORKDIR /var/www/html

# Set proper permissions
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html

EXPOSE 80