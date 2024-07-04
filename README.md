# Motopus - AI-Powered Motion Design Animation Generator

Welcome to **Motopus**, the cutting-edge web application designed to generate motion design animations using AI. Leveraging advanced technologies and state-of-the-art tools, Motopus enables users to effortlessly create high-quality video presentations, instagram reels, animated invitations and so on.

## Features

- **AI-Driven Animations**: Generate beautiful animations with the help of AI, making the process intuitive and efficient.
- **Customizable Components**: Define your animation sequences with customizable components to suit your needs.
- **Real-time Preview**: Instantly preview your animations in real-time before finalizing them.

## Technology Stack

Motopus is built using a robust and modern technology stack to ensure high performance, scalability, and ease of use:

- **Next.js**: A powerful React framework for building fast and scalable web applications and without running external server.
- **TypeScript**: A superset of JavaScript that adds static typing, ensuring code reliability and maintainability.
- **AWS Lambda**: Serverless computing for rendering a video in MP3 format in a short period by dividing the code into many lambda functions.
- **Remotion Library**: A React library for creating animations and videos programmatically using TypeScript.
- **Claude 3.5 Sonnet API**: An advanced AI API for generating commands and code in JSON format based on user prompts.
- **Tailwind CSS**: A utility-first CSS framework for building custom designs without writing custom CSS.

## How It Works

1. **User Input**: Enter your prompt describing the desired animation.
2. **AI Processing**: The AI, powered by Claude 3.5 Sonnet API, processes the input and generates JSON commands for the animation.
3. **Rendering**: The JSON commands are parsed and converted into TypeScript code using both existing Remotion library components and functions that I create myself.
4. **Preview**: The animation is rendered and previewed in real-time within the web app.
5. **Export**: Once satisfied with the preview, the animation can be rendered on AWS Lambda Functions in MP3 format and exported.

*Works only on localhost. Have problems with deploy*
