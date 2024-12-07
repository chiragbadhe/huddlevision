# HuddleVision

HuddleVision is a next-generation video meeting application built using the robust [Huddle01 SDKs](https://www.huddle01.com/). Designed to enhance virtual collaboration, HuddleVision comes packed with features like real-time transcriptions, smart summaries, AI-driven translations, and more.

---

## 🚀 Features

- **Seamless Room Management**  
  Effortlessly create and join meeting rooms for instant collaboration.

- **Real-Time Transcriptions**  
  Powered by Whisper AI, HuddleVision provides accurate live transcription of conversations.

- **Smart Summaries**  
  Generate concise summaries of topics discussed during the meeting using OpenAI.

- **Curated Feeds**  
  Access reference links and curated feeds related to the discussed topics in the feed section.

- **AI-Powered Translations**  
  Break language barriers with real-time translations powered by advanced AI.

- **Intelligent Chatbot**  
  Leverage the built-in chatbot powered by GPT for instant assistance and smooth communication.

---

## 🛠️ Tech Stack

- **Frontend**: React, Next.js, Tailwind CSS
- **AI Features**: Whisper AI, OpenAI GPT APIs
- **Video SDK**: Huddle01 SDK

---

## 🔧 Setup and Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/yourusername/huddlevision.git
   ```

2. Navigate to the project directory:

   ```bash
   cd huddlevision
   ```

3. Install the dependencies:

   ```bash
   bun install
   ```

4. Create a `.env` file in the root directory and configure the following environment variables:

   ```env
    NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key
    NEXT_PUBLIC_API_KEY=your_api_key
    NEXT_PUBLIC_PROJECT_ID=your_project_id
   ```

5. Start the development server:

   ```bash
   bun run dev
   ```

6. Open the app in your browser:
   ```
   http://localhost:3000
   ```

---

## 🖥️ How to Use

1. **Creating/Joining a Room**:  
   Navigate to the "Rooms" section to create a new room or join an existing one using the room code.

2. **Real-Time Transcriptions**:  
   Enable transcriptions during the meeting to see live captions.

3. **Summaries and Feeds**:  
   After the meeting, view a summary of the discussion and access related reference links in the "Feed" section.

4. **Translations**:  
   Use the translation feature for real-time language support during meetings.

5. **Chatbot Assistance**:  
   Interact with the chatbot for instant help and meeting-related queries.

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature-name"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Create a pull request.

---

## 📝 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 📧 Contact

For questions or support, reach out to us at [0xchirag@gmail.com](mailto:0xchirag@gmail.com).
