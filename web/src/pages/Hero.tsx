import { useState, useEffect } from 'react';
import { CheckCircle, TrendingUp, Calendar, Target, Zap, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    setIsVisible(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Daily Tracking",
      description: "Log your progress every day with intuitive, quick entries"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Visual Analytics",
      description: "See your growth with beautiful charts and insights"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Goal Setting",
      description: "Set meaningful goals and track your journey toward them"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Habit Streaks",
      description: "Build momentum with streak tracking and achievements"
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Task Management",
      description: "Organize your daily tasks and check them off with satisfaction"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community",
      description: "Stay motivated with a community of like-minded achievers"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
          style={{ transform: `translate(${scrollY * 0.1}px, ${scrollY * 0.05}px)` }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
          style={{ transform: `translate(-${scrollY * 0.15}px, -${scrollY * 0.08}px)` }}
        />
      </div>

      <nav className="relative z-10 container mx-auto px-6 py-6 flex justify-between items-center">
        <div className="text-2xl font-bold">
          <span className="bg-clip-text text-transparent" style={{
            backgroundImage: 'linear-gradient(to right, rgb(192 132 252), rgb(251 207 232))'
          }}>
            Daily Track
          </span>
        </div>
        <div className="hidden md:flex gap-8 items-center">
          <a href="#features" className="hover:text-purple-300 transition-colors">Features</a>
          <a href="#how" className="hover:text-purple-300 transition-colors">How It Works</a>
          <a href="#pricing" className="hover:text-purple-300 transition-colors">Pricing</a>
          <button className="px-6 py-2 rounded-full hover:shadow-lg hover:shadow-purple-500/50 transition-all transform hover:scale-105" style={{
            backgroundImage: 'linear-gradient(to right, rgb(147 51 234), rgb(219 39 119))'
          }}
          onClick={() => navigate('/signin')}
          >
            Get Started
          </button>
        </div>
      </nav>
      <section className="relative z-10 container mx-auto px-6 pt-20 pb-32">
        <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
            Track Your Progress,
            <span className="bg-clip-text text-transparent" style={{
              backgroundImage: 'linear-gradient(to right, rgb(192 132 252), rgb(251 207 232), rgb(192 132 252))'
            }}> Transform Your Life</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed">
            Build better habits, achieve your goals, and become the best version of yourself with Daily Track
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transition-all transform hover:scale-105" style={{
              backgroundImage: 'linear-gradient(to right, rgb(147 51 234), rgb(219 39 119))'
            }}>
              Start Tracking Free
            </button>
            <button className="border-2 border-purple-400 px-8 py-4 rounded-full text-lg font-semibold hover:bg-purple-400/10 transition-all">
              Watch Demo
            </button>
          </div>

          <div className="grid grid-cols-3 gap-8 mt-20 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400">50K+</div>
              <div className="text-gray-400 mt-2">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-pink-400">1M+</div>
              <div className="text-gray-400 mt-2">Goals Achieved</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400">4.9★</div>
              <div className="text-gray-400 mt-2">User Rating</div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="relative z-10 container mx-auto px-6 py-20">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          Everything You Need to <span className="text-purple-400">Succeed</span>
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20"
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
              }}
            >
              <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-6" style={{
                backgroundImage: 'linear-gradient(to bottom right, rgb(168 85 247), rgb(236 72 153))'
              }}>
                {feature.icon}
              </div>
              <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section id="how" className="relative z-10 container mx-auto px-6 py-20">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          Simple. Effective. <span className="text-purple-400">Powerful.</span>
        </h2>
        <div className="max-w-4xl mx-auto space-y-12">
          {[
            { step: '01', title: 'Set Your Goals', desc: 'Define what matters most to you and create actionable goals' },
            { step: '02', title: 'Track Daily', desc: 'Log your progress in seconds with our intuitive interface' },
            { step: '03', title: 'Analyze & Improve', desc: 'Review insights and adjust your approach for maximum growth' }
          ].map((item, index) => (
            <div key={index} className="flex gap-8 items-center">
              <div className="text-6xl font-bold text-purple-500/20 min-w-[100px]">
                {item.step}
              </div>
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 flex-1">
                <h3 className="text-2xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="relative z-10 container mx-auto px-6 py-20">
        <div className="rounded-3xl p-12 md:p-20 text-center" style={{
          backgroundImage: 'linear-gradient(to right, rgb(147 51 234), rgb(219 39 119))'
        }}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Life?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands who are already achieving their goals
          </p>
          <button className="bg-white text-purple-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transition-all transform hover:scale-105">
            Start Your Journey Today
          </button>
        </div>
      </section>
      <footer className="relative z-10 border-t border-white/10 py-8">
        <div className="container mx-auto px-6 text-center text-gray-400">
          <p>© 2024 Daily Track. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}