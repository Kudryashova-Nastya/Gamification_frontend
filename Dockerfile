# Используем базовый образ Node.js
FROM node:16.17.0

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем package.json для установки зависимостей
COPY package.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все файлы проекта в контейнер
COPY . .

# Собираем статические файлы
# RUN npm run build

# Указываем порт, на котором будет работать приложение
#EXPOSE 3000

# Команда, выполняемая при запуске контейнера
CMD ["npm", "start"]