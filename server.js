const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const puppeteer = process.env.RENDER ? require('puppeteer-core') : require('puppeteer');
let chromium;
if (process.env.RENDER) {
    try {
        chromium = require('@sparticuz/chromium');
    } catch (e) {
        console.error('[Server] Opcional @sparticuz/chromium falhou:', e.message);
    }
}

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/scrape', async (req, res) => {
    const { url, maxReviews = 10, ratingFilter = 'all', onlyWithText = false, minLength = 0, keywords = '' } = req.body;

    if (!url || !url.includes('google.com/maps')) {
        return res.status(400).json({ error: 'Por favor, forneça uma URL válida do Google Maps.' });
    }

    let browser;
    try {
        console.log(`[Scraper] Iniciando extração para: ${url} (max: ${maxReviews}, filter: ${ratingFilter}, onlyText: ${onlyWithText})`);
        
        let options = {};

        if (process.env.RENDER) {
            options = {
                args: [
                    ...chromium.args,
                    '--lang=pt-BR,pt',
                    '--accept-lang=pt-BR,pt'
                ],
                defaultViewport: chromium.defaultViewport,
                executablePath: await chromium.executablePath(),
                headless: chromium.headless,
                ignoreHTTPSErrors: true,
                env: {
                    LANGUAGE: 'pt_BR',
                    LANG: 'pt_BR.UTF-8',
                    LC_ALL: 'pt_BR.UTF-8',
                    ...process.env
                }
            };
        } else {
            // Local Windows configuration using bundled puppeteer chromium
            options = {
                headless: "new",
                args: [
                    '--lang=pt-BR,pt', 
                    '--accept-lang=pt-BR,pt',
                    '--no-sandbox', 
                    '--disable-setuid-sandbox',
                    '--disable-blink-features=AutomationControlled',
                    '--enable-webgl',
                    '--use-gl=angle',
                    '--use-angle=swiftshader'
                ],
                env: {
                    LANGUAGE: 'pt_BR',
                    LANG: 'pt_BR.UTF-8',
                    LC_ALL: 'pt_BR.UTF-8',
                    ...process.env
                }
            };
        }

        console.log(`[Scraper] Iniciando Puppeteer. Headless: ${options.headless}, Executable: ${options.executablePath}`);
        browser = await puppeteer.launch(options);

        const page = await browser.newPage();
        await page.setViewport({ width: 1280, height: 800 });
        
        // Bloqueio de carregamento de recursos não essenciais para otimizar velocidade e memória RAM
        await page.setRequestInterception(true);
        page.on('request', (req) => {
            const type = req.resourceType();
            if (['image', 'font', 'media'].includes(type)) {
                req.abort();
            } else {
                req.continue();
            }
        });
        
        // Inject WebGL evasion spoofing
        await page.evaluateOnNewDocument(() => {
            Object.defineProperty(navigator, 'webdriver', {
                get: () => undefined,
            });
            const getParameter = WebGLRenderingContext.prototype.getParameter;
            WebGLRenderingContext.prototype.getParameter = function(parameter) {
                if (parameter === 37445) {
                    return 'Google Inc. (NVIDIA)';
                }
                if (parameter === 37446) {
                    return 'ANGLE (NVIDIA, NVIDIA GeForce GTX 1660 SUPER/PCIe/SSE2, OpenGL 4.5.0)';
                }
                return getParameter.apply(this, arguments);
            };
        });
        
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36');
        
        console.log("[Scraper] Navegando para URL...");
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
        await new Promise(r => setTimeout(r, 5000));
        
        // Let's resolve the page and click the "Avaliações" or "Reviews" tab.
        // We will try to click it on the current resolved page. If not found, we use robust search queries.
        console.log("[Scraper] Tentando clicar na aba de Avaliações/Reviews...");
        let tabClicked = await page.evaluate(() => {
            const buttons = Array.from(document.querySelectorAll('button'));
            const tab = buttons.find(b => {
                const txt = b.textContent.trim().toLowerCase();
                return txt === 'avaliações' || txt === 'reviews';
            });
            if (tab) {
                tab.click();
                return "button";
            }
            const divs = Array.from(document.querySelectorAll('div[role="tab"]'));
            const tabDiv = divs.find(d => {
                const txt = d.textContent.trim().toLowerCase();
                return txt === 'avaliações' || txt === 'reviews';
            });
            if (tabDiv) {
                tabDiv.click();
                return "div[role=tab]";
            }
            const anyTab = Array.from(document.querySelectorAll('*')).find(el => {
                const txt = el.textContent.trim().toLowerCase();
                return txt === 'avaliações' || txt === 'reviews';
            });
            if (anyTab) {
                anyTab.click();
                return "generic";
            }
            return null;
        });
        
        console.log(`[Scraper] Aba clicada diretamente? ${tabClicked ? 'Sim (' + tabClicked + ')' : 'Não'}`);
        
        // Fallback: Se a aba não foi encontrada diretamente (ex: URL de coordenadas direta sem detalhes),
        // resolvemos o nome do negócio e fazemos a pesquisa limpa
        if (!tabClicked) {
            console.log("[Scraper] Fallback: Resolvendo nome do negócio para pesquisa limpa...");
            const redirectedUrl = page.url();
            let businessName = '';
            
            if (redirectedUrl.includes('/place/')) {
                const afterPlace = redirectedUrl.split('/place/')[1];
                businessName = decodeURIComponent(afterPlace.split('/')[0].replace(/\+/g, ' '));
            } else if (redirectedUrl.includes('/search/')) {
                const afterSearch = redirectedUrl.split('/search/')[1];
                businessName = decodeURIComponent(afterSearch.split('/')[0].replace(/\+/g, ' '));
            }
            
            if (!businessName || businessName === '@') {
                const title = await page.title();
                if (title) {
                    businessName = title.split(' - ')[0].split(' – ')[0].split(' - Google')[0].trim();
                }
            }
            
            if (!businessName || businessName === 'Google Maps') {
                if (url.includes('/place/')) {
                    businessName = decodeURIComponent(url.split('/place/')[1].split('/')[0].replace(/\+/g, ' '));
                }
            }
            
            console.log(`[Scraper] Nome resolvido para fallback: "${businessName}"`);
            
            if (businessName && businessName !== 'Google Maps') {
                const cleanSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(businessName)}`;
                console.log(`[Scraper] Navegando para pesquisa de fallback: ${cleanSearchUrl}`);
                await page.goto(cleanSearchUrl, { waitUntil: 'networkidle2', timeout: 60000 });
                await new Promise(r => setTimeout(r, 6000));
                
                tabClicked = await page.evaluate(() => {
                    const buttons = Array.from(document.querySelectorAll('button'));
                    const tab = buttons.find(b => {
                        const txt = b.textContent.trim().toLowerCase();
                        return txt === 'avaliações' || txt === 'reviews';
                    });
                    if (tab) {
                        tab.click();
                        return "button";
                    }
                    const divs = Array.from(document.querySelectorAll('div[role="tab"]'));
                    const tabDiv = divs.find(d => {
                        const txt = d.textContent.trim().toLowerCase();
                        return txt === 'avaliações' || txt === 'reviews';
                    });
                    if (tabDiv) {
                        tabDiv.click();
                        return "div[role=tab]";
                    }
                    const anyTab = Array.from(document.querySelectorAll('*')).find(el => {
                        const txt = el.textContent.trim().toLowerCase();
                        return txt === 'avaliações' || txt === 'reviews';
                    });
                    if (anyTab) {
                        anyTab.click();
                        return "generic";
                    }
                    return null;
                });
                console.log(`[Scraper] Aba de Avaliações clicada na pesquisa de fallback? ${tabClicked ? 'Sim' : 'Não'}`);
            }
        }
        
        // Aguarda transição
        await new Promise(r => setTimeout(r, 4000));
        
        // Verifica se carregou algum depoimento inicial
        const initialCount = await page.evaluate(() => document.querySelectorAll('.jftiEf').length);
        console.log(`[Scraper] Depoimentos iniciais carregados: ${initialCount}`);
        
        // Loop de rolagem infinita baseada no limite solicitado (maxReviews)
        let previousCount = initialCount;
        let noChangeCount = 0;
        const maxScrolls = 20; // limite de segurança
        
        console.log(`[Scraper] Iniciando rolagem de feed para obter até ${maxReviews} depoimentos...`);
        for (let i = 1; i <= maxScrolls; i++) {
            if (previousCount >= maxReviews) {
                console.log(`[Scraper] Meta alcançada ou excedida (${previousCount} >= ${maxReviews}). Parando rolagens.`);
                break;
            }
            
            await page.evaluate(() => {
                const scrollContainer = document.querySelector('div[role="feed"]') || 
                                         Array.from(document.querySelectorAll('div')).find(d => {
                                             const style = window.getComputedStyle(d);
                                             return (style.overflowY === 'auto' || style.overflowY === 'scroll') && d.scrollHeight > d.clientHeight && d.getBoundingClientRect().width < 500;
                                         });
                if (scrollContainer) {
                    scrollContainer.scrollTop = scrollContainer.scrollHeight;
                }
            });
            
            await new Promise(r => setTimeout(r, 3000));
            
            const currentCount = await page.evaluate(() => document.querySelectorAll('.jftiEf').length);
            console.log(`[Scraper] Rolagem ${i}: Depoimentos em tela = ${currentCount}`);
            
            if (currentCount === previousCount) {
                noChangeCount++;
                if (noChangeCount >= 3) {
                    console.log("[Scraper] Sem novos depoimentos carregados por 3 rolagens seguidas. Fim do feed.");
                    break;
                }
            } else {
                noChangeCount = 0;
                previousCount = currentCount;
            }
        }
        
        // Expandir todos os textos truncados ("Mais")
        console.log("[Scraper] Expandindo depoimentos longos...");
        await page.evaluate(() => {
            const moreButtons = Array.from(document.querySelectorAll('button, span, a')).filter(el => el.textContent.trim() === 'Mais');
            for (const btn of moreButtons) {
                btn.click();
            }
        });
        await new Promise(r => setTimeout(r, 1000));
        
        // Extrai os depoimentos com todos os detalhes (incluindo a data!)
        console.log("[Scraper] Extraindo depoimentos estruturados...");
        let reviews = await page.evaluate(() => {
            const cards = document.querySelectorAll('.jftiEf');
            return Array.from(cards).map((card, cardIdx) => {
                const nameEl = card.querySelector('.d4r55');
                const textEl = card.querySelector('.wiI7pd');
                const ratingEl = card.querySelector('.kvMYJc');
                const imgEl = card.querySelector('.NBa7we') || card.querySelector('img');
                const dateEl = card.querySelector('.rsqaWe') || card.querySelector('.rsqaAc');
                
                let rating = 5;
                if (ratingEl) {
                    const label = ratingEl.getAttribute('aria-label') || '';
                    const m = label.match(/\d+/);
                    if (m) rating = parseInt(m[0], 10);
                }
                
                const photoButtons = card.querySelectorAll('button.Tya61d');
                const reviewPhotos = Array.from(photoButtons).map(btn => {
                    const bg = window.getComputedStyle(btn).backgroundImage;
                    if (bg && bg !== 'none') {
                        let cleanUrl = bg.replace(/^url\(['"]?/, '').replace(/['"]?\)$/, '');
                        const isGooglePhoto = /googleusercontent\.com|ggpht\.com|lh\d+\.google\.com/.test(cleanUrl);
                        if (isGooglePhoto && cleanUrl.includes('=')) {
                            const parts = cleanUrl.split('=');
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
                                cleanUrl = parts.join('=');
                            }
                        }
                        return cleanUrl;
                    }
                    return '';
                }).filter(url => url.length > 0);
                
                let debugCard = null;
                if (cardIdx === 0) {
                    debugCard = Array.from(card.querySelectorAll('*')).map(el => ({
                        tag: el.tagName,
                        className: el.className,
                        text: el.textContent.trim().slice(0, 80)
                    }));
                }

                return {
                    name: nameEl ? nameEl.textContent.trim() : 'Usuário Anônimo',
                    text: textEl ? textEl.textContent.trim() : '',
                    rating,
                    photo: imgEl ? (imgEl.src || '') : '',
                    date: dateEl ? dateEl.textContent.trim() : '',
                    reviewPhotos,
                    debugCard
                };
            });
        });
        
        await browser.close();
        
        console.log(`[Scraper] Total bruto extraído: ${reviews.length}`);
        
        // Aplicar os filtros configurados pelo usuário
        if (onlyWithText) {
            reviews = reviews.filter(r => r.text && r.text.trim().length > 0);
        }
        
        if (minLength > 0) {
            reviews = reviews.filter(r => r.text && r.text.trim().length >= minLength);
        }
        
        if (ratingFilter !== 'all') {
            if (ratingFilter === '4to5') {
                reviews = reviews.filter(r => r.rating >= 4);
            } else if (ratingFilter === '3to5') {
                reviews = reviews.filter(r => r.rating >= 3);
            } else {
                const targetRating = parseInt(ratingFilter, 10);
                reviews = reviews.filter(r => r.rating === targetRating);
            }
        }

        // Aplicar filtro de palavras-chave (keywords)
        if (keywords && keywords.trim().length > 0) {
            const keywordList = keywords.split(',')
                .map(k => k.trim().toLowerCase())
                .filter(k => k.length > 0);
            
            if (keywordList.length > 0) {
                reviews = reviews.filter(r => {
                    if (!r.text) return false;
                    const textLower = r.text.toLowerCase();
                    return keywordList.some(kw => textLower.includes(kw));
                });
            }
        }
        
        // Limita ao número máximo solicitado
        const finalReviews = reviews.slice(0, maxReviews);
        
        console.log(`[Scraper] Total após filtros do servidor: ${finalReviews.length}`);
        
        if (finalReviews.length === 0) {
            return res.status(404).json({
                error: 'Nenhum depoimento encontrado com os filtros aplicados. Tente ajustar os filtros ou verificar a URL.'
            });
        }
        
        // Geração do resumo inteligente de IA local
        const aiSummary = generateLocalAiSummary(finalReviews);
        
        return res.json({
            success: true,
            total: finalReviews.length,
            aiSummary,
            data: finalReviews
        });
        
    } catch (error) {
        console.error("Erro no scraping desktop:", error);
        if (browser) await browser.close();
        return res.status(500).json({
            error: 'Erro ao tentar extrair dados da URL do Google Maps.',
            details: error.message
        });
    }
});

// Helper para gerar resumo analítico local simulação de IA
function generateLocalAiSummary(reviews) {
    if (!reviews || reviews.length === 0) return null;
    
    const count = reviews.length;
    const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
    const avgRating = (totalRating / count).toFixed(1);
    const ratingNum = parseFloat(avgRating);
    
    const categories = {
        'Atendimento': {
            pos: ['atendimento', 'atencioso', 'equipe', 'funcionários', 'recepção', 'simpático', 'gentil', 'atendente', 'serviço', 'educado', 'prestativo', 'cordial'],
            neg: ['demora', 'lento', 'desorganizado', 'grosseiro', 'mal educado', 'ruim', 'péssimo', 'desatencioso', 'grosseria', 'espera', 'atraso']
        },
        'Ambiente': {
            pos: ['ambiente', 'lugar', 'espaço', 'decor', 'limpo', 'limpeza', 'aconchegante', 'agradável', 'lindo', 'bonito', 'organizado', 'arejado'],
            neg: ['sujo', 'sujeira', 'barulhento', 'barulho', 'apertado', 'escura', 'quente', 'abafado', 'bagunçado', 'desorganizado']
        },
        'Qualidade do Serviço': {
            pos: ['qualidade', 'excelente', 'ótimo', 'maravilhoso', 'perfeito', 'impecável', 'sensacional', 'delicioso', 'sabor', 'comida', 'prato', 'gostoso', 'saboroso'],
            neg: ['frio', 'gelado', 'queimado', 'sem sabor', 'ruim', 'fraco', 'estragado', 'cru', 'duro', 'gorduroso', 'insosso']
        },
        'Custo-Benefício': {
            pos: ['preço', 'barato', 'custo', 'benefício', 'valor', 'justo', 'acessível', 'vale a pena'],
            neg: ['caro', 'caríssimo', 'facada', 'preço absurdo', 'abusivo', 'não vale', 'preço alto', 'salgado']
        }
    };
    
    const posFreq = { 'Atendimento': 0, 'Ambiente': 0, 'Qualidade do Serviço': 0, 'Custo-Benefício': 0 };
    const negFreq = { 'Atendimento': 0, 'Ambiente': 0, 'Qualidade do Serviço': 0, 'Custo-Benefício': 0 };
    
    reviews.forEach(r => {
        if (r.text) {
            const lowerText = r.text.toLowerCase();
            Object.keys(categories).forEach(cat => {
                // Check positive synonyms
                categories[cat].pos.forEach(syn => {
                    if (lowerText.includes(syn)) {
                        if (r.rating >= 3) {
                            posFreq[cat]++;
                        } else {
                            negFreq[cat]++;
                        }
                    }
                });
                // Check negative synonyms
                categories[cat].neg.forEach(syn => {
                    if (lowerText.includes(syn)) {
                        if (r.rating <= 3) {
                            negFreq[cat]++;
                        } else {
                            posFreq[cat]++;
                        }
                    }
                });
            });
        }
    });
    
    const sortedPosFeatures = Object.keys(posFreq).sort((a, b) => posFreq[b] - posFreq[a]);
    const sortedNegFeatures = Object.keys(negFreq).sort((a, b) => negFreq[b] - negFreq[a]);
    
    const topPosFeature = posFreq[sortedPosFeatures[0]] > 0 ? sortedPosFeatures[0] : 'Qualidade do Serviço';
    const secondPosFeature = posFreq[sortedPosFeatures[1]] > 0 ? sortedPosFeatures[1] : 'Atendimento';
    
    const topNegFeature = negFreq[sortedNegFeatures[0]] > 0 ? sortedNegFeatures[0] : 'Qualidade do Serviço';
    const secondNegFeature = negFreq[sortedNegFeatures[1]] > 0 ? sortedNegFeatures[1] : 'Atendimento';
    
    let summaryParagraph = '';
    
    if (ratingNum >= 4.3) {
        summaryParagraph = `Com base nas avaliações analisadas, o estabelecimento destaca-se com uma reputação **excepcional** e média de **${avgRating}/5.0 estrelas**. A satisfação dos clientes é altíssima, sendo fortemente recomendada pelas ótimas menções a **${topPosFeature.toLowerCase()}** e **${secondPosFeature.toLowerCase()}**. Os depoimentos reforçam a confiabilidade do local.`;
        if (negFreq[topNegFeature] > 1) {
            summaryParagraph += ` Alguns clientes pontuaram pequenos ajustes em relação a **${topNegFeature.toLowerCase()}**.`;
        }
    } else if (ratingNum >= 3.6) {
        summaryParagraph = `Os depoimentos analisados indicam um índice de aprovação **altamente positivo**, com média de **${avgRating}/5.0 estrelas**. Os clientes elogiam com frequência o **${topPosFeature.toLowerCase()}** e a consistência em **${secondPosFeature.toLowerCase()}**, qualificando o estabelecimento como uma excelente escolha geral.`;
        if (negFreq[topNegFeature] > 1) {
            summaryParagraph += ` No entanto, há relatos indicando oportunidades de melhoria em **${topNegFeature.toLowerCase()}**.`;
        }
    } else if (ratingNum >= 2.8) {
        summaryParagraph = `A análise das avaliações apresenta uma reputação **mista/neutra**, com média de **${avgRating}/5.0 estrelas**. Embora o estabelecimento receba elogios pontuais por seu **${topPosFeature.toLowerCase()}**, existem queixas recorrentes sobre **${topNegFeature.toLowerCase()}** que afetam a experiência de alguns clientes.`;
    } else {
        summaryParagraph = `As avaliações analisadas indicam críticas e pontos de atenção **críticos**, com média de **${avgRating}/5.0 estrelas**. O descontentamento geral está concentrado principalmente em problemas com **${topNegFeature.toLowerCase()}** e **${secondNegFeature.toLowerCase()}**, exigindo ajustes urgentes. Elogios ao **${topPosFeature.toLowerCase()}** são raros no momento.`;
    }
    
    const highlights = [];
    if (ratingNum >= 3.6) {
        if (posFreq['Atendimento'] > 0) highlights.push('Equipe e atendimento elogiados');
        if (posFreq['Ambiente'] > 0) highlights.push('Ambiente acolhedor e limpo');
        if (posFreq['Qualidade do Serviço'] > 0) highlights.push('Alta qualidade nos serviços/produtos');
        if (posFreq['Custo-Benefício'] > 0) highlights.push('Excelente custo-benefício relatado');
    } else {
        if (negFreq['Atendimento'] > 1) highlights.push('Atenção: queixas sobre atendimento');
        if (negFreq['Ambiente'] > 1) highlights.push('Atenção: reclamações sobre o ambiente');
        if (negFreq['Qualidade do Serviço'] > 1) highlights.push('Instabilidade na qualidade do serviço');
        if (negFreq['Custo-Benefício'] > 1) highlights.push('Preço considerado acima do valor percebido');
    }
    
    // Fill up to 3 highlights if needed
    const defaultPosHighlights = ['Serviço confiável e atencioso', 'Recomendado pela comunidade local', 'Destaque na região'];
    const defaultNegHighlights = ['Requer atenção aos feedbacks', 'Pontos de melhoria identificados', 'Serviço sob avaliação'];
    
    while (highlights.length < 3) {
        const defaults = ratingNum >= 3.6 ? defaultPosHighlights : defaultNegHighlights;
        const nextDefault = defaults.find(item => !highlights.includes(item));
        if (nextDefault) {
            highlights.push(nextDefault);
        } else {
            break;
        }
    }
    
    return {
        averageRating: ratingNum,
        totalAnalyzed: count,
        summary: summaryParagraph,
        highlights: highlights.slice(0, 3)
    };
}

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Acesse http://localhost:${PORT}`);
});
