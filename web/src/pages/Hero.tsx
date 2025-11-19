import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
// import { ThemeToggle } from "@/components/ThemeToggle";
import { ArrowRight, CheckCircle2, Zap, Shield, Users } from "lucide-react";
import { ModeToggle } from "@/components/theme-toggle";

const Hero = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">DailyTrack</h1>
          <div className="flex items-center gap-4">
            {/* <ThemeToggle /> */}
            <ModeToggle/>
            <Link to="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link to="/register">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Track Your Day,
            <span className="text-primary"> Achieve Your Goals</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            The simplest way to manage your daily tasks, track your progress, and stay productive. 
            Built for individuals who want to get things done.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="w-full sm:w-auto">
                Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted/50 py-20">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">Why Choose DailyTrack?</h3>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-card p-6 rounded-lg border">
              <Zap className="h-12 w-12 text-primary mb-4" />
              <h4 className="text-xl font-semibold mb-2">Lightning Fast</h4>
              <p className="text-muted-foreground">
                Quick task creation and instant updates. No loading screens, no delays.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg border">
              <Shield className="h-12 w-12 text-primary mb-4" />
              <h4 className="text-xl font-semibold mb-2">Secure & Private</h4>
              <p className="text-muted-foreground">
                Your data is encrypted and protected. We take your privacy seriously.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg border">
              <Users className="h-12 w-12 text-primary mb-4" />
              <h4 className="text-xl font-semibold mb-2">Built for You</h4>
              <p className="text-muted-foreground">
                Simple, intuitive interface designed for personal productivity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold text-center mb-12">Everything You Need</h3>
            <div className="space-y-6">
              {[
                "Create and organize unlimited tasks",
                "Track your daily progress with ease",
                "Set priorities and deadlines",
                "Dark mode for comfortable viewing",
                "Mobile-friendly responsive design",
                "Free to start, upgrade when you need more"
              ].map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                  <p className="text-lg">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h3>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of users who are already tracking their daily progress.
          </p>
          <Link to="/register">
            <Button size="lg" variant="secondary">
              Create Free Account
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2024 DailyTrack. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Hero;
