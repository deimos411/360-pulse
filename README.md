# 360 Pulse

This project consists of a Node.js/Express server paired with a Babylon.js client for displaying the latest 360° panoramas stored in a specified folder and its subdirectories.

## Configuration

To specify the local directory to scan for 360° panoramas, edit the `config.json` file.

## Getting Started

### Prerequisites

Ensure that you have Node.js and npm installed on your system. If not, you can download and install them from [Node.js official website](https://nodejs.org/).

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```bash
   cd <project-directory>
   ```

3. Install the necessary dependencies:

   ```bash
   npm install
   ```

### Running the Server

To launch the project, use the following command:

```bash
npm start
```

Once the server is running, open your web browser and navigate to http://localhost:3000.

### Usage

Navigation: Browse through the panoramas using the left (<-) and right (->) arrow buttons or by pressing the PageUp and PageDown keys.

Exploring: Click and hold the left mouse button, then drag to look around within a panorama.

Have fun!
