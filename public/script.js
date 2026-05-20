document.addEventListener('DOMContentLoaded', () => {
    // Collapsible Advanced Config
    const toggleConfigBtn = document.getElementById('toggleConfigBtn');
    const configPanel = document.getElementById('configPanel');
    const configChevron = document.getElementById('configChevron');

    toggleConfigBtn.addEventListener('click', () => {
        const isHidden = configPanel.classList.toggle('hidden');
        if (isHidden) {
            configChevron.classList.remove('rotate-180');
        } else {
            configChevron.classList.add('rotate-180');
        }
    });

    // Form elements
    const form = document.getElementById('scrapeForm');
    const urlInput = document.getElementById('mapsUrl');
    const maxReviewsInput = document.getElementById('maxReviews');
    const ratingFilterInput = document.getElementById('ratingFilter');
    const onlyWithTextInput = document.getElementById('onlyWithText');
    const minLengthInput = document.getElementById('minLength');
    const keywordsFilterInput = document.getElementById('keywordsFilter');
    
    // UI Feedback elements
    const submitBtn = document.getElementById('submitBtn');
    const btnText = document.getElementById('btnText');
    const btnIcon = document.getElementById('btnIcon');
    const loadingIcon = document.getElementById('loadingIcon');
    const statusArea = document.getElementById('statusArea');
    const statusMessage = document.getElementById('statusMessage');
    const errorMessage = document.getElementById('errorMessage');
    const errorText = document.getElementById('errorText');
    
    // Results & Widget elements
    const resultsSection = document.getElementById('resultsSection');
    const reviewsPreviewWrapper = document.getElementById('reviewsPreviewWrapper');
    const reviewCountBadge = document.getElementById('reviewCount');
    const scrollToEmbedBtn = document.getElementById('scrollToEmbedBtn');
    const embedSection = document.getElementById('embedSection');

    // Embed configurator states
    let widgetTheme = 'dark'; // 'dark' or 'light'
    let widgetBgType = 'solid'; // 'solid' or 'transparent'
    let widgetLayout = 'grid'; // 'grid' or 'slide'
    let widgetAutoPlay = 'off'; // 'off' or 'on'
    let widgetCols = '3';
    let widgetBorderRadius = '12px'; // '4px', '12px', '24px'
    let widgetFontSize = 'default'; // 'compact', 'default', 'large'
    let widgetHoverEffect = 'lift'; // 'none', 'lift', 'glow'
    let showGoogleLogo = true;
    let widgetTextClamp = 'clamp'; // 'clamp' or 'full'
    let widgetPhotosShow = true;
    let widgetAiSummary = 'show'; // 'show' or 'hide'
    let widgetSliderStyle = 'multi'; // 'multi', 'center', 'single'
    let widgetAccentColor = '#0ea5e9'; // Dynamic brand custom accent hex
    
    let activeTab = 'embed'; // 'embed', 'json', 'markdown'
    let currentReviewsData = null;
    let currentReviewsAiSummary = null;

    // Configurator Tabs selectors
    const btnConfigTabLayout = document.getElementById('btnConfigTabLayout');
    const btnConfigTabDesign = document.getElementById('btnConfigTabDesign');
    const btnConfigTabContent = document.getElementById('btnConfigTabContent');

    const configPanelLayout = document.getElementById('configPanelLayout');
    const configPanelDesign = document.getElementById('configPanelDesign');
    const configPanelContent = document.getElementById('configPanelContent');

    // Interactive Widget config selectors
    const themeLightBtn = document.getElementById('themeLightBtn');
    const themeDarkBtn = document.getElementById('themeDarkBtn');
    const bgSolidBtn = document.getElementById('bgSolidBtn');
    const bgTransBtn = document.getElementById('bgTransBtn');
    const layoutGridBtn = document.getElementById('layoutGridBtn');
    const layoutSlideBtn = document.getElementById('layoutSlideBtn');
    const autoPlayOffBtn = document.getElementById('autoPlayOffBtn');
    const autoPlayOnBtn = document.getElementById('autoPlayOnBtn');
    const embedColsSelect = document.getElementById('embedCols');
    const embedBorderRadiusSelect = document.getElementById('embedBorderRadius');
    const embedFontSizeSelect = document.getElementById('embedFontSize');
    const embedHoverEffectSelect = document.getElementById('embedHoverEffect');
    const logoShowBtn = document.getElementById('logoShowBtn');
    const logoHideBtn = document.getElementById('logoHideBtn');
    const textClampBtn = document.getElementById('textClampBtn');
    const textFullBtn = document.getElementById('textFullBtn');
    const photosShowBtn = document.getElementById('photosShowBtn');
    const photosHideBtn = document.getElementById('photosHideBtn');

    // Super New parameters selectors
    const aiSummaryShowBtn = document.getElementById('aiSummaryShowBtn');
    const aiSummaryHideBtn = document.getElementById('aiSummaryHideBtn');
    const embedSliderStyleSelect = document.getElementById('embedSliderStyle');
    const embedAccentHexInput = document.getElementById('embedAccentHex');

    const tabEmbedBtn = document.getElementById('tabEmbedBtn');
    const tabJsonBtn = document.getElementById('tabJsonBtn');
    const tabMarkdownBtn = document.getElementById('tabMarkdownBtn');

    const codeArea = document.getElementById('codeArea');
    const copyCodeBtn = document.getElementById('copyCodeBtn');

    // Lightbox modal variables
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxImg = document.getElementById('lightboxImg');
    const closeLightboxBtn = document.getElementById('closeLightboxBtn');
    const prevLightboxBtn = document.getElementById('prevLightboxBtn');
    const nextLightboxBtn = document.getElementById('nextLightboxBtn');
    
    let activeLightboxPhotoList = [];
    let activeLightboxPhotoIdx = 0;

    // AutoPlay preview timer
    let autoPlayIntervalTimer = null;

    // Progress updates simulator during fetch
    let progressTimer = null;
    const progressSteps = [
        "Iniciando Puppeteer com WebGL Evasion Spoofing...",
        "Simulando ambiente real NVIDIA GPU headless...",
        "Carregando página do Google Maps...",
        "Resolvendo nome do estabelecimento de forma oculta...",
        "Acessando feed principal de avaliações em modo Desktop...",
        "Localizando container de rolagem do feed...",
        "Efetuando rolagem infinita no feed para carregar depoimentos...",
        "Carregando mais depoimentos no DOM...",
        "Expandindo comentários longos e avaliações...",
        "Efetuando análise NLP local para Resumo de IA...",
        "Retornando dados processados com sucesso!"
    ];

    function startProgressSimulation() {
        let step = 0;
        statusMessage.textContent = progressSteps[step];
        
        progressTimer = setInterval(() => {
            if (step < progressSteps.length - 1) {
                step++;
                statusMessage.textContent = progressSteps[step];
            }
        }, 3800);
    }

    function stopProgressSimulation() {
        if (progressTimer) {
            clearInterval(progressTimer);
            progressTimer = null;
        }
    }

    // Scroll button action
    scrollToEmbedBtn.addEventListener('click', () => {
        embedSection.scrollIntoView({ behavior: 'smooth' });
    });

    // Recolor whole page UI controls to match brand/accent color dynamically!
    function updateBrandAccentStyles() {
        let dynamicAccentStyle = document.getElementById('dynamic-accent-styles');
        if (!dynamicAccentStyle) {
            dynamicAccentStyle = document.createElement('style');
            dynamicAccentStyle.id = 'dynamic-accent-styles';
            document.head.appendChild(dynamicAccentStyle);
        }
        dynamicAccentStyle.innerHTML = `
            .text-brand-500 { color: ${widgetAccentColor} !important; }
            .bg-brand-500 { background-color: ${widgetAccentColor} !important; }
            .border-brand-500 { border-color: ${widgetAccentColor} !important; }
            .focus\\:border-brand-500:focus { border-color: ${widgetAccentColor} !important; }
            
            /* Custom active toggles color */
            input:checked ~ div {
                background-color: ${widgetAccentColor} !important;
            }
            .review-thumb-img:hover {
                box-shadow: 0 4px 12px ${widgetAccentColor}44 !important;
            }
        `;
    }

    // Wiring Config Panels Tabs
    function setSettingsPanelTab(activePanelId, activeBtn) {
        // Hide all panels
        configPanelLayout.classList.add('hidden');
        configPanelDesign.classList.add('hidden');
        configPanelContent.classList.add('hidden');

        // Show selected panel
        document.getElementById(activePanelId).classList.remove('hidden');

        // Style all buttons as inactive
        [btnConfigTabLayout, btnConfigTabDesign, btnConfigTabContent].forEach(btn => {
            btn.className = "px-3.5 py-1.5 rounded-lg text-[10px] font-bold transition-all text-slate-400 hover:text-slate-200 flex items-center gap-1 focus:outline-none";
        });

        // Style active button
        activeBtn.className = "px-3.5 py-1.5 rounded-lg text-[10px] font-bold transition-all bg-brand-500 text-white shadow-md flex items-center gap-1 focus:outline-none";
    }

    btnConfigTabLayout.addEventListener('click', () => setSettingsPanelTab('configPanelLayout', btnConfigTabLayout));
    btnConfigTabDesign.addEventListener('click', () => setSettingsPanelTab('configPanelDesign', btnConfigTabDesign));
    btnConfigTabContent.addEventListener('click', () => setSettingsPanelTab('configPanelContent', btnConfigTabContent));

    // Wiring visual color preset bubbles
    const colorBubbles = document.querySelectorAll('.color-bubble');
    colorBubbles.forEach(bubble => {
        bubble.addEventListener('click', () => {
            const selectedColor = bubble.getAttribute('data-color');
            
            // Clean active marks
            colorBubbles.forEach(b => {
                const check = b.querySelector('i');
                if (check) check.classList.add('hidden');
                b.classList.remove('scale-110', 'ring-2', 'ring-white/40');
            });

            if (selectedColor !== 'custom') {
                widgetAccentColor = selectedColor;
                embedAccentHexInput.value = selectedColor;
                
                // Show current check
                const check = bubble.querySelector('i');
                if (check) check.classList.remove('hidden');
                bubble.classList.add('scale-110', 'ring-2', 'ring-white/40');

                updateBrandAccentStyles();
                renderReviewsGrid();
                updateEmbedCode();
            } else {
                // Custom color input focus
                embedAccentHexInput.focus();
                bubble.classList.add('scale-110', 'ring-2', 'ring-white/40');
            }
        });
    });

    // Custom Color HEX input typed event
    embedAccentHexInput.addEventListener('input', (e) => {
        const val = e.target.value.trim();
        // Regex validation for hex
        if (/^#[0-9A-F]{6}$/i.test(val)) {
            widgetAccentColor = val;
            
            // Remove checkmarks from presets and select custom bubble
            colorBubbles.forEach(b => {
                const check = b.querySelector('i');
                if (check) check.classList.add('hidden');
                b.classList.remove('scale-110', 'ring-2', 'ring-white/40');
            });
            document.getElementById('colorCustomBubble').classList.add('scale-110', 'ring-2', 'ring-white/40');

            updateBrandAccentStyles();
            renderReviewsGrid();
            updateEmbedCode();
        }
    });

    // Form submit
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const url = urlInput.value.trim();
        if (!url) return;

        // Reset state
        setLoadingState(true);
        errorMessage.classList.add('hidden');
        resultsSection.classList.add('hidden');
        reviewsPreviewWrapper.innerHTML = '';
        currentReviewsData = null;
        currentReviewsAiSummary = null;
        startProgressSimulation();

        const maxReviews = parseInt(maxReviewsInput.value, 10);
        const ratingFilter = ratingFilterInput.value;
        const onlyWithText = onlyWithTextInput.checked;
        const minLength = parseInt(minLengthInput.value, 10) || 0;
        const keywords = keywordsFilterInput.value;

        try {
            const response = await fetch('/api/scrape', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    url,
                    maxReviews,
                    ratingFilter,
                    onlyWithText,
                    minLength,
                    keywords
                })
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.error || 'Erro inesperado ao raspar os dados.');
            }

            if (data.data && data.data.length > 0) {
                currentReviewsData = data.data;
                currentReviewsAiSummary = data.aiSummary;
                
                renderReviewsGrid();
                reviewCountBadge.textContent = data.data.length;
                resultsSection.classList.remove('hidden');
                updateEmbedCode();
            } else {
                showError('Nenhum depoimento foi encontrado com os filtros configurados.');
            }

        } catch (error) {
            showError(error.message);
        } finally {
            setLoadingState(false);
            stopProgressSimulation();
        }
    });

    function setLoadingState(isLoading) {
        urlInput.disabled = isLoading;
        submitBtn.disabled = isLoading;
        maxReviewsInput.disabled = isLoading;
        ratingFilterInput.disabled = isLoading;
        onlyWithTextInput.disabled = isLoading;
        minLengthInput.disabled = isLoading;
        keywordsFilterInput.disabled = isLoading;
        
        if (isLoading) {
            btnText.textContent = 'Processando...';
            btnIcon.classList.add('hidden');
            loadingIcon.classList.remove('hidden');
            statusArea.classList.remove('hidden');
            submitBtn.classList.add('opacity-80', 'cursor-not-allowed');
            submitBtn.classList.remove('hover:-translate-y-0.5');
        } else {
            btnText.textContent = 'Extrair Depoimentos';
            btnIcon.classList.remove('hidden');
            loadingIcon.classList.add('hidden');
            statusArea.classList.add('hidden');
            submitBtn.classList.remove('opacity-80', 'cursor-not-allowed');
            submitBtn.classList.add('hover:-translate-y-0.5');
        }
    }

    function showError(msg) {
        errorText.textContent = msg;
        errorMessage.classList.remove('hidden');
    }

    let previewAutoPlayInterval = null;

    function buildWidgetHTMLAndCSS() {
        const isDark = widgetTheme === 'dark';
        const bgClass = widgetBgType === 'transparent' ? 'transparent' : (isDark ? '#111827' : '#ffffff');
        const borderClass = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)';
        const textMainClass = isDark ? '#f8fafc' : '#0f172a';
        const textSecClass = isDark ? '#94a3b8' : '#475569';
        const cardBgClass = isDark ? 'rgba(31, 41, 55, 0.45)' : '#f8fafc';
        const quoteIconColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)';
        
        const isSlide = widgetLayout === 'slide';
        const isClamp = widgetTextClamp === 'clamp';
        
        // AI Summary Embed Card
        let aiSummaryCardHTML = '';
        if (widgetAiSummary === 'show' && currentReviewsAiSummary) {
            let highlightsMd = '';
            currentReviewsAiSummary.highlights.forEach(hl => {
                highlightsMd += `
        <div class="ai-highlight-item">
            <svg class="check-icon" viewBox="0 0 20 20" fill="currentColor" style="width:13px;height:13px;color:#fff;"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l3-3z" clip-rule="evenodd" /></svg>
            <span>${hl}</span>
        </div>`;
            });

            const slideCardClass = isSlide ? 'ai-summary-card min-w-slide snap-center-item' : 'ai-summary-card';
            const cleanSummaryEmbed = currentReviewsAiSummary.summary.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

            aiSummaryCardHTML = `
    <!-- AI Summary Card -->
    <div class="${slideCardClass}">
        <div class="ai-card-content">
            <div class="ai-header">
                <div class="ai-title-wrap">
                    <div class="ai-spark-icon">✨</div>
                    <div>
                        <h3 class="ai-title">Resumo de IA</h3>
                        <span class="ai-subtitle">Análise de Sentimentos</span>
                    </div>
                </div>
            </div>
            
            <p class="ai-paragraph">${cleanSummaryEmbed}</p>
            
            <div class="ai-highlights-section">
                <h4 class="ai-section-title">Destaques Principais:</h4>
                <div class="ai-checklist">${highlightsMd}</div>
            </div>
        </div>
        
        <div class="ai-footer">
            <span class="ai-footer-text">Baseado em ${currentReviewsAiSummary.totalAnalyzed} depoimentos</span>
            <span class="ai-footer-score">★ ${currentReviewsAiSummary.averageRating}</span>
        </div>
    </div>`;
        }

        // Build cards list
        let cardsHTML = '';
        currentReviewsData.forEach((review, index) => {
            let stars = '';
            for (let i = 1; i <= 5; i++) {
                if (i <= review.rating) {
                    stars += '★';
                } else {
                    stars += '☆';
                }
            }

            const initials = review.name.substring(0, 2).toUpperCase();
            const avatar = review.photo 
                ? `<img src="${review.photo}" alt="${review.name}" class="avatar-img" />`
                : `<div class="avatar-fallback">${initials}</div>`;

            const watermark = showGoogleLogo 
                ? `<div class="google-watermark"><svg viewBox="0 0 24 24" width="14" height="14" fill="${widgetAccentColor}"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg></div>`
                : '';

            // Attached photos inside embed card
            let photosEmbed = '';
            if (widgetPhotosShow && review.reviewPhotos && review.reviewPhotos.length > 0) {
                photosEmbed += `<div class="embed-photos-strip">`;
                review.reviewPhotos.forEach((photo, pIdx) => {
                    photosEmbed += `<img src="${photo}" alt="Attached Pic" class="embed-thumb-photo" data-idx="${pIdx}" />`;
                });
                photosEmbed += `</div>`;
            }

            // Fonts size mapping for embed
            let fontSz = '12.5px';
            let nameSz = '13px';
            if (widgetFontSize === 'compact') {
                fontSz = '11.5px';
                nameSz = '11.5px';
            } else if (widgetFontSize === 'large') {
                fontSz = '14px';
                nameSz = '14.5px';
            }

            // Comment text expansion in embed card
            let commentTextEmbed = '';
            const reviewTextClean = review.text || 'Avaliação sem comentário.';
            if (isClamp && reviewTextClean.length > 180) {
                commentTextEmbed = `
                    <p class="testimonial-text line-clamp-4" style="font-size: ${fontSz};">${reviewTextClean}</p>
                    <button type="button" class="expander-btn">Ler mais</button>
                `;
            } else {
                commentTextEmbed = `<p class="testimonial-text" style="font-size: ${fontSz};">${reviewTextClean}</p>`;
            }

            // Add slider classes if active
            let slideCardClass = 'testimonial-card';
            if (isSlide) {
                slideCardClass = 'testimonial-card min-w-slide snap-center-item';
            }

            cardsHTML += `
    <!-- Card ${index + 1} -->
    <div class="${slideCardClass}" data-index="${index}">
        <div>
            ${watermark}
            <div class="testimonial-header">
                ${avatar}
                <div class="author-meta">
                    <span class="author-name" style="font-size: ${nameSz};">${review.name}</span>
                    <span class="testimonial-date">${review.date || 'Recente'}</span>
                </div>
            </div>
            <div class="star-rating">${stars}</div>
            <div class="testimonial-body">
                <span class="quote-mark">“</span>
                <div class="comment-wrapper">${commentTextEmbed}</div>
            </div>
        </div>
        ${photosEmbed}
    </div>`;
        });

        // Navigation markup for slider widget
        const navigationHTML = isSlide 
            ? `<div class="slider-controls">
        <button type="button" id="widget-prev-btn" class="nav-control-btn">&#10094;</button>
        <button type="button" id="widget-next-btn" class="nav-control-btn">&#10095;</button>
    </div>`
            : '';

        // Grid vs Flex snap CSS variables
        const layoutContainerClass = isSlide ? 'testimonials-slider-viewport' : 'testimonials-grid';

        // Lightbox Modal Markup inside the embed code
        const embedLightboxHTML = widgetPhotosShow 
            ? `<!-- Embed Lightbox Modal -->
<div id="embed-lightbox-modal" class="embed-lightbox hidden">
<button type="button" id="embed-lightbox-close" class="lightbox-close-btn">&times;</button>
<button type="button" id="embed-lightbox-prev" class="lightbox-nav-btn prev-btn">&#10094;</button>
<button type="button" id="embed-lightbox-next" class="lightbox-nav-btn next-btn">&#10095;</button>
<div class="lightbox-content-box">
    <img id="embed-lightbox-img" src="" alt="Zoom Photo" />
</div>
</div>`
            : '';

        const borderRadiusVal = widgetBorderRadius;

        // Hover effect CSS styles mapping
        let hoverStyle = '';
        if (widgetHoverEffect === 'lift') {
            hoverStyle = `
.testimonial-card:hover {
transform: translateY(-3px);
box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}`;
        } else if (widgetHoverEffect === 'glow') {
            hoverStyle = `
.testimonial-card:hover {
transform: translateY(-3px);
border-color: ${widgetAccentColor};
box-shadow: 0 0 15px ${widgetAccentColor}44;
}`;
        }

        const sliderStyleCss = widgetSliderStyle === 'single' ? 'min-width: 100%; width: 100%;' : 'min-width: 330px; width: 330px;';

        const styleBlock = `
.reviews-widget-container {
font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
background-color: ${bgClass};
border-radius: 20px;
padding: 24px;
box-sizing: border-box;
position: relative;
overflow: hidden;
width: 100%;
margin-bottom: 24px;
}

/* Layout Grid */
.testimonials-grid {
display: grid;
grid-template-columns: repeat(1, minmax(0, 1fr));
gap: 20px;
width: 100%;
}

@media (min-width: 640px) {
.testimonials-grid {
    grid-template-columns: repeat(${widgetCols === '1' ? '1' : widgetCols === '2' ? '2' : '2'}, minmax(0, 1fr));
}
}

@media (min-width: 1024px) {
.testimonials-grid {
    grid-template-columns: repeat(${widgetCols}, minmax(0, 1fr));
}
}

/* Layout Slider (Carrossel) */
.testimonials-slider-viewport {
display: flex;
gap: 20px;
overflow-x: auto;
scroll-behavior: smooth;
-webkit-overflow-scrolling: touch;
scroll-snap-type: x mandatory;
padding: 10px 0;
}

.testimonials-slider-viewport::-webkit-scrollbar {
height: 4px;
}
.testimonials-slider-viewport::-webkit-scrollbar-track {
background: transparent;
}
.testimonials-slider-viewport::-webkit-scrollbar-thumb {
background: ${widgetAccentColor}22;
border-radius: 10px;
}

.min-w-slide {
min-width: 280px;
width: 280px;
flex-shrink: 0;
}
@media (min-width: 640px) {
.min-w-slide {
    ${sliderStyleCss}
}
}

.snap-center-item {
scroll-snap-align: center;
}

/* AI Summary Card Styling */
.ai-summary-card {
background: linear-gradient(135deg, ${widgetAccentColor}dd 0%, #1e1b4bdf 100%);
color: #ffffff;
padding: 20px;
border: 1px solid rgba(255, 255, 255, 0.1);
box-shadow: 0 10px 25px -5px ${widgetAccentColor}33;
border-radius: ${borderRadiusVal};
box-sizing: border-box;
display: flex;
flex-direction: column;
justify-content: space-between;
transition: all 0.25s ease;
}

.ai-card-content {
display: flex;
flex-direction: column;
gap: 12px;
}

.ai-header {
display: flex;
align-items: center;
justify-content: space-between;
}

.ai-title-wrap {
display: flex;
align-items: center;
gap: 8px;
}

.ai-spark-icon {
width: 28px;
height: 28px;
border-radius: 6px;
background: rgba(255, 255, 255, 0.15);
display: flex;
align-items: center;
justify-content: center;
font-size: 14px;
}

.ai-title {
font-weight: 700;
font-size: 11px;
margin: 0;
text-transform: uppercase;
letter-spacing: 1px;
}

.ai-subtitle {
font-size: 9px;
color: rgba(255, 255, 255, 0.7);
display: block;
}

.ai-paragraph {
font-size: 12px;
line-height: 1.6;
margin: 0;
font-weight: 500;
}

.ai-highlights-section {
display: flex;
flex-direction: column;
gap: 6px;
border-top: 1px solid rgba(255, 255, 255, 0.1);
padding-top: 10px;
}

.ai-section-title {
font-size: 9px;
font-weight: 700;
margin: 0 0 2px 0;
text-transform: uppercase;
color: rgba(255, 255, 255, 0.8);
letter-spacing: 0.5px;
}

.ai-checklist {
display: flex;
flex-direction: column;
gap: 4px;
}

.ai-highlight-item {
display: flex;
align-items: center;
gap: 6px;
font-size: 11px;
font-weight: 600;
}

.ai-footer {
display: flex;
align-items: center;
justify-content: space-between;
border-top: 1px solid rgba(255, 255, 255, 0.1);
padding-top: 12px;
margin-top: 12px;
}

.ai-footer-text {
font-size: 9.5px;
color: rgba(255, 255, 255, 0.6);
}

.ai-footer-score {
font-size: 12px;
font-weight: 700;
background: #fbbf24;
color: #0f172a;
padding: 2px 8px;
border-radius: 6px;
}

/* Slide arrows styling */
.slider-controls {
display: flex;
justify-content: flex-end;
gap: 8px;
margin-bottom: 12px;
}

.nav-control-btn {
width: 36px;
height: 36px;
border-radius: 10px;
background: ${cardBgClass};
border: 1px solid ${borderClass};
color: ${textMainClass};
cursor: pointer;
font-size: 14px;
display: flex;
align-items: center;
justify-content: center;
transition: all 0.2s ease;
}

.nav-control-btn:hover {
background-color: ${widgetAccentColor};
color: #ffffff;
border-color: ${widgetAccentColor};
}

/* Cards Common Styling */
.testimonial-card {
background: ${cardBgClass};
backdrop-filter: blur(12px);
-webkit-backdrop-filter: blur(12px);
border: 1px solid ${borderClass};
border-radius: ${borderRadiusVal};
padding: 20px;
position: relative;
box-sizing: border-box;
display: flex;
flex-direction: column;
justify-content: space-between;
transition: all 0.25s ease;
}

${hoverStyle}

.google-watermark {
position: absolute;
top: 16px;
right: 16px;
width: 24px;
height: 24px;
background-color: ${bgClass === 'transparent' ? (isDark ? '#111827' : '#ffffff') : bgClass};
border: 1px solid ${borderClass};
border-radius: 50%;
display: flex;
align-items: center;
justify-content: center;
box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
}

.testimonial-header {
display: flex;
align-items: center;
gap: 12px;
margin-bottom: 12px;
}

.avatar-img {
width: 40px;
height: 40px;
border-radius: 50%;
object-fit: cover;
border: 2px solid ${bgClass === 'transparent' ? (isDark ? '#111827' : '#ffffff') : bgClass};
box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.avatar-fallback {
width: 40px;
height: 40px;
border-radius: 50%;
background-color: ${widgetAccentColor};
color: #ffffff;
display: flex;
align-items: center;
justify-content: center;
font-weight: 700;
font-size: 13px;
border: 2px solid ${bgClass === 'transparent' ? (isDark ? '#111827' : '#ffffff') : bgClass};
}

.author-meta {
display: flex;
flex-direction: column;
}

.author-name {
font-weight: 700;
color: ${textMainClass};
line-height: 1.2;
}

.testimonial-date {
font-size: 10px;
color: ${textSecClass};
margin-top: 2px;
}

.star-rating {
color: ${widgetAccentColor};
font-size: 11px;
letter-spacing: 1.5px;
margin-bottom: 10px;
}

.testimonial-body {
position: relative;
}

.quote-mark {
position: absolute;
top: -12px;
left: -8px;
font-size: 32px;
color: ${quoteIconColor};
font-family: Georgia, serif;
user-select: none;
}

.testimonial-text {
line-height: 1.6;
color: ${textSecClass};
margin: 0;
font-weight: 400;
position: relative;
z-index: 5;
}

.expander-btn {
background: none;
border: none;
padding: 0;
color: ${widgetAccentColor};
font-size: 10px;
font-weight: 700;
cursor: pointer;
margin-top: 6px;
display: block;
}
.expander-btn:hover {
text-decoration: underline;
}

/* Attached Photo Thumbnails */
.embed-photos-strip {
display: flex;
flex-wrap: wrap;
gap: 8px;
margin-top: 14px;
}

.embed-thumb-photo {
width: 50px;
height: 50px;
border-radius: 10px;
object-fit: cover;
border: 1px solid ${borderClass};
cursor: zoom-in;
transition: transform 0.2s ease;
}
.embed-thumb-photo:hover {
transform: scale(1.04);
}

/* Embed Lightbox Modal Styling */
.embed-lightbox {
position: fixed;
top: 0;
left: 0;
width: 100vw;
height: 100vh;
background: rgba(0,0,0,0.92);
z-index: 99999;
display: flex;
align-items: center;
justify-content: center;
box-sizing: border-box;
padding: 20px;
}

.embed-lightbox.hidden {
display: none;
}

.lightbox-close-btn {
position: absolute;
top: 20px;
right: 20px;
background: none;
border: none;
color: #ffffff;
font-size: 32px;
cursor: pointer;
}

.lightbox-nav-btn {
position: absolute;
top: 50%;
transform: translateY(-50%);
background: rgba(255,255,255,0.06);
border: 1px solid rgba(255,255,255,0.1);
color: #ffffff;
font-size: 24px;
padding: 12px 18px;
border-radius: 50%;
cursor: pointer;
transition: all 0.2s ease;
}
.lightbox-nav-btn:hover {
background: rgba(255,255,255,0.2);
}
.prev-btn { left: 20px; }
.next-btn { right: 20px; }

.lightbox-content-box {
max-width: 90%;
max-height: 80%;
}
.lightbox-content-box img {
max-width: 100%;
max-height: 80vh;
border-radius: 12px;
object-fit: contain;
box-shadow: 0 10px 30px rgba(0,0,0,0.5);
}
`;

        const html = `
<div id="google-reviews-widget" class="reviews-widget-container">
    ${navigationHTML}
    <div class="${layoutContainerClass}">${aiSummaryCardHTML}${cardsHTML}
    </div>
    
    ${embedLightboxHTML}
</div>
`;

        return { html, css: styleBlock };
    }

    function renderReviewsGrid() {
        if (!currentReviewsData) return;

        // Clear existing autoplay
        if (previewAutoPlayInterval) {
            clearInterval(previewAutoPlayInterval);
            previewAutoPlayInterval = null;
        }

        const { html, css } = buildWidgetHTMLAndCSS();

        reviewsPreviewWrapper.innerHTML = `
            <style>
                ${css}
            </style>
            ${html}
        `;

        const widget = reviewsPreviewWrapper.querySelector('#google-reviews-widget');
        if (!widget) return;

        const isCenterMode = widgetSliderStyle === 'center';
        const accentColor = widgetAccentColor;

        // Slider Controls
        const prevBtn = widget.querySelector('#widget-prev-btn');
        const nextBtn = widget.querySelector('#widget-next-btn');
        const viewport = widget.querySelector('.testimonials-slider-viewport');
        
        if (prevBtn && nextBtn && viewport) {
            prevBtn.addEventListener('click', () => {
                viewport.scrollBy({ left: -320, behavior: 'smooth' });
            });
            nextBtn.addEventListener('click', () => {
                viewport.scrollBy({ left: 320, behavior: 'smooth' });
            });
        }

        // Coverflow scaling
        if (viewport && isCenterMode) {
            const updateCenter = () => {
                const vCenter = viewport.scrollLeft + (viewport.clientWidth / 2);
                const cards = viewport.querySelectorAll('.testimonial-card, .ai-summary-card');
                
                cards.forEach(card => {
                    const cCenter = card.offsetLeft + (card.clientWidth / 2);
                    const dist = Math.abs(vCenter - cCenter);
                    if (dist < 170) {
                        card.style.transform = 'scale(1.03)';
                        card.style.opacity = '1';
                        if (card.classList.contains('testimonial-card')) {
                            card.style.borderColor = accentColor;
                        }
                    } else {
                        card.style.transform = 'scale(0.94)';
                        card.style.opacity = '0.65';
                        card.style.borderColor = 'rgba(255,255,255,0.08)';
                    }
                });
            };
            viewport.addEventListener('scroll', updateCenter);
            setTimeout(updateCenter, 150);
        }

        // Preview Autoplay
        const autoPlayOn = widgetAutoPlay === 'on';
        if (autoPlayOn && viewport) {
            previewAutoPlayInterval = setInterval(() => {
                const maxScroll = viewport.scrollWidth - viewport.clientWidth;
                if (viewport.scrollLeft >= maxScroll - 5) {
                    viewport.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    viewport.scrollBy({ left: 320, behavior: 'smooth' });
                }
            }, 4000);

            const stopPlay = () => clearInterval(previewAutoPlayInterval);
            viewport.addEventListener('mouseenter', stopPlay);
            viewport.addEventListener('touchstart', stopPlay);
        }

        // Read More expanders
        const expanders = widget.querySelectorAll('.expander-btn');
        expanders.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const txt = e.target.previousElementSibling;
                const isClamped = txt.classList.toggle('line-clamp-4');
                e.target.textContent = isClamped ? 'Ler mais' : 'Ler menos';
            });
        });

        // Photos Lightbox Zoom
        const lightboxModal = widget.querySelector('#embed-lightbox-modal');
        const lightboxImg = widget.querySelector('#embed-lightbox-img');
        const closeBtn = widget.querySelector('#embed-lightbox-close');
        const prevPhotoBtn = widget.querySelector('#embed-lightbox-prev');
        const nextPhotoBtn = widget.querySelector('#embed-lightbox-next');

        if (lightboxModal && lightboxImg) {
            let activePhotosList = [];
            let activePhotoIdx = 0;

            const thumbs = widget.querySelectorAll('.embed-thumb-photo');
            thumbs.forEach(thumb => {
                thumb.addEventListener('click', (e) => {
                    const card = e.target.closest('.testimonial-card');
                    const idx = parseInt(card.getAttribute('data-index'), 10);
                    const pIdx = parseInt(e.target.getAttribute('data-idx'), 10);
                    
                    const review = currentReviewsData[idx];
                    if (review && review.reviewPhotos) {
                        activePhotosList = review.reviewPhotos;
                        activePhotoIdx = pIdx;
                        
                        lightboxImg.src = activePhotosList[activePhotoIdx];
                        lightboxModal.classList.remove('hidden');
                        updateLightboxNavs();
                    }
                });
            });

            const closeLbox = () => {
                lightboxModal.classList.add('hidden');
                lightboxImg.src = '';
            };

            if (closeBtn) closeBtn.addEventListener('click', closeLbox);
            
            lightboxModal.addEventListener('click', (e) => {
                if (e.target === lightboxModal) closeLbox();
            });

            const updateLightboxNavs = () => {
                if (!prevPhotoBtn || !nextPhotoBtn) return;
                if (activePhotosList.length > 1) {
                    prevPhotoBtn.style.display = 'block';
                    nextPhotoBtn.style.display = 'block';
                } else {
                    prevPhotoBtn.style.display = 'none';
                    nextPhotoBtn.style.display = 'none';
                }
            };

            if (prevPhotoBtn) {
                prevPhotoBtn.addEventListener('click', () => {
                    activePhotoIdx = (activePhotoIdx - 1 + activePhotosList.length) % activePhotosList.length;
                    lightboxImg.src = activePhotosList[activePhotoIdx];
                });
            }

            if (nextPhotoBtn) {
                nextPhotoBtn.addEventListener('click', () => {
                    activePhotoIdx = (activePhotoIdx + 1) % activePhotosList.length;
                    lightboxImg.src = activePhotosList[activePhotoIdx];
                });
            }
        }
    }

    // Lightbox modal logic
    function openLightbox(reviewIdx, photoIdx) {
        const review = currentReviewsData[reviewIdx];
        if (!review || !review.reviewPhotos) return;

        activeLightboxPhotoList = review.reviewPhotos;
        activeLightboxPhotoIdx = photoIdx;

        lightboxImg.src = activeLightboxPhotoList[activeLightboxPhotoIdx];
        lightboxModal.classList.remove('hidden');
        
        // Trigger smooth fade in zoom in
        setTimeout(() => {
            lightboxImg.classList.remove('scale-95', 'opacity-0');
            lightboxImg.classList.add('scale-100', 'opacity-100');
        }, 50);

        updateLightboxNavigation();
    }

    function closeLightbox() {
        lightboxImg.classList.remove('scale-100', 'opacity-100');
        lightboxImg.classList.add('scale-95', 'opacity-0');
        
        setTimeout(() => {
            lightboxModal.classList.add('hidden');
            lightboxImg.src = '';
        }, 250);
    }

    function updateLightboxNavigation() {
        if (activeLightboxPhotoList.length > 1) {
            prevLightboxBtn.classList.remove('hidden');
            nextLightboxBtn.classList.remove('hidden');
        } else {
            prevLightboxBtn.classList.add('hidden');
            nextLightboxBtn.classList.add('hidden');
        }
    }

    function prevLightboxPhoto() {
        if (activeLightboxPhotoList.length <= 1) return;
        activeLightboxPhotoIdx = (activeLightboxPhotoIdx - 1 + activeLightboxPhotoList.length) % activeLightboxPhotoList.length;
        
        lightboxImg.classList.add('opacity-0');
        setTimeout(() => {
            lightboxImg.src = activeLightboxPhotoList[activeLightboxPhotoIdx];
            lightboxImg.classList.remove('opacity-0');
        }, 150);
    }

    function nextLightboxPhoto() {
        if (activeLightboxPhotoList.length <= 1) return;
        activeLightboxPhotoIdx = (activeLightboxPhotoIdx + 1) % activeLightboxPhotoList.length;
        
        lightboxImg.classList.add('opacity-0');
        setTimeout(() => {
            lightboxImg.src = activeLightboxPhotoList[activeLightboxPhotoIdx];
            lightboxImg.classList.remove('opacity-0');
        }, 150);
    }

    closeLightboxBtn.addEventListener('click', closeLightbox);
    prevLightboxBtn.addEventListener('click', prevLightboxPhoto);
    nextLightboxBtn.addEventListener('click', nextLightboxPhoto);

    // Close lightbox on click outside the image
    lightboxModal.addEventListener('click', (e) => {
        if (e.target === lightboxModal) {
            closeLightbox();
        }
    });

    // ESC key close & arrow key navigations
    document.addEventListener('keydown', (e) => {
        if (!lightboxModal.classList.contains('hidden')) {
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                prevLightboxPhoto();
            } else if (e.key === 'ArrowRight') {
                nextLightboxPhoto();
            }
        }
    });

    // Theme Configurator selectors
    themeLightBtn.addEventListener('click', () => {
        widgetTheme = 'light';
        themeLightBtn.className = "flex-1 text-[10px] font-bold py-1.5 rounded-lg transition-all bg-brand-500 text-white shadow-md";
        themeDarkBtn.className = "flex-1 text-[10px] font-bold py-1.5 rounded-lg transition-all text-slate-400 hover:text-slate-200";
        updateEmbedCode();
    });

    themeDarkBtn.addEventListener('click', () => {
        widgetTheme = 'dark';
        themeDarkBtn.className = "flex-1 text-[10px] font-bold py-1.5 rounded-lg transition-all bg-brand-500 text-white shadow-md";
        themeLightBtn.className = "flex-1 text-[10px] font-bold py-1.5 rounded-lg transition-all text-slate-400 hover:text-slate-200";
        updateEmbedCode();
    });

    // Background Configurator selectors
    bgSolidBtn.addEventListener('click', () => {
        widgetBgType = 'solid';
        bgSolidBtn.className = "flex-1 text-[10px] font-bold py-1.5 rounded-lg transition-all bg-brand-500 text-white shadow-md";
        bgTransBtn.className = "flex-1 text-[10px] font-bold py-1.5 rounded-lg transition-all text-slate-400 hover:text-slate-200";
        updateEmbedCode();
    });

    bgTransBtn.addEventListener('click', () => {
        widgetBgType = 'transparent';
        bgTransBtn.className = "flex-1 text-[10px] font-bold py-1.5 rounded-lg transition-all bg-brand-500 text-white shadow-md";
        bgSolidBtn.className = "flex-1 text-[10px] font-bold py-1.5 rounded-lg transition-all text-slate-400 hover:text-slate-200";
        updateEmbedCode();
    });

    // Layout Configurator selectors
    layoutGridBtn.addEventListener('click', () => {
        widgetLayout = 'grid';
        layoutGridBtn.className = "flex-1 text-[10px] font-bold py-1.5 rounded-lg transition-all bg-brand-500 text-white shadow-md";
        layoutSlideBtn.className = "flex-1 text-[10px] font-bold py-1.5 rounded-lg transition-all text-slate-400 hover:text-slate-200";
        renderReviewsGrid();
        updateEmbedCode();
    });

    layoutSlideBtn.addEventListener('click', () => {
        widgetLayout = 'slide';
        layoutSlideBtn.className = "flex-1 text-[10px] font-bold py-1.5 rounded-lg transition-all bg-brand-500 text-white shadow-md";
        layoutGridBtn.className = "flex-1 text-[10px] font-bold py-1.5 rounded-lg transition-all text-slate-400 hover:text-slate-200";
        renderReviewsGrid();
        updateEmbedCode();
    });

    // Autoplay selector buttons
    autoPlayOffBtn.addEventListener('click', () => {
        widgetAutoPlay = 'off';
        autoPlayOffBtn.className = "flex-1 text-[10px] font-bold py-1.5 rounded-lg transition-all bg-brand-500 text-white shadow-md";
        autoPlayOnBtn.className = "flex-1 text-[10px] font-bold py-1.5 rounded-lg transition-all text-slate-400 hover:text-slate-200";
        renderReviewsGrid();
        updateEmbedCode();
    });

    autoPlayOnBtn.addEventListener('click', () => {
        widgetAutoPlay = 'on';
        autoPlayOnBtn.className = "flex-1 text-[10px] font-bold py-1.5 rounded-lg transition-all bg-brand-500 text-white shadow-md";
        autoPlayOffBtn.className = "flex-1 text-[10px] font-bold py-1.5 rounded-lg transition-all text-slate-400 hover:text-slate-200";
        renderReviewsGrid();
        updateEmbedCode();
    });

    embedColsSelect.addEventListener('change', (e) => {
        widgetCols = e.target.value;
        renderReviewsGrid();
        updateEmbedCode();
    });

    embedBorderRadiusSelect.addEventListener('change', (e) => {
        widgetBorderRadius = e.target.value;
        renderReviewsGrid();
        updateEmbedCode();
    });

    embedFontSizeSelect.addEventListener('change', (e) => {
        widgetFontSize = e.target.value;
        renderReviewsGrid();
        updateEmbedCode();
    });

    embedHoverEffectSelect.addEventListener('change', (e) => {
        widgetHoverEffect = e.target.value;
        renderReviewsGrid();
        updateEmbedCode();
    });

    // Logo show configurator selectors
    logoShowBtn.addEventListener('click', () => {
        showGoogleLogo = true;
        logoShowBtn.className = "flex-1 text-[10px] font-bold py-1.5 rounded-lg transition-all bg-brand-500 text-white shadow-md";
        logoHideBtn.className = "flex-1 text-[10px] font-bold py-1.5 rounded-lg transition-all text-slate-400 hover:text-slate-200";
        renderReviewsGrid();
        updateEmbedCode();
    });

    logoHideBtn.addEventListener('click', () => {
        showGoogleLogo = false;
        logoHideBtn.className = "flex-1 text-[10px] font-bold py-1.5 rounded-lg transition-all bg-brand-500 text-white shadow-md";
        logoShowBtn.className = "flex-1 text-[10px] font-bold py-1.5 rounded-lg transition-all text-slate-400 hover:text-slate-200";
        renderReviewsGrid();
        updateEmbedCode();
    });

    // Text Display configurator selectors
    textClampBtn.addEventListener('click', () => {
        widgetTextClamp = 'clamp';
        textClampBtn.className = "flex-1 text-[10px] font-bold py-1.5 rounded-lg transition-all bg-brand-500 text-white shadow-md";
        textFullBtn.className = "flex-1 text-[10px] font-bold py-1.5 rounded-lg transition-all text-slate-400 hover:text-slate-200";
        renderReviewsGrid();
        updateEmbedCode();
    });

    textFullBtn.addEventListener('click', () => {
        widgetTextClamp = 'full';
        textFullBtn.className = "flex-1 text-[10px] font-bold py-1.5 rounded-lg transition-all bg-brand-500 text-white shadow-md";
        textClampBtn.className = "flex-1 text-[10px] font-bold py-1.5 rounded-lg transition-all text-slate-400 hover:text-slate-200";
        renderReviewsGrid();
        updateEmbedCode();
    });

    // Review Photos configurator selectors
    photosShowBtn.addEventListener('click', () => {
        widgetPhotosShow = true;
        photosShowBtn.className = "flex-1 text-[10px] font-bold py-1.5 rounded-lg transition-all bg-brand-500 text-white shadow-md";
        photosHideBtn.className = "flex-1 text-[10px] font-bold py-1.5 rounded-lg transition-all text-slate-400 hover:text-slate-200";
        renderReviewsGrid();
        updateEmbedCode();
    });

    photosHideBtn.addEventListener('click', () => {
        widgetPhotosShow = false;
        photosHideBtn.className = "flex-1 text-[10px] font-bold py-1.5 rounded-lg transition-all bg-brand-500 text-white shadow-md";
        photosShowBtn.className = "flex-1 text-[10px] font-bold py-1.5 rounded-lg transition-all text-slate-400 hover:text-slate-200";
        renderReviewsGrid();
        updateEmbedCode();
    });

    // Super New Configs Listeners
    aiSummaryShowBtn.addEventListener('click', () => {
        widgetAiSummary = 'show';
        aiSummaryShowBtn.className = "flex-1 text-[10px] font-bold py-1.5 rounded-lg transition-all bg-brand-500 text-white shadow-md";
        aiSummaryHideBtn.className = "flex-1 text-[10px] font-bold py-1.5 rounded-lg transition-all text-slate-400 hover:text-slate-200";
        renderReviewsGrid();
        updateEmbedCode();
    });

    aiSummaryHideBtn.addEventListener('click', () => {
        widgetAiSummary = 'hide';
        aiSummaryHideBtn.className = "flex-1 text-[10px] font-bold py-1.5 rounded-lg transition-all bg-brand-500 text-white shadow-md";
        aiSummaryShowBtn.className = "flex-1 text-[10px] font-bold py-1.5 rounded-lg transition-all text-slate-400 hover:text-slate-200";
        renderReviewsGrid();
        updateEmbedCode();
    });

    embedSliderStyleSelect.addEventListener('change', (e) => {
        widgetSliderStyle = e.target.value;
        renderReviewsGrid();
        updateEmbedCode();
    });

    // Tab buttons actions
    function setTab(tab) {
        activeTab = tab;
        [tabEmbedBtn, tabJsonBtn, tabMarkdownBtn].forEach(btn => {
            btn.className = "px-4 py-2.5 text-xs font-semibold border-b-2 border-transparent text-slate-400 hover:text-slate-200 focus:outline-none whitespace-nowrap";
        });

        if (tab === 'embed') {
            tabEmbedBtn.className = "px-4 py-2.5 text-xs font-semibold border-b-2 border-brand-500 text-brand-400 focus:outline-none whitespace-nowrap";
        } else if (tab === 'json') {
            tabJsonBtn.className = "px-4 py-2.5 text-xs font-semibold border-b-2 border-brand-500 text-brand-400 focus:outline-none whitespace-nowrap";
        } else if (tab === 'markdown') {
            tabMarkdownBtn.className = "px-4 py-2.5 text-xs font-semibold border-b-2 border-brand-500 text-brand-400 focus:outline-none whitespace-nowrap";
        }
        updateEmbedCode();
    }

    tabEmbedBtn.addEventListener('click', () => setTab('embed'));
    tabJsonBtn.addEventListener('click', () => setTab('json'));
    tabMarkdownBtn.addEventListener('click', () => setTab('markdown'));

    // Copy to clipboard action
    copyCodeBtn.addEventListener('click', () => {
        const textToCopy = codeArea.textContent;
        navigator.clipboard.writeText(textToCopy).then(() => {
            const originalHTML = copyCodeBtn.innerHTML;
            copyCodeBtn.innerHTML = '<i class="fa-solid fa-circle-check text-green-400 mr-1.5 text-sm"></i> Copiado!';
            setTimeout(() => {
                copyCodeBtn.innerHTML = originalHTML;
            }, 2000);
        });
    });

    // Regenerate and update the code content
    function updateEmbedCode() {
        if (!currentReviewsData) return;

        if (activeTab === 'embed') {
            const { html, css } = buildWidgetHTMLAndCSS();
            const isCenterMode = widgetSliderStyle === 'center';
            const autoPlayOn = widgetAutoPlay === 'on';

            const styleBlock = css;

            const codeTemplate = `<!-- Google Testimonials Widget -->
${html}

<style>
${styleBlock}
</style>

<script>
(function() {
    const widget = document.getElementById('google-reviews-widget');
    if (!widget) return;

    const isCenterMode = ${isCenterMode};
    const accentColor = '${widgetAccentColor}';

    // Slider Controls (Carrossel)
    const prevBtn = widget.querySelector('#widget-prev-btn');
    const nextBtn = widget.querySelector('#widget-next-btn');
    const viewport = widget.querySelector('.testimonials-slider-viewport');
    
    if (prevBtn && nextBtn && viewport) {
        prevBtn.addEventListener('click', () => {
            viewport.scrollBy({ left: -320, behavior: 'smooth' });
        });
        nextBtn.addEventListener('click', () => {
            viewport.scrollBy({ left: 320, behavior: 'smooth' });
        });
    }

    // Foco Central (Center / 3D coverflow) implementation
    if (viewport && isCenterMode) {
        const updateCenter = () => {
            const vCenter = viewport.scrollLeft + (viewport.clientWidth / 2);
            const cards = viewport.querySelectorAll('.testimonial-card, .ai-summary-card');
            
            cards.forEach(card => {
                const cCenter = card.offsetLeft + (card.clientWidth / 2);
                const dist = Math.abs(vCenter - cCenter);
                if (dist < 170) {
                    card.style.transform = 'scale(1.03)';
                    card.style.opacity = '1';
                    if (card.classList.contains('testimonial-card')) {
                        card.style.borderColor = accentColor;
                    }
                } else {
                    card.style.transform = 'scale(0.94)';
                    card.style.opacity = '0.65';
                    card.style.borderColor = 'rgba(255,255,255,0.08)';
                }
            });
        };
        viewport.addEventListener('scroll', updateCenter);
        setTimeout(updateCenter, 150);
    }

    // Autoplay implementation for Embed Slider
    const autoPlayOn = ${autoPlayOn};
    if (autoPlayOn && viewport) {
        let playInterval = setInterval(() => {
            const maxScroll = viewport.scrollWidth - viewport.clientWidth;
            if (viewport.scrollLeft >= maxScroll - 5) {
                viewport.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                viewport.scrollBy({ left: 320, behavior: 'smooth' });
            }
        }, 4000);

        // Pause autoplay on mouse hover or touch
        const stopPlay = () => clearInterval(playInterval);
        viewport.addEventListener('mouseenter', stopPlay);
        viewport.addEventListener('touchstart', stopPlay);
    }

    // Read More/Less toggles
    const expanders = widget.querySelectorAll('.expander-btn');
    expanders.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const txt = e.target.previousElementSibling;
            const isClamped = txt.classList.toggle('line-clamp-4');
            e.target.textContent = isClamped ? 'Ler mais' : 'Ler menos';
        });
    });

    // Lightbox image preview popup logic
    const reviewsData = ${JSON.stringify(currentReviewsData)};
    const lightboxModal = widget.querySelector('#embed-lightbox-modal');
    const lightboxImg = widget.querySelector('#embed-lightbox-img');
    const closeBtn = widget.querySelector('#embed-lightbox-close');
    const prevPhotoBtn = widget.querySelector('#embed-lightbox-prev');
    const nextPhotoBtn = widget.querySelector('#embed-lightbox-next');

    if (lightboxModal && lightboxImg) {
        let activePhotosList = [];
        let activePhotoIdx = 0;

        const thumbs = widget.querySelectorAll('.embed-thumb-photo');
        thumbs.forEach(thumb => {
            thumb.addEventListener('click', (e) => {
                const card = e.target.closest('.testimonial-card');
                const idx = parseInt(card.getAttribute('data-index'), 10);
                const pIdx = parseInt(e.target.getAttribute('data-idx'), 10);
                
                const review = reviewsData[idx];
                if (review && review.reviewPhotos) {
                    activePhotosList = review.reviewPhotos;
                    activePhotoIdx = pIdx;
                    
                    lightboxImg.src = activePhotosList[activePhotoIdx];
                    lightboxModal.classList.remove('hidden');
                    updateLightboxNavs();
                }
            });
        });

        const closeLbox = () => {
            lightboxModal.classList.add('hidden');
            lightboxImg.src = '';
        };

        if (closeBtn) closeBtn.addEventListener('click', closeLbox);
        
        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal) closeLbox();
        });

        const updateLightboxNavs = () => {
            if (!prevPhotoBtn || !nextPhotoBtn) return;
            if (activePhotosList.length > 1) {
                prevPhotoBtn.style.display = 'block';
                nextPhotoBtn.style.display = 'block';
            } else {
                prevPhotoBtn.style.display = 'none';
                nextPhotoBtn.style.display = 'none';
            }
        };

        if (prevPhotoBtn) {
            prevPhotoBtn.addEventListener('click', () => {
                activePhotoIdx = (activePhotoIdx - 1 + activePhotosList.length) % activePhotosList.length;
                lightboxImg.src = activePhotosList[activePhotoIdx];
            });
        }

        if (nextPhotoBtn) {
            nextPhotoBtn.addEventListener('click', () => {
                activePhotoIdx = (activePhotoIdx + 1) % activePhotosList.length;
                lightboxImg.src = activePhotosList[activePhotoIdx];
            });
        }
    }
})();
</script>`;
            codeArea.textContent = codeTemplate;
        } else if (activeTab === 'json') {
            codeArea.textContent = JSON.stringify(currentReviewsData, null, 2);
        } else if (activeTab === 'markdown') {
            let md = `# Depoimentos Extraídos do Google Maps\n\n`;
            
            if (widgetAiSummary === 'show' && currentReviewsAiSummary) {
                md += `## 🤖 Resumo Inteligente Local de IA\n\n`;
                md += `> "${currentReviewsAiSummary.summary}"\n\n`;
                md += `**Destaques Principais:**\n`;
                currentReviewsAiSummary.highlights.forEach(hl => {
                    md += `- ${hl}\n`;
                });
                md += `\n---\n\n`;
            }

            currentReviewsData.forEach(review => {
                let stars = '';
                for(let i=0; i<review.rating; i++) stars += '★';
                md += `### ${review.name} (${stars})\n`;
                if (review.date) md += `*${review.date}*\n\n`;
                md += `> "${review.text || 'Avaliação sem texto'}"\n\n`;
                
                if (review.reviewPhotos && review.reviewPhotos.length > 0) {
                    md += `**Imagens anexadas:**\n`;
                    review.reviewPhotos.forEach(p => {
                        md += `- ![[Review Photo](${p})\n`;
                    });
                    md += `\n`;
                }
                md += `---\n\n`;
            });
            codeArea.textContent = md;
        }
    }

});

// Setup slide in/fade animations
const styleEl = document.createElement('style');
styleEl.innerHTML = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(15px); }
        to { opacity: 1; transform: translateY(0); }
    }
    .scrollbar-none::-webkit-scrollbar {
        display: none;
    }
    .scrollbar-none {
        -ms-overflow-style: none;
        scrollbar-width: none;
    }
`;
document.head.appendChild(styleEl);
