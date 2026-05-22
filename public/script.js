document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------
    // Mock Test Data Generator
    // -------------------------------------------------------------
    const mockReviews = [
        {
            name: "Mariana Silva",
            rating: 5,
            text: "O atendimento é simplesmente impecável! Toda a equipe foi super atenciosa desde a entrada. O ambiente é extremamente limpo, moderno e aconchegante. Recomendo de olhos fechados!",
            date: "há 2 dias",
            photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&fit=crop&q=80",
            reviewPhotos: [
                "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=500&fit=crop&q=80",
                "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&fit=crop&q=80"
            ]
        },
        {
            name: "Rodrigo Santos",
            rating: 5,
            text: "Sensacional! O custo-benefício superou todas as minhas expectativas. O serviço foi entregue antes do prazo e com uma qualidade impecável. Com certeza voltarei a fazer negócios.",
            date: "há 1 semana",
            photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&fit=crop&q=80",
            reviewPhotos: []
        },
        {
            name: "Beatriz Oliveira",
            rating: 4,
            text: "Muito bom mesmo. A comida estava deliciosa e o ambiente é muito agradável. O único ponto é que o local estava bem cheio e o pedido demorou cerca de 15 minutos, mas valeu a pena a espera.",
            date: "há 2 semanas",
            photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&fit=crop&q=80",
            reviewPhotos: [
                "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&fit=crop&q=80"
            ]
        },
        {
            name: "Felipe Almeida",
            rating: 5,
            text: "Localizado em uma área excelente, fácil de estacionar. O design do espaço chama a atenção de tão lindo. Excelente opção para ir com amigos ou família no final de semana.",
            date: "há 1 mês",
            photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&fit=crop&q=80",
            reviewPhotos: []
        },
        {
            name: "Juliana Costa",
            rating: 5,
            text: "Um achado! O atendimento humanizado faz toda a diferença nos dias de hoje. Além disso, a qualidade dos materiais utilizados é notável. Dou nota 5 estrelas com muito gosto!",
            date: "há 2 meses",
            photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&fit=crop&q=80",
            reviewPhotos: [
                "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=500&fit=crop&q=80"
            ]
        },
        {
            name: "Carlos Eduardo",
            rating: 4,
            text: "Tive uma ótima experiência geral. O suporte responde rápido e resolveu minhas dúvidas no mesmo dia. Recomendo pela confiabilidade e profissionalismo.",
            date: "há 3 meses",
            photo: "",
            reviewPhotos: []
        },
        {
            name: "Fernanda Lima",
            rating: 5,
            text: "Super aconchegante! O aroma do café moído na hora e a música ambiente criam uma atmosfera maravilhosa. Ótimo espaço para trabalhar remotamente também.",
            date: "há 4 meses",
            photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&fit=crop&q=80",
            reviewPhotos: []
        },
        {
            name: "Gustavo Nogueira",
            rating: 5,
            text: "Simplesmente sensacional! Fui super bem recebido, preço justo e produto impecável. A região precisava de um estabelecimento desse nível.",
            date: "há 5 meses",
            photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&fit=crop&q=80",
            reviewPhotos: []
        }
    ];

    const mockAiSummary = {
        averageRating: 4.8,
        totalAnalyzed: 8,
        summary: "Com base nas avaliações analisadas, o estabelecimento destaca-se com uma reputação **excepcional** de **4.8/5.0 estrelas**. A satisfação dos clientes é altíssima, sendo fortemente recomendado pelo **atendimento humanizado**, **ambiente moderno** e excelente **relação de custo-benefício**.",
        highlights: [
            "Atendimento humanizado elogiado",
            "Ambiente limpo e aconchegante",
            "Custo-benefício excepcional"
        ]
    };

    // -------------------------------------------------------------
    // UI Selectors & Configuration State
    // -------------------------------------------------------------
    // Forms & Inputs
    const form = document.getElementById('scrapeForm');
    const urlInput = document.getElementById('mapsUrl');
    const maxReviewsInput = document.getElementById('maxReviews');
    const ratingFilterInput = document.getElementById('ratingFilter');
    const onlyWithTextInput = document.getElementById('onlyWithText');
    const minLengthInput = document.getElementById('minLength');
    const keywordsFilterInput = document.getElementById('keywordsFilter');
    const mockDataBtn = document.getElementById('mockDataBtn');

    // Scraper Config Collapse Toggle
    const toggleScraperConfigBtn = document.getElementById('toggleScraperConfigBtn');
    const scraperConfigPanel = document.getElementById('scraperConfigPanel');
    const scraperChevron = document.getElementById('scraperChevron');

    // Layout Panels Tabs
    const tabLayoutBtn = document.getElementById('tabLayoutBtn');
    const tabDesignBtn = document.getElementById('tabDesignBtn');
    const tabElementsBtn = document.getElementById('tabElementsBtn');
    const tabManualBtn = document.getElementById('tabManualBtn');

    const panelLayout = document.getElementById('panelLayout');
    const panelDesign = document.getElementById('panelDesign');
    const panelElements = document.getElementById('panelElements');
    const panelManual = document.getElementById('panelManual');

    // Widget Options
    const widgetTemplateSelect = document.getElementById('widgetTemplate');
    const embedColsSelect = document.getElementById('embedCols');
    const ctrlCols = document.getElementById('ctrlCols');
    const ctrlCarousel = document.getElementById('ctrlCarousel');
    
    // Carousel options
    const embedSliderStyleSelect = document.getElementById('embedSliderStyle');
    const autoPlayOffBtn = document.getElementById('autoPlayOffBtn');
    const autoPlayOnBtn = document.getElementById('autoPlayOnBtn');
    const autoPlaySpeedSelect = document.getElementById('autoPlaySpeed');

    // Gap & border radius
    const embedGapSelect = document.getElementById('embedGap');
    const embedBorderRadiusSelect = document.getElementById('embedBorderRadius');

    // Design tab options
    const themeLightBtn = document.getElementById('themeLightBtn');
    const themeDarkBtn = document.getElementById('themeDarkBtn');
    const bgSolidBtn = document.getElementById('bgSolidBtn');
    const bgTransBtn = document.getElementById('bgTransBtn');
    const accentColorPicker = document.getElementById('accentColorPicker');
    const embedAccentHexInput = document.getElementById('embedAccentHex');
    const embedFontFamilySelect = document.getElementById('embedFontFamily');
    const embedFontSizeSelect = document.getElementById('embedFontSize');
    const embedHoverEffectSelect = document.getElementById('embedHoverEffect');
    const embedShadowStyleSelect = document.getElementById('embedShadowStyle');
    const embedTextLimitSelect = document.getElementById('embedTextLimit');
    const embedTextLengthLimitSelect = document.getElementById('embedTextLengthLimit');

    // Elements tab visibility controls
    const elementAiSummaryToggle = document.getElementById('elementAiSummaryToggle');
    const elementAvatarsToggle = document.getElementById('elementAvatarsToggle');
    const elementDatesToggle = document.getElementById('elementDatesToggle');
    const elementPhotosToggle = document.getElementById('elementPhotosToggle');
    const elementGoogleLogoToggle = document.getElementById('elementGoogleLogoToggle');

    // Header Customizer Elements
    const elementHeaderToggle = document.getElementById('elementHeaderToggle');
    const headerTitleInput = document.getElementById('headerTitleInput');
    const elementHeaderRatingToggle = document.getElementById('elementHeaderRatingToggle');
    const elementHeaderButtonToggle = document.getElementById('elementHeaderButtonToggle');
    const headerReviewUrlInput = document.getElementById('headerReviewUrlInput');

    // Manual Builder Elements
    const manualReviewForm = document.getElementById('manualReviewForm');
    const manualReviewName = document.getElementById('manualReviewName');
    const manualReviewRating = document.getElementById('manualReviewRating');
    const manualReviewDate = document.getElementById('manualReviewDate');
    const manualReviewText = document.getElementById('manualReviewText');
    const manualReviewAvatar = document.getElementById('manualReviewAvatar');
    const manualReviewPhotos = document.getElementById('manualReviewPhotos');

    // Edit Review Modal Elements
    const editReviewModal = document.getElementById('editReviewModal');
    const editReviewForm = document.getElementById('editReviewForm');
    const editReviewIndex = document.getElementById('editReviewIndex');
    const editReviewName = document.getElementById('editReviewName');
    const editReviewRating = document.getElementById('editReviewRating');
    const editReviewDate = document.getElementById('editReviewDate');
    const editReviewText = document.getElementById('editReviewText');
    const editReviewPhoto = document.getElementById('editReviewPhoto');
    const editReviewPhotos = document.getElementById('editReviewPhotos');
    const closeEditModalBtn = document.getElementById('closeEditModalBtn');
    const cancelEditModalBtn = document.getElementById('cancelEditModalBtn');

    // Feedback elements
    const submitBtn = document.getElementById('submitBtn');
    const btnText = document.getElementById('btnText');
    const btnIcon = document.getElementById('btnIcon');
    const loadingIcon = document.getElementById('loadingIcon');
    const statusArea = document.getElementById('statusArea');
    const statusMessage = document.getElementById('statusMessage');
    const errorMessage = document.getElementById('errorMessage');
    const errorText = document.getElementById('errorText');

    // Preview area
    const previewDeviceDesktop = document.getElementById('previewDeviceDesktop');
    const previewDeviceTablet = document.getElementById('previewDeviceTablet');
    const previewDeviceMobile = document.getElementById('previewDeviceMobile');
    const simulatedViewport = document.getElementById('simulatedViewport');
    const reviewsPreviewWrapper = document.getElementById('reviewsPreviewWrapper');

    // Analytics Dashboard Elements
    const analyticsCard = document.getElementById('analyticsCard');
    const statAvgRating = document.getElementById('statAvgRating');
    const statTotalCount = document.getElementById('statTotalCount');
    const sentimentPositiveBar = document.getElementById('sentimentPositiveBar');
    const sentimentNeutralBar = document.getElementById('sentimentNeutralBar');
    const sentimentNegativeBar = document.getElementById('sentimentNegativeBar');
    const sentimentPositiveLabel = document.getElementById('sentimentPositiveLabel');
    const sentimentNeutralLabel = document.getElementById('sentimentNeutralLabel');
    const sentimentNegativeLabel = document.getElementById('sentimentNegativeLabel');
    const tagCloudContainer = document.getElementById('tagCloudContainer');

    // Curation Panel
    const curationCard = document.getElementById('curationCard');
    const totalCurationCountBadge = document.getElementById('totalCurationCount');
    const curationCheckAll = document.getElementById('curationCheckAll');
    const curationUncheckAll = document.getElementById('curationUncheckAll');
    const curationSearchInput = document.getElementById('curationSearchInput');
    const curationSortSelect = document.getElementById('curationSortSelect');
    const curationItemsList = document.getElementById('curationItemsList');
    const curationFilterTextOnly = document.getElementById('curationFilterTextOnly');
    const curationFilterPhotoOnly = document.getElementById('curationFilterPhotoOnly');

    // Results & Widget Output
    const resultsSection = document.getElementById('resultsSection');
    const tabEmbedBtn = document.getElementById('tabEmbedBtn');
    const tabJsonBtn = document.getElementById('tabJsonBtn');
    const tabMarkdownBtn = document.getElementById('tabMarkdownBtn');
    const codeArea = document.getElementById('codeArea');
    const copyCodeBtn = document.getElementById('copyCodeBtn');
    const btnExportCSV = document.getElementById('btnExportCSV');
    const btnDownloadWidget = document.getElementById('btnDownloadWidget');
    const historyList = document.getElementById('historyList');

    // -------------------------------------------------------------
    // Core Application State Variables
    // -------------------------------------------------------------
    let currentReviewsData = null; // raw reviews loaded
    let currentReviewsAiSummary = null; // AI summary loaded
    let curatedReviews = []; // items with active curation state: { id, checked, review }
    
    // Client-side curation active filters state
    let activeStarsFilters = new Set(['1', '2', '3', '4', '5']);
    let activeKeywordTag = '';
    let filterTextOnly = false;
    let filterPhotoOnly = false;

    // Configurator state
    let widgetTheme = 'dark'; // 'dark' | 'light'
    let widgetBgType = 'solid'; // 'solid' | 'transparent'
    let widgetAccentColor = '#0ea5e9';
    let widgetTemplate = 'grid'; // 'grid' | 'slide' | 'masonry' | 'list' | 'badge' | 'floating'
    let widgetCols = '3';
    
    // Carousel options
    let widgetSliderStyle = 'multi'; // 'multi' | 'center' | 'single'
    let widgetAutoPlay = 'off'; // 'on' | 'off'
    let widgetAutoPlaySpeed = 5000;
    
    // Borders, gap, sizes
    let widgetGap = '20px';
    let widgetBorderRadius = '12px';
    let widgetFontFamily = "'Plus Jakarta Sans', sans-serif";
    let widgetFontSize = 'default'; // 'compact' | 'default' | 'large'
    let widgetHoverEffect = 'lift'; // 'none' | 'lift' | 'glow'
    let widgetShadowStyle = 'soft'; // 'none' | 'soft' | 'intense'
    let widgetTextClamp = 'clamp'; // 'clamp' | 'full'
    let widgetTextLengthLimit = 180;

    // Elements visibility
    let showAiSummary = true;
    let showAvatars = true;
    let showDates = true;
    let showPhotos = true;
    let showGoogleLogo = true;

    // Header Customizer state
    let showHeader = true;
    let headerTitle = "O que nossos clientes dizem";
    let showHeaderRating = true;
    let showHeaderButton = true;
    let headerReviewUrl = "";

    // Active code format tab
    let activeCodeTab = 'embed'; // 'embed' | 'json' | 'markdown'
    
    // Autoplay Timer
    let previewCarouselTimer = null;

    // Loading Progress Simulation Messages
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

    // -------------------------------------------------------------
    // Helper Analytics, Highlights & Modal Controllers
    // -------------------------------------------------------------
    // Curation Filters Helper
    function filterReviewItem(item, searchVal) {
        if (searchVal) {
            const nameMatch = item.review.name.toLowerCase().includes(searchVal);
            const textMatch = (item.review.text || '').toLowerCase().includes(searchVal);
            if (!nameMatch && !textMatch) return false;
        }

        if (activeStarsFilters.size > 0) {
            if (!activeStarsFilters.has(String(item.review.rating))) return false;
        }

        if (activeKeywordTag) {
            const text = (item.review.text || '').toLowerCase();
            if (!text.includes(activeKeywordTag.toLowerCase())) return false;
        }

        if (filterTextOnly) {
            if (!item.review.text || item.review.text.trim().length === 0) return false;
        }

        if (filterPhotoOnly) {
            if (!item.review.reviewPhotos || item.review.reviewPhotos.length === 0) return false;
        }

        return true;
    }

    // Text Highlighting Helper
    function highlightText(text, searchVal) {
        if (!text) return 'Sem comentário por escrito.';
        let highlighted = text;

        if (activeKeywordTag) {
            try {
                const escapedTag = activeKeywordTag.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
                const regex = new RegExp(`(${escapedTag})`, 'gi');
                highlighted = highlighted.replace(regex, '<mark class="bg-indigo-500/40 text-indigo-200 px-0.5 rounded font-bold">$1</mark>');
            } catch (e) {}
        }

        if (searchVal) {
            try {
                const escapedSearch = searchVal.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
                const regex = new RegExp(`(${escapedSearch})`, 'gi');
                highlighted = highlighted.replace(regex, '<mark class="bg-yellow-500/30 text-yellow-200 px-0.5 rounded">$1</mark>');
            } catch (e) {}
        }

        return highlighted;
    }

    // Sentiment Analytics Calculator
    function updateSentimentAnalytics(reviews) {
        if (!reviews || reviews.length === 0) {
            statAvgRating.textContent = '0.0';
            statTotalCount.textContent = '0';
            sentimentPositiveBar.style.width = '0%';
            sentimentNeutralBar.style.width = '0%';
            sentimentNegativeBar.style.width = '0%';
            sentimentPositiveLabel.textContent = 'Positivo: 0%';
            sentimentNeutralLabel.textContent = 'Neutro: 0%';
            sentimentNegativeLabel.textContent = 'Negativo: 0%';
            analyticsCard.classList.add('hidden');
            return;
        }

        analyticsCard.classList.remove('hidden');

        const total = reviews.length;
        statTotalCount.textContent = total;

        const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
        const avg = (totalRating / total).toFixed(1);
        statAvgRating.textContent = avg;

        const positiveCount = reviews.filter(r => r.rating >= 4).length;
        const neutralCount = reviews.filter(r => r.rating === 3).length;
        const negativeCount = reviews.filter(r => r.rating <= 2).length;

        const posPct = Math.round((positiveCount / total) * 100) || 0;
        const neuPct = Math.round((neutralCount / total) * 100) || 0;
        const negPct = Math.round((negativeCount / total) * 100) || 0;

        sentimentPositiveBar.style.width = `${posPct}%`;
        sentimentNeutralBar.style.width = `${neuPct}%`;
        sentimentNegativeBar.style.width = `${negPct}%`;

        sentimentPositiveLabel.textContent = `Positivo: ${posPct}%`;
        sentimentNeutralLabel.textContent = `Neutro: ${neuPct}%`;
        sentimentNegativeLabel.textContent = `Negativo: ${negPct}%`;
    }

    // Keyword Tag Cloud Calculator
    function updateKeywordTagCloud(reviews) {
        tagCloudContainer.innerHTML = '';
        if (!reviews || reviews.length === 0) {
            tagCloudContainer.innerHTML = `<span class="text-[9px] text-slate-500">Nenhum termo extraído.</span>`;
            return;
        }

        const counts = {};
        const stopwords = new Set([
            "de", "a", "o", "que", "e", "do", "da", "em", "um", "para", "é", "com", "não", "uma", "os", "no", "se", "na", 
            "por", "mais", "as", "dos", "como", "mas", "foi", "ao", "ele", "das", "tem", "à", "seu", "sua", "ou", "ser", 
            "quando", "muito", "nos", "já", "está", "eu", "também", "só", "pelo", "pela", "até", "isso", "ela", "entre", 
            "depois", "sem", "mesmo", "aos", "ter", "seus", "quem", "nas", "me", "esse", "eles", "estão", "você", "tinha", 
            "foram", "essa", "num", "nem", "suas", "meu", "às", "minha", "têm", "numa", "pelos", "elas", "havia", "seja", 
            "qual", "será", "nós", "tenho", "lhe", "deles", "essas", "esses", "pelas", "este", "fossem", "dele", "tu", 
            "te", "vocês", "vos", "lhes", "meus", "minhas", "teu", "tua", "teus", "tuas", "nosso", "nossa", "nossos", 
            "nossas", "dela", "delas", "esta", "estes", "estas", "aquele", "aquela", "aqueles", "aquelas", "isto", "aquilo",
            "estou", "estamos", "estive", "esteve", "estivemos", "estiveram", "estava", "estávamos", "estavam", "estivera", 
            "estivéramos", "estiveras", "estiveram", "tendo", "tiver", "tivermos", "tiverem", "tivesse", "tivéssemos", "tivessem", 
            "tenha", "tenhamos", "tenham", "houver", "houvermos", "houverem", "houvesse", "houvéssemos", "houvessem", "houve", 
            "houvemos", "houveram", "houvera", "houvéramos", "houveras", "houveram", "muito", "muita", "muitos", "muitas",
            "tudo", "todo", "toda", "todos", "todas", "bem", "bom", "boa", "excelente", "ótimo", "ótima", "super", "tão",
            "estava", "estou", "ficou", "fiquei", "fui", "fomos", "vai", "vou", "vão", "ir", "aqui", "lá", "onde", "como", "quem"
        ]);

        reviews.forEach(r => {
            if (!r.text) return;
            const words = r.text
                .toLowerCase()
                .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"']/g, "")
                .split(/\s+/);
            
            words.forEach(word => {
                const cleaned = word.trim();
                if (cleaned.length >= 4 && !stopwords.has(cleaned)) {
                    counts[cleaned] = (counts[cleaned] || 0) + 1;
                }
            });
        });

        const sortedTerms = Object.entries(counts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 12);

        if (sortedTerms.length === 0) {
            tagCloudContainer.innerHTML = `<span class="text-[9px] text-slate-500">Pouco texto para extrair palavras-chave.</span>`;
            return;
        }

        sortedTerms.forEach(([term, count]) => {
            const tag = document.createElement('span');
            tag.className = `keyword-tag ${activeKeywordTag === term ? 'active' : ''}`;
            tag.innerHTML = `${term} <span class="text-[8px] opacity-60 ml-1">(${count})</span>`;
            
            tag.addEventListener('click', () => {
                if (activeKeywordTag === term) {
                    activeKeywordTag = '';
                } else {
                    activeKeywordTag = term;
                }
                updateKeywordTagCloud(reviews);
                renderCurationList();
                renderReviewsGrid();
                updateEmbedCode();
            });

            tagCloudContainer.appendChild(tag);
        });
    }

    // Modal Edit Review Controllers
    function openEditModal(id) {
        const item = curatedReviews.find(i => i.id === id);
        if (!item) return;
        editReviewIndex.value = id;
        editReviewName.value = item.review.name || '';
        editReviewRating.value = item.review.rating || 5;
        editReviewDate.value = item.review.date || '';
        editReviewText.value = item.review.text || '';
        editReviewPhoto.value = item.review.photo || '';
        editReviewPhotos.value = (item.review.reviewPhotos || []).join(', ');
        editReviewModal.classList.remove('hidden');
    }

    function closeEditModal() {
        editReviewModal.classList.add('hidden');
    }

    function deleteReview(id) {
        if (confirm('Tem certeza que deseja excluir este depoimento?')) {
            curatedReviews = curatedReviews.filter(i => i.id !== id);
            renderCurationList();
            renderReviewsGrid();
            updateSentimentAnalytics(curatedReviews.map(i => i.review));
            updateKeywordTagCloud(curatedReviews.map(i => i.review));
            updateEmbedCode();
        }
    }

    // Modal Events Binding
    closeEditModalBtn.addEventListener('click', closeEditModal);
    cancelEditModalBtn.addEventListener('click', closeEditModal);
    
    editReviewForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = parseInt(editReviewIndex.value, 10);
        const item = curatedReviews.find(i => i.id === id);
        if (item) {
            item.review.name = editReviewName.value.trim();
            item.review.rating = parseInt(editReviewRating.value, 10);
            item.review.date = editReviewDate.value.trim();
            item.review.text = editReviewText.value.trim();
            item.review.photo = editReviewPhoto.value.trim();
            
            const photosStr = editReviewPhotos.value.trim();
            item.review.reviewPhotos = photosStr ? photosStr.split(',').map(s => s.trim()).filter(Boolean) : [];
            
            renderCurationList();
            renderReviewsGrid();
            updateSentimentAnalytics(curatedReviews.map(i => i.review));
            updateKeywordTagCloud(curatedReviews.map(i => i.review));
            updateEmbedCode();
        }
        closeEditModal();
    });

    // Initialize sidebar preferences from localStorage
    function loadSavedPreferences() {
        if (localStorage.getItem('extractor_accentColor')) {
            widgetAccentColor = localStorage.getItem('extractor_accentColor');
            accentColorPicker.value = widgetAccentColor;
            embedAccentHexInput.value = widgetAccentColor;
        }
        if (localStorage.getItem('extractor_theme')) {
            widgetTheme = localStorage.getItem('extractor_theme');
            applyThemeUI();
        }
        renderHistory();
    }

    function savePreferences() {
        localStorage.setItem('extractor_accentColor', widgetAccentColor);
        localStorage.setItem('extractor_theme', widgetTheme);
    }

    // -------------------------------------------------------------
    // Helper UI Wiring / Accordion Actions
    // -------------------------------------------------------------
    toggleScraperConfigBtn.addEventListener('click', () => {
        const isHidden = scraperConfigPanel.classList.toggle('hidden');
        if (isHidden) {
            scraperChevron.classList.remove('rotate-180');
        } else {
            scraperChevron.classList.add('rotate-180');
        }
    });

    // Customizer sidebar category tabs switcher
    function setCustomizerPanel(panelName, activeBtn) {
        panelLayout.classList.add('hidden');
        panelDesign.classList.add('hidden');
        panelElements.classList.add('hidden');
        panelManual.classList.add('hidden');

        if (panelName === 'layout') panelLayout.classList.remove('hidden');
        if (panelName === 'design') panelDesign.classList.remove('hidden');
        if (panelName === 'elements') panelElements.classList.remove('hidden');
        if (panelName === 'manual') panelManual.classList.remove('hidden');

        [tabLayoutBtn, tabDesignBtn, tabElementsBtn, tabManualBtn].forEach(btn => {
            btn.className = "flex-1 text-[9px] font-bold py-1.5 rounded-md transition-all text-slate-400 hover:text-slate-200 flex items-center justify-center gap-1 focus:outline-none";
        });
        activeBtn.className = "flex-1 text-[9px] font-bold py-1.5 rounded-md transition-all bg-brand-500 text-white shadow-sm flex items-center justify-center gap-1 focus:outline-none";
    }

    tabLayoutBtn.addEventListener('click', () => setCustomizerPanel('layout', tabLayoutBtn));
    tabDesignBtn.addEventListener('click', () => setCustomizerPanel('design', tabDesignBtn));
    tabElementsBtn.addEventListener('click', () => setCustomizerPanel('elements', tabElementsBtn));
    tabManualBtn.addEventListener('click', () => setCustomizerPanel('manual', tabManualBtn));

    // Device Responsive Simulator Controls
    function setSimulatorDevice(device) {
        simulatedViewport.className = "transition-all duration-350 bg-transparent";
        [previewDeviceDesktop, previewDeviceTablet, previewDeviceMobile].forEach(btn => {
            btn.className = "px-3 py-1 rounded-md text-[10px] font-bold text-slate-400 hover:text-slate-200 flex items-center gap-1.5 focus:outline-none";
        });

        if (device === 'desktop') {
            simulatedViewport.classList.add('w-full');
            previewDeviceDesktop.className = "px-3 py-1 rounded-md text-[10px] font-bold bg-brand-500 text-white shadow flex items-center gap-1.5 focus:outline-none";
        } else if (device === 'tablet') {
            simulatedViewport.classList.add('w-[768px]', 'border-x', 'border-slate-800', 'bg-[#0f172a]/20', 'rounded-xl');
            previewDeviceTablet.className = "px-3 py-1 rounded-md text-[10px] font-bold bg-brand-500 text-white shadow flex items-center gap-1.5 focus:outline-none";
        } else if (device === 'mobile') {
            simulatedViewport.classList.add('w-[375px]', 'border-x', 'border-slate-800', 'bg-[#0f172a]/20', 'rounded-xl');
            previewDeviceMobile.className = "px-3 py-1 rounded-md text-[10px] font-bold bg-brand-500 text-white shadow flex items-center gap-1.5 focus:outline-none";
        }
        
        // Triggers responsive updates in coverflow scaling
        setTimeout(() => {
            const viewport = reviewsPreviewWrapper.querySelector('.testimonials-slider-viewport');
            if (viewport) {
                viewport.dispatchEvent(new Event('scroll'));
            }
        }, 150);
    }

    previewDeviceDesktop.addEventListener('click', () => setSimulatorDevice('desktop'));
    previewDeviceTablet.addEventListener('click', () => setSimulatorDevice('tablet'));
    previewDeviceMobile.addEventListener('click', () => setSimulatorDevice('mobile'));

    // Template elements triggers update preview and code
    widgetTemplateSelect.addEventListener('change', (e) => {
        widgetTemplate = e.target.value;
        if (widgetTemplate === 'grid' || widgetTemplate === 'masonry') {
            ctrlCols.classList.remove('hidden');
            ctrlCarousel.classList.add('hidden');
        } else if (widgetTemplate === 'slide') {
            ctrlCols.classList.add('hidden');
            ctrlCarousel.classList.remove('hidden');
        } else {
            // list, badge, floating don't use cols/slide controls
            ctrlCols.classList.add('hidden');
            ctrlCarousel.classList.add('hidden');
        }
        renderReviewsGrid();
        updateEmbedCode();
    });

    embedColsSelect.addEventListener('change', (e) => {
        widgetCols = e.target.value;
        renderReviewsGrid();
        updateEmbedCode();
    });

    embedSliderStyleSelect.addEventListener('change', (e) => {
        widgetSliderStyle = e.target.value;
        renderReviewsGrid();
        updateEmbedCode();
    });

    autoPlayOffBtn.addEventListener('click', () => {
        widgetAutoPlay = 'off';
        autoPlayOffBtn.className = "flex-1 text-[9px] font-bold py-1 rounded bg-brand-500 text-white";
        autoPlayOnBtn.className = "flex-1 text-[9px] font-bold py-1 text-slate-400";
        renderReviewsGrid();
        updateEmbedCode();
    });

    autoPlayOnBtn.addEventListener('click', () => {
        widgetAutoPlay = 'on';
        autoPlayOnBtn.className = "flex-1 text-[9px] font-bold py-1 rounded bg-brand-500 text-white";
        autoPlayOffBtn.className = "flex-1 text-[9px] font-bold py-1 text-slate-400";
        renderReviewsGrid();
        updateEmbedCode();
    });

    autoPlaySpeedSelect.addEventListener('change', (e) => {
        widgetAutoPlaySpeed = parseInt(e.target.value, 10);
        renderReviewsGrid();
        updateEmbedCode();
    });

    embedGapSelect.addEventListener('change', (e) => {
        widgetGap = e.target.value;
        renderReviewsGrid();
        updateEmbedCode();
    });

    embedBorderRadiusSelect.addEventListener('change', (e) => {
        widgetBorderRadius = e.target.value;
        renderReviewsGrid();
        updateEmbedCode();
    });

    // Design parameters triggers
    themeLightBtn.addEventListener('click', () => {
        widgetTheme = 'light';
        themeLightBtn.className = "flex-1 text-[9px] font-bold py-1 rounded bg-brand-500 text-white";
        themeDarkBtn.className = "flex-1 text-[9px] font-bold py-1 text-slate-400";
        savePreferences();
        renderReviewsGrid();
        updateEmbedCode();
    });

    themeDarkBtn.addEventListener('click', () => {
        widgetTheme = 'dark';
        themeDarkBtn.className = "flex-1 text-[9px] font-bold py-1 rounded bg-brand-500 text-white";
        themeLightBtn.className = "flex-1 text-[9px] font-bold py-1 text-slate-400";
        savePreferences();
        renderReviewsGrid();
        updateEmbedCode();
    });

    function applyThemeUI() {
        if (widgetTheme === 'light') {
            themeLightBtn.className = "flex-1 text-[9px] font-bold py-1 rounded bg-brand-500 text-white";
            themeDarkBtn.className = "flex-1 text-[9px] font-bold py-1 text-slate-400";
        } else {
            themeDarkBtn.className = "flex-1 text-[9px] font-bold py-1 rounded bg-brand-500 text-white";
            themeLightBtn.className = "flex-1 text-[9px] font-bold py-1 text-slate-400";
        }
    }

    bgSolidBtn.addEventListener('click', () => {
        widgetBgType = 'solid';
        bgSolidBtn.className = "flex-1 text-[9px] font-bold py-1 rounded bg-brand-500 text-white";
        bgTransBtn.className = "flex-1 text-[9px] font-bold py-1 text-slate-400";
        renderReviewsGrid();
        updateEmbedCode();
    });

    bgTransBtn.addEventListener('click', () => {
        widgetBgType = 'transparent';
        bgTransBtn.className = "flex-1 text-[9px] font-bold py-1 rounded bg-brand-500 text-white";
        bgSolidBtn.className = "flex-1 text-[9px] font-bold py-1 text-slate-400";
        renderReviewsGrid();
        updateEmbedCode();
    });

    // Brand color syncs
    accentColorPicker.addEventListener('input', (e) => {
        widgetAccentColor = e.target.value;
        embedAccentHexInput.value = widgetAccentColor;
        savePreferences();
        renderReviewsGrid();
        updateEmbedCode();
    });

    embedAccentHexInput.addEventListener('input', (e) => {
        const val = e.target.value.trim();
        if (/^#[0-9A-F]{6}$/i.test(val)) {
            widgetAccentColor = val;
            accentColorPicker.value = val;
            savePreferences();
            renderReviewsGrid();
            updateEmbedCode();
        }
    });

    document.querySelectorAll('.accent-preset').forEach(preset => {
        preset.addEventListener('click', () => {
            const col = preset.getAttribute('data-color');
            widgetAccentColor = col;
            accentColorPicker.value = col;
            embedAccentHexInput.value = col;
            savePreferences();
            renderReviewsGrid();
            updateEmbedCode();
        });
    });

    embedFontFamilySelect.addEventListener('change', (e) => {
        widgetFontFamily = e.target.value;
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

    embedShadowStyleSelect.addEventListener('change', (e) => {
        widgetShadowStyle = e.target.value;
        renderReviewsGrid();
        updateEmbedCode();
    });

    embedTextLimitSelect.addEventListener('change', (e) => {
        widgetTextClamp = e.target.value;
        renderReviewsGrid();
        updateEmbedCode();
    });

    embedTextLengthLimitSelect.addEventListener('change', (e) => {
        widgetTextLengthLimit = parseInt(e.target.value, 10);
        renderReviewsGrid();
        updateEmbedCode();
    });

    // Elements visibility toggles
    elementAiSummaryToggle.addEventListener('change', (e) => {
        showAiSummary = e.target.checked;
        renderReviewsGrid();
        updateEmbedCode();
    });

    elementAvatarsToggle.addEventListener('change', (e) => {
        showAvatars = e.target.checked;
        renderReviewsGrid();
        updateEmbedCode();
    });

    elementDatesToggle.addEventListener('change', (e) => {
        showDates = e.target.checked;
        renderReviewsGrid();
        updateEmbedCode();
    });

    elementPhotosToggle.addEventListener('change', (e) => {
        showPhotos = e.target.checked;
        renderReviewsGrid();
        updateEmbedCode();
    });

    elementGoogleLogoToggle.addEventListener('change', (e) => {
        showGoogleLogo = e.target.checked;
        renderReviewsGrid();
        updateEmbedCode();
    });

    // Header Customizer listeners
    elementHeaderToggle.addEventListener('change', (e) => {
        showHeader = e.target.checked;
        renderReviewsGrid();
        updateEmbedCode();
    });

    headerTitleInput.addEventListener('input', (e) => {
        headerTitle = e.target.value.trim();
        renderReviewsGrid();
        updateEmbedCode();
    });

    elementHeaderRatingToggle.addEventListener('change', (e) => {
        showHeaderRating = e.target.checked;
        renderReviewsGrid();
        updateEmbedCode();
    });

    elementHeaderButtonToggle.addEventListener('change', (e) => {
        showHeaderButton = e.target.checked;
        renderReviewsGrid();
        updateEmbedCode();
    });

    headerReviewUrlInput.addEventListener('input', (e) => {
        headerReviewUrl = e.target.value.trim();
        renderReviewsGrid();
        updateEmbedCode();
    });

    // Manual Review Form listener
    manualReviewForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const newReview = {
            name: manualReviewName.value.trim(),
            rating: parseInt(manualReviewRating.value, 10),
            date: manualReviewDate.value.trim() || 'Recente',
            text: manualReviewText.value.trim(),
            photo: manualReviewAvatar.value.trim(),
            reviewPhotos: manualReviewPhotos.value.trim() 
                ? manualReviewPhotos.value.trim().split(',').map(s => s.trim()).filter(Boolean) 
                : []
        };

        const nextId = curatedReviews.length > 0 ? Math.max(...curatedReviews.map(i => i.id)) + 1 : 0;

        const curatedItem = {
            id: nextId,
            checked: true,
            review: newReview
        };

        if (!currentReviewsData) {
            currentReviewsData = [];
        }
        currentReviewsData.push(newReview);
        curatedReviews.push(curatedItem);

        manualReviewForm.reset();

        errorMessage.classList.add('hidden');
        resultsSection.classList.remove('hidden');
        curationCard.classList.remove('hidden');

        renderCurationList();
        renderReviewsGrid();
        updateSentimentAnalytics(curatedReviews.map(i => i.review));
        updateKeywordTagCloud(curatedReviews.map(i => i.review));
        updateEmbedCode();

        setCustomizerPanel('layout', tabLayoutBtn);
    });

    // -------------------------------------------------------------
    // Mock Action & Scrape Action Handlers
    // -------------------------------------------------------------
    mockDataBtn.addEventListener('click', () => {
        loadData(mockReviews, mockAiSummary, "Bella Vista Gastronomia Local");
    });

    function loadData(reviews, aiSummary, placeName = "Estabelecimento Scrape") {
        // Clean Google review photo URLs to full-size original resolution
        if (reviews && reviews.length > 0) {
            reviews.forEach(r => {
                if (r.reviewPhotos && r.reviewPhotos.length > 0) {
                    r.reviewPhotos = r.reviewPhotos.map(url => {
                        const isGooglePhoto = /googleusercontent\.com|ggpht\.com|lh\d+\.google\.com/.test(url);
                        if (isGooglePhoto && url && url.includes('=')) {
                            const parts = url.split('=');
                            let param = parts[parts.length - 1];
                            const segments = param.split('-');
                            if (segments.length > 0 && (segments[0].match(/^(w|s)\d+$/) || segments[0] === 's0')) {
                                const remaining = segments.filter(seg => {
                                    if (seg.match(/^w\d+$/)) return false;
                                    if (seg.match(/^h\d+$/)) return false;
                                    if (seg === 'p' || seg === 'n') return false;
                                    if (seg.match(/^s\d+$/)) return false;
                                    return true;
                                });
                                param = ['s0', ...remaining].join('-');
                                parts[parts.length - 1] = param;
                                return parts.join('=');
                            }
                        }
                        return url;
                    });
                }
            });
        }

        currentReviewsData = reviews;
        currentReviewsAiSummary = aiSummary;

        // Default headerReviewUrl to current urlInput value if it starts with http
        if (urlInput.value && urlInput.value.startsWith('http') && !headerReviewUrl) {
            headerReviewUrl = urlInput.value;
            headerReviewUrlInput.value = urlInput.value;
        }

        // Populate curated reviews state
        curatedReviews = reviews.map((r, idx) => ({
            id: idx,
            checked: true,
            review: r
        }));

        errorMessage.classList.add('hidden');
        resultsSection.classList.remove('hidden');
        curationCard.classList.remove('hidden');

        // Draw curation items list UI
        renderCurationList();

        // Calculate analytics and keywords
        updateSentimentAnalytics(reviews);
        updateKeywordTagCloud(reviews);

        // Render preview widget
        renderReviewsGrid();

        // Draw generated codes list
        updateEmbedCode();
        
        // Push this extraction query to local history list
        pushToHistory(placeName, reviews.length, aiSummary ? aiSummary.averageRating : 5.0);
    }

    function setScraperLoading(isLoading) {
        urlInput.disabled = isLoading;
        submitBtn.disabled = isLoading;
        maxReviewsInput.disabled = isLoading;
        ratingFilterInput.disabled = isLoading;
        onlyWithTextInput.disabled = isLoading;
        minLengthInput.disabled = isLoading;
        keywordsFilterInput.disabled = isLoading;
        mockDataBtn.disabled = isLoading;

        if (isLoading) {
            btnText.textContent = 'Extraindo...';
            btnIcon.classList.add('hidden');
            loadingIcon.classList.remove('hidden');
            statusArea.classList.remove('hidden');
            submitBtn.classList.add('opacity-80', 'cursor-not-allowed');
        } else {
            btnText.textContent = 'Extrair do Google';
            btnIcon.classList.remove('hidden');
            loadingIcon.classList.add('hidden');
            statusArea.classList.add('hidden');
            submitBtn.classList.remove('opacity-80', 'cursor-not-allowed');
        }
    }

    function startProgressLogs() {
        let stepIdx = 0;
        statusMessage.textContent = progressSteps[stepIdx];
        progressTimer = setInterval(() => {
            if (stepIdx < progressSteps.length - 1) {
                stepIdx++;
                statusMessage.textContent = progressSteps[stepIdx];
            }
        }, 3600);
    }

    function stopProgressLogs() {
        if (progressTimer) {
            clearInterval(progressTimer);
            progressTimer = null;
        }
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const url = urlInput.value.trim();
        if (!url) return;

        setScraperLoading(true);
        errorMessage.classList.add('hidden');
        resultsSection.classList.add('hidden');
        curationCard.classList.add('hidden');
        reviewsPreviewWrapper.innerHTML = '';
        startProgressLogs();

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
                throw new Error(data.error || 'Falha ao processar o scraper de depoimentos.');
            }

            if (data.data && data.data.length > 0) {
                // Parse a clean name for local history target
                let resolvedTitle = "Maps Review Local";
                try {
                    const urlObj = new URL(url);
                    const pathParts = urlObj.pathname.split('/');
                    const placeIdx = pathParts.indexOf('place');
                    if (placeIdx !== -1 && pathParts[placeIdx + 1]) {
                        resolvedTitle = decodeURIComponent(pathParts[placeIdx + 1].replace(/\+/g, ' '));
                    }
                } catch(e) {}

                loadData(data.data, data.aiSummary, resolvedTitle);
            } else {
                throw new Error('Nenhum depoimento foi retornado. Verifique os filtros.');
            }

        } catch (err) {
            errorText.textContent = err.message;
            errorMessage.classList.remove('hidden');
        } finally {
            setScraperLoading(false);
            stopProgressLogs();
        }
    });

    // -------------------------------------------------------------
    // Saved Queries Local History Management
    // -------------------------------------------------------------
    function getHistory() {
        try {
            return JSON.parse(localStorage.getItem('extractor_history') || '[]');
        } catch(e) {
            return [];
        }
    }

    function pushToHistory(placeName, count, avgRating) {
        let history = getHistory();
        // Remove duplicate of same placeName
        history = history.filter(item => item.name !== placeName);
        
        history.unshift({
            name: placeName,
            count,
            rating: avgRating,
            timestamp: Date.now(),
            reviews: currentReviewsData,
            aiSummary: currentReviewsAiSummary
        });

        // Cap size to 5
        if (history.length > 5) {
            history.pop();
        }

        localStorage.setItem('extractor_history', JSON.stringify(history));
        renderHistory();
    }

    function renderHistory() {
        const history = getHistory();
        historyList.innerHTML = '';

        if (history.length === 0) {
            historyList.innerHTML = `<p class="text-[10px] text-slate-500 text-center py-2">Nenhuma consulta no histórico.</p>`;
            return;
        }

        history.forEach((item, index) => {
            const dateStr = new Date(item.timestamp).toLocaleDateString('pt-BR', {
                day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit'
            });
            const div = document.createElement('div');
            div.className = "group flex items-center justify-between p-2 bg-slate-950/80 hover:bg-slate-900 border border-slate-800/80 rounded-lg cursor-pointer transition-colors";
            div.innerHTML = `
                <div class="flex-grow pr-2 min-w-0">
                    <span class="block text-[10.5px] font-bold text-slate-300 truncate" title="${item.name}">${item.name}</span>
                    <div class="flex items-center gap-2 mt-0.5 text-[8.5px] text-slate-500">
                        <span>★ ${item.rating}</span>
                        <span>•</span>
                        <span>${item.count} depoimentos</span>
                    </div>
                </div>
                <span class="text-[7.5px] text-slate-600 flex-shrink-0 group-hover:text-brand-400 transition-colors">${dateStr}</span>
            `;

            div.addEventListener('click', () => {
                loadData(item.reviews, item.aiSummary, item.name);
            });
            historyList.appendChild(div);
        });
    }

    // -------------------------------------------------------------
    // Curation Panel Features & Handlers
    // -------------------------------------------------------------
    function renderCurationList() {
        curationItemsList.innerHTML = '';
        const searchVal = curationSearchInput.value.trim().toLowerCase();
        
        // 1. Filter locally using robust client-side filter
        let list = curatedReviews.filter(item => filterReviewItem(item, searchVal));

        // 2. Sort locally
        const sortVal = curationSortSelect.value;
        if (sortVal === 'stars-desc') {
            list.sort((a, b) => b.review.rating - a.review.rating);
        } else if (sortVal === 'stars-asc') {
            list.sort((a, b) => a.review.rating - b.review.rating);
        } else if (sortVal === 'text-desc') {
            list.sort((a, b) => (b.review.text || '').length - (a.review.text || '').length);
        } else if (sortVal === 'text-asc') {
            list.sort((a, b) => (a.review.text || '').length - (b.review.text || '').length);
        } else if (sortVal === 'shuffle') {
            // Simple deterministic linear shuffle mapping helper based on active curation ID index
            list.sort((a, b) => (Math.sin(a.id) - Math.sin(b.id)));
        } else {
            // original sort order by list ID
            list.sort((a, b) => a.id - b.id);
        }

        totalCurationCountBadge.textContent = `${list.length}/${curatedReviews.length}`;

        if (list.length === 0) {
            curationItemsList.innerHTML = `<p class="text-[10px] text-slate-500 text-center py-4">Nenhum depoimento condiz com a busca.</p>`;
            return;
        }

        list.forEach(item => {
            const card = document.createElement('div');
            const isActive = item.checked;
            card.className = `flex items-start space-x-3 p-3 rounded-xl border transition-all ${
                isActive 
                ? 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700' 
                : 'bg-slate-950/40 border-slate-900/60 opacity-60'
            }`;

            let stars = '';
            for(let i=0; i<5; i++) stars += (i < item.review.rating) ? '★' : '☆';

            const photoIndicator = (item.review.reviewPhotos && item.review.reviewPhotos.length > 0)
                ? `<span class="text-[8px] bg-indigo-500/10 text-indigo-400 px-1.5 py-0.5 rounded border border-indigo-500/20"><i class="fa-regular fa-image"></i> ${item.review.reviewPhotos.length} fotos</span>`
                : '';

            const highlightedComment = highlightText(item.review.text || '', searchVal);

            card.innerHTML = `
                <div class="pt-0.5 flex-shrink-0">
                    <input type="checkbox" ${isActive ? 'checked' : ''} class="w-4 h-4 rounded text-brand-500 bg-slate-950 border-slate-800 cursor-pointer" />
                </div>
                <div class="flex-grow min-w-0">
                    <div class="flex items-center justify-between gap-2">
                        <span class="text-[11px] font-bold text-slate-300 truncate">${item.review.name}</span>
                        <div class="flex items-center gap-1.5 flex-shrink-0">
                            <button type="button" class="edit-review-btn mr-1" title="Editar depoimento"><i class="fa-solid fa-pen text-[9px]"></i></button>
                            <button type="button" class="delete-review-btn mr-2" title="Excluir depoimento"><i class="fa-solid fa-trash text-[9px]"></i></button>
                            <span class="text-[9.5px] text-brand-400 font-mono">${stars}</span>
                            ${photoIndicator}
                        </div>
                    </div>
                    <span class="block text-[8px] text-slate-500">${item.review.date || 'Avaliação Recente'}</span>
                    <p class="text-[10px] text-slate-400 mt-1.5 italic line-clamp-2">${highlightedComment}</p>
                </div>
            `;

            // Wire individual toggles checkbox
            const checkbox = card.querySelector('input[type="checkbox"]');
            checkbox.addEventListener('change', (e) => {
                item.checked = e.target.checked;
                renderCurationList();
                renderReviewsGrid();
                updateEmbedCode();
            });

            // Wire edit button
            const editBtn = card.querySelector('.edit-review-btn');
            editBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                openEditModal(item.id);
            });

            // Wire delete button
            const deleteBtn = card.querySelector('.delete-review-btn');
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                deleteReview(item.id);
            });

            curationItemsList.appendChild(card);
        });
    }

    curationSearchInput.addEventListener('input', renderCurationList);
    curationSortSelect.addEventListener('change', () => {
        renderCurationList();
        renderReviewsGrid();
        updateEmbedCode();
    });

    curationCheckAll.addEventListener('click', () => {
        curatedReviews.forEach(item => item.checked = true);
        renderCurationList();
        renderReviewsGrid();
        updateEmbedCode();
    });

    curationUncheckAll.addEventListener('click', () => {
        curatedReviews.forEach(item => item.checked = false);
        renderCurationList();
        renderReviewsGrid();
        updateEmbedCode();
    });

    // Curation Filters change listeners
    document.querySelectorAll('.curation-star-filter').forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            activeStarsFilters.clear();
            document.querySelectorAll('.curation-star-filter').forEach(cb => {
                if (cb.checked) {
                    activeStarsFilters.add(cb.value);
                }
            });
            renderCurationList();
            renderReviewsGrid();
            updateEmbedCode();
        });
    });

    if (curationFilterTextOnly) {
        curationFilterTextOnly.addEventListener('change', (e) => {
            filterTextOnly = e.target.checked;
            renderCurationList();
            renderReviewsGrid();
            updateEmbedCode();
        });
    }

    if (curationFilterPhotoOnly) {
        curationFilterPhotoOnly.addEventListener('change', (e) => {
            filterPhotoOnly = e.target.checked;
            renderCurationList();
            renderReviewsGrid();
            updateEmbedCode();
        });
    }

    // -------------------------------------------------------------
    // Core HTML/CSS Widget Generators for different templates
    // -------------------------------------------------------------
    function getActiveReviews() {
        if (!curatedReviews) return [];
        const searchVal = curationSearchInput.value.trim().toLowerCase();
        // Map the currently checked, sorted curated reviews list, applying client-side active filters
        let activeList = curatedReviews.filter(item => item.checked && filterReviewItem(item, searchVal));

        // Apply same sorting configuration as the curation panel
        const sortVal = curationSortSelect.value;
        if (sortVal === 'stars-desc') {
            activeList.sort((a, b) => b.review.rating - a.review.rating);
        } else if (sortVal === 'stars-asc') {
            activeList.sort((a, b) => a.review.rating - b.review.rating);
        } else if (sortVal === 'text-desc') {
            activeList.sort((a, b) => (b.review.text || '').length - (a.review.text || '').length);
        } else if (sortVal === 'text-asc') {
            activeList.sort((a, b) => (a.review.text || '').length - (b.review.text || '').length);
        } else if (sortVal === 'shuffle') {
            activeList.sort((a, b) => (Math.sin(a.id) - Math.sin(b.id)));
        } else {
            activeList.sort((a, b) => a.id - b.id);
        }

        return activeList.map(item => item.review);
    }

    function buildWidgetHTMLAndCSS() {
        const activeReviews = getActiveReviews();
        
        // CSS Style values mapping
        const isDark = widgetTheme === 'dark';
        const bgVal = widgetBgType === 'transparent' ? 'transparent' : (isDark ? '#0f172a' : '#ffffff');
        const cardBgVal = isDark ? 'rgba(30, 41, 59, 0.45)' : '#f8fafc';
        const borderVal = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)';
        const textMainVal = isDark ? '#f8fafc' : '#0f172a';
        const textSecVal = isDark ? '#94a3b8' : '#475569';
        const quoteColorVal = isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.03)';
        
        // 0. Header Markup
        let headerHTML = '';
        if (showHeader) {
            let ratingStarsHTML = '';
            let averageRatingValue = '5.0';
            let totalReviewsCount = activeReviews.length;
            
            if (currentReviewsAiSummary) {
                averageRatingValue = currentReviewsAiSummary.averageRating;
            }
            
            const roundedRating = Math.round(parseFloat(averageRatingValue));
            for (let i = 1; i <= 5; i++) {
                ratingStarsHTML += (i <= roundedRating) ? '★' : '☆';
            }
            
            let ratingBlockHTML = '';
            if (showHeaderRating) {
                ratingBlockHTML = `
                <div class="widget-header-rating">
                    <span class="widget-header-avg">${averageRatingValue}</span>
                    <div class="widget-header-stars">${ratingStarsHTML}</div>
                    <span class="widget-header-count">(${totalReviewsCount} avaliações)</span>
                </div>`;
            }
            
            let buttonBlockHTML = '';
            if (showHeaderButton && headerReviewUrl) {
                buttonBlockHTML = `
                <a href="${headerReviewUrl}" target="_blank" rel="noopener noreferrer" class="widget-header-btn">
                    <svg class="google-icon" viewBox="0 0 24 24" width="14" height="14" style="margin-right: 6px; fill: currentColor; display: inline-block; vertical-align: middle;"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
                    <span style="display: inline-block; vertical-align: middle;">Avaliar no Google</span>
                </a>`;
            }
            
            headerHTML = `
            <div class="widget-header">
                <div class="widget-header-content">
                    <h2 class="widget-header-title">${headerTitle}</h2>
                    ${ratingBlockHTML}
                </div>
                ${buttonBlockHTML}
            </div>`;
        }
        
        // Card hover shadow mapping
        let cardShadowStyle = 'box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);';
        if (widgetShadowStyle === 'none') cardShadowStyle = 'box-shadow: none;';
        if (widgetShadowStyle === 'intense') cardShadowStyle = 'box-shadow: 0 20px 25px -5px rgba(0,0,0,0.25), 0 10px 10px -5px rgba(0,0,0,0.2);';

        let hoverCssEffect = '';
        if (widgetHoverEffect === 'lift') {
            hoverCssEffect = `
            .testimonial-card:hover {
                transform: translateY(-3px);
                box-shadow: 0 12px 20px rgba(0, 0, 0, 0.15) !important;
            }`;
        } else if (widgetHoverEffect === 'glow') {
            hoverCssEffect = `
            .testimonial-card:hover {
                transform: translateY(-3px);
                border-color: ${widgetAccentColor}cc !important;
                box-shadow: 0 0 15px ${widgetAccentColor}44 !important;
            }`;
        }

        // Font Sizes mapping
        let fontSizeBody = '12.5px';
        let fontSizeAuthor = '13.5px';
        if (widgetFontSize === 'compact') {
            fontSizeBody = '11.5px';
            fontSizeAuthor = '12px';
        } else if (widgetFontSize === 'large') {
            fontSizeBody = '14.5px';
            fontSizeAuthor = '15.5px';
        }

        // 1. AI Summary Card Markup
        let aiSummaryCardHTML = '';
        if (showAiSummary && currentReviewsAiSummary) {
            let bulletsHTML = '';
            currentReviewsAiSummary.highlights.forEach(hl => {
                bulletsHTML += `
                <div class="ai-bullet">
                    <svg viewBox="0 0 20 20" fill="currentColor" width="13" height="13"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l3-3z" clip-rule="evenodd" /></svg>
                    <span>${hl}</span>
                </div>`;
            });

            const cleanSummaryText = currentReviewsAiSummary.summary.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            const summaryCardClass = widgetTemplate === 'slide' ? 'ai-summary-card slide-item snap-item' : 'ai-summary-card';

            aiSummaryCardHTML = `
            <!-- AI Analysis summary card -->
            <div class="${summaryCardClass}">
                <div class="ai-body">
                    <div class="ai-header">
                        <span class="ai-spark">✨</span>
                        <div>
                            <span class="ai-tag">Análise Local</span>
                            <h4 class="ai-title">Resumo de IA Inteligente</h4>
                        </div>
                    </div>
                    <p class="ai-text">${cleanSummaryText}</p>
                    <div class="ai-highlights-box">
                        <span class="ai-box-title">Destaques Principais:</span>
                        <div class="ai-bullets-list">${bulletsHTML}</div>
                    </div>
                </div>
                <div class="ai-footer">
                    <span>Média local: ★ ${currentReviewsAiSummary.averageRating}</span>
                    <span>Análise de ${currentReviewsAiSummary.totalAnalyzed} depoimentos</span>
                </div>
            </div>
            `;
        }

        // 2. Reviews Cards Markup
        let cardsHTML = '';
        activeReviews.forEach((review, index) => {
            let stars = '';
            for (let i = 1; i <= 5; i++) {
                stars += (i <= review.rating) ? '★' : '☆';
            }

            const avatarMarkup = showAvatars
                ? (review.photo 
                    ? `<img src="${review.photo}" referrerpolicy="no-referrer" alt="${review.name}" class="author-avatar" />`
                    : `<div class="author-avatar-fallback">${review.name.substring(0,2).toUpperCase()}</div>`)
                : '';

            const dateMarkup = showDates ? `<span class="testimonial-date">${review.date || 'Recente'}</span>` : '';
            const watermarkMarkup = showGoogleLogo 
                ? `<div class="google-logo-badge">
                    <svg viewBox="0 0 24 24" width="13" height="13"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                   </div>`
                : '';

            // Attached review photos thumbnails
            let photosMarkup = '';
            if (showPhotos && review.reviewPhotos && review.reviewPhotos.length > 0) {
                photosMarkup += `<div class="attached-photos-strip">`;
                review.reviewPhotos.forEach((photo, pIdx) => {
                    photosMarkup += `<img src="${photo}" referrerpolicy="no-referrer" alt="Attached Pic" class="thumb-photo-item" data-idx="${pIdx}" />`;
                });
                photosMarkup += `</div>`;
            }

            // Text clamp/Ler Mais limits
            let textMarkup = '';
            const commentText = review.text || 'Avaliação sem comentário escrito.';
            if (widgetTextClamp === 'clamp' && commentText.length > widgetTextLengthLimit) {
                textMarkup = `
                <p class="testimonial-content-text line-clamp-4" style="font-size: ${fontSizeBody};">${commentText}</p>
                <button type="button" class="read-more-trigger">Ler mais</button>
                `;
            } else {
                textMarkup = `<p class="testimonial-content-text" style="font-size: ${fontSizeBody};">${commentText}</p>`;
            }

            const cardClass = widgetTemplate === 'slide' ? 'testimonial-card slide-item snap-item' : 'testimonial-card';

            cardsHTML += `
            <!-- Card ${index + 1} -->
            <div class="${cardClass}" data-index="${index}">
                <div class="card-top">
                    ${watermarkMarkup}
                    <div class="card-header">
                        ${avatarMarkup}
                        <div class="author-info">
                            <span class="author-name" style="font-size: ${fontSizeAuthor};">${review.name}</span>
                            ${dateMarkup}
                        </div>
                    </div>
                    <div class="stars-line">${stars}</div>
                    <div class="card-body">
                        <span class="card-quote">“</span>
                        <div class="card-text-wrapper">${textMarkup}</div>
                    </div>
                </div>
                ${photosMarkup}
            </div>
            `;
        });

        // 3. Structural template markup compilation
        let containerHTML = '';
        let templateCSS = '';

        if (widgetTemplate === 'grid') {
            containerHTML = `
            <div class="google-reviews-grid-layout">
                ${aiSummaryCardHTML}
                ${cardsHTML}
            </div>`;
            
            templateCSS = `
            .google-reviews-grid-layout {
                display: grid;
                grid-template-columns: repeat(1, minmax(0, 1fr));
                gap: ${widgetGap};
                width: 100%;
            }
            @media (min-width: 640px) {
                .google-reviews-grid-layout {
                    grid-template-columns: repeat(${widgetCols === '1' ? '1' : '2'}, minmax(0, 1fr));
                }
            }
            @media (min-width: 1024px) {
                .google-reviews-grid-layout {
                    grid-template-columns: repeat(${widgetCols}, minmax(0, 1fr));
                }
            }`;
        } else if (widgetTemplate === 'masonry') {
            containerHTML = `
            <div class="google-reviews-masonry-layout">
                ${aiSummaryCardHTML}
                ${cardsHTML}
            </div>`;
            
            templateCSS = `
            .google-reviews-masonry-layout {
                column-count: 1;
                column-gap: ${widgetGap};
                width: 100%;
            }
            @media (min-width: 640px) {
                .google-reviews-masonry-layout {
                    column-count: ${widgetCols === '1' ? '1' : '2'};
                }
            }
            @media (min-width: 1024px) {
                .google-reviews-masonry-layout {
                    column-count: ${widgetCols};
                }
            }
            .google-reviews-masonry-layout .testimonial-card,
            .google-reviews-masonry-layout .ai-summary-card {
                display: inline-block;
                width: 100%;
                margin-bottom: ${widgetGap};
                box-sizing: border-box;
            }`;
        } else if (widgetTemplate === 'slide') {
            const sliderStyleCss = widgetSliderStyle === 'single' ? 'min-width: 100%; width: 100%;' : 'min-width: 320px; width: 320px;';
            const showNavControls = activeReviews.length > 1;

            containerHTML = `
            <div class="google-reviews-slider-layout">
                ${showNavControls ? `
                <div class="slider-nav-arrows">
                    <button type="button" class="nav-arrow-btn prev" id="slider-arrow-prev">&#10094;</button>
                    <button type="button" class="nav-arrow-btn next" id="slider-arrow-next">&#10095;</button>
                </div>` : ''}
                <div class="testimonials-slider-viewport">
                    ${aiSummaryCardHTML}
                    ${cardsHTML}
                </div>
            </div>`;

            templateCSS = `
            .google-reviews-slider-layout {
                position: relative;
                width: 100%;
            }
            .testimonials-slider-viewport {
                display: flex;
                gap: ${widgetGap};
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
            .slide-item {
                flex-shrink: 0;
                scroll-snap-align: center;
                ${sliderStyleCss}
            }
            .slider-nav-arrows {
                display: flex;
                justify-content: flex-end;
                gap: 8px;
                margin-bottom: 12px;
            }
            .nav-arrow-btn {
                width: 34px;
                height: 34px;
                border-radius: 8px;
                background: ${cardBgVal};
                border: 1px solid ${borderVal};
                color: ${textMainVal};
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 13px;
                transition: all 0.2s ease;
            }
            .nav-arrow-btn:hover {
                background: ${widgetAccentColor};
                color: #ffffff;
                border-color: ${widgetAccentColor};
            }`;
        } else if (widgetTemplate === 'list') {
            containerHTML = `
            <div class="google-reviews-list-layout">
                ${aiSummaryCardHTML}
                ${cardsHTML}
            </div>`;

            templateCSS = `
            .google-reviews-list-layout {
                display: flex;
                flex-direction: column;
                gap: 16px;
                width: 100%;
                max-width: 650px;
                margin: 0 auto;
            }`;
        } else if (widgetTemplate === 'badge') {
            // Summary Badge markup
            const avg = currentReviewsAiSummary ? currentReviewsAiSummary.averageRating : 5.0;
            const tot = currentReviewsAiSummary ? currentReviewsAiSummary.totalAnalyzed : activeReviews.length;
            let badgeStars = '';
            for(let i=0; i<5; i++) badgeStars += (i < Math.round(avg)) ? '★' : '☆';

            containerHTML = `
            <div class="google-reviews-badge-layout">
                <div class="badge-logo-holder">
                    <svg viewBox="0 0 24 24" width="26" height="26"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                </div>
                <div class="badge-meta">
                    <span class="badge-text-title">Avaliações do Google</span>
                    <div class="badge-rating-stars-line">
                        <span class="badge-avg">${avg}</span>
                        <span class="badge-stars">${badgeStars}</span>
                    </div>
                    <span class="badge-text-count">Baseado em ${tot} depoimentos</span>
                </div>
            </div>`;

            templateCSS = `
            .google-reviews-badge-layout {
                display: inline-flex;
                align-items: center;
                gap: 14px;
                padding: 12px 20px;
                border-radius: ${widgetBorderRadius};
                background: ${cardBgVal};
                border: 1px solid ${borderVal};
                ${cardShadowStyle}
                font-family: ${widgetFontFamily};
                color: ${textMainVal};
            }
            .badge-logo-holder {
                display: flex;
                align-items: center;
                justify-content: center;
                background: ${isDark ? '#1e293b' : '#ffffff'};
                border-radius: 50%;
                width: 38px;
                height: 38px;
                box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            }
            .badge-meta {
                display: flex;
                flex-direction: column;
            }
            .badge-text-title {
                font-weight: 700;
                font-size: 11.5px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }
            .badge-rating-stars-line {
                display: flex;
                align-items: center;
                gap: 6px;
                margin-top: 2px;
            }
            .badge-avg {
                font-weight: 800;
                font-size: 13.5px;
                color: ${widgetAccentColor};
            }
            .badge-stars {
                color: ${widgetAccentColor};
                font-size: 12px;
                letter-spacing: 1px;
            }
            .badge-text-count {
                font-size: 9px;
                color: ${textSecVal};
                margin-top: 1px;
            }`;
        } else if (widgetTemplate === 'floating') {
            // Floating badge preview (rendered layout)
            const avg = currentReviewsAiSummary ? currentReviewsAiSummary.averageRating : 5.0;
            let badgeStars = '';
            for(let i=0; i<5; i++) badgeStars += (i < Math.round(avg)) ? '★' : '☆';

            containerHTML = `
            <div class="google-reviews-floating-widget-wrapper">
                <div class="floating-badge-trigger" id="floating-widget-trigger">
                    <svg viewBox="0 0 24 24" width="20" height="20"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                    <div class="trigger-meta">
                        <span class="trigger-stars">${badgeStars}</span>
                        <span class="trigger-text">${avg} Google Rating</span>
                    </div>
                </div>
                
                <div class="floating-panel hidden" id="floating-widget-panel">
                    <div class="floating-panel-header">
                        <span class="panel-title">⭐ Avaliações do Google</span>
                        <button type="button" class="panel-close-btn" id="floating-widget-close">&times;</button>
                    </div>
                    <div class="floating-panel-body">
                        ${aiSummaryCardHTML}
                        ${cardsHTML}
                    </div>
                </div>
            </div>`;

            templateCSS = `
            .google-reviews-floating-widget-wrapper {
                position: relative;
                font-family: ${widgetFontFamily};
                color: ${textMainVal};
                display: inline-block;
            }
            .floating-badge-trigger {
                display: flex;
                align-items: center;
                gap: 10px;
                padding: 10px 16px;
                border-radius: 50px;
                background: ${cardBgVal};
                border: 1px solid ${borderVal};
                ${cardShadowStyle}
                cursor: pointer;
                transition: transform 0.2s ease;
            }
            .floating-badge-trigger:hover {
                transform: scale(1.03);
            }
            .trigger-meta {
                display: flex;
                flex-direction: column;
            }
            .trigger-stars {
                color: ${widgetAccentColor};
                font-size: 10px;
                letter-spacing: 0.5px;
            }
            .trigger-text {
                font-size: 9px;
                font-weight: 700;
                color: ${textMainVal};
            }
            .floating-panel {
                position: absolute;
                bottom: 50px;
                right: 0;
                width: 340px;
                max-height: 480px;
                background: ${bgVal};
                border-radius: ${widgetBorderRadius};
                border: 1px solid ${borderVal};
                box-shadow: 0 15px 35px rgba(0,0,0,0.3);
                display: flex;
                flex-direction: column;
                z-index: 99999;
                overflow: hidden;
            }
            .floating-panel.hidden {
                display: none;
            }
            .floating-panel-header {
                padding: 12px 16px;
                border-bottom: 1px solid ${borderVal};
                background: ${cardBgVal};
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            .panel-title {
                font-weight: 700;
                font-size: 11px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }
            .panel-close-btn {
                background: none;
                border: none;
                color: ${textSecVal};
                font-size: 20px;
                cursor: pointer;
                line-height: 1;
            }
            .floating-panel-body {
                padding: 16px;
                overflow-y: auto;
                display: flex;
                flex-direction: column;
                gap: 14px;
            }
            .floating-panel-body::-webkit-scrollbar {
                width: 4px;
            }
            .floating-panel-body::-webkit-scrollbar-thumb {
                background: ${widgetAccentColor}33;
                border-radius: 4px;
            }`;
        }

        // Shared CSS styling base structure injected into widget block
        const globalCSS = `
        /* Widget Header Styles */
        .widget-header {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 16px;
            margin-bottom: 24px;
            padding-bottom: 16px;
            border-bottom: 1px solid ${borderVal};
        }
        .widget-header-content {
            display: flex;
            flex-direction: column;
            gap: 6px;
        }
        .widget-header-title {
            font-size: 20px;
            font-weight: 800;
            color: ${textMainVal};
            margin: 0;
            line-height: 1.25;
            letter-spacing: -0.02em;
        }
        .widget-header-rating {
            display: flex;
            align-items: center;
            gap: 8px;
            flex-wrap: wrap;
        }
        .widget-header-avg {
            font-size: 16px;
            font-weight: 800;
            color: ${textMainVal};
        }
        .widget-header-stars {
            color: ${widgetAccentColor};
            font-size: 14px;
            letter-spacing: 1.5px;
            line-height: 1;
        }
        .widget-header-count {
            font-size: 12px;
            color: ${textSecVal};
            font-weight: 500;
        }
        .widget-header-btn {
            background-color: ${widgetAccentColor};
            color: #ffffff;
            font-size: 13px;
            font-weight: 700;
            padding: 10px 18px;
            border-radius: ${widgetBorderRadius};
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            border: 1px solid transparent;
        }
        .widget-header-btn:hover {
            transform: translateY(-1px);
            opacity: 0.95;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }
        .widget-header-btn:active {
            transform: translateY(0);
        }
        .google-icon {
            flex-shrink: 0;
        }
        @media (max-width: 640px) {
            .widget-header {
                flex-direction: column;
                align-items: flex-start;
                gap: 12px;
            }
            .widget-header-btn {
                width: 100%;
                justify-content: center;
            }
        }

        /* Widget Styling Core Wrapper */
        .reviews-widget-container {
            font-family: ${widgetFontFamily};
            background-color: ${bgVal};
            border-radius: 20px;
            padding: 24px;
            box-sizing: border-box;
            position: relative;
            overflow: hidden;
            width: 100%;
        }

        /* Testimonial Cards Layout styles */
        .testimonial-card {
            background-color: ${cardBgVal};
            border: 1px solid ${borderVal};
            border-radius: ${widgetBorderRadius};
            padding: 18px;
            position: relative;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            ${cardShadowStyle}
            transition: all 0.25s ease;
        }

        ${hoverCssEffect}

        .google-logo-badge {
            position: absolute;
            top: 14px;
            right: 14px;
            width: 22px;
            height: 22px;
            background-color: ${bgVal === 'transparent' ? (isDark ? '#0f172a' : '#ffffff') : bgVal};
            border: 1px solid ${borderVal};
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 2px 4px rgba(0,0,0,0.06);
        }

        .card-header {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 10px;
        }

        .author-avatar {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            object-fit: cover;
            border: 2px solid ${bgVal === 'transparent' ? (isDark ? '#0f172a' : '#ffffff') : bgVal};
        }

        .author-avatar-fallback {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background-color: ${widgetAccentColor};
            color: #ffffff;
            font-weight: 700;
            font-size: 11px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 2px solid ${bgVal === 'transparent' ? (isDark ? '#0f172a' : '#ffffff') : bgVal};
        }

        .author-info {
            display: flex;
            flex-direction: column;
        }

        .author-name {
            font-weight: 750;
            color: ${textMainVal};
            line-height: 1.2;
        }

        .testimonial-date {
            font-size: 9px;
            color: ${textSecVal};
            margin-top: 1px;
        }

        .stars-line {
            color: ${widgetAccentColor};
            font-size: 11px;
            letter-spacing: 1.5px;
            margin-bottom: 10px;
        }

        .card-body {
            position: relative;
        }

        .card-quote {
            position: absolute;
            top: -12px;
            left: -8px;
            font-size: 32px;
            color: ${quoteColorVal};
            font-family: Georgia, serif;
            user-select: none;
        }

        .testimonial-content-text {
            line-height: 1.6;
            color: ${textSecVal};
            margin: 0;
            font-weight: 400;
            position: relative;
            z-index: 5;
        }

        .read-more-trigger {
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
        .read-more-trigger:hover {
            text-decoration: underline;
        }

        /* Review attached images styles */
        .attached-photos-strip {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            margin-top: 12px;
        }
        .thumb-photo-item {
            width: 44px;
            height: 44px;
            border-radius: 8px;
            object-fit: cover;
            border: 1px solid ${borderVal};
            cursor: zoom-in;
            transition: transform 0.2s ease;
        }
        .thumb-photo-item:hover {
            transform: scale(1.05);
        }

        /* AI Analysis Card Styles */
        .ai-summary-card {
            background: linear-gradient(135deg, ${widgetAccentColor}cf 0%, #1e1b4bcd 100%);
            color: #ffffff;
            padding: 20px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: ${widgetBorderRadius};
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            gap: 14px;
            ${cardShadowStyle}
        }
        .ai-header {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .ai-spark {
            width: 26px;
            height: 26px;
            border-radius: 6px;
            background: rgba(255,255,255,0.15);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 13px;
        }
        .ai-tag {
            font-size: 8px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            color: rgba(255,255,255,0.7);
            display: block;
        }
        .ai-title {
            font-weight: 750;
            font-size: 11px;
            margin: 0;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .ai-text {
            font-size: 11.5px;
            line-height: 1.6;
            margin: 0;
            font-weight: 500;
        }
        .ai-highlights-box {
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            padding-top: 10px;
        }
        .ai-box-title {
            font-size: 8.5px;
            font-weight: 700;
            text-transform: uppercase;
            color: rgba(255,255,255,0.8);
            margin-bottom: 5px;
            display: block;
        }
        .ai-bullets-list {
            display: flex;
            flex-direction: column;
            gap: 4px;
        }
        .ai-bullet {
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 10.5px;
            font-weight: 600;
        }
        .ai-footer {
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            padding-top: 8px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 9px;
            color: rgba(255, 255, 255, 0.6);
        }

        /* Responsive Clamping lines classes */
        .line-clamp-4 {
            display: -webkit-box;
            -webkit-line-clamp: 4;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }

        /* Built-in Embed Zoom Lightbox modal styling */
        .embed-photo-lightbox {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0,0,0,0.92);
            z-index: 999999;
            display: flex;
            align-items: center;
            justify-content: center;
            box-sizing: border-box;
            padding: 20px;
        }
        .embed-photo-lightbox.hidden {
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

        const finalWidgetHTML = `
        <div id="google-reviews-widget" class="reviews-widget-container">
            ${headerHTML}
            ${containerHTML}
            
            <!-- Floating embed lightbox popup modal -->
            <div id="embed-lightbox-modal" class="embed-photo-lightbox hidden">
                <button type="button" class="lightbox-close-btn" id="embed-lightbox-close">&times;</button>
                <button type="button" class="lightbox-nav-btn prev-btn" id="embed-lightbox-prev">&#10094;</button>
                <button type="button" class="lightbox-nav-btn next-btn" id="embed-lightbox-next">&#10095;</button>
                <div class="lightbox-content-box">
                    <img id="embed-lightbox-img" src="" referrerpolicy="no-referrer" alt="Zoom Photo" />
                </div>
            </div>
        </div>
        `;

        return {
            html: finalWidgetHTML,
            css: `${globalCSS}\n${templateCSS}`
        };
    }

    // -------------------------------------------------------------
    // Live Preview Rendering and Embed Updating Lógicas
    // -------------------------------------------------------------
    function renderReviewsGrid() {
        if (!currentReviewsData) return;

        // Clear existing slider loops
        if (previewCarouselTimer) {
            clearInterval(previewCarouselTimer);
            previewCarouselTimer = null;
        }

        const { html, css } = buildWidgetHTMLAndCSS();
        
        reviewsPreviewWrapper.innerHTML = `
        <style>
            ${css}
        </style>
        ${html}
        `;

        // Interactive wires within the preview container
        const widget = reviewsPreviewWrapper.querySelector('#google-reviews-widget');
        if (!widget) return;

        const activeReviews = getActiveReviews();

        // 1. Slider controls wire
        const prevBtn = widget.querySelector('#slider-arrow-prev');
        const nextBtn = widget.querySelector('#slider-arrow-next');
        const viewport = widget.querySelector('.testimonials-slider-viewport');

        if (prevBtn && nextBtn && viewport) {
            prevBtn.addEventListener('click', () => {
                viewport.scrollBy({ left: -330, behavior: 'smooth' });
            });
            nextBtn.addEventListener('click', () => {
                viewport.scrollBy({ left: 330, behavior: 'smooth' });
            });
        }

        // Coverflow 3D scale evaluate
        const isCenterMode = widgetSliderStyle === 'center';
        const accentColor = widgetAccentColor;

        if (viewport && isCenterMode) {
            const updateCenterScale = () => {
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

            viewport.addEventListener('scroll', updateCenterScale);
            setTimeout(updateCenterScale, 150);
        }

        // Autoplay Loop execution
        if (viewport && widgetAutoPlay === 'on') {
            previewCarouselTimer = setInterval(() => {
                const maxScroll = viewport.scrollWidth - viewport.clientWidth;
                if (viewport.scrollLeft >= maxScroll - 5) {
                    viewport.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    viewport.scrollBy({ left: 330, behavior: 'smooth' });
                }
            }, widgetAutoPlaySpeed);

            // Pause loop on mouse hover
            const stopLoop = () => clearInterval(previewCarouselTimer);
            viewport.addEventListener('mouseenter', stopLoop);
            viewport.addEventListener('touchstart', stopLoop);
        }

        // 2. Read More collapse wire
        const expanders = widget.querySelectorAll('.read-more-trigger');
        expanders.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const textPara = e.target.previousElementSibling;
                const isClamped = textPara.classList.toggle('line-clamp-4');
                e.target.textContent = isClamped ? 'Ler mais' : 'Ler menos';
            });
        });

        // 3. Floating Widget toggling trigger
        const floatTrigger = widget.querySelector('#floating-widget-trigger');
        const floatPanel = widget.querySelector('#floating-widget-panel');
        const floatClose = widget.querySelector('#floating-widget-close');

        if (floatTrigger && floatPanel) {
            floatTrigger.addEventListener('click', () => {
                floatPanel.classList.toggle('hidden');
            });
        }
        if (floatClose && floatPanel) {
            floatClose.addEventListener('click', (e) => {
                e.stopPropagation();
                floatPanel.classList.add('hidden');
            });
        }

        // 4. Photo zoom lightbox wire
        const lboxModal = widget.querySelector('#embed-lightbox-modal');
        const lboxImg = widget.querySelector('#embed-lightbox-img');
        const lboxClose = widget.querySelector('#embed-lightbox-close');
        const lboxPrev = widget.querySelector('#embed-lightbox-prev');
        const lboxNext = widget.querySelector('#embed-lightbox-next');

        if (lboxModal && lboxImg) {
            let photoList = [];
            let photoIdx = 0;

            const thumbs = widget.querySelectorAll('.thumb-photo-item');
            thumbs.forEach(thumb => {
                thumb.addEventListener('click', (e) => {
                    const card = e.target.closest('.testimonial-card');
                    const idx = parseInt(card.getAttribute('data-index'), 10);
                    const pIdx = parseInt(e.target.getAttribute('data-idx'), 10);

                    const rev = activeReviews[idx];
                    if (rev && rev.reviewPhotos) {
                        photoList = rev.reviewPhotos;
                        photoIdx = pIdx;

                        lboxImg.src = photoList[photoIdx];
                        lboxModal.classList.remove('hidden');
                        updateLboxArrows();
                    }
                });
            });

            const closeLbox = () => {
                lboxModal.classList.add('hidden');
                lboxImg.src = '';
            };

            if (lboxClose) lboxClose.addEventListener('click', closeLbox);
            lboxModal.addEventListener('click', (e) => {
                if (e.target === lboxModal) closeLbox();
            });

            const updateLboxArrows = () => {
                if (!lboxPrev || !lboxNext) return;
                if (photoList.length > 1) {
                    lboxPrev.style.display = 'block';
                    lboxNext.style.display = 'block';
                } else {
                    lboxPrev.style.display = 'none';
                    lboxNext.style.display = 'none';
                }
            };

            if (lboxPrev) {
                lboxPrev.addEventListener('click', () => {
                    photoIdx = (photoIdx - 1 + photoList.length) % photoList.length;
                    lboxImg.src = photoList[photoIdx];
                });
            }

            if (lboxNext) {
                lboxNext.addEventListener('click', () => {
                    photoIdx = (photoIdx + 1) % photoList.length;
                    lboxImg.src = photoList[photoIdx];
                });
            }
        }
    }

    // -------------------------------------------------------------
    // Code Area & Copy Code Trigger
    // -------------------------------------------------------------
    function setTab(tab) {
        activeCodeTab = tab;
        [tabEmbedBtn, tabJsonBtn, tabMarkdownBtn].forEach(btn => {
            btn.className = "px-3 py-2 text-[11px] font-bold border-b-2 border-transparent text-slate-400 hover:text-slate-200 focus:outline-none whitespace-nowrap flex items-center gap-1";
        });

        if (tab === 'embed') {
            tabEmbedBtn.className = "px-3 py-2 text-[11px] font-bold border-b-2 border-brand-500 text-brand-400 focus:outline-none whitespace-nowrap flex items-center gap-1";
        } else if (tab === 'json') {
            tabJsonBtn.className = "px-3 py-2 text-[11px] font-bold border-b-2 border-brand-500 text-brand-400 focus:outline-none whitespace-nowrap flex items-center gap-1";
        } else if (tab === 'markdown') {
            tabMarkdownBtn.className = "px-3 py-2 text-[11px] font-bold border-b-2 border-brand-500 text-brand-400 focus:outline-none whitespace-nowrap flex items-center gap-1";
        }
        updateEmbedCode();
    }

    tabEmbedBtn.addEventListener('click', () => setTab('embed'));
    tabJsonBtn.addEventListener('click', () => setTab('json'));
    tabMarkdownBtn.addEventListener('click', () => setTab('markdown'));

    copyCodeBtn.addEventListener('click', () => {
        const txt = codeArea.textContent;
        navigator.clipboard.writeText(txt).then(() => {
            const originalHTML = copyCodeBtn.innerHTML;
            copyCodeBtn.innerHTML = '<i class="fa-solid fa-circle-check text-green-400 mr-1 text-xs"></i> Copiado!';
            setTimeout(() => {
                copyCodeBtn.innerHTML = originalHTML;
            }, 2000);
        });
    });

    function updateEmbedCode() {
        if (!currentReviewsData) return;

        const activeReviews = getActiveReviews();

        if (activeCodeTab === 'embed') {
            const { html, css } = buildWidgetHTMLAndCSS();
            const autoPlayOn = widgetAutoPlay === 'on';
            const isCenterMode = widgetSliderStyle === 'center';

            const templateCode = `<!-- Google Testimonials Embed Widget -->
${html}

<style>
${css}
</style>

<script>
(function() {
    const widget = document.getElementById('google-reviews-widget');
    if (!widget) return;

    const accentColor = '${widgetAccentColor}';

    // 1. Slider controls navigation (Carrossel)
    const prevBtn = widget.querySelector('#slider-arrow-prev');
    const nextBtn = widget.querySelector('#slider-arrow-next');
    const viewport = widget.querySelector('.testimonials-slider-viewport');

    if (prevBtn && nextBtn && viewport) {
        prevBtn.addEventListener('click', () => {
            viewport.scrollBy({ left: -330, behavior: 'smooth' });
        });
        nextBtn.addEventListener('click', () => {
            viewport.scrollBy({ left: 330, behavior: 'smooth' });
        });
    }

    // Coverflow 3D scale implementation
    const isCenterMode = ${isCenterMode};
    if (viewport && isCenterMode) {
        const updateCenterScale = () => {
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
        viewport.addEventListener('scroll', updateCenterScale);
        setTimeout(updateCenterScale, 150);
    }

    // Carousel Autoplay script
    const autoPlayOn = ${autoPlayOn};
    if (viewport && autoPlayOn) {
        let timer = setInterval(() => {
            const maxScroll = viewport.scrollWidth - viewport.clientWidth;
            if (viewport.scrollLeft >= maxScroll - 5) {
                viewport.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                viewport.scrollBy({ left: 330, behavior: 'smooth' });
            }
        }, ${widgetAutoPlaySpeed});

        const stop = () => clearInterval(timer);
        viewport.addEventListener('mouseenter', stop);
        viewport.addEventListener('touchstart', stop);
    }

    // 2. Read More Text toggling expanders
    const expanders = widget.querySelectorAll('.read-more-trigger');
    expanders.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const textPara = e.target.previousElementSibling;
            const isClamped = textPara.classList.toggle('line-clamp-4');
            e.target.textContent = isClamped ? 'Ler mais' : 'Ler menos';
        });
    });

    // 3. Floating Widget toggles
    const floatTrigger = widget.querySelector('#floating-widget-trigger');
    const floatPanel = widget.querySelector('#floating-widget-panel');
    const floatClose = widget.querySelector('#floating-widget-close');

    if (floatTrigger && floatPanel) {
        floatTrigger.addEventListener('click', () => {
            floatPanel.classList.toggle('hidden');
        });
    }
    if (floatClose && floatPanel) {
        floatClose.addEventListener('click', (e) => {
            e.stopPropagation();
            floatPanel.classList.add('hidden');
        });
    }

    // 4. Photo Zoom Lightbox logic
    const reviewsPhotosList = ${JSON.stringify(activeReviews.map(r => r.reviewPhotos || []))};
    const lboxModal = widget.querySelector('#embed-lightbox-modal');
    const lboxImg = widget.querySelector('#embed-lightbox-img');
    const lboxClose = widget.querySelector('#embed-lightbox-close');
    const lboxPrev = widget.querySelector('#embed-lightbox-prev');
    const lboxNext = widget.querySelector('#embed-lightbox-next');

    if (lboxModal && lboxImg) {
        let photoList = [];
        let photoIdx = 0;

        const thumbs = widget.querySelectorAll('.thumb-photo-item');
        thumbs.forEach(thumb => {
            thumb.addEventListener('click', (e) => {
                const card = e.target.closest('.testimonial-card');
                const idx = parseInt(card.getAttribute('data-index'), 10);
                const pIdx = parseInt(e.target.getAttribute('data-idx'), 10);

                photoList = reviewsPhotosList[idx] || [];
                photoIdx = pIdx;

                lboxImg.src = photoList[photoIdx];
                lboxModal.classList.remove('hidden');
                updateArrows();
            });
        });

        const close = () => {
            lboxModal.classList.add('hidden');
            lboxImg.src = '';
        };

        if (lboxClose) lboxClose.addEventListener('click', close);
        lboxModal.addEventListener('click', (e) => {
            if (e.target === lboxModal) close();
        });

        const updateArrows = () => {
            if (!lboxPrev || !lboxNext) return;
            if (photoList.length > 1) {
                lboxPrev.style.display = 'block';
                lboxNext.style.display = 'block';
            } else {
                lboxPrev.style.display = 'none';
                lboxNext.style.display = 'none';
            }
        };

        if (lboxPrev) {
            lboxPrev.addEventListener('click', () => {
                photoIdx = (photoIdx - 1 + photoList.length) % photoList.length;
                lboxImg.src = photoList[photoIdx];
            });
        }
        if (lboxNext) {
            lboxNext.addEventListener('click', () => {
                photoIdx = (photoIdx + 1) % photoList.length;
                lboxImg.src = photoList[photoIdx];
            });
        }
    }
})();
<\/script>`;

            codeArea.textContent = templateCode;
        } else if (activeCodeTab === 'json') {
            codeArea.textContent = JSON.stringify(activeReviews, null, 2);
        } else if (activeCodeTab === 'markdown') {
            let md = `# Depoimentos Curados do Google Maps\n\n`;

            if (showAiSummary && currentReviewsAiSummary) {
                md += `## 🤖 Resumo Inteligente de IA\n\n`;
                md += `> "${currentReviewsAiSummary.summary}"\n\n`;
                md += `**Destaques Principais:**\n`;
                currentReviewsAiSummary.highlights.forEach(hl => {
                    md += `- ${hl}\n`;
                });
                md += `\n---\n\n`;
            }

            activeReviews.forEach(r => {
                let stars = '';
                for(let i=0; i<r.rating; i++) stars += '★';
                md += `### ${r.name} (${stars})\n`;
                if (r.date) md += `*${r.date}*\n\n`;
                md += `> "${r.text || 'Avaliação sem texto.'}"\n\n`;

                if (r.reviewPhotos && r.reviewPhotos.length > 0) {
                    md += `**Fotos anexadas:**\n`;
                    r.reviewPhotos.forEach(p => {
                        md += `- ![Foto do Depoimento](${p})\n`;
                    });
                    md += `\n`;
                }
                md += `---\n\n`;
            });

            codeArea.textContent = md;
        }
    }

    // -------------------------------------------------------------
    // Export Data Files Functions
    // -------------------------------------------------------------
    btnExportCSV.addEventListener('click', () => {
        const activeReviews = getActiveReviews();
        if (activeReviews.length === 0) return;

        // Escape CSV quotes helper
        const escapeCSV = (str) => `"${(str || '').replace(/"/g, '""').replace(/\r?\n/g, ' ')}"`;

        let csvContent = "data:text/csv;charset=utf-8,Nome,Nota,Data,Texto,Fotos\n";
        
        activeReviews.forEach(r => {
            const row = [
                escapeCSV(r.name),
                r.rating,
                escapeCSV(r.date),
                escapeCSV(r.text),
                escapeCSV((r.reviewPhotos || []).join('; '))
            ].join(',');
            csvContent += row + "\n";
        });

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `depoimentos_google_${Date.now()}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });

    btnDownloadWidget.addEventListener('click', () => {
        const { html, css } = buildWidgetHTMLAndCSS();
        const activeReviews = getActiveReviews();
        const autoPlayOn = widgetAutoPlay === 'on';
        const isCenterMode = widgetSliderStyle === 'center';

        // Compiles a fully independent, beautiful HTML package file!
        const htmlFileContent = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Depoimentos Incorporados - Google Maps</title>
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Inter:wght@400;500;600;700&family=Montserrat:wght@500;700&family=Roboto:wght@400;700&family=Playfair+Display:wght@500;700&display=swap" rel="stylesheet">
    <style>
        body {
            margin: 0;
            padding: 20px;
            background-color: ${widgetTheme === 'dark' ? '#0b0f19' : '#f3f4f6'};
            display: flex;
            justify-content: center;
        }
        .outer-wrapper {
            width: 100%;
            max-width: 1200px;
        }
        ${css}
    </style>
</head>
<body>
    <div class="outer-wrapper">
        ${html}
    </div>

    <script>
    (function() {
        const widget = document.getElementById('google-reviews-widget');
        if (!widget) return;

        const accentColor = '${widgetAccentColor}';

        // 1. Slider controls navigation (Carrossel)
        const prevBtn = widget.querySelector('#slider-arrow-prev');
        const nextBtn = widget.querySelector('#slider-arrow-next');
        const viewport = widget.querySelector('.testimonials-slider-viewport');

        if (prevBtn && nextBtn && viewport) {
            prevBtn.addEventListener('click', () => {
                viewport.scrollBy({ left: -330, behavior: 'smooth' });
            });
            nextBtn.addEventListener('click', () => {
                viewport.scrollBy({ left: 330, behavior: 'smooth' });
            });
        }

        // Coverflow 3D scale implementation
        const isCenterMode = ${isCenterMode};
        if (viewport && isCenterMode) {
            const updateCenterScale = () => {
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
            viewport.addEventListener('scroll', updateCenterScale);
            setTimeout(updateCenterScale, 150);
        }

        // Carousel Autoplay script
        const autoPlayOn = ${autoPlayOn};
        if (viewport && autoPlayOn) {
            let timer = setInterval(() => {
                const maxScroll = viewport.scrollWidth - viewport.clientWidth;
                if (viewport.scrollLeft >= maxScroll - 5) {
                    viewport.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    viewport.scrollBy({ left: 330, behavior: 'smooth' });
                }
            }, ${widgetAutoPlaySpeed});

            const stop = () => clearInterval(timer);
            viewport.addEventListener('mouseenter', stop);
            viewport.addEventListener('touchstart', stop);
        }

        // 2. Read More Text toggling expanders
        const expanders = widget.querySelectorAll('.read-more-trigger');
        expanders.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const textPara = e.target.previousElementSibling;
                const isClamped = textPara.classList.toggle('line-clamp-4');
                e.target.textContent = isClamped ? 'Ler mais' : 'Ler menos';
            });
        });

        // 3. Floating Widget toggles
        const floatTrigger = widget.querySelector('#floating-widget-trigger');
        const floatPanel = widget.querySelector('#floating-widget-panel');
        const floatClose = widget.querySelector('#floating-widget-close');

        if (floatTrigger && floatPanel) {
            floatTrigger.addEventListener('click', () => {
                floatPanel.classList.toggle('hidden');
            });
        }
        if (floatClose && floatPanel) {
            floatClose.addEventListener('click', (e) => {
                e.stopPropagation();
                floatPanel.classList.add('hidden');
            });
        }

        // 4. Photo Zoom Lightbox logic
        const reviewsPhotosList = ${JSON.stringify(activeReviews.map(r => r.reviewPhotos || []))};
        const lboxModal = widget.querySelector('#embed-lightbox-modal');
        const lboxImg = widget.querySelector('#embed-lightbox-img');
        const lboxClose = widget.querySelector('#embed-lightbox-close');
        const lboxPrev = widget.querySelector('#embed-lightbox-prev');
        const lboxNext = widget.querySelector('#embed-lightbox-next');

        if (lboxModal && lboxImg) {
            let photoList = [];
            let photoIdx = 0;

            const thumbs = widget.querySelectorAll('.thumb-photo-item');
            thumbs.forEach(thumb => {
                thumb.addEventListener('click', (e) => {
                    const card = e.target.closest('.testimonial-card');
                    const idx = parseInt(card.getAttribute('data-index'), 10);
                    const pIdx = parseInt(e.target.getAttribute('data-idx'), 10);

                    photoList = reviewsPhotosList[idx] || [];
                    photoIdx = pIdx;

                    lboxImg.src = photoList[photoIdx];
                    lboxModal.classList.remove('hidden');
                    updateArrows();
                });
            });

            const close = () => {
                lboxModal.classList.add('hidden');
                lboxImg.src = '';
            };

            if (lboxClose) lboxClose.addEventListener('click', close);
            lboxModal.addEventListener('click', (e) => {
                if (e.target === lboxModal) close();
            });

            const updateArrows = () => {
                if (!lboxPrev || !lboxNext) return;
                if (photoList.length > 1) {
                    lboxPrev.style.display = 'block';
                    lboxNext.style.display = 'block';
                } else {
                    lboxPrev.style.display = 'none';
                    lboxNext.style.display = 'none';
                }
            };

            if (lboxPrev) {
                lboxPrev.addEventListener('click', () => {
                    photoIdx = (photoIdx - 1 + photoList.length) % photoList.length;
                    lboxImg.src = photoList[photoIdx];
                });
            }
            if (lboxNext) {
                lboxNext.addEventListener('click', () => {
                    photoIdx = (photoIdx + 1) % photoList.length;
                    lboxImg.src = photoList[photoIdx];
                });
            }
        }
    })();
    </script>
</body>
</html>`;

        const blob = new Blob([htmlFileContent], { type: "text/html;charset=utf-8" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `reviews_widget_${Date.now()}.html`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });

    // -------------------------------------------------------------
    // Application Startups
    // -------------------------------------------------------------
    loadSavedPreferences();
});
