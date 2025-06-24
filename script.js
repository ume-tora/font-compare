class FontComparator {
    constructor() {
        this.fontCategories = {
            'ゴシック体': [
                'Hiragino Sans',
                'Hiragino Kaku Gothic ProN',
                'Yu Gothic',
                'Yu Gothic UI',
                'Meiryo',
                'MS Gothic',
                'Noto Sans JP',
                'Source Han Sans JP',
                'BIZ UDPGothic',
                'Zen Kaku Gothic New',
                'Zen Kaku Gothic Antique',
                'Sawarabi Gothic',
                'Kosugi',
                'Kosugi Maru'
            ],
            '明朝体': [
                'Hiragino Mincho ProN',
                'Yu Mincho',
                'MS Mincho',
                'Noto Serif JP',
                'Source Han Serif JP',
                'BIZ UDPMincho',
                'Zen Antique',
                'Zen Antique Soft',
                'Sawarabi Mincho',
                'Shippori Mincho',
                'Shippori Mincho B1'
            ],
            '丸ゴシック': [
                'Hiragino Maru Gothic ProN',
                'Kosugi Maru',
                'Zen Maru Gothic',
                'Rounded Mgen+',
                'M PLUS Rounded 1c',
                'Hachi Maru Pop'
            ],
            '手書き風': [
                'Klee One',
                'Yuji Syuku',
                'Yuji Mai',
                'Yuji Boku',
                'Amatic SC',
                'Caveat',
                'Kalam',
                'Architects Daughter'
            ],
            'ポップ・デザイン': [
                'Stick',
                'Reggae One',
                'Rampart One',
                'Yusei Magic',
                'DotGothic16',
                'Train One',
                'Kaisei Tokumin',
                'Kaisei HarunoUmi',
                'Kaisei Opti',
                'Kaisei Decol'
            ],
            'モノスペース': [
                'Courier New',
                'Consolas',
                'Monaco',
                'Menlo',
                'Source Code Pro',
                'Fira Code',
                'Inconsolata',
                'Roboto Mono'
            ]
        };
        
        this.sampleTexts = [
            'あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら',
            'The quick brown fox jumps over the lazy dog',
            'いろはにほへと ちりぬるを わかよたれそ つねならむ',
            'こんにちは、世界！Hello, World! 123456789',
            '美しい日本語のタイポグラフィ',
            'フォント比較ツール - Font Comparison Tool'
        ];
        
        this.currentCategory = 'すべて';
        this.isDarkMode = false;
        
        this.textInput = document.getElementById('textInput');
        this.fontGrid = document.getElementById('fontGrid');
        this.fontSizeSlider = document.getElementById('fontSize');
        this.fontSizeValue = document.getElementById('fontSizeValue');
        this.fontWeightSelect = document.getElementById('fontWeight');
        this.themeToggle = document.getElementById('themeToggle');
        this.sampleSelect = document.getElementById('sampleSelect');
        this.categoryBtns = document.querySelectorAll('.category-btn');
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.populateSampleTexts();
        this.renderFonts();
        this.updateFontSize();
        this.loadTheme();
    }
    
    setupEventListeners() {
        this.textInput.addEventListener('input', () => this.updateText());
        this.fontSizeSlider.addEventListener('input', () => this.updateFontSize());
        this.fontWeightSelect.addEventListener('change', () => this.updateFontWeight());
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
        this.sampleSelect.addEventListener('change', () => this.selectSampleText());
        
        this.categoryBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.filterByCategory(e.target.dataset.category));
        });
    }
    
    populateSampleTexts() {
        this.sampleTexts.forEach((text, index) => {
            const option = document.createElement('option');
            option.value = text;
            option.textContent = text.substring(0, 30) + (text.length > 30 ? '...' : '');
            this.sampleSelect.appendChild(option);
        });
    }
    
    selectSampleText() {
        if (this.sampleSelect.value) {
            this.textInput.value = this.sampleSelect.value;
            this.updateText();
        }
    }
    
    filterByCategory(category) {
        this.currentCategory = category;
        
        this.categoryBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.category === category);
        });
        
        this.renderFonts();
    }
    
    toggleTheme() {
        this.isDarkMode = !this.isDarkMode;
        document.body.classList.toggle('dark-mode', this.isDarkMode);
        this.themeToggle.textContent = this.isDarkMode ? '☀️' : '🌙';
        localStorage.setItem('darkMode', this.isDarkMode);
    }
    
    loadTheme() {
        const savedTheme = localStorage.getItem('darkMode');
        if (savedTheme === 'true') {
            this.isDarkMode = true;
            document.body.classList.add('dark-mode');
            this.themeToggle.textContent = '☀️';
        }
    }
    
    renderFonts() {
        this.fontGrid.innerHTML = '';
        
        let fontsToShow = [];
        
        if (this.currentCategory === 'すべて') {
            Object.values(this.fontCategories).forEach(categoryFonts => {
                fontsToShow = fontsToShow.concat(categoryFonts);
            });
        } else {
            fontsToShow = this.fontCategories[this.currentCategory] || [];
        }
        
        fontsToShow.forEach(font => {
            const fontSample = this.createFontSample(font, this.currentCategory !== 'すべて' ? this.currentCategory : this.getFontCategory(font));
            this.fontGrid.appendChild(fontSample);
        });
    }
    
    getFontCategory(fontName) {
        for (const [category, fonts] of Object.entries(this.fontCategories)) {
            if (fonts.includes(fontName)) {
                return category;
            }
        }
        return 'その他';
    }
    
    createFontSample(fontName, category) {
        const sampleDiv = document.createElement('div');
        sampleDiv.className = 'font-sample';
        
        const headerDiv = document.createElement('div');
        headerDiv.className = 'font-header';
        headerDiv.innerHTML = `${fontName} <span class="category-tag">${category}</span>`;
        
        const previewDiv = document.createElement('div');
        previewDiv.className = 'font-preview';
        previewDiv.style.fontFamily = `"${fontName}", sans-serif`;
        previewDiv.style.fontSize = `${this.fontSizeSlider.value}px`;
        previewDiv.style.fontWeight = this.fontWeightSelect.value;
        previewDiv.textContent = this.textInput.value || 'あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら';
        
        const infoDiv = document.createElement('div');
        infoDiv.className = 'font-info';
        
        const fontInfo = document.createElement('span');
        fontInfo.textContent = `フォント: ${fontName}`;
        
        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-btn';
        copyBtn.textContent = 'CSS コピー';
        copyBtn.addEventListener('click', () => this.copyFontCSS(fontName));
        
        infoDiv.appendChild(fontInfo);
        infoDiv.appendChild(copyBtn);
        
        sampleDiv.appendChild(headerDiv);
        sampleDiv.appendChild(previewDiv);
        sampleDiv.appendChild(infoDiv);
        
        return sampleDiv;
    }
    
    updateText() {
        const newText = this.textInput.value || 'あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら';
        const previews = document.querySelectorAll('.font-preview');
        previews.forEach(preview => {
            preview.textContent = newText;
        });
    }
    
    updateFontSize() {
        const size = this.fontSizeSlider.value;
        this.fontSizeValue.textContent = `${size}px`;
        
        const previews = document.querySelectorAll('.font-preview');
        previews.forEach(preview => {
            preview.style.fontSize = `${size}px`;
        });
    }
    
    updateFontWeight() {
        const weight = this.fontWeightSelect.value;
        const previews = document.querySelectorAll('.font-preview');
        previews.forEach(preview => {
            preview.style.fontWeight = weight;
        });
    }
    
    copyFontCSS(fontName) {
        const cssText = `font-family: "${fontName}", sans-serif;`;
        
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(cssText).then(() => {
                this.showCopyNotification('CSSをクリップボードにコピーしました！');
            }).catch(() => {
                this.fallbackCopy(cssText);
            });
        } else {
            this.fallbackCopy(cssText);
        }
    }
    
    fallbackCopy(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            this.showCopyNotification('CSSをクリップボードにコピーしました！');
        } catch (err) {
            console.error('コピーに失敗しました:', err);
            this.showCopyNotification('コピーに失敗しました。手動でコピーしてください。', true);
        }
        
        document.body.removeChild(textArea);
    }
    
    showCopyNotification(message, isError = false) {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${isError ? '#e74c3c' : '#27ae60'};
            color: white;
            padding: 12px 24px;
            border-radius: 6px;
            font-weight: 600;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            animation: slideIn 0.3s ease-out;
        `;
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
                if (style.parentNode) {
                    style.parentNode.removeChild(style);
                }
            }, 300);
        }, 3000);
    }
    
    addCustomFont(fontName) {
        if (!this.fonts.includes(fontName)) {
            this.fonts.push(fontName);
            this.renderFonts();
            this.updateText();
            this.updateFontSize();
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new FontComparator();
});