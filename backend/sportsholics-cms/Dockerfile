FROM node:22-alpine AS build

WORKDIR /app
COPY package*.json ./
# --legacy-peer-deps is required because @_sh/strapi-plugin-ckeditor's peer
# dependency on @strapi/design-system conflicts with npm 10+'s strict
# resolution. The packages are compatible at runtime; we just bypass the
# strict check during install.
RUN npm ci --legacy-peer-deps
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

# Patch @strapi/data-transfer for Docker bind mounts:
#   1. Replace fse.move(assets, backup) with copy + emptyDir, because fse.move
#      fails with EBUSY/EXDEV when assets is the root of a bind mount.
#   2. Replace the subsequent fse.mkdir(assets) with fse.ensureDir(assets) so
#      it doesn't throw EEXIST. The original move() removed the source dir;
#      our copy + emptyDir leaves it in place, so a plain mkdir would fail.
#      Without this second patch, every transfer aborts at the
#      "creating assets backup directory" step with the misleading error
#      "The backup folder for the assets could not be created".
RUN sed -i 's|await fse__namespace.move(assetsDirectory, backupDirectory)|await fse__namespace.copy(assetsDirectory, backupDirectory); await fse__namespace.emptyDir(assetsDirectory)|; s|await fse__namespace.mkdir(assetsDirectory);|await fse__namespace.ensureDir(assetsDirectory);|' \
    node_modules/@strapi/data-transfer/dist/strapi/providers/local-destination/index.js && \
    sed -i 's|await fse.move(assetsDirectory, backupDirectory)|await fse.copy(assetsDirectory, backupDirectory); await fse.emptyDir(assetsDirectory)|; s|await fse.mkdir(assetsDirectory);|await fse.ensureDir(assetsDirectory);|' \
    node_modules/@strapi/data-transfer/dist/strapi/providers/local-destination/index.mjs

ENV NODE_ENV=production
EXPOSE 1337

CMD ["npm", "run", "start:production"]
