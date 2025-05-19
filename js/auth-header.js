// التحقق من حالة تسجيل الدخول وإضافة زر تسجيل الدخول في الهيدر
function createAuthHeader() {
    const header = document.createElement('header');
    header.className = 'site-header';
    
    // إنشاء الشعار
    const logo = document.createElement('div');
    logo.className = 'logo';
    logo.innerHTML = '<h2>ميركون</h2>';
    
    // التحقق مما إذا كانت الصفحة الحالية هي صفحة الهبوط
    const isLandingPage = window.location.pathname.includes('index.html') || window.location.pathname === '/';
    
    if (!isLandingPage) {
        // إنشاء زر تسجيل الدخول فقط إذا لم تكن صفحة الهبوط
        const authButton = document.createElement('button');
        authButton.className = 'auth-button';
        
        // التحقق من حالة تسجيل الدخول
        const isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
        
        if (isLoggedIn) {
            authButton.innerHTML = '<i class="fas fa-sign-out-alt"></i> تسجيل الخروج';
            authButton.onclick = () => {
                localStorage.removeItem('adminLoggedIn');
                window.location.href = 'admin-login.html';
            };
        } else {
            authButton.innerHTML = '<i class="fas fa-sign-in-alt"></i> تسجيل الدخول';
            authButton.onclick = () => {
                window.location.href = 'admin-login.html';
            };
        }
        header.appendChild(authButton);
    }
    
    // إضافة العناصر إلى الهيدر
    header.appendChild(logo);
    header.appendChild(authButton);
    
    // إضافة الهيدر في بداية الصفحة
    document.body.insertBefore(header, document.body.firstChild);
}

// إضافة الأنماط للهيدر
function addHeaderStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .site-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem 2rem;
            background-color: white;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 1000;
        }

        .site-header .logo h2 {
            margin: 0;
            color: #333;
            font-size: 1.5rem;
        }

        .auth-button {
            padding: 0.5rem 1rem;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            transition: background-color 0.3s;
        }

        .auth-button:hover {
            background-color: #0056b3;
        }

        .auth-button i {
            font-size: 1rem;
        }

        /* تعديل المسافة العلوية للمحتوى الرئيسي */
        body {
            padding-top: 70px;
        }
    `;
    document.head.appendChild(style);
}

// تنفيذ الدوال عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    // لا نضيف الهيدر في صفحة تسجيل الدخول
    if (!window.location.pathname.includes('admin-login.html')) {
        createAuthHeader();
        addHeaderStyles();
    }
});