ARG NODE_VERSION=20.10.0
ARG PNPM_VERSION=8.15.4

FROM node:${NODE_VERSION}-alpine

# Install pnpm.
RUN --mount=type=cache,target=/root/.npm \
    npm install -g pnpm@${PNPM_VERSION}

WORKDIR /usr/src/app

# Temporarily set NODE_ENV to development for the installation step
ENV NODE_ENV=development

# Download dependencies, including devDependencies, as a separate step to take advantage of Docker's caching.
# Note: We are binding package.json and pnpm-lock.yaml and leveraging a cache mount for the pnpm store.
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=pnpm-lock.yaml,target=pnpm-lock.yaml \
    --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

# Set NODE_ENV back to production
ENV NODE_ENV=production

# Run the application as a non-root user.
USER node

# Copy the rest of the source files into the image.
COPY . .

# Expose the port that the application listens on.
EXPOSE 3000

# Run the application.
CMD pnpm start
