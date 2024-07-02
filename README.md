
# Message Live App 📨💬

Welcome to Message Live App! This application allows you to send and receive messages in real-time. Check out the live site ---> 🔗https://message-live-app-1.onrender.com

## Features

- **Real-time Messaging**: Send and receive messages instantly.
- **Character Limit**: Messages are limited to 40 characters.
- **Timestamps**: Each message is timestamped with the date of submission.
  
## Technologies Used

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js, MongoDB
- **Deployment**: Vercel (Frontend), MongoDB Atlas (Database)

## Getting Started

To run this project locally, follow these steps:

1. Clone this repository: `git clone https://github.com/Ocece77/message-live-app.git`
2. Navigate into the project directory: `cd message-live-app`
3. Install dependencies: `npm install`
4. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```
     PORT=3000
     MONGO=<your_mongodb_connection_string>
     CLIENT_URL=https://message-live-app.vercel.app
     API_URL=https://message-live-app.vercel.app/api
     ```
5. Start the server: `npm start`
6. Open your browser and go to `http://localhost:3000` to view the app.

## Folder Structure

- **`api/`**: Contains the backend server code.
- **`message_live/`**: Contains the frontend React app.
- **`README.md`**: You are here!

## Contributing

Contributions are welcome! Please fork this repository and submit a pull request with your changes. 👩🏿‍💻💗

## License

This project is licensed under no License
