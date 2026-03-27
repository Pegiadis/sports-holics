FROM node:22-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-alpine

WORKDIR /app
COPY --from=build /app .

# Fix Strapi 5 hardcoded secure cookie (doesn't support reverse proxy)
RUN sed -i 's/secure: isProduction/secure: process.env.ADMIN_COOKIE_SECURE === "true"/' \
    node_modules/@strapi/admin/dist/server/shared/utils/session-auth.js

# Ensure public dir is writable (needed for strapi transfer backup)
RUN chmod -R 777 /app/public

# Fix strapi transfer: replace move with copy+emptyDir (move fails on Docker bind mounts)
RUN sed -i 's/await fse__namespace.move(assetsDirectory, backupDirectory)/await fse__namespace.copy(assetsDirectory, backupDirectory); await fse__namespace.emptyDir(assetsDirectory)/' \
    node_modules/@strapi/data-transfer/dist/strapi/providers/local-destination/index.js && \
    sed -i 's/await fse.move(assetsDirectory, backupDirectory)/await fse.copy(assetsDirectory, backupDirectory); await fse.emptyDir(assetsDirectory)/' \
    node_modules/@strapi/data-transfer/dist/strapi/providers/local-destination/index.mjs

ENV NODE_ENV=production
EXPOSE 1337

CMD ["npm", "run", "start:production"]
