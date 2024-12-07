import {
  Video,
  Users,
  ArrowRight,
  CheckCircle,
  Globe2,
  Shield,
  Clock,
} from "lucide-react";
import Link from "next/link";

export default function Landing() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-6xl font-black bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-8 animate-fade-in">
            Connect, Collaborate, Create
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            Experience seamless video meetings with crystal-clear quality,
            real-time translations, and AI-powered insights - all in one
            powerful platform. Perfect for teams of any size.
          </p>

          <div className="flex justify-center gap-8 mb-12 flex-wrap">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-teal-500" />
              <span className="text-gray-600">Real-time Translation</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-teal-500" />
              <span className="text-gray-600">AI Assistance</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-teal-500" />
              <span className="text-gray-600">No Downloads</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-teal-500" />
              <span className="text-gray-600">End-to-End Encryption</span>
            </div>
          </div>

          <div className="flex justify-center gap-4 mb-12">
            <Link
              href="/"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-teal-500 to-blue-500 text-white font-bold rounded-xl text-xl
              hover:from-teal-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-[1.02]
              focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
            >
              Start Meeting Now
              <ArrowRight className="ml-2 w-6 h-6" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center px-8 py-4 bg-white text-teal-500 border-2 border-teal-500 font-bold rounded-xl text-xl
              hover:bg-teal-50 transition-all duration-300
              focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
            >
              Learn More
            </Link>
          </div>

          <div className="text-sm text-gray-500">
            Trusted by over 10,000+ teams worldwide
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
            Why Choose HuddleVision?
          </h2>

          <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            <div className="text-center p-6 rounded-2xl bg-gradient-to-b from-teal-50 to-white hover:shadow-lg transition-all duration-300">
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Video className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">
                Crystal Clear Video
              </h3>
              <p className="text-gray-600">
                Experience high-quality video calls with minimal latency and
                maximum clarity. Support for up to 4K resolution.
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-gradient-to-b from-blue-50 to-white hover:shadow-lg transition-all duration-300">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe2 className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">
                Real-time Translation
              </h3>
              <p className="text-gray-600">
                Break language barriers with instant translation during your
                meetings. Supports 50+ languages.
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-gradient-to-b from-purple-50 to-white hover:shadow-lg transition-all duration-300">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">
                AI-Powered Insights
              </h3>
              <p className="text-gray-600">
                Get smart meeting summaries, action items, and searchable
                transcripts powered by advanced AI.
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-gradient-to-b from-green-50 to-white hover:shadow-lg transition-all duration-300">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">
                Enterprise Security
              </h3>
              <p className="text-gray-600">
                Bank-grade encryption and security measures to keep your
                meetings private and secure.
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-gradient-to-b from-yellow-50 to-white hover:shadow-lg transition-all duration-300">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">
                Team Collaboration
              </h3>
              <p className="text-gray-600">
                Built-in tools for screen sharing, file sharing, and
                collaborative whiteboarding.
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-gradient-to-b from-red-50 to-white hover:shadow-lg transition-all duration-300">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">
                Meeting Analytics
              </h3>
              <p className="text-gray-600">
                Detailed insights into meeting participation, engagement, and
                productivity metrics.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-teal-500 to-blue-500 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-8">
            Ready to Transform Your Meetings?
          </h2>
          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
            Join thousands of teams who have already elevated their virtual
            collaboration experience. Start for free, no credit card required.
          </p>
        </div>
      </div>
    </main>
  );
}
