import React from "react";
import { CheckCircle, Zap, Crown, Users } from "lucide-react";

const Plans = () => {
  const plans = [
    {
      name: "Starter",
      price: "$19",
      period: "/month",
      description: "Perfect for beginners",
      features: [
        "Unlimited workouts",
        "Basic nutrition guide",
        "Mobile app access",
        "Community forum",
        "Email support",
      ],
      icon: Zap,
      popular: false,
    },
    {
      name: "Pro",
      price: "$49",
      period: "/month",
      description: "Most popular choice",
      features: [
        "Everything in Starter",
        "1 Personal trainer session/week",
        "Advanced analytics",
        "Meal plans",
        "Priority support",
        "Ad-free experience",
      ],
      icon: Crown,
      popular: true,
    },
    {
      name: "Elite",
      price: "$99",
      period: "/month",
      description: "For serious athletes",
      features: [
        "Everything in Pro",
        "Unlimited trainer sessions",
        "Custom workout plans",
        "Advanced nutrition coaching",
        "24/7 support",
        "Exclusive workshops",
      ],
      icon: Users,
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-[#050816] py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-0">
      <div>
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4">
            <span className="bg-gradient-to-r from-[#22c55e] to-[#38bdf8] bg-clip-text text-transparent">
              Flexible Plans for Everyone
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto px-4 sm:px-0">
            Choose the perfect plan and unlock your fitness potential
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <div
                key={plan.name}
                className={`relative group rounded-2xl transition-all duration-300 p-6 sm:p-8 ${
                  plan.popular
                    ? "lg:scale-105 border-2 border-[#22c55e] bg-[#0f172a] shadow-2xl shadow-[#22c55e]/20"
                    : "border border-[#22c55e]/30 bg-[#0f172a] hover:border-[#22c55e] hover:shadow-xl hover:shadow-[#22c55e]/10"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-[#22c55e] to-[#38bdf8] text-white px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-bold">
                      MOST POPULAR
                    </span>
                  </div>
                )}

                <div className="p-8">
                  {/* Icon */}
                  <div className="mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#22c55e] to-[#38bdf8] rounded-lg flex items-center justify-center">
                      <Icon className="text-white w-6 h-6" />
                    </div>
                  </div>

                  {/* Plan Name */}
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-400 mb-6">{plan.description}</p>

                  {/* Price */}
                  <div className="mb-6">
                    <span className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                      {plan.price}
                    </span>
                    <span className="text-gray-400">{plan.period}</span>
                  </div>

                  {/* CTA Button */}
                  <button
                    className={`w-full py-3 rounded-lg font-bold mb-8 transition-all duration-300 ${
                      plan.popular
                        ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:shadow-lg hover:shadow-cyan-500/50"
                        : "border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-slate-900"
                    }`}
                  >
                    Get Started
                  </button>

                  {/* Features */}
                  <div className="space-y-4">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* FAQs */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Frequently Asked Questions
            </span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                q: "Can I change my plan anytime?",
                a: "Yes, you can upgrade or downgrade your plan at any time.",
              },
              {
                q: "Is there a free trial?",
                a: "Yes, we offer a 7-day free trial for all plans.",
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept all major credit cards, PayPal, and Google Pay.",
              },
              {
                q: "Can I cancel anytime?",
                a: "Yes, cancel anytime without any penalties or hidden fees.",
              },
            ].map((faq, i) => (
              <div
                key={i}
                className="bg-slate-700/50 rounded-lg p-6 border border-slate-600 hover:border-cyan-500 transition"
              >
                <h4 className="font-bold text-white mb-3">{faq.q}</h4>
                <p className="text-gray-300">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plans;
