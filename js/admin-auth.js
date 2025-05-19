// التحقق من حالة تسجيل دخول المسؤول
function checkAdminAuth() {
    const isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
    const currentPage = window.location.pathname;
    const loginPage = '/admin-login.html';
    const publicPages = ['/', '/index.html', '/register.html'];

    // إذا كانت الصفحة الحالية هي صفحة تسجيل الدخول
    if (currentPage.endsWith(loginPage)) {
        if (isLoggedIn) {
            // إذا كان المسؤول مسجل الدخول بالفعل، قم بتحويله إلى لوحة التحكم
            window.location.href = 'customers.html';
        }
        return;
    }

    // السماح بالوصول إلى الصفحات العامة
    if (publicPages.some(page => currentPage.endsWith(page))) {
        return;
    }

    // التحقق من تسجيل الدخول لصفحات لوحة التحكم
    if (!isLoggedIn) {
        window.location.href = 'admin-login.html';
    }
}

// تسجيل الخروج
function adminLogout() {
    localStorage.removeItem('adminLoggedIn');
    window.location.href = 'admin-login.html';
}

// التحقق من حالة تسجيل الدخول عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', checkAdminAuth);