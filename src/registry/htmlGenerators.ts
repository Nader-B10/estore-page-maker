import { StoreSettings, PredefinedTheme } from '../types';

export const generateHeaderHTML = (templateId: string, settings: StoreSettings): string => {
  switch (templateId) {
    case 'modern-header-1':
      return `
        <header class="py-6 px-6 text-white relative overflow-hidden" style="background: linear-gradient(135deg, ${settings.primaryColor}, ${settings.secondaryColor}); box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
          <!-- Background Pattern -->
          <div class="absolute inset-0 opacity-10">
            <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent"></div>
            <div class="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full"></div>
            <div class="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full"></div>
          </div>

          <div class="max-w-7xl mx-auto relative z-10">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-4">
                ${settings.logo ? `
                  <div class="relative">
                    <img src="logo.png" alt="Logo" class="w-14 h-14 object-cover rounded-xl shadow-lg border-2 border-white/20" />
                    <div class="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent"></div>
                  </div>
                ` : ''}
                <div>
                  <h1 class="text-2xl font-bold mb-1 drop-shadow-sm">${settings.storeName}</h1>
                  <p class="text-sm opacity-90 drop-shadow-sm">${settings.description}</p>
                </div>
              </div>
              
              <!-- Navigation -->
              <nav class="hidden md:flex items-center gap-8">
                ${settings.headerLinks.filter(link => link.isVisible).map(link => `
                  <a href="${link.url}" class="text-white hover:text-opacity-80 transition-all duration-200 font-medium relative group" ${link.type === 'external' ? 'target="_blank" rel="noopener noreferrer"' : ''}>
                    ${link.text}
                    <div class="absolute -bottom-1 left-0 w-0 h-0.5 bg-white/60 group-hover:w-full transition-all duration-300"></div>
                  </a>
                `).join('')}
              </nav>
              
              ${settings.whatsappSettings.enabled && settings.whatsappSettings.phoneNumber ? `
                <div class="flex items-center gap-4">
                  <a href="https://wa.me/${settings.whatsappSettings.phoneNumber}" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/></svg>
                    <span class="font-medium">تواصل معنا</span>
                  </a>
                </div>
              ` : ''}
            </div>
          </div>
        </header>
      `;

    case 'elegant-header':
      return `
        <header class="bg-white shadow-lg border-b-4 border-gray-100">
          <!-- Top Info Bar -->
          <div class="bg-gray-50 py-2 px-6 text-sm">
            <div class="max-w-7xl mx-auto flex justify-between items-center">
              <div class="flex items-center gap-4 text-gray-600">
                ${settings.contactInfo.email ? `<span>📧 ${settings.contactInfo.email}</span>` : ''}
                ${settings.contactInfo.phone ? `<span>📞 ${settings.contactInfo.phone}</span>` : ''}
              </div>
              <div class="flex items-center gap-4">
                <button class="text-gray-600 hover:text-gray-800 transition-colors">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                </button>
                <button class="text-gray-600 hover:text-gray-800 transition-colors">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Main Header -->
          <div class="py-6 px-6">
            <div class="max-w-7xl mx-auto">
              <div class="flex items-center justify-between mb-4">
                <!-- Logo & Company Info -->
                <div class="flex items-center gap-6">
                  ${settings.logo ? `<img src="logo.png" alt="Logo" class="w-20 h-20 object-cover rounded-lg shadow-md" />` : ''}
                  <div>
                    <h1 class="text-4xl font-bold text-gray-800 mb-2">${settings.storeName}</h1>
                    <p class="text-gray-600 text-lg">${settings.description}</p>
                  </div>
                </div>

                <!-- CTA Section -->
                ${settings.whatsappSettings.enabled && settings.whatsappSettings.phoneNumber ? `
                  <div class="text-center">
                    <a href="https://wa.me/${settings.whatsappSettings.phoneNumber}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl text-lg font-semibold">
                      <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/></svg>
                      <div class="text-right">
                        <div>تواصل معنا الآن</div>
                        <div class="text-sm opacity-90">استشارة مجانية</div>
                      </div>
                    </a>
                    <p class="text-sm text-gray-500 mt-2">خدمة عملاء 24/7</p>
                  </div>
                ` : ''}
              </div>

              <!-- Search Bar -->
              <div class="mb-6">
                <div class="relative max-w-2xl mx-auto">
                  <svg class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                  <input type="text" placeholder="ابحث عن المنتجات..." class="w-full pl-12 pr-6 py-4 border-2 border-gray-200 rounded-full focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-lg" />
                  <button class="absolute left-2 top-1/2 transform -translate-y-1/2 px-6 py-2 rounded-full text-white font-medium transition-colors" style="background-color: ${settings.primaryColor}">بحث</button>
                </div>
              </div>

              <!-- Navigation -->
              <nav class="flex justify-center">
                <div class="flex items-center gap-8 bg-gray-50 px-8 py-4 rounded-full">
                  ${settings.headerLinks.filter(link => link.isVisible).map(link => `
                    <a href="${link.url}" class="text-gray-700 hover:text-blue-600 transition-colors font-medium text-lg relative group" ${link.type === 'external' ? 'target="_blank" rel="noopener noreferrer"' : ''}>
                      ${link.text}
                      <div class="absolute -bottom-2 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></div>
                    </a>
                  `).join('')}
                </div>
              </nav>
            </div>
          </div>
        </header>
      `;

    case 'creative-header':
      return `
        <header class="relative overflow-hidden" style="background: linear-gradient(135deg, ${settings.primaryColor}15, ${settings.secondaryColor}15, ${settings.accentColor}15);">
          <!-- Animated Background Elements -->
          <div class="absolute inset-0 overflow-hidden">
            <div class="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-full animate-pulse"></div>
            <div class="absolute top-1/2 -left-8 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full animate-bounce" style="animation-duration: 3s;"></div>
            <div class="absolute bottom-4 right-1/4 w-16 h-16 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full animate-pulse" style="animation-delay: 1s;"></div>
          </div>

          <div class="relative z-10 py-8 px-6">
            <div class="max-w-7xl mx-auto">
              <!-- Main Content -->
              <div class="text-center mb-8">
                <!-- Logo with Creative Effects -->
                ${settings.logo ? `
                  <div class="mb-6 flex justify-center">
                    <div class="relative">
                      <img src="logo.png" alt="Logo" class="w-24 h-24 object-cover rounded-full shadow-2xl border-4 border-white transform hover:scale-110 transition-transform duration-300" />
                      <div class="absolute -top-2 -right-2">
                        <svg class="w-8 h-8 text-yellow-400 animate-spin" style="animation-duration: 4s;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>
                      </div>
                    </div>
                  </div>
                ` : ''}

                <!-- Store Name with Creative Typography -->
                <h1 class="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent animate-pulse">${settings.storeName}</h1>
                
                <p class="text-xl text-gray-700 mb-6 max-w-2xl mx-auto leading-relaxed">✨ ${settings.description} ✨</p>

                <!-- Creative Features -->
                <div class="flex justify-center items-center gap-8 mb-8">
                  <div class="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                    <svg class="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                    <span class="font-semibold text-gray-700">منتجات مميزة</span>
                  </div>
                  <div class="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                    <svg class="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                    <span class="font-semibold text-gray-700">توصيل سريع</span>
                  </div>
                  <div class="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                    <svg class="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>
                    <span class="font-semibold text-gray-700">جودة عالية</span>
                  </div>
                </div>

                <!-- WhatsApp CTA -->
                ${settings.whatsappSettings.enabled && settings.whatsappSettings.phoneNumber ? `
                  <div class="mb-8">
                    <a href="https://wa.me/${settings.whatsappSettings.phoneNumber}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-4 rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 text-lg font-bold">
                      <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/></svg>
                      <span>🚀 ابدأ التسوق الآن</span>
                    </a>
                  </div>
                ` : ''}
              </div>

              <!-- Creative Navigation -->
              <nav class="flex justify-center">
                <div class="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-6 py-4 rounded-full shadow-xl">
                  ${settings.headerLinks.filter(link => link.isVisible).map(link => `
                    <a href="${link.url}" class="px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5" style="background: linear-gradient(135deg, ${settings.primaryColor}20, ${settings.accentColor}20); color: ${settings.primaryColor}" ${link.type === 'external' ? 'target="_blank" rel="noopener noreferrer"' : ''}>
                      ${link.text}
                    </a>
                  `).join('')}
                </div>
              </nav>
            </div>
          </div>
        </header>
      `;

    default: // classic-header
      return `
        <header class="py-4 px-6 text-white shadow-lg" style="background-color: ${settings.primaryColor};">
          <div class="max-w-7xl mx-auto">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                ${settings.logo ? `<img src="logo.png" alt="Logo" class="w-10 h-10 object-cover rounded-lg" />` : ''}
                <div>
                  <h1 class="text-xl font-bold">${settings.storeName}</h1>
                  <p class="text-sm opacity-90">${settings.description}</p>
                </div>
              </div>
              
              <!-- Navigation -->
              <nav class="hidden md:flex items-center gap-6">
                ${settings.headerLinks.filter(link => link.isVisible).map(link => `
                  <a href="${link.url}" class="text-white hover:opacity-80 transition-opacity font-medium" ${link.type === 'external' ? 'target="_blank" rel="noopener noreferrer"' : ''}>
                    ${link.text}
                  </a>
                `).join('')}
              </nav>
              
              ${settings.whatsappSettings.enabled && settings.whatsappSettings.phoneNumber ? `
                <a href="https://wa.me/${settings.whatsappSettings.phoneNumber}" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/></svg>
                  تواصل معنا
                </a>
              ` : ''}

              <!-- Mobile Menu Button -->
              <button class="md:hidden text-white">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
              </button>
            </div>
          </div>
        </header>
      `;
  }
};

export const generateFooterHTML = (templateId: string, settings: StoreSettings): string => {
  switch (templateId) {
    case 'modern-footer':
      return `
        <footer class="relative py-16 px-6 mt-12 text-white overflow-hidden" style="background: linear-gradient(135deg, ${settings.primaryColor}, ${settings.secondaryColor});">
          <!-- Background Pattern -->
          <div class="absolute inset-0 opacity-10">
            <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent"></div>
            <div class="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full"></div>
            <div class="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full"></div>
            <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full"></div>
          </div>

          <div class="max-w-7xl mx-auto relative z-10">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
              <!-- Store Info -->
              <div class="md:col-span-1">
                <div class="flex items-center gap-3 mb-6">
                  ${settings.logo ? `<img src="logo.png" alt="Logo" class="w-14 h-14 object-cover rounded-xl shadow-lg border-2 border-white/20" />` : ''}
                  <h3 class="text-2xl font-bold">${settings.storeName}</h3>
                </div>
                <p class="text-white/90 mb-6 leading-relaxed">${settings.description}</p>
                
                <!-- Contact Info -->
                <div class="space-y-3">
                  ${settings.contactInfo.email ? `
                    <div class="flex items-center gap-3 text-white/80">
                      <div class="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                      </div>
                      <span>${settings.contactInfo.email}</span>
                    </div>
                  ` : ''}
                  ${settings.contactInfo.phone ? `
                    <div class="flex items-center gap-3 text-white/80">
                      <div class="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                      </div>
                      <span>${settings.contactInfo.phone}</span>
                    </div>
                  ` : ''}
                  ${settings.contactInfo.address ? `
                    <div class="flex items-center gap-3 text-white/80">
                      <div class="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                      </div>
                      <span>${settings.contactInfo.address}</span>
                    </div>
                  ` : ''}
                </div>
              </div>

              <!-- Quick Links -->
              <div>
                <h4 class="font-bold mb-6 text-lg text-blue-400">روابط سريعة</h4>
                <div class="space-y-3">
                  ${settings.footerLinks.filter(link => link.isVisible).map(link => `
                    <a href="${link.url}" class="block text-white/80 hover:text-white transition-all duration-200 hover:translate-x-1 transform" ${link.type === 'external' ? 'target="_blank" rel="noopener noreferrer"' : ''}>
                      → ${link.text}
                    </a>
                  `).join('')}
                </div>
              </div>

              <!-- Newsletter -->
              <div>
                <h4 class="font-bold mb-6 text-lg">ابق على تواصل</h4>
                <p class="text-white/80 mb-4">اشترك للحصول على آخر العروض</p>
                <div class="space-y-3">
                  <input type="email" placeholder="بريدك الإلكتروني" class="w-full px-4 py-3 rounded-lg bg-white/20 backdrop-blur-sm text-white placeholder-white/60 border border-white/30 focus:outline-none focus:border-white/60 transition-colors" />
                  <button class="w-full px-4 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5" style="background-color: ${settings.accentColor}">اشتراك</button>
                </div>
              </div>
            </div>

            <!-- Social Media -->
            <div class="text-center mb-8">
              <div class="flex justify-center gap-4">
                <a href="#" class="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-200 transform hover:scale-110">
                  <span class="text-white font-bold">f</span>
                </a>
                <a href="#" class="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-200 transform hover:scale-110">
                  <span class="text-white font-bold">t</span>
                </a>
                <a href="#" class="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-200 transform hover:scale-110">
                  <span class="text-white font-bold">i</span>
                </a>
              </div>
            </div>

            <!-- Bottom Bar -->
            <div class="border-t border-white/20 pt-8 text-center">
              <p class="text-white/70">
                ${settings.footerText || `© ${new Date().getFullYear()} ${settings.storeName}. جميع الحقوق محفوظة.`}
              </p>
            </div>
          </div>
        </footer>
      `;

    default: // default-footer
      return `
        <footer class="bg-gray-900 text-white py-12 px-6 mt-12">
          <div class="max-w-7xl mx-auto">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
              <!-- Store Info -->
              <div class="md:col-span-2">
                <div class="flex items-center gap-3 mb-4">
                  ${settings.logo ? `<img src="logo.png" alt="Logo" class="w-10 h-10 object-cover rounded" />` : ''}
                  <h3 class="text-xl font-bold">${settings.storeName}</h3>
                </div>
                <p class="text-gray-300 mb-4 leading-relaxed">${settings.description}</p>
                
                <!-- Contact Info -->
                <div class="space-y-2">
                  ${settings.contactInfo.email ? `
                    <div class="flex items-center gap-2 text-gray-300">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                      <span>${settings.contactInfo.email}</span>
                    </div>
                  ` : ''}
                  ${settings.contactInfo.phone ? `
                    <div class="flex items-center gap-2 text-gray-300">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                      <span>${settings.contactInfo.phone}</span>
                    </div>
                  ` : ''}
                  ${settings.contactInfo.address ? `
                    <div class="flex items-center gap-2 text-gray-300">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                      <span>${settings.contactInfo.address}</span>
                    </div>
                  ` : ''}
                </div>
              </div>

              <!-- Quick Links -->
              <div>
                <h3 class="font-semibold mb-4 text-lg">روابط سريعة</h3>
                <div class="space-y-2">
                  ${settings.footerLinks.filter(link => link.isVisible).map(link => `
                    <a href="${link.url}" class="block text-gray-300 hover:text-white transition-colors" ${link.type === 'external' ? 'target="_blank" rel="noopener noreferrer"' : ''}>
                      ${link.text}
                    </a>
                  `).join('')}
                </div>
              </div>

              <!-- Social Media -->
              <div>
                <h3 class="font-semibold mb-4 text-lg">تابعنا</h3>
                <div class="flex gap-3">
                  <a href="#" class="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                  </a>
                  <a href="#" class="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                  </a>
                  <a href="#" class="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z"/></svg>
                  </a>
                </div>
              </div>
            </div>

            <!-- Bottom Bar -->
            <div class="border-t border-white/20 pt-8 text-center">
              <p class="text-white/70">
                ${settings.footerText || `© ${new Date().getFullYear()} ${settings.storeName}. جميع الحقوق محفوظة.`}
              </p>
            </div>
          </div>
        </footer>
      `;

    default: // default-footer
      return `
        <footer class="bg-gray-900 text-white py-12 px-6 mt-12">
          <div class="max-w-7xl mx-auto">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
              <!-- Store Info -->
              <div class="md:col-span-2">
                <div class="flex items-center gap-3 mb-4">
                  ${settings.logo ? `<img src="logo.png" alt="Logo" class="w-10 h-10 object-cover rounded" />` : ''}
                  <h3 class="text-xl font-bold">${settings.storeName}</h3>
                </div>
                <p class="text-gray-300 mb-4 leading-relaxed">${settings.description}</p>
                
                <!-- Contact Info -->
                <div class="space-y-2">
                  ${settings.contactInfo.email ? `
                    <div class="flex items-center gap-2 text-gray-300">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                      <span>${settings.contactInfo.email}</span>
                    </div>
                  ` : ''}
                  ${settings.contactInfo.phone ? `
                    <div class="flex items-center gap-2 text-gray-300">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                      <span>${settings.contactInfo.phone}</span>
                    </div>
                  ` : ''}
                  ${settings.contactInfo.address ? `
                    <div class="flex items-center gap-2 text-gray-300">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                      <span>${settings.contactInfo.address}</span>
                    </div>
                  ` : ''}
                </div>
              </div>

              <!-- Quick Links -->
              <div>
                <h3 class="font-semibold mb-4 text-lg">روابط سريعة</h3>
                <div class="space-y-2">
                  ${settings.footerLinks.filter(link => link.isVisible).map(link => `
                    <a href="${link.url}" class="block text-gray-300 hover:text-white transition-colors" ${link.type === 'external' ? 'target="_blank" rel="noopener noreferrer"' : ''}>
                      ${link.text}
                    </a>
                  `).join('')}
                </div>
              </div>

              <!-- Social Media -->
              <div>
                <h3 class="font-semibold mb-4 text-lg">تابعنا</h3>
                <div class="flex gap-3">
                  <a href="#" class="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                  </a>
                  <a href="#" class="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                  </a>
                  <a href="#" class="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z"/></svg>
                  </a>
                </div>
              </div>
            </div>

            <div class="border-t border-gray-700 mt-8 pt-6 text-center">
              <p class="text-gray-400 text-sm">
                ${settings.footerText || `© ${new Date().getFullYear()} ${settings.storeName}. جميع الحقوق محفوظة.`}
              </p>
            </div>
          </div>
        </footer>
      `;
  }
};

export const generateHeroHTML = (templateId: string, settings: StoreSettings, currentTheme: PredefinedTheme): string => {
  const { heroSection } = settings;

  if (!heroSection.enabled) return '';

  switch (templateId) {
    case 'hero-variant-a':
      return `
        <section class="relative min-h-screen flex items-center justify-center overflow-hidden" style="background: linear-gradient(135deg, ${settings.primaryColor}15, ${settings.secondaryColor}15, ${settings.accentColor}10);">
          <!-- Animated Background Elements -->
          <div class="absolute inset-0">
            <div class="absolute top-1/4 left-1/4 w-96 h-96 rounded-full mix-blend-multiply filter blur-xl animate-blob opacity-30" style="background-color: ${settings.primaryColor}40;"></div>
            <div class="absolute top-1/3 right-1/4 w-96 h-96 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000 opacity-30" style="background-color: ${settings.accentColor}40;"></div>
            <div class="absolute bottom-1/4 left-1/3 w-96 h-96 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000 opacity-30" style="background-color: ${settings.secondaryColor}40;"></div>
          </div>

          <!-- Floating Particles -->
          <div class="absolute inset-0 overflow-hidden">
            <div class="absolute animate-float opacity-20" style="left: 10%; top: 20%; animation-delay: 0s; animation-duration: 3s;">
              <div class="w-2 h-2 rounded-full" style="background-color: ${settings.primaryColor};"></div>
            </div>
            <div class="absolute animate-float opacity-20" style="left: 80%; top: 30%; animation-delay: 1s; animation-duration: 4s;">
              <div class="w-2 h-2 rounded-full" style="background-color: ${settings.accentColor};"></div>
            </div>
            <div class="absolute animate-float opacity-20" style="left: 60%; top: 70%; animation-delay: 2s; animation-duration: 5s;">
              <div class="w-2 h-2 rounded-full" style="background-color: ${settings.secondaryColor};"></div>
            </div>
          </div>

          <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center">
              <!-- Badge -->
              <div class="inline-flex items-center gap-2 backdrop-blur-sm border rounded-full px-6 py-3 mb-8 animate-fade-in-up" style="background-color: ${settings.primaryColor}10; border-color: ${settings.primaryColor}30; color: ${settings.primaryColor};">
                <svg class="w-5 h-5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>
                <span class="font-medium">متجر مميز وموثوق</span>
                <div class="w-2 h-2 rounded-full animate-ping" style="background-color: ${settings.accentColor};"></div>
              </div>

              <!-- Main Title -->
              <h1 class="text-5xl md:text-7xl lg:text-8xl font-black mb-6 animate-fade-in-up animation-delay-200">
                <span class="bg-gradient-to-r bg-clip-text text-transparent" style="background-image: linear-gradient(135deg, ${settings.primaryColor}, ${settings.secondaryColor}, ${settings.accentColor});">
                  ${heroSection.title}
                </span>
              </h1>

              <!-- Subtitle -->
              <p class="text-xl md:text-2xl lg:text-3xl mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in-up animation-delay-400" style="color: ${currentTheme.palette.textSecondary};">
                ${heroSection.subtitle}
              </p>

              <!-- CTA Buttons -->
              <div class="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up animation-delay-600">
                <a href="${heroSection.ctaLink}" class="group relative inline-flex items-center gap-3 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl cursor-pointer" style="background: linear-gradient(135deg, ${settings.primaryColor}, ${settings.secondaryColor}); box-shadow: 0 10px 25px ${settings.primaryColor}25;">
                  <span class="relative z-10">${heroSection.ctaText}</span>
                  <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                  <div class="absolute inset-0 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-300" style="background: linear-gradient(135deg, ${settings.primaryColor}, ${settings.secondaryColor});"></div>
                </a>

                <button class="group inline-flex items-center gap-3 font-bold py-4 px-8 rounded-2xl backdrop-blur-sm border-2 transition-all duration-300 transform hover:scale-105" style="background-color: ${settings.primaryColor}10; border-color: ${settings.primaryColor}30; color: ${settings.primaryColor};">
                  <svg class="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.01M15 10h1.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  <span>شاهد الفيديو</span>
                </button>
              </div>

              <!-- Stats -->
              <div class="text-center mt-16 animate-fade-in-up animation-delay-800">
                <p class="text-lg" style="color: ${currentTheme.palette.textSecondary};">
                  ابدأ رحلة التسوق معنا واكتشف عالماً من المنتجات المميزة
                </p>
              </div>
            </div>
          </div>

          <!-- Scroll Indicator -->
          <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div class="w-6 h-10 border-2 rounded-full flex justify-center" style="border-color: ${settings.primaryColor}30;">
              <div class="w-1 h-3 rounded-full mt-2 animate-pulse" style="background-color: ${settings.primaryColor}50;"></div>
            </div>
          </div>
        </section>
      `;

    default:
      return `
        <section class="relative py-20 px-6 text-white overflow-hidden" ${heroSection.backgroundImage ? 
          `style="background-image: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${heroSection.backgroundImage}'); background-size: cover; background-position: center;"` : 
          `style="background: linear-gradient(135deg, ${settings.primaryColor}, ${settings.secondaryColor});"`
        }>
          <div class="max-w-6xl mx-auto relative z-10 text-center">
            <!-- Badge -->
            <div class="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>
              <span class="text-sm font-medium">متجر مميز</span>
            </div>
            
            <h1 class="text-4xl md:text-6xl font-bold mb-6 leading-tight">${heroSection.title}</h1>
            <p class="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">${heroSection.subtitle}</p>

            <!-- Features -->
            <div class="flex flex-wrap justify-center gap-6 mb-8">
              <div class="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <span class="text-sm">جودة عالية</span>
              </div>
              <div class="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <svg class="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <span class="text-sm">شحن مجاني</span>
              </div>
              <div class="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <svg class="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <span class="text-sm">ضمان شامل</span>
              </div>
            </div>
            
            <a href="${heroSection.ctaLink}" class="inline-flex items-center gap-3 px-8 py-4 text-lg font-semibold rounded-full hover:opacity-90 transition-all duration-200 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1" style="background-color: ${settings.accentColor};">
              ${heroSection.ctaText}
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            </a>
          </div>
        </section>
      `;

    default:
      return `
        <section class="relative py-20 px-6 text-white overflow-hidden" ${heroSection.backgroundImage ? 
          `style="background-image: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${heroSection.backgroundImage}'); background-size: cover; background-position: center;"` : 
          `style="background: linear-gradient(135deg, ${settings.primaryColor}, ${settings.secondaryColor});"`
        }>
          <div class="max-w-6xl mx-auto relative z-10 text-center">
            <h1 class="text-4xl md:text-6xl font-bold mb-6 leading-tight">${heroSection.title}</h1>
            <p class="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">${heroSection.subtitle}</p>
            <a href="${heroSection.ctaLink}" class="inline-flex items-center gap-3 px-8 py-4 text-lg font-semibold rounded-full hover:opacity-90 transition-all duration-200 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1" style="background-color: ${settings.accentColor};">
              ${heroSection.ctaText}
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            </a>
          </div>
        </section>
      `;
  }
};

export const generateAboutHTML = (templateId: string, settings: StoreSettings, currentTheme: PredefinedTheme): string => {
  const { aboutSection } = settings;

  if (!aboutSection.enabled) return '';

  return `
    <section class="py-20 px-6 bg-gradient-to-br from-gray-50 to-white">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold mb-4" style="color: ${settings.primaryColor};">${aboutSection.title}</h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">${aboutSection.subtitle}</p>
          <div class="w-24 h-1 mx-auto mt-6 rounded" style="background-color: ${settings.accentColor};"></div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <!-- Content -->
          <div>
            <p class="text-gray-700 leading-relaxed text-lg">${aboutSection.content}</p>
            
            <!-- Mission & Vision -->
            <div class="mt-8 space-y-6">
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style="background-color: ${settings.primaryColor}20;">
                  <svg class="w-6 h-6" style="color: ${settings.primaryColor};" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path></svg>
                </div>
                <div>
                  <h3 class="font-bold text-lg mb-2">رؤيتنا</h3>
                  <p class="text-gray-600">أن نكون الخيار الأول للعملاء في مجالنا من خلال تقديم منتجات وخدمات استثنائية.</p>
                </div>
              </div>
              
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style="background-color: ${settings.accentColor}20;">
                  <svg class="w-6 h-6" style="color: ${settings.accentColor};" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                </div>
                <div>
                  <h3 class="font-bold text-lg mb-2">مهمتنا</h3>
                  <p class="text-gray-600">نسعى لتحقيق رضا عملائنا من خلال الجودة العالية والخدمة المتميزة والابتكار المستمر.</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Image -->
          <div class="relative">
            ${aboutSection.image ? `
              <img src="${aboutSection.image}" alt="About Us" class="w-full h-96 object-cover rounded-2xl shadow-2xl" />
            ` : `
              <div class="w-full h-96 rounded-2xl shadow-2xl flex items-center justify-center" style="background: linear-gradient(135deg, ${settings.primaryColor}20, ${settings.secondaryColor}20);">
                <div class="text-center">
                  <div class="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4" style="background-color: ${settings.primaryColor};">
                    <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path></svg>
                  </div>
                  <h3 class="text-2xl font-bold text-gray-800 mb-2">فريق متميز</h3>
                  <p class="text-gray-600">نعمل بشغف لتحقيق أهدافكم</p>
                </div>
              </div>
            `}
          </div>
        </div>

        <!-- Stats Section -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          ${aboutSection.stats.map(stat => `
            <div class="text-center">
              <div class="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style="background-color: ${settings.primaryColor}20;">
                <svg class="w-8 h-8" style="color: ${settings.primaryColor};" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path></svg>
              </div>
              <div class="text-3xl font-bold mb-2" style="color: ${settings.primaryColor};">${stat.number}</div>
              <div class="text-gray-600 font-medium">${stat.label}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
};

export const generateFeaturesHTML = (templateId: string, settings: StoreSettings, currentTheme: PredefinedTheme): string => {
  const { whyChooseUs } = settings;

  if (!whyChooseUs.enabled) return '';

  return `
    <section class="relative py-24 overflow-hidden" style="background: linear-gradient(135deg, ${settings.primaryColor}05, ${settings.accentColor}05, ${settings.secondaryColor}05);">
      <!-- Background Pattern -->
      <div class="absolute inset-0">
        <div class="absolute inset-0 opacity-10" style="background-image: linear-gradient(45deg, transparent 25%, ${settings.primaryColor}05 25%, ${settings.primaryColor}05 50%, transparent 50%, transparent 75%, ${settings.primaryColor}05 75%); background-size: 60px 60px;"></div>
      </div>

      <!-- Floating Elements -->
      <div class="absolute top-20 left-20 w-32 h-32 rounded-full blur-xl animate-pulse opacity-20" style="background: linear-gradient(135deg, ${settings.primaryColor}40, ${settings.accentColor}40);"></div>
      <div class="absolute bottom-20 right-20 w-40 h-40 rounded-full blur-xl animate-pulse animation-delay-2000 opacity-20" style="background: linear-gradient(135deg, ${settings.secondaryColor}40, ${settings.primaryColor}40);"></div>

      <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <div class="text-center mb-20">
          <div class="inline-flex items-center gap-2 backdrop-blur-sm border rounded-full px-6 py-3 mb-8 shadow-lg" style="background-color: ${settings.primaryColor}10; border-color: ${settings.primaryColor}20;">
            <svg class="w-5 h-5" style="color: ${settings.primaryColor};" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
            <span class="font-semibold" style="color: ${settings.primaryColor};">مميزاتنا الخاصة</span>
          </div>
          
          <h2 class="text-5xl md:text-6xl font-black mb-6">
            <span class="bg-gradient-to-r bg-clip-text text-transparent" style="background-image: linear-gradient(135deg, ${settings.primaryColor}, ${settings.secondaryColor}, ${settings.accentColor});">
              ${whyChooseUs.title}
            </span>
          </h2>
          
          <p class="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed text-gray-600">${whyChooseUs.subtitle}</p>
          
          <div class="w-24 h-1 mx-auto mt-8 rounded-full" style="background: linear-gradient(135deg, ${settings.primaryColor}, ${settings.accentColor});"></div>
        </div>

        <!-- Features Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          ${whyChooseUs.items.map((item, index) => `
            <div class="group relative backdrop-blur-sm border rounded-3xl p-8 transition-all duration-500 hover:scale-105 hover:shadow-2xl bg-white/50" style="border-color: ${settings.primaryColor}10; animation-delay: ${index * 0.1}s;">
              <!-- Decorative Elements -->
              <div class="absolute -top-2 -right-2 w-6 h-6 rounded-full opacity-60 animate-pulse" style="background-color: ${settings.primaryColor};"></div>
              <div class="absolute -bottom-2 -left-2 w-4 h-4 rounded-full opacity-40 animate-pulse animation-delay-1000" style="background-color: ${settings.accentColor};"></div>
              
              <!-- Icon -->
              <div class="relative mb-8">
                <div class="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg" style="background: linear-gradient(135deg, ${settings.primaryColor}, ${settings.secondaryColor});">
                  <span class="text-3xl">🎯</span>
                </div>
                <div class="absolute inset-0 w-20 h-20 rounded-2xl mx-auto blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" style="background: linear-gradient(135deg, ${settings.primaryColor}, ${settings.secondaryColor});"></div>
              </div>
              
              <!-- Content -->
              <div class="text-center space-y-4">
                <h3 class="text-2xl font-bold group-hover:text-opacity-80 transition-colors duration-300 text-gray-800">${item.title}</h3>
                <p class="leading-relaxed text-lg text-gray-600">${item.description}</p>
              </div>

              <!-- Hover Effect -->
              <div class="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style="background: linear-gradient(135deg, ${settings.primaryColor}05, ${settings.accentColor}05);"></div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
};

export const generateFAQHTML = (templateId: string, settings: StoreSettings, currentTheme: PredefinedTheme): string => {
  const { faq } = settings;

  if (!faq.enabled) return '';

  return `
    <section class="py-20 px-6 bg-gradient-to-br from-gray-50 to-white">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-16">
          <div class="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style="background-color: ${settings.primaryColor}20;">
            <svg class="w-8 h-8" style="color: ${settings.primaryColor};" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
          
          <h2 class="text-4xl font-bold mb-4" style="color: ${settings.primaryColor};">${faq.title}</h2>
          <p class="text-xl text-gray-600">${faq.subtitle}</p>
          <div class="w-24 h-1 mx-auto mt-6 rounded" style="background-color: ${settings.accentColor};"></div>
        </div>

        <div class="space-y-4">
          ${faq.items.map((item, index) => `
            <div class="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <button onclick="toggleFAQ(${index})" class="w-full px-8 py-6 text-right flex justify-between items-center hover:bg-gray-50 transition-colors duration-200">
                <span class="font-semibold text-lg text-gray-800 flex-1">${item.question}</span>
                <svg class="w-6 h-6 transform transition-transform duration-300 flex-shrink-0 ml-4 faq-chevron" style="color: ${settings.primaryColor};" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              
              <div id="faq-${index}" class="overflow-hidden transition-all duration-300 max-h-0 opacity-0">
                <div class="px-8 pb-6">
                  <div class="w-full h-px mb-4" style="background-color: ${settings.primaryColor}20;"></div>
                  <p class="text-gray-600 leading-relaxed">${item.answer}</p>
                </div>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Contact CTA -->
        <div class="text-center mt-16">
          <div class="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h3 class="text-2xl font-bold mb-4" style="color: ${settings.primaryColor};">لم تجد إجابة لسؤالك؟</h3>
            <p class="text-gray-600 mb-6">فريق الدعم لدينا مستعد لمساعدتك في أي وقت</p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <button class="px-6 py-3 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity" style="background-color: ${settings.primaryColor};">تواصل معنا</button>
              <button class="px-6 py-3 rounded-lg font-semibold border-2 hover:bg-gray-50 transition-colors" style="border-color: ${settings.primaryColor}; color: ${settings.primaryColor};">مركز المساعدة</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
};