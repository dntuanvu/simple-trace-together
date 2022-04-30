FROM node:lts as dependencies
WORKDIR /web-app
RUN rm -rf node_modules/
COPY . .
RUN npm install 

FROM node:lts as builder
WORKDIR /web-app
COPY . .
COPY --from=dependencies /web-app/node_modules ./node_modules
RUN npm run build

FROM node:lts as runner
WORKDIR /web-app
ENV NODE_ENV production
# If you are using a custom next.config.js file, uncomment this line.
COPY --from=builder /web-app/next.config.js ./
# COPY --from=builder /web-app/public ./public
COPY --from=builder /web-app/.next ./.next
COPY --from=builder /web-app/node_modules ./node_modules
COPY --from=builder /web-app/package.json ./package.json

EXPOSE 3000
CMD ["npm", "start"]