import React from 'react';
import { StoreSettings } from '../../../../types/store';
import { Users, Calendar, Package, Headphones, Star, Award } from 'lucide-react';

interface SimpleAboutProps {
  settings: StoreSettings;
}

export default function SimpleAbout({ settings }: SimpleAboutProps) {
  const { aboutSection } = settings;

  if (!aboutSection.enabled) return null;

  const getIcon = (iconName: string) => {
    const icons = {
      users: Users,
      calendar: Calendar,
      package: Package,
      headphones: Headphones,
      star: Star,
      award: Award,
    };
    return icons[iconName as keyof typeof icons] || Star;
  };

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4" style={{ color: settings.primaryColor }}>
            {aboutSection.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {aboutSection.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <p className="text-gray-700 leading-relaxed text-lg mb-6">
              {aboutSection.content}
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              {aboutSection.stats.slice(0, 4).map((stat) => {
                const Icon = getIcon(stat.icon);
                return (
                  <div key={stat.id} className="text-center p-4 bg-gray-50 rounded-lg">
                    <Icon size={24} className="mx-auto mb-2" style={{ color: settings.primaryColor }} />
                    <div className="text-2xl font-bold" style={{ color: settings.primaryColor }}>
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            {aboutSection.image ? (
              <img
                src={aboutSection.image}
                alt="About Us"
                className="w-full h-80 object-cover rounded-lg shadow-lg"
              />
            ) : (
              <div 
                className="w-full h-80 rounded-lg shadow-lg flex items-center justify-center"
                style={{ backgroundColor: `${settings.primaryColor}10` }}
              >
                <div className="text-center">
                  <Award size={64} style={{ color: settings.primaryColor }} className="mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-800">قصة نجاحنا</h3>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Team Section */}
        {aboutSection.team.length > 0 && (
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-8" style={{ color: settings.primaryColor }}>
              فريق العمل
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {aboutSection.team.map((member) => (
                <div key={member.id} className="flex items-center gap-4 p-6 bg-gray-50 rounded-lg">
                  <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                    {member.image ? (
                      <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                    ) : (
                      <div 
                        className="w-full h-full flex items-center justify-center"
                        style={{ backgroundColor: settings.primaryColor }}
                      >
                        <Users size={24} className="text-white" />
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <h4 className="font-bold text-lg">{member.name}</h4>
                    <p className="text-sm mb-2" style={{ color: settings.accentColor }}>{member.position}</p>
                    <p className="text-gray-600 text-sm">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export const SimpleAboutConfig = {
  id: 'simple-about',
  name: 'قسم من نحن البسيط',
  description: 'قسم من نحن بسيط ونظيف',
  preview: '/previews/simple-about.jpg',
  category: 'simple',
  features: ['تصميم بسيط', 'إحصائيات', 'فريق العمل'],
  customizable: {
    colors: true,
    layout: true,
    typography: true
  }
};