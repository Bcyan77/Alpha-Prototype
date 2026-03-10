FROM node:20-alpine AS base

# 의존성 설치
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci || npm install

# 빌드
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN npm run build
# 빌드 시 템플릿 DB 생성
ENV DATABASE_URL="file:/tmp/template.db"
RUN npx prisma db push

# 실행
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV DATABASE_URL="file:/data/dev.db"

RUN mkdir -p /data

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder /tmp/template.db /app/template.db

EXPOSE 3000
CMD ["sh", "-c", "[ -f /data/dev.db ] || cp /app/template.db /data/dev.db && node server.js"]
