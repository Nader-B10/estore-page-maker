import React from 'react';
import { StoreSettings } from '../../../../types/store';
import { Users, Calendar, Package, Headphones, Star, Award, Target, Heart } from 'lucide-react';

interface ModernAboutProps {
  settings: StoreSettings;
}

export default function ModernAbout({ settings }: ModernAboutProps) {
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
      target: Target,
      heart: Heart,
    };
    return icons[iconName as keyof typeof icons] || Star;
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4" style={{ color: settings.primaryColor }}>
            {aboutSection.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {aboutSection.subtitle}
          </p>
          <div className="w-24 h-1 mx-auto mt-6 rounded" style={{ backgroundColor: settings.accentColor }}></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Content */}
          <div>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed text-lg">
                {aboutSection.content}
              </p>
            </div>
            
            {/* Mission & Vision */}
            <div className="mt-8 space-y-6">
              <div className="flex items-start gap-4">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${settings.primaryColor}20` }}
                >
                  <Target size={24} style={{ color: settings.primaryColor }} />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">رؤيتنا</h3>
                  <p className="text-gray-600">أن نكون الخيار الأول للعملاء في مجالنا من خلال تقديم منتجات وخدمات استثنائية.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${settings.accentColor}20` }}
                >
                  <Heart size={24} style={{ color: settings.accentColor }} />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">مهمتنا</h3>
                  <p className="text-gray-600">نسعى لتحقيق رضا عملائنا من خلال الجودة العالية والخدمة المتميزة والابتكار المستمر.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            {aboutSection.image ? (
              <img
                src={aboutSection.image}
                alt="About Us"
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
            ) : (
              <div 
                className="w-full h-96 rounded-2xl shadow-2xl flex items-center justify-center"
                style={{ 
                  background: `linear-gradient(135deg, ${settings.primaryColor}20, ${settings.secondaryColor}20)` 
                }}
              >
                <div className="text-center">
                  <div 
                    className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: settings.primaryColor }}
                  >
                    <Award size={48} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">فريق متميز</h3>
                  <p className="text-gray-600">نعمل بشغف لتحقيق أهدافكم</p>
                </div>
              </div>
            )}
            
            {/* Floating Stats */}
            <div className="absolute -bottom-8 -left-8 bg-white rounded-xl shadow-xl p-6 transform rotate-3">
              <div className="text-center">
                <div className="text-3xl font-bold" style={{ color: settings.primaryColor }}>
                  {aboutSection.stats[0]?.number || '1000+'}
                </div>
                <div className="text-sm text-gray-600">{aboutSection.stats[0]?.label || 'عميل سعيد'}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {aboutSection.stats.map((stat) => {
            const Icon = getIcon(stat.icon);
            return (
              <div key={stat.id} className="text-center">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: `${settings.primaryColor}20` }}
                >
                  <Icon size={32} style={{ color: settings.primaryColor }} />
                </div>
                <div className="text-3xl font-bold mb-2" style={{ color: settings.primaryColor }}>
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Team Section */}
        {aboutSection.team.length > 0 && (
          <div>
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold mb-4" style={{ color: settings.primaryColor }}>
                فريق العمل
              </h3>
              <p className="text-gray-600">تعرف على الأشخاص الذين يقفون وراء نجاحنا</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {aboutSection.team.map((member) => (
                <div key={member.id} className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
                  <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden">
                    {member.image ? (
                      <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                    ) : (
                      <div 
                        className="w-full h-full flex items-center justify-center"
                        style={{ backgroundColor: `${settings.primaryColor}20` }}
                      >
                        <Users size={32} style={{ color: settings.primaryColor }} />
                      </div>
                    )}
                  </div>
                  <h4 className="font-bold text-lg mb-1">{member.name}</h4>
                  <p className="text-sm mb-3" style={{ color: settings.accentColor }}>{member.position}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export const ModernAboutConfig = {
  id: 'modern-about',
  name: 'قسم من نحن العصري',
  description: 'قسم من نحن عصري مع إحصائيات وفريق العمل',
  preview: '/previews/modern-about.jpg',
  category: 'modern',
  features: ['إحصائيات', 'فريق العمل', 'رؤية ومهمة', 'تصميم عصري'],
  customizable: {
    colors: true,
    layout: true,
    typography: true,
    features: true
  }
};