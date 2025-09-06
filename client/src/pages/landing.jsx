import { Link } from 'wouter';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Warehouse, Users, Store, Shield, ArrowRight, BarChart3, Package } from 'lucide-react';

export default function Landing() {
  const features = [
    {
      icon: Store,
      title: 'Shop Management',
      description: 'Track inventory levels, update stock quantities, and monitor distribution activities in real-time.',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: Users,
      title: 'Beneficiary Portal',
      description: 'Check available stock at assigned ration shops and receive notifications about new supplies.',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      icon: Shield,
      title: 'Administrative Control',
      description: 'District-wide oversight with comprehensive analytics, reporting, and system management tools.',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ];

  const stats = [
    { number: '500+', label: 'Ration Shops' },
    { number: '50K+', label: 'Beneficiaries' },
    { number: '94%', label: 'Distribution Rate' },
    { number: '24/7', label: 'System Monitoring' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/10">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Warehouse className="text-primary-foreground text-xl" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">PDS Management</h1>
                <p className="text-sm text-muted-foreground">Public Distribution System</p>
              </div>
            </div>
            <Link href="/login">
              <Button className="flex items-center space-x-2" data-testid="button-login">
                <span>Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-foreground mb-6">
            Modernizing Public Distribution
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Streamline ration shop operations, empower beneficiaries with real-time information, 
            and provide administrators with comprehensive oversight tools for efficient food distribution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button size="lg" className="text-lg px-8 py-6" data-testid="button-get-started">
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Comprehensive PDS Management Solution
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform serves three distinct user roles with specialized tools and interfaces 
              designed for efficient public distribution system management.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="shadow-lg border-0 hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-8">
                    <div className={`w-16 h-16 ${feature.bgColor} rounded-lg flex items-center justify-center mb-6`}>
                      <Icon className={`${feature.color} text-2xl`} />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Key Features Grid */}
      <section className="py-20 px-6 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Built for Efficiency & Transparency
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-center space-x-4 p-6 bg-white rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Real-time Analytics</h4>
                <p className="text-sm text-muted-foreground">Live stock tracking and insights</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-6 bg-white rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Package className="text-green-600" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Inventory Management</h4>
                <p className="text-sm text-muted-foreground">Automated stock level monitoring</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-6 bg-white rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="text-purple-600" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">User Management</h4>
                <p className="text-sm text-muted-foreground">Role-based access control</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-primary rounded-2xl p-12 text-primary-foreground">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Transform Your PDS Operations?
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Join hundreds of districts already using our platform for efficient food distribution management.
            </p>
            <Link href="/login">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6" data-testid="button-start-now">
                Start Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-white/80 border-t border-border">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Warehouse className="text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground">PDS Management System</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 Public Distribution System. Built for efficient food distribution management.
          </p>
        </div>
      </footer>
    </div>
  );
}