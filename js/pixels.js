// التحقق من حالة تسجيل الدخول
checkAdminAuth();

// استرجاع معرفات البيكسل المحفوظة
let fbPixelId = localStorage.getItem('fbPixelId');
let ttPixelId = localStorage.getItem('ttPixelId');

// تحديث حالة البيكسلات عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    // تحديث واجهة بيكسل فيسبوك
    if (fbPixelId) {
        document.getElementById('fb-pixel-id').value = fbPixelId;
        document.getElementById('fb-pixel-status').textContent = 'نشط';
        document.getElementById('fb-pixel-status').className = 'pixel-status status-active';
        initializeFacebookPixel(fbPixelId);
    }

    // تحديث واجهة بيكسل تيك توك
    if (ttPixelId) {
        document.getElementById('tt-pixel-id').value = ttPixelId;
        document.getElementById('tt-pixel-status').textContent = 'نشط';
        document.getElementById('tt-pixel-status').className = 'pixel-status status-active';
        initializeTikTokPixel(ttPixelId);
    }

    // تحديث الإحصائيات كل دقيقة
    updatePixelStats();
    setInterval(updatePixelStats, 60000);
});

// حفظ وتفعيل بيكسل فيسبوك
function saveFacebookPixel() {
    const pixelId = document.getElementById('fb-pixel-id').value.trim();
    if (!pixelId) {
        alert('الرجاء إدخال معرف بيكسل فيسبوك');
        return;
    }

    // حفظ معرف البيكسل
    localStorage.setItem('fbPixelId', pixelId);
    fbPixelId = pixelId;

    // تحديث حالة البيكسل في الواجهة
    document.getElementById('fb-pixel-status').textContent = 'نشط';
    document.getElementById('fb-pixel-status').className = 'pixel-status status-active';

    // تهيئة البيكسل
    initializeFacebookPixel(pixelId);
    alert('تم حفظ وتفعيل بيكسل فيسبوك بنجاح');
}

// حفظ وتفعيل بيكسل تيك توك
function saveTikTokPixel() {
    const pixelId = document.getElementById('tt-pixel-id').value.trim();
    if (!pixelId) {
        alert('الرجاء إدخال معرف بيكسل تيك توك');
        return;
    }

    // حفظ معرف البيكسل
    localStorage.setItem('ttPixelId', pixelId);
    ttPixelId = pixelId;

    // تحديث حالة البيكسل في الواجهة
    document.getElementById('tt-pixel-status').textContent = 'نشط';
    document.getElementById('tt-pixel-status').className = 'pixel-status status-active';

    // تهيئة البيكسل
    initializeTikTokPixel(pixelId);
    alert('تم حفظ وتفعيل بيكسل تيك توك بنجاح');
}

// تهيئة بيكسل فيسبوك
function initializeFacebookPixel(pixelId) {
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', pixelId);
    fbq('track', 'PageView');
}

// تهيئة بيكسل تيك توك
function initializeTikTokPixel(pixelId) {
    !function (w, d, t) {
        w.TiktokAnalyticsObject=t;
        var ttq=w[t]=w[t]||[];
        ttq.methods=['page','track','identify','instances','debug','on','off','once','ready','alias','group','enableCookie','disableCookie'];
        ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))};};
        for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);
        ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e;};
        ttq.load=function(e,n){var i='https://analytics.tiktok.com/i18n/pixel/events.js';
        ttq.status='loading';var o=document.createElement('script');o.async=!0,o.src=i,o.status='loading';
        var a=document.getElementsByTagName('script')[0];a.parentNode.insertBefore(o,a);
        ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};};
        ttq.load(pixelId);
        ttq.page();
    }(window, document, 'ttq');
}

// تحديث إحصائيات البيكسلات
function updatePixelStats() {
    // تحديث إحصائيات فيسبوك (محاكاة)
    if (fbPixelId) {
        document.getElementById('fb-conversions').textContent = Math.floor(Math.random() * 100);
        document.getElementById('fb-pageviews').textContent = Math.floor(Math.random() * 1000);
    }

    // تحديث إحصائيات تيك توك (محاكاة)
    if (ttPixelId) {
        document.getElementById('tt-conversions').textContent = Math.floor(Math.random() * 100);
        document.getElementById('tt-pageviews').textContent = Math.floor(Math.random() * 1000);
    }
}