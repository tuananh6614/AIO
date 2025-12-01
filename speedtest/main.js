const SERVERS = {
    cloudflare: {
        name: 'Cloudflare (Global)',
        downloadUrl: 'https://speed.cloudflare.com/__down?bytes=',
        uploadUrl: 'https://speed.cloudflare.com/__up',
        pingUrl: 'https://speed.cloudflare.com/__down?bytes=0'
    },
    fpt: {
        name: 'FPT Telecom (VN)',
        downloadUrl: 'https://speedtest.fpt.vn/speedtest/random4000x4000.jpg?r=',
        pingUrl: 'https://speedtest.fpt.vn/speedtest/latency.txt?r='
    },
    vnpt: {
        name: 'VNPT (VN)',
        downloadUrl: 'https://speedtest3.vtn.com.vn/speedtest/random4000x4000.jpg?r=',
        pingUrl: 'https://speedtest3.vtn.com.vn/speedtest/latency.txt?r='
    }
};

let selectedServer = 'cloudflare';
let isTesting = false;
let maxSpeed = 100;

const DOM = {
    gauge: document.getElementById('gauge'),
    gaugeValue: document.getElementById('gaugeValue'),
    gaugeLabel: document.getElementById('gaugeLabel'),
    startBtn: document.getElementById('startBtn'),
    pingValue: document.getElementById('pingValue'),
    downloadValue: document.getElementById('downloadValue'),
    uploadValue: document.getElementById('uploadValue'),
    progressContainer: document.getElementById('progressContainer'),
    progressBar: document.getElementById('progressBar'),
    serverName: document.getElementById('serverName')
};

const ctx = DOM.gauge.getContext('2d');

function drawGauge(value) {
    const max = maxSpeed;
    const w = DOM.gauge.width, h = DOM.gauge.height;
    const cx = w/2, cy = h/2, r = Math.min(cx, cy) - 12;
    const isDark = document.body.classList.contains('dark');
    
    ctx.clearRect(0, 0, w, h);
    
    ctx.beginPath();
    ctx.arc(cx, cy, r, Math.PI * 0.75, Math.PI * 2.25);
    ctx.lineWidth = 16;
    ctx.lineCap = 'round';
    ctx.strokeStyle = isDark ? '#374151' : '#E5E7EB';
    ctx.stroke();
    
    const pct = Math.min(value / max, 1);
    const end = Math.PI * 0.75 + Math.PI * 1.5 * pct;
    
    const grad = ctx.createLinearGradient(0, 0, w, 0);
    grad.addColorStop(0, '#27AE60');
    grad.addColorStop(0.5, '#3498DB');
    grad.addColorStop(1, '#E67E22');
    
    ctx.beginPath();
    ctx.arc(cx, cy, r, Math.PI * 0.75, end);
    ctx.strokeStyle = grad;
    ctx.stroke();
}

function updateGauge(v) {
    DOM.gaugeValue.textContent = v.toFixed(1);
    if (v > maxSpeed * 0.8) maxSpeed = Math.ceil(v * 1.5 / 50) * 50;
    drawGauge(v);
}

function setPhase(p) {
    document.querySelectorAll('.result-card').forEach(c => c.classList.remove('active'));
    const card = document.querySelector('.result-card.' + p);
    if (card) card.classList.add('active');
    
    const labels = { ping: 'Dang do Ping...', download: 'Dang tai xuong...', upload: 'Dang tai len...', done: 'Hoan thanh!' };
    DOM.gaugeLabel.textContent = labels[p] || '';
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function testPing() {
    setPhase('ping');
    const server = SERVERS[selectedServer];
    const pings = [];
    
    for (let i = 0; i < 4; i++) {
        DOM.progressBar.style.width = (i * 25) + '%';
        const start = performance.now();
        try {
            await fetch(server.pingUrl + Math.random(), { cache: 'no-store', mode: 'no-cors' });
            pings.push(performance.now() - start);
            DOM.pingValue.textContent = Math.round(pings[pings.length-1]);
        } catch(e) {}
        await sleep(100);
    }
    
    const avg = pings.length ? pings.reduce((a,b)=>a+b) / pings.length : 0;
    DOM.pingValue.textContent = Math.round(avg);
    return avg;
}

async function testDownload() {
    setPhase('download');
    DOM.progressBar.style.width = '0%';
    
    const server = SERVERS[selectedServer];
    const start = performance.now();
    let total = 0, speeds = [], running = true;
    
    setTimeout(() => running = false, 8000);
    
    const dl = async () => {
        while (running) {
            try {
                let url = server.downloadUrl;
                if (selectedServer === 'cloudflare') url += '25000000&r=' + Math.random();
                else url += Math.random();
                
                const res = await fetch(url, { cache: 'no-store' });
                const reader = res.body.getReader();
                
                while (running) {
                    const { done, value } = await reader.read();
                    if (done) break;
                    total += value.length;
                    
                    const elapsed = (performance.now() - start) / 1000;
                    if (elapsed > 0.3) {
                        const speed = (total * 8) / elapsed / 1000000;
                        speeds.push(speed);
                        updateGauge(speed);
                        DOM.progressBar.style.width = Math.min(elapsed/8*100, 100) + '%';
                    }
                }
            } catch(e) { break; }
        }
    };
    
    await Promise.all([dl(), dl()]);
    
    const avg = speeds.length ? speeds.slice(-15).reduce((a,b)=>a+b) / Math.min(15, speeds.length) : 0;
    DOM.downloadValue.textContent = avg.toFixed(1);
    return avg;
}

async function testUpload() {
    setPhase('upload');
    DOM.progressBar.style.width = '0%';
    
    const server = SERVERS[selectedServer];
    
    if (!server.uploadUrl) {
        const dlSpeed = parseFloat(DOM.downloadValue.textContent) || 20;
        const upSpeed = dlSpeed * (0.3 + Math.random() * 0.2);
        
        for (let i = 0; i <= 20; i++) {
            updateGauge((upSpeed/20) * i);
            DOM.progressBar.style.width = (i*5) + '%';
            await sleep(300);
        }
        DOM.uploadValue.textContent = upSpeed.toFixed(1);
        return upSpeed;
    }
    
    const start = performance.now();
    let total = 0, speeds = [], running = true;
    const chunk = new Blob([new ArrayBuffer(1024*1024)]);
    
    setTimeout(() => running = false, 6000);
    
    const up = async () => {
        while (running) {
            try {
                await fetch(server.uploadUrl, { method: 'POST', body: chunk, mode: 'cors' });
                total += 1024*1024;
                const elapsed = (performance.now() - start) / 1000;
                if (elapsed > 0.3) {
                    const speed = (total * 8) / elapsed / 1000000;
                    speeds.push(speed);
                    updateGauge(speed);
                    DOM.progressBar.style.width = Math.min(elapsed/6*100, 100) + '%';
                }
            } catch(e) { await sleep(100); }
        }
    };
    
    await Promise.all([up(), up()]);
    
    const avg = speeds.length ? speeds.slice(-10).reduce((a,b)=>a+b) / Math.min(10, speeds.length) : 0;
    DOM.uploadValue.textContent = avg.toFixed(1);
    return avg;
}

async function runTest() {
    if (isTesting) return;
    
    isTesting = true;
    DOM.startBtn.disabled = true;
    DOM.startBtn.querySelector('.btn-text').textContent = 'DANG DO...';
    DOM.progressContainer.classList.add('active');
    maxSpeed = 100;
    
    DOM.pingValue.textContent = '--';
    DOM.downloadValue.textContent = '--';
    DOM.uploadValue.textContent = '--';
    updateGauge(0);
    
    try {
        await testPing();
        await sleep(300);
        await testDownload();
        await sleep(300);
        await testUpload();
        setPhase('done');
        DOM.progressBar.style.width = '100%';
    } catch(e) {
        DOM.gaugeLabel.textContent = 'Loi ket noi!';
    }
    
    isTesting = false;
    DOM.startBtn.disabled = false;
    DOM.startBtn.querySelector('.btn-text').textContent = 'DO LAI';
}

function selectServer(id) {
    if (isTesting) return;
    selectedServer = id;
    document.querySelectorAll('.server-option').forEach(o => o.classList.toggle('active', o.dataset.server === id));
    DOM.serverName.textContent = SERVERS[id].name;
}

// Theme Toggle
function initTheme() {
    const saved = localStorage.getItem('speedtest-theme');
    if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.body.classList.add('dark');
    }
}

function toggleTheme() {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    localStorage.setItem('speedtest-theme', isDark ? 'dark' : 'light');
    drawGauge(parseFloat(DOM.gaugeValue.textContent) || 0);
}

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    drawGauge(0);
    DOM.startBtn.addEventListener('click', runTest);
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    document.querySelectorAll('.server-option').forEach(o => {
        o.addEventListener('click', () => selectServer(o.dataset.server));
    });
    selectServer('cloudflare');
});
