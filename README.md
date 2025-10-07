# AMA Career Platform 🎮

An AI-powered career assessment platform that uses voice interaction to help users discover their ideal career path in the gaming industry.

## 🌟 Features

- **🎤 Voice Assessment**: Interactive voice conversation with AMA (AI career advisor)
- **🎯 Career Tracks**: Three specialized tracks - Game Design, Game Asset Artist, Content Creation
- **🔊 Real-time Audio**: Bidirectional voice communication with Ultravox API
- **🧠 AI Analysis**: Advanced career analysis powered by Perplexity AI
- **🎉 Celebration**: Confetti animation for track assignment
- **🔐 Authentication**: Secure user authentication with Supabase
- **📱 Responsive Design**: Modern UI with Tailwind CSS

## 🚀 Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS
- **Voice AI**: Ultravox API with built-in voices
- **AI Analysis**: Perplexity API
- **Database**: Supabase
- **Authentication**: Supabase Auth
- **Package Manager**: pnpm

## 📋 Prerequisites

- Node.js 18+ 
- pnpm package manager
- Ultravox API key
- Perplexity API key
- Supabase account

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/ama-career-platform.git
   cd ama-career-platform
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Edit `.env.local` with your API keys:
   ```env
   ULTRAVOX_API_KEY=your_ultravox_api_key
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   PPLX_API_KEY=your_perplexity_api_key
   ```

4. **Start the development server**
   ```bash
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 How It Works

1. **Voice Assessment**: Users click "Talk to AMA" to start a voice conversation
2. **Career Questions**: AMA asks about gaming interests, skills, and preferences
3. **AI Analysis**: Perplexity AI analyzes the conversation to determine the best career track
4. **Track Assignment**: Users are assigned to Game Design, Game Asset Artist, or Content Creation
5. **Celebration**: Confetti animation celebrates the career track assignment
6. **Dashboard Access**: Users can sign up to access their personalized career dashboard

## 🔧 API Integration

### Ultravox Voice API
- Real-time voice communication
- Built-in voice synthesis (Lily voice)
- WebSocket-based audio streaming
- Automatic speech-to-text transcription

### Perplexity AI
- Career track analysis
- Natural language processing
- Intelligent decision making
- Consistent track assignment

### Supabase
- User authentication
- Database management
- Real-time updates
- Secure user sessions

## 📁 Project Structure

```
src/
├── app/                    # Next.js app router
│   ├── api/               # API routes
│   ├── dashboard/         # Dashboard pages
│   └── career-map/        # Career mapping
├── components/            # React components
│   ├── AuthModal.tsx     # Authentication modal
│   ├── VoiceCallModal.tsx # Voice call interface
│   └── TrackConfettiScreen.tsx # Celebration screen
├── hooks/                 # Custom React hooks
├── lib/                   # Utility libraries
│   ├── api-utils.ts      # API utilities
│   ├── perplexity-client.ts # Perplexity integration
│   └── supabase-client.ts # Supabase integration
├── types/                 # TypeScript type definitions
└── utils/                 # Helper utilities
```

## 🌐 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Manual Deployment
```bash
pnpm build
pnpm start
```

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `ULTRAVOX_API_KEY` | Ultravox API key for voice services | Yes |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |
| `PPLX_API_KEY` | Perplexity API key | Yes |

## 🎮 Career Tracks

### Game Design
- Game mechanics and systems
- Interactive storytelling
- Gameplay design and balance
- User experience optimization

### Game Asset Artist
- 2D and 3D art creation
- Character and environment design
- Visual effects and animation
- Asset optimization and integration

### Content Creation
- Video production and editing
- Live streaming and broadcasting
- Social media content
- Community engagement

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Ultravox](https://ultravox.ai/) for voice AI capabilities
- [Perplexity AI](https://perplexity.ai/) for intelligent analysis
- [Supabase](https://supabase.com/) for backend services
- [Next.js](https://nextjs.org/) for the React framework
- [Tailwind CSS](https://tailwindcss.com/) for styling

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/YOUR_USERNAME/ama-career-platform/issues) page
2. Create a new issue with detailed information
3. Include error messages and steps to reproduce

---

**Built with ❤️ for the gaming community**