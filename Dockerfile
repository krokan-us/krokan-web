# Use official Node.js 18 image
FROM node:18

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
