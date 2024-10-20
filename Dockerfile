FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app
RUN  pnpm install
WORKDIR /app/playground
EXPOSE 5555
EXPOSE 5320
CMD ["pnpm", "dev"]
