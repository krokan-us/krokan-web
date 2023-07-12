# Use official Node.js 18 image
FROM node:18

# Install Chromium
RUN apt-get update && apt-get install -y chromium

# Set Puppeteer's environment variables so it knows where to find Chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
ENV PUPPETEER_EXECUTABLE_PATH /usr/bin/chromium


# Set working directory in the container
WORKDIR /usr/src/app

# A wildcard is used to copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Bundle the source
COPY . .

# Build the Next.js app
RUN npm run build

# Expose the port the app runs in
EXPOSE 3000

# Command to run the app
CMD [ "npm", "start" ]
