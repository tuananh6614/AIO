# Dockerfile for AIO - All-In-One Toolkit
# Static website served by Nginx

FROM nginx:alpine

# Copy website files to nginx html directory
COPY . /usr/share/nginx/html

# Remove unnecessary files
RUN rm -f /usr/share/nginx/html/Dockerfile \
    && rm -f /usr/share/nginx/html/docker-compose.yml \
    && rm -f /usr/share/nginx/html/.gitignore \
    && rm -rf /usr/share/nginx/html/.git

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
