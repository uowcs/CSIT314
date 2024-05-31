ARG NODE_VERSION=20.10.0
ARG PNPM_VERSION=9.1.4

FROM node:${NODE_VERSION}-alpine

# Install pnpm and dotenv-cli.
RUN --mount=type=cache,target=/root/.npm \
    npm install -g pnpm@${PNPM_VERSION} dotenv-cli

WORKDIR /usr/src/app

# Temporarily set NODE_ENV to development for the installation step
ENV NODE_ENV=development
ENV COREPACK_ENABLE_STRICT=0

# Download dependencies, including devDependencies, as a separate step to take advantage of Docker's caching.
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copy the entrypoint script and give it execution rights
COPY entrypoint.sh ./
RUN chmod +x entrypoint.sh
COPY env.example ./.env

# Set NODE_ENV back to production
ENV NODE_ENV=production

# Copy the rest of the source files into the image
COPY . .

# Build your Next.js application
RUN pnpm run build

# Switch to non-root user for security
USER node

# Expose the port that the application listens on
EXPOSE 3000

# Set the entrypoint script as the entry point
ENTRYPOINT ["/usr/src/app/entrypoint.sh"]

# Command to start your application
CMD ["pnpm", "start"]
