import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';
import { StoreSettings, SocialLink } from '../../types/store';
import { themes } from '../../themes/palettes';

const socialIconMap: { [key in SocialLink['platform']]: React.ElementType } = {
  facebook: Facebook,
  twitter: Twitter,
  instagram: Instagram,
  linkedin: Linkedin,
  youtube: Youtube,
};

interface PreviewFooterProps {
  settings: StoreSettings;
}

export default function PreviewFooter({ settings }: PreviewFooterProps) {
  const { storeName, description, sections } = settings;
  const { footer, header } = sections;
  const theme = themes.find(t => t.name === settings.theme) || themes[0];

  if (!footer.enabled) {
    return null;
  }

  const { contactInfo, linksTitle, contactTitle, socialLinks, copyrightText } = footer.data;

  return (
    <footer style={{ backgroundColor: theme.colors.footerBackground, color: theme.colors.footerText }} className="mt-16">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold mb-2">{storeName}</h3>
            <p className="opacity-80">{description}</p>
            {socialLinks.length > 0 && (
              <div className="flex gap-4 mt-4">
                {socialLinks.map(link => {
                  const Icon = socialIconMap[link.platform];
                  return (
                    <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100">
                      <Icon size={24} />
                    </a>
                  );
                })}
              </div>
            )}
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">{linksTitle}</h4>
            <ul className="space-y-2">
              {header.data.links.map(link => (
                <li key={link.id}><a href={link.link} className="opacity-80 hover:opacity-100">{link.text}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">{contactTitle}</h4>
            <ul className="space-y-2 opacity-80">
              {contactInfo.email && <li>البريد: <a href={`mailto:${contactInfo.email}`} className="hover:underline">{contactInfo.email}</a></li>}
              {contactInfo.phone && <li>الهاتف: {contactInfo.phone}</li>}
              {contactInfo.address && <li>العنوان: {contactInfo.address}</li>}
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-white/10 text-center opacity-70">
          <p>{copyrightText}</p>
        </div>
      </div>
    </footer>
  );
}
