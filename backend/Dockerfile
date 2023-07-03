FROM php:8.1-alpine

RUN apk update --no-cache && apk add --no-cache openssl zip unzip git oniguruma-dev
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN docker-php-ext-install pdo mbstring pdo_mysql

WORKDIR /app/backend
COPY . .
RUN composer install

EXPOSE 8000

CMD php artisan serve --host=0.0.0.0
