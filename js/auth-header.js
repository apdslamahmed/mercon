// // إنشاء هيدر لوحة التحكم
// function createAuthHeader() {
//     const header = document.createElement('header');
//     header.className = 'dashboard-header';

//     // إنشاء قسم البحث
//     const searchDiv = document.createElement('div');
//     searchDiv.className = 'header-search';
//     searchDiv.innerHTML = `
//         <i class="fas fa-search"></i>
//         <input type="text" placeholder="بحث...">
//     `;

//     // إنشاء قسم الإجراءات
//     const actionsDiv = document.createElement('div');
//     actionsDiv.className = 'header-actions';

//     // إضافة الإشعارات
//     const notificationsDiv = document.createElement('div');
//     notificationsDiv.className = 'notifications';
//     notificationsDiv.innerHTML = `
//         <i class="fas fa-bell"></i>
//         <span class="badge">3</span>
//     `;

//     // إضافة ملف المستخدم
//     const userProfileDiv = document.createElement('div');
//     userProfileDiv.className = 'user-profile';
//     userProfileDiv.innerHTML = `
//         <img src="images/avatar.jpg" alt="صورة المستخدم">
//         <span>مرحباً، أحمد</span>
//     `;

//     // إضافة زر تسجيل الخروج
//     const logoutButton = document.createElement('button');
//     logoutButton.className = 'btn-logout';
//     logoutButton.innerHTML = '<i class="fas fa-sign-out-alt"></i> تسجيل خروج';
//     logoutButton.onclick = () => {
//         localStorage.removeItem('adminLoggedIn');
//         window.location.href = 'admin-login.html';
//     };

//     // تجميع عناصر قسم الإجراءات
//     actionsDiv.appendChild(notificationsDiv);
//     actionsDiv.appendChild(userProfileDiv);
//     actionsDiv.appendChild(logoutButton);

//     // إضافة الأقسام إلى الهيدر
//     header.appendChild(searchDiv);
//     header.appendChild(actionsDiv);

//     return header;
// }

// // إضافة الأنماط للهيدر
// function addHeaderStyles() {
//     const style = document.createElement('style');
//     style.textContent = `
//         .dashboard-header {
//             display: flex;
//             justify-content: space-between;
//             align-items: center;
//             padding: 1rem 2rem;
//             background-color: white;
//             box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//         }

//         .header-search {
//             display: flex;
//             align-items: center;
//             gap: 1rem;
//             background-color: #f5f5f5;
//             padding: 0.5rem 1rem;
//             border-radius: 5px;
//         }

//         .header-search input {
//             border: none;
//             background: none;
//             outline: none;
//             font-size: 0.9rem;
//         }

//         .header-actions {
//             display: flex;
//             align-items: center;
//             gap: 2rem;
//         }

//         .notifications {
//             position: relative;
//             cursor: pointer;
//         }

//         .notifications .badge {
//             position: absolute;
//             top: -8px;
//             right: -8px;
//             background-color: #ff4444;
//             color: white;
//             border-radius: 50%;
//             padding: 0.2rem 0.5rem;
//             font-size: 0.8rem;
//         }

//         .user-profile {
//             display: flex;
//             align-items: center;
//             gap: 1rem;
//         }

//         .user-profile img {
//             width: 40px;
//             height: 40px;
//             border-radius: 50%;
//             object-fit: cover;
//         }

//         .btn-logout {
//             padding: 0.5rem 1rem;
//             background-color: #ff4444;
//             color: white;
//             border: none;
//             border-radius: 5px;
//             cursor: pointer;
//             display: flex;
//             align-items: center;
//             gap: 0.5rem;
//             transition: background-color 0.3s;
//         }

//         .btn-logout:hover {
//             background-color: #cc0000;
//         }
//     `;
//     document.head.appendChild(style);
// }

// // تنفيذ الدوال عند تحميل الصفحة
// document.addEventListener('DOMContentLoaded', () => {
//     // لا نضيف الهيدر في صفحة تسجيل الدخول أو الصفحة الرئيسية
//     const currentPath = window.location.pathname;
//     if (!currentPath.includes('admin-login.html') && !currentPath.includes('index.html') && currentPath !== '/') {
//         const dashboardHeader = createAuthHeader();
//         document.querySelector('.main-content').insertBefore(dashboardHeader, document.querySelector('.main-content').firstChild);
//         addHeaderStyles();
//     }
// });