<template>
  <div class="bg-base-100 relative overflow-hidden">
    <!-- Background gradients animés améliorés -->
    <div class="fixed inset-0 -z-10 pointer-events-none">
      <div class="absolute left-1/2 top-20 -translate-x-1/2 w-[980px] h-[460px] bg-gradient-to-tr from-primary/40 via-primary/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute right-12 bottom-10 w-[420px] h-[220px] bg-gradient-to-bl from-secondary/40 via-secondary/20 to-transparent rounded-full blur-2xl animate-pulse delay-1000"></div>
      <div class="absolute left-20 top-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-gradient-to-r from-accent/30 to-transparent rounded-full blur-2xl animate-pulse delay-2000"></div>
      <!-- Grille de fond subtile -->
      <div class="absolute inset-0 opacity-[0.02]" style="background-image: linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px); background-size: 50px 50px;"></div>
    </div>

    <!-- Hero Section améliorée -->
    <section class="relative z-10 min-h-screen flex items-center justify-center pt-16 pb-12 md:pt-20 md:pb-20 px-4">
      <div class="max-w-7xl mx-auto w-full">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <!-- Left: Content -->
          <div class="text-left space-y-4 md:space-y-6 animate-fade-in">
            <!-- Badges alignés horizontalement -->
            <div class="flex items-center gap-2 md:gap-3 flex-wrap mb-4 md:mb-6">
              <!-- Trusted by badge avec animation améliorée -->
              <div class="inline-flex items-center gap-2 md:gap-3 pl-2 md:pl-3 pr-3 md:pr-4 py-1 md:py-1.5 rounded-full bg-base-200/80 backdrop-blur-md border border-base-300/50 hover:bg-base-200 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl group">
                <div class="flex -space-x-1.5 md:-space-x-2">
                  <div class="w-5 h-5 md:w-6 md:h-6 rounded-full bg-gradient-to-br from-primary to-primary-focus border-2 border-base-100 shadow-md group-hover:scale-110 transition-transform"></div>
                  <div class="w-5 h-5 md:w-6 md:h-6 rounded-full bg-gradient-to-br from-secondary to-secondary-focus border-2 border-base-100 shadow-md group-hover:scale-110 transition-transform delay-75"></div>
                  <div class="w-5 h-5 md:w-6 md:h-6 rounded-full bg-gradient-to-br from-accent to-accent-focus border-2 border-base-100 shadow-md group-hover:scale-110 transition-transform delay-150"></div>
                </div>
                <span class="text-xs font-medium text-base-content/80 hidden sm:inline">{{ t('home.trusted-by') }}</span>
              </div>

              <!-- Badge version avec animation -->
              <div class="badge badge-primary badge-sm md:badge-lg gap-1.5 md:gap-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 inline-flex items-center">
                <Icon name="heroicons:sparkles" class="w-3.5 h-3.5 md:w-4 md:h-4 animate-spin-slow" />
                <span class="text-xs md:text-sm">v1.0.0</span>
                <span class="ml-1 md:ml-2 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-success animate-pulse"></span>
              </div>
            </div>

            <!-- Main headline avec gradient animé amélioré -->
            <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
              {{ t('home.title') }}<br />
              <span class="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent animate-gradient bg-300% inline-block">
                {{ t('home.title-highlight') }}
              </span>
            </h1>

            <p class="text-base md:text-lg lg:text-xl text-base-content/70 max-w-xl leading-relaxed">
              {{ t('home.description') }}
            </p>

            <!-- CTA Buttons avec effets améliorés -->
            <div class="flex flex-col sm:flex-row items-stretch sm:items-start gap-3 md:gap-4 pt-3 md:pt-4">
              <NuxtLink 
                :to="getLocalizedPath(locale, '/docs/getting-started/introduction')" 
                class="inline-flex items-center justify-center gap-2 px-4 py-2.5 md:px-6 md:py-3 text-sm md:text-base font-bold text-center no-underline border-2 border-base-content rounded-[0.625rem] shadow-[3px_3px_0px_0px] md:shadow-[5px_5px_0px_0px] shadow-base-content bg-primary text-base-100 transition-all duration-300 cursor-pointer hover:bg-base-100 hover:text-primary hover:border-primary hover:shadow-[3px_3px_0px_0px] md:hover:shadow-[5px_5px_0px_0px] hover:shadow-primary active:bg-primary/80 active:text-base-100 active:shadow-none active:translate-x-[3px] active:translate-y-[3px] md:active:translate-x-[5px] md:active:translate-y-[5px] group"
              >
                {{ t('home.cta.start') }}
                <Icon name="heroicons:arrow-right" class="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
              </NuxtLink>
              <NuxtLink 
                :to="getLocalizedPath(locale, '/docs/getting-started/quick-start')" 
                class="inline-flex items-center justify-center gap-2 px-4 py-2.5 md:px-6 md:py-3 text-sm md:text-base font-bold text-center no-underline border-2 border-base-content rounded-[0.625rem] shadow-[3px_3px_0px_0px] md:shadow-[5px_5px_0px_0px] shadow-base-content bg-base-200/50 text-base-content transition-all duration-300 cursor-pointer hover:bg-base-100 hover:text-primary hover:border-primary hover:shadow-[3px_3px_0px_0px] md:hover:shadow-[5px_5px_0px_0px] hover:shadow-primary active:bg-base-200 active:text-base-content active:shadow-none active:translate-x-[3px] active:translate-y-[3px] md:active:translate-x-[5px] md:active:translate-y-[5px] group"
              >
                <Icon name="heroicons:book-open" class="w-4 h-4 md:w-5 md:h-5 group-hover:rotate-12 transition-transform" />
                {{ t('home.cta.docs') }}
              </NuxtLink>
            </div>

            <!-- Features badges avec hover effects améliorés -->
            <div class="flex flex-wrap gap-2 md:gap-3 pt-4 md:pt-6">
              <div class="group flex items-center gap-2 px-3 py-2 md:px-4 md:py-2.5 rounded-xl bg-base-200/60 backdrop-blur-sm border border-base-300/50 hover:bg-base-200 hover:border-primary/50 hover:shadow-lg transition-all duration-300 cursor-pointer">
                <div class="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 group-hover:scale-110 transition-all duration-300 flex-shrink-0">
                  <Icon name="heroicons:bolt" class="w-4 h-4 md:w-5 md:h-5 text-primary" />
                </div>
                <div class="min-w-0">
                  <div class="text-xs md:text-sm font-semibold group-hover:text-primary transition-colors">{{ t('home.features.zero-config-title') }}</div>
                  <div class="text-xs text-base-content/60 hidden sm:block">{{ t('home.features.zero-config-desc') }}</div>
                </div>
              </div>
              <div class="group flex items-center gap-2 px-3 py-2 md:px-4 md:py-2.5 rounded-xl bg-base-200/60 backdrop-blur-sm border border-base-300/50 hover:bg-base-200 hover:border-success/50 hover:shadow-lg transition-all duration-300 cursor-pointer">
                <div class="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-success/20 flex items-center justify-center group-hover:bg-success/30 group-hover:scale-110 transition-all duration-300 flex-shrink-0">
                  <Icon name="heroicons:check-circle" class="w-4 h-4 md:w-5 md:h-5 text-success" />
                </div>
                <div class="min-w-0">
                  <div class="text-xs md:text-sm font-semibold group-hover:text-success transition-colors">{{ t('home.features.production-ready') }}</div>
                  <div class="text-xs text-base-content/60 hidden sm:block">{{ t('home.features.production-ready-desc') }}</div>
                </div>
              </div>
            </div>

            <!-- Stats rapides -->
            <div class="flex gap-4 md:gap-6 pt-3 md:pt-4">
              <div class="text-center">
                <div class="text-xl md:text-2xl font-bold text-primary">67</div>
                <div class="text-xs text-base-content/60">{{ t('home.stats.tests') }}</div>
              </div>
              <div class="text-center">
                <div class="text-xl md:text-2xl font-bold text-secondary">3</div>
                <div class="text-xs text-base-content/60">{{ t('home.stats.frameworks') }}</div>
              </div>
              <div class="text-center">
                <div class="text-xl md:text-2xl font-bold text-accent">100%</div>
                <div class="text-xs text-base-content/60">{{ t('home.stats.opensource') }}</div>
              </div>
            </div>
          </div>

          <!-- Right: Visual avec stats flottantes amélioré -->
          <div class="relative mx-auto w-full max-w-lg animate-fade-in-delayed mt-8 lg:mt-0">
            <!-- Main card avec effet glassmorphism amélioré -->
            <div class="relative rounded-2xl md:rounded-3xl overflow-hidden border border-base-300/50 shadow-2xl bg-gradient-to-b from-base-200/80 to-base-100/50 backdrop-blur-xl hover:shadow-3xl transition-all duration-500 group">
              <!-- Code preview avec animation de typing -->
              <div class="relative aspect-video bg-gradient-to-br from-base-300 to-base-200 flex items-center justify-center overflow-hidden">
                <!-- Code lines animation améliorée -->
                <div class="absolute inset-0 p-4 md:p-6 space-y-2 opacity-30">
                  <div class="h-2 bg-primary/40 rounded w-3/4 animate-pulse"></div>
                  <div class="h-2 bg-secondary/40 rounded w-1/2 animate-pulse delay-200"></div>
                  <div class="h-2 bg-accent/40 rounded w-5/6 animate-pulse delay-500"></div>
                  <div class="h-2 bg-primary/40 rounded w-2/3 animate-pulse delay-700"></div>
                  <div class="h-2 bg-secondary/40 rounded w-4/5 animate-pulse delay-1000"></div>
                </div>
                <div class="text-center p-6 md:p-8 relative z-10">
                  <div class="w-16 h-16 md:w-20 md:h-20 mx-auto mb-3 md:mb-4 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <Icon name="heroicons:code-bracket" class="w-8 h-8 md:w-10 md:h-10 text-base-100" />
                  </div>
                  <p class="text-xs md:text-sm font-semibold text-base-content">{{ t('home.hero.code-example') }}</p>
                  <p class="text-xs text-base-content/60 mt-1">{{ t('home.hero.frameworks') }}</p>
                </div>
                <div class="absolute left-2 top-2 md:left-4 md:top-4 px-2 py-1 md:px-3 md:py-1.5 rounded-full bg-base-100/90 backdrop-blur-sm text-xs font-medium shadow-lg border border-base-300/50 flex items-center gap-1.5 md:gap-2">
                  <span class="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-success animate-ping"></span>
                  <span class="relative text-xs">{{ t('home.hero.live-preview') }}</span>
                </div>
                <!-- Badge frameworks -->
                <div class="absolute right-2 top-2 md:right-4 md:top-4 flex gap-1">
                  <div class="w-5 h-5 md:w-6 md:h-6 rounded bg-primary/20 border border-primary/30 backdrop-blur-sm"></div>
                  <div class="w-5 h-5 md:w-6 md:h-6 rounded bg-secondary/20 border border-secondary/30 backdrop-blur-sm"></div>
                  <div class="w-5 h-5 md:w-6 md:h-6 rounded bg-accent/20 border border-accent/30 backdrop-blur-sm"></div>
                </div>
              </div>
              
              <!-- Stats below avec mini thumbnails améliorés -->
              <div class="p-4 md:p-6 bg-base-200/50 backdrop-blur-sm border-t border-base-300/50">
                <div class="flex items-center justify-between gap-2">
                  <div class="flex gap-1.5 md:gap-2">
                    <div class="w-10 h-6 md:w-12 md:h-8 rounded-lg overflow-hidden border-2 border-base-300 bg-gradient-to-br from-primary/30 to-primary/10 shadow-md hover:scale-110 hover:border-primary transition-all cursor-pointer group/thumb">
                      <div class="w-full h-full bg-primary/20 group-hover/thumb:bg-primary/40 transition-colors"></div>
                    </div>
                    <div class="w-10 h-6 md:w-12 md:h-8 rounded-lg overflow-hidden border-2 border-base-300 bg-gradient-to-br from-secondary/30 to-secondary/10 shadow-md hover:scale-110 hover:border-secondary transition-all cursor-pointer group/thumb">
                      <div class="w-full h-full bg-secondary/20 group-hover/thumb:bg-secondary/40 transition-colors"></div>
                    </div>
                    <div class="w-10 h-6 md:w-12 md:h-8 rounded-lg overflow-hidden border-2 border-base-300 bg-gradient-to-br from-accent/30 to-accent/10 shadow-md hover:scale-110 hover:border-accent transition-all cursor-pointer group/thumb">
                      <div class="w-full h-full bg-accent/20 group-hover/thumb:bg-accent/40 transition-colors"></div>
                    </div>
                  </div>
                  <div class="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm font-medium">
                    <div class="relative flex h-3 w-3 md:h-4 md:w-4 items-center justify-center">
                      <span class="absolute inline-flex h-full w-full rounded-full bg-success opacity-75 animate-ping"></span>
                      <span class="relative inline-flex h-2 w-2 md:h-2.5 md:w-2.5 rounded-full bg-success shadow-lg"></span>
                    </div>
                    <span class="text-base-content/80 hidden sm:inline">{{ t('home.hero.tests-passed') }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Floating stats circles avec animations améliorées - Masqués sur mobile -->
            <div class="hidden md:block absolute -top-6 md:-top-8 -right-6 md:-right-8 w-20 h-20 md:w-28 md:h-28 rounded-2xl border-2 border-primary/40 bg-gradient-to-br from-primary/20 to-primary/10 backdrop-blur-md flex items-center justify-center shadow-xl hover:scale-110 hover:shadow-2xl transition-all animate-float cursor-pointer group">
              <div class="text-center">
                <div class="text-xl md:text-2xl font-bold text-primary group-hover:scale-110 transition-transform">3</div>
                <div class="text-xs text-base-content/70 font-medium">{{ t('home.hero.frameworks-label') }}</div>
              </div>
              <div class="absolute inset-0 rounded-2xl bg-primary/0 group-hover:bg-primary/10 transition-colors"></div>
            </div>

            <div class="hidden md:block absolute -bottom-4 md:-bottom-6 -left-4 md:-left-6 w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-secondary/40 bg-gradient-to-br from-secondary/20 to-secondary/10 backdrop-blur-md flex items-center justify-center shadow-xl hover:scale-110 hover:shadow-2xl transition-all animate-float-delayed cursor-pointer group">
              <div class="text-center">
                <div class="text-lg md:text-xl font-bold text-secondary group-hover:scale-110 transition-transform">67</div>
                <div class="text-xs text-base-content/70">{{ t('home.hero.tests-label') }}</div>
              </div>
              <div class="absolute inset-0 rounded-full bg-secondary/0 group-hover:bg-secondary/10 transition-colors"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Trusted by section avec animation marquee améliorée -->
    <section class="border-y border-base-300 bg-base-200/40 backdrop-blur-sm py-6 md:py-8 relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-transparent via-base-300/20 to-transparent"></div>
      <div class="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div class="w-full overflow-hidden">
          <div class="flex gap-8 md:gap-14 items-center justify-center animate-marquee whitespace-nowrap">
            <span v-for="(item, i) in [...trustedItems, ...trustedItems]" :key="i" 
                  class="mx-3 md:mx-6 text-xs md:text-sm lg:text-base font-semibold text-base-content/60 hover:text-primary transition-colors duration-300 cursor-default hover:scale-110 inline-block">
              {{ item }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section améliorée avec stagger animation -->
    <section id="features" class="py-12 md:py-16 lg:py-24 xl:py-32 relative z-10">
      <div class="max-w-7xl mx-auto px-4">
        <div class="text-center mb-12 md:mb-16 lg:mb-20">
          <div class="inline-block mb-4 animate-fade-in">
            <span class="text-sm font-semibold text-primary uppercase tracking-wider px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20">
              {{ t('home.features.title') }}
            </span>
          </div>
          <h2 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-normal font-extrabold mb-4 md:mb-6 bg-gradient-to-r from-base-content to-base-content/70 bg-clip-text text-transparent">
            {{ t('home.features.subtitle') }}
          </h2>
          <p class="max-w-2xl mx-auto text-base md:text-lg text-base-content/70 leading-relaxed px-4">
            {{ t('home.features.description') }}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <div 
            v-for="(feature, index) in features" 
            :key="index"
            class="group card bg-base-200/60 backdrop-blur-sm border border-base-300/50 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:border-primary/50 hover:-translate-y-1"
            :style="{ animationDelay: `${index * 100}ms` }"
          >
            <div class="card-body p-4 md:p-6">
              <div class="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 flex items-center justify-center mb-3 md:mb-4 shadow-lg" 
                   :class="feature.iconBg">
                <Icon :name="feature.icon" class="w-6 h-6 md:w-7 md:h-7" :class="feature.iconColor" />
              </div>
              <h3 class="card-title text-lg md:text-xl mb-2 group-hover:text-primary transition-colors">{{ feature.title }}</h3>
              <p class="text-base-content/70 text-xs md:text-sm leading-relaxed">{{ feature.description }}</p>
              <div class="card-actions justify-end mt-4">
                <button class="btn btn-ghost btn-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  {{ t('home.features.learn-more') }}
                  <Icon name="heroicons:arrow-right" class="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Code Example Section (nouvelle) -->
    <section class="py-12 md:py-16 lg:py-20 bg-base-200/30 border-y border-base-300 relative overflow-hidden">
      <div class="absolute inset-0 opacity-5">
        <div class="absolute top-0 left-0 w-full h-full" style="background-image: repeating-linear-gradient(0deg, transparent, transparent 2px, currentColor 2px, currentColor 4px);"></div>
      </div>
      <div class="max-w-6xl mx-auto px-4 md:px-6 relative z-10">
        <div class="text-center mb-8 md:mb-12">
          <h2 class="text-2xl sm:text-3xl md:text-4xl leading-normal font-extrabold mb-3 md:mb-4">
            {{ t('home.code.title') }} <span class="text-primary">{{ t('home.code.title-highlight') }}</span>
          </h2>
          <p class="text-base md:text-lg text-base-content/70 max-w-2xl mx-auto px-4">
            {{ t('home.code.subtitle') }}
          </p>
        </div>

        <!-- Installation Section -->
        <section id="install" class="py-10 md:py-16 lg:py-20">
          <div class="max-w-6xl mx-auto px-0 md:px-6">
            <div class="max-w-3xl">
              <p class="text-xs md:text-sm font-semibold text-primary uppercase tracking-wider">{{ t('home.install.title') }}</p>
              <h2 class="mt-3 md:mt-4 text-xl md:text-2xl lg:text-3xl leading-normal font-bold text-base-content">
                {{ t('home.install.subtitle') }}
              </h2>
              <p class="mt-3 md:mt-4 text-xs md:text-sm lg:text-base text-base-content/70">
                {{ t('home.install.description') }}
              </p>
            </div>
            
            <div class="mt-8 md:mt-12 grid gap-6 md:gap-8 lg:gap-12 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] items-start">
              <!-- Étapes d'installation -->
              <ol class="space-y-4 md:space-y-6 text-xs md:text-sm">
                <li class="flex items-start gap-2 md:gap-3">
                  <span class="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 rounded-full bg-primary text-primary-content flex items-center justify-center text-xs font-bold">
                    1
                  </span>
                  <div class="min-w-0 flex-1">
                    <p class="font-semibold text-base-content text-xs md:text-sm">{{ t('home.install.step1') }}</p>
                    <p class="mt-1.5 md:mt-2 text-xs text-base-content/60 font-mono bg-base-200 px-2 py-1 md:px-3 md:py-1.5 rounded border border-base-300 break-all">
                      composer require neocode/fne-client
                    </p>
                  </div>
                </li>
                <li class="flex items-start gap-2 md:gap-3">
                  <span class="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 rounded-full bg-primary text-primary-content flex items-center justify-center text-xs font-bold">
                    2
                  </span>
                  <div class="min-w-0 flex-1">
                    <p class="font-semibold text-base-content text-xs md:text-sm">{{ t('home.install.step2') }}</p>
                    <p class="mt-1.5 md:mt-2 text-xs text-base-content/60 font-mono bg-base-200 px-2 py-1 md:px-3 md:py-1.5 rounded border border-base-300 break-all">
                      FNE_API_KEY=votre-clé-api
                    </p>
                  </div>
                </li>
                <li class="flex items-start gap-2 md:gap-3">
                  <span class="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 rounded-full bg-primary text-primary-content flex items-center justify-center text-xs font-bold">
                    3
                  </span>
                  <div class="min-w-0 flex-1">
                    <p class="font-semibold text-base-content text-xs md:text-sm">{{ t('home.install.step3') }}</p>
                    <p class="mt-1.5 md:mt-2 text-xs text-base-content/60 font-mono bg-base-200 px-2 py-1 md:px-3 md:py-1.5 rounded border border-base-300 break-all">
                      use Neocode\FNE\FNEClient;
                    </p>
                  </div>
                </li>
              </ol>
              
              <!-- Bloc de code -->
              <div class="rounded-xl overflow-hidden border border-base-300 bg-base-200/50">
                <div class="flex items-center gap-1.5 border-b border-base-300 bg-base-200 px-4 py-3">
                  <span class="text-sm font-medium text-base-content">composer</span>
                </div>
                <div class="p-0">
                  <CodeHighlight 
                    :code="`composer require neocode/fne-client`"
                    language="bash"
                    :show-line-numbers="false"
                    class="rounded-b-xl"
                    style="border-radius: 0 0 0.75rem 0.75rem;"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Code tabs avec exemples -->
        <div class="card bg-base-100/80 backdrop-blur-sm border border-base-300 shadow-2xl overflow-hidden">
          <div class="card-body p-0">
            <div class="tabs tabs-lifted bg-base-200/50 overflow-x-auto">
              <template v-for="(tab, index) in codeTabs" :key="index">
                <input 
                  type="radio" 
                  name="code_tabs"
                  :id="`tab_${index}`"
                  class="tab"
                  :checked="index === 0"
                  @change="activeTab = index"
                />
                <label 
                  :for="`tab_${index}`"
                  class="tab-label flex items-center gap-1.5 md:gap-2 transition-all duration-300 hover:scale-105 cursor-pointer whitespace-nowrap"
                >
                  <img 
                    :src="tab.logo" 
                    :alt="tab.name + ' logo'"
                    class="w-4 h-4 md:w-5 md:h-5 object-contain transition-all duration-300 flex-shrink-0"
                  />
                  <span class="font-medium text-xs md:text-sm">{{ tab.name }}</span>
                </label>
              </template>
            </div>
            <!-- Contenu des tabs -->
            <div class="p-0 md:p-6 bg-base-300/30 overflow-x-auto">
              <div v-for="(tab, index) in codeTabs" :key="index">
                <div v-show="activeTab === index">
                  <CodeHighlight 
                    :code="tab.code"
                    language="php"
                    :show-line-numbers="true"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section améliorée avec animations -->
    <section class="py-12 md:py-16 lg:py-20 bg-gradient-to-b from-base-200/50 to-base-100/30 border-y border-base-300 relative overflow-hidden">
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-10 left-10 w-32 h-32 bg-primary rounded-full blur-3xl animate-pulse"></div>
        <div class="absolute bottom-10 right-10 w-40 h-40 bg-secondary rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      <div class="max-w-6xl mx-auto px-4 relative z-10">
        <div class="stats stats-vertical lg:stats-horizontal shadow-2xl w-full bg-base-100/80 backdrop-blur-md border border-base-300/50">
          <div class="stat hover:bg-base-200/50 transition-colors duration-300 rounded-lg cursor-pointer group">
            <div class="stat-figure text-primary animate-bounce group-hover:scale-110 transition-transform">
              <Icon name="heroicons:check-circle" class="w-8 h-8 md:w-10 md:h-10" />
            </div>
            <div class="stat-title text-xs md:text-sm text-base-content/70">{{ t('home.stats.tests-title') }}</div>
            <div class="stat-value text-primary text-3xl md:text-4xl group-hover:scale-110 transition-transform">67</div>
            <div class="stat-desc text-xs md:text-sm text-base-content/60">{{ t('home.stats.tests-desc') }}</div>
          </div>

          <div class="stat hover:bg-base-200/50 transition-colors duration-300 rounded-lg cursor-pointer group">
            <div class="stat-figure text-secondary animate-bounce delay-200 group-hover:scale-110 transition-transform">
              <Icon name="heroicons:puzzle-piece" class="w-8 h-8 md:w-10 md:h-10" />
            </div>
            <div class="stat-title text-xs md:text-sm text-base-content/70">{{ t('home.stats.frameworks-title') }}</div>
            <div class="stat-value text-secondary text-3xl md:text-4xl group-hover:scale-110 transition-transform">3</div>
            <div class="stat-desc text-xs md:text-sm text-base-content/60">{{ t('home.stats.frameworks-desc') }}</div>
          </div>

          <div class="stat hover:bg-base-200/50 transition-colors duration-300 rounded-lg cursor-pointer group">
            <div class="stat-figure text-accent animate-bounce delay-500 group-hover:scale-110 transition-transform">
              <Icon name="heroicons:code-bracket" class="w-8 h-8 md:w-10 md:h-10" />
            </div>
            <div class="stat-title text-xs md:text-sm text-base-content/70">{{ t('home.stats.opensource-title') }}</div>
            <div class="stat-value text-accent text-3xl md:text-4xl group-hover:scale-110 transition-transform">100%</div>
            <div class="stat-desc text-xs md:text-sm text-base-content/60">{{ t('home.stats.opensource-desc') }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Final Section améliorée -->
    <section class="py-12 md:py-16 lg:py-24 xl:pb-32 px-4 relative z-10">
      <div class="container mx-auto max-w-4xl">
        <div class="card bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20 border-2 border-primary/30 shadow-2xl overflow-hidden relative group">
          <!-- Pattern overlay animé -->
          <div class="absolute inset-0 opacity-10">
            <div class="absolute inset-0 animate-pattern" style="background-image: radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0); background-size: 40px 40px;"></div>
          </div>
          <!-- Glow effect -->
          <div class="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
          
          <div class="card-body text-center p-8 md:p-12 lg:p-16 relative z-10">
            <div class="inline-block mb-4 md:mb-6 animate-bounce">
              <Icon name="heroicons:rocket-launch" class="w-12 h-12 md:w-16 md:h-16 text-primary mx-auto" />
            </div>
            <h2 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-normal font-extrabold mb-4 md:mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent px-4">
              {{ t('home.final.title') }}
            </h2>
            <p class="text-base md:text-lg text-base-content/80 mb-6 md:mb-10 max-w-2xl mx-auto leading-relaxed px-4">
              {{ t('home.final.subtitle') }} {{ t('home.final.description') }}
            </p>
            <div class="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4">
                <NuxtLink 
                  :to="getLocalizedPath(locale, '/docs/getting-started/introduction')" 
                  class="inline-flex items-center justify-center gap-2 px-4 py-2.5 md:px-6 md:py-3 text-sm md:text-base font-bold text-center no-underline border-2 border-base-content rounded-[0.625rem] shadow-[3px_3px_0px_0px] md:shadow-[5px_5px_0px_0px] shadow-base-content bg-primary text-base-100 transition-all duration-300 cursor-pointer hover:bg-base-100 hover:text-primary hover:border-primary hover:shadow-[3px_3px_0px_0px] md:hover:shadow-[5px_5px_0px_0px] hover:shadow-primary active:bg-primary/80 active:text-base-100 active:shadow-none active:translate-x-[3px] active:translate-y-[3px] md:active:translate-x-[5px] md:active:translate-y-[5px] group"
                >
                  {{ t('home.cta.start') }}
                  <Icon name="heroicons:arrow-right" class="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                </NuxtLink>
                <NuxtLink 
                  :to="getLocalizedPath(locale, '/docs/examples')" 
                  class="inline-flex items-center justify-center gap-2 px-4 py-2.5 md:px-6 md:py-3 text-sm md:text-base font-bold text-center no-underline border-2 border-base-content rounded-[0.625rem] shadow-[3px_3px_0px_0px] md:shadow-[5px_5px_0px_0px] shadow-base-content bg-base-100/50 text-base-content transition-all duration-300 cursor-pointer hover:bg-base-100 hover:text-primary hover:border-primary hover:shadow-[3px_3px_0px_0px] md:hover:shadow-[5px_5px_0px_0px] hover:shadow-primary active:bg-base-200 active:text-base-content active:shadow-none active:translate-x-[3px] active:translate-y-[3px] md:active:translate-x-[5px] md:active:translate-y-[5px] group"
                >
                  <Icon name="heroicons:sparkles" class="w-4 h-4 md:w-5 md:h-5 group-hover:rotate-12 transition-transform" />
                  {{ t('home.final.cta.examples') }}
                </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// Utiliser le layout home (sans sidebar)
definePageMeta({
  layout: 'home'
})

// useAppI18n est auto-importé par Nuxt depuis app/composables/
const { t, locale, getLocalizedPath } = useAppI18n()
const trustedItems = computed(() => ['Laravel', 'Symfony', 'PHP Natif', 'E-commerce', 'ERP', 'SaaS'])

const activeTab = ref(0)

const codeTabs = [
  {
    name: 'Laravel',
    logo: '/assets/img/laravel.svg',
    code: `use Neocode\\FNE\\Facades\\FNE;
use Neocode\\FNE\\Enums\\InvoiceType;
use Neocode\\FNE\\Enums\\PaymentMethod;
use Neocode\\FNE\\Enums\\InvoiceTemplate;
use Neocode\\FNE\\Enums\\TaxType;

$result = FNE::invoice()->sign([
    'invoiceType' => InvoiceType::SALE->value,
    'paymentMethod' => PaymentMethod::MOBILE_MONEY->value,
    'template' => InvoiceTemplate::B2B->value,
    'isRne' => false,
    'clientNcc' => '123456789',
    'clientCompanyName' => 'Entreprise Client',
    'clientPhone' => '0123456789',
    'clientEmail' => 'client@example.com',
    'pointOfSale' => 'POS-001',
    'establishment' => 'EST-001',
    'items' => [
        [
            'description' => 'Service 1',
            'quantity' => 2,
            'amount' => 500.0,
            'taxes' => [TaxType::TVA->value],
        ],
    ],
]);

// Accéder aux résultats
echo $result->ncc;              // "9606123E"
echo $result->reference;         // "9606123E25000000019"
echo $result->token;             // URL de vérification QR code
echo $result->invoice->id;       // UUID de la facture`
  },
  {
    name: 'Symfony',
    logo: '/assets/img/symfony.svg',
    code: `use Neocode\\FNE\\FNEClient;
use Neocode\\FNE\\Enums\\InvoiceType;
use Neocode\\FNE\\Enums\\PaymentMethod;
use Neocode\\FNE\\Enums\\InvoiceTemplate;
use Neocode\\FNE\\Enums\\TaxType;
use Symfony\\Component\\HttpFoundation\\JsonResponse;

class InvoiceController
{
    public function __construct(
        private FNEClient $fneClient
    ) {}

    public function certify(): JsonResponse
    {
        $result = $this->fneClient->invoice()->sign([
            'invoiceType' => InvoiceType::SALE->value,
            'paymentMethod' => PaymentMethod::CASH->value,
            'template' => InvoiceTemplate::B2C->value,
            'isRne' => false,
            'clientCompanyName' => 'Client Particulier',
            'clientPhone' => '0123456789',
            'clientEmail' => 'client@example.com',
            'pointOfSale' => 'POS-001',
            'establishment' => 'EST-001',
            'items' => [
                [
                    'description' => 'Produit 1',
                    'quantity' => 1,
                    'amount' => 100.0,
                    'taxes' => [TaxType::TVA->value],
                ],
            ],
        ]);

        return new JsonResponse($result->toArray());
    }
}`
  },
  {
    name: 'PHP',
    logo: '/assets/img/php.svg',
    code: `require_once 'vendor/autoload.php';

use Neocode\\FNE\\FNEClient;
use Neocode\\FNE\\Config\\FNEConfig;
use Neocode\\FNE\\Http\\HttpClientFactory;
use Neocode\\FNE\\Enums\\InvoiceType;
use Neocode\\FNE\\Enums\\PaymentMethod;
use Neocode\\FNE\\Enums\\InvoiceTemplate;
use Neocode\\FNE\\Enums\\TaxType;

$config = new FNEConfig([
    'api_key' => 'your-api-key',
    'base_url' => 'https://fne-api-mock.test',
    'mode' => 'test',
]);

$httpClient = HttpClientFactory::create($config);
$fne = new FNEClient($httpClient, $config);

$result = $fne->invoice()->sign([
    'invoiceType' => InvoiceType::SALE->value,
    'paymentMethod' => PaymentMethod::MOBILE_MONEY->value,
    'template' => InvoiceTemplate::B2B->value,
    'isRne' => false,
    'clientNcc' => '123456789',
    'clientCompanyName' => 'Entreprise Client',
    'clientPhone' => '0123456789',
    'clientEmail' => 'client@example.com',
    'pointOfSale' => 'POS-001',
    'establishment' => 'EST-001',
    'items' => [
        [
            'description' => 'Service 1',
            'quantity' => 2,
            'amount' => 500.0,
            'taxes' => [TaxType::TVA->value],
        ],
    ],
]);`
  }
]

const features = computed(() => [
  {
    icon: 'heroicons:bolt',
    iconBg: 'bg-primary/20',
    iconColor: 'text-primary',
    title: t('home.features.zero-config-title'),
    description: t('home.features.zero-config-desc')
  },
  {
    icon: 'heroicons:arrow-path',
    iconBg: 'bg-secondary/20',
    iconColor: 'text-secondary',
    title: t('home.features.mapping-title'),
    description: t('home.features.mapping-desc')
  },
  {
    icon: 'heroicons:shield-check',
    iconBg: 'bg-accent/20',
    iconColor: 'text-accent',
    title: t('home.features.validation-title'),
    description: t('home.features.validation-desc')
  },
  {
    icon: 'heroicons:puzzle-piece',
    iconBg: 'bg-primary/20',
    iconColor: 'text-primary',
    title: t('home.features.integration-title'),
    description: t('home.features.integration-desc')
  },
  {
    icon: 'heroicons:rocket-launch',
    iconBg: 'bg-secondary/20',
    iconColor: 'text-secondary',
    title: t('home.features.performance-title'),
    description: t('home.features.performance-desc')
  },
  {
    icon: 'heroicons:globe-alt',
    iconBg: 'bg-accent/20',
    iconColor: 'text-accent',
    title: t('home.features.i18n-title'),
    description: t('home.features.i18n-desc')
  }
])

useHead({
  title: 'FNE Client - SDK PHP pour l\'API FNE',
  meta: [
    { name: 'description', content: 'SDK PHP framework-agnostic pour l\'intégration de l\'API FNE. Compatible avec Laravel, Symfony et PHP natif.' }
  ]
})
</script>

<style scoped>
@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes float-delayed {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-15px);
  }
}

@keyframes gradient {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in-delayed {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pattern {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 40px 40px;
  }
}

@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-marquee {
  animation: marquee 30s linear infinite;
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float-delayed 3s ease-in-out infinite;
  animation-delay: 1.5s;
}

.animate-gradient {
  animation: gradient 3s ease infinite;
  background-size: 200% 200%;
}

.animate-fade-in {
  animation: fade-in 0.8s ease-out;
}

.animate-fade-in-delayed {
  animation: fade-in-delayed 1s ease-out;
  animation-delay: 0.2s;
}

.animate-pattern {
  animation: pattern 20s linear infinite;
}

.animate-spin-slow {
  animation: spin-slow 3s linear infinite;
}

.delay-75 {
  animation-delay: 75ms;
}

.delay-150 {
  animation-delay: 150ms;
}

.delay-200 {
  animation-delay: 200ms;
}

.delay-500 {
  animation-delay: 500ms;
}

.delay-700 {
  animation-delay: 700ms;
}

.delay-1000 {
  animation-delay: 1000ms;
}

.delay-2000 {
  animation-delay: 2000ms;
}
</style>

