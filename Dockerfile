FROM node:20

# Đặt thư mục làm việc trong container
WORKDIR /usr/src/app

# Copy package.json và package-lock.json vào container
COPY package*.json ./

# Cài đặt các dependencies
RUN npm install

# Copy toàn bộ mã nguồn của dự án vào container
COPY . .

# Build dự án NestJS
RUN npm run build

# Expose port mà ứng dụng sẽ chạy
EXPOSE 8000

# Khởi chạy ứng dụng
CMD ["npm", "run", "start:prod"]
