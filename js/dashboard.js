// تهيئة لوحة التحكم عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // تحميل بيانات الطلبات
    loadOrders();
    
    // تهيئة الرسوم البيانية
    initCharts();
    
    // إضافة مستمعي الأحداث للعناصر التفاعلية
    initEventListeners();
    
    // تهيئة محرر المنتج
    initProductEditor();
});

// تهيئة محرر المنتج
function initProductEditor() {
    // حفظ التغييرات
    const saveButton = document.getElementById('saveProductChanges');
    if (saveButton) {
        saveButton.addEventListener('click', function() {
            // جمع بيانات المنتج
            const productData = {
                name: document.getElementById('product-name').value,
                originalPrice: document.getElementById('original-price').value,
                currentPrice: document.getElementById('current-price').value,
                discountPercentage: document.getElementById('discount-percentage').value,
                sizes: getSelectedSizes(),
                colors: getSelectedColors(),
                quantityPricing: getQuantityPricing(),
                shipping: {
                    price: document.getElementById('shipping-price').value,
                    freeShippingThreshold: document.getElementById('free-shipping-threshold').value,
                    expressShipping: document.getElementById('express-shipping').checked
                }
            };
            
            // حفظ البيانات في التخزين المحلي
            localStorage.setItem('productData', JSON.stringify(productData));
            
            // عرض رسالة نجاح
            showNotification('تم حفظ التغييرات بنجاح!', 'success');
        });
    }
}

// الحصول على المقاسات المحددة
function getSelectedSizes() {
    const sizes = [];
    const sizeCheckboxes = document.querySelectorAll('.checkbox-group input[type="checkbox"]');
    sizeCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
            sizes.push(checkbox.parentElement.textContent.trim());
        }
    });
    return sizes;
}

// الحصول على الألوان المحددة
function getSelectedColors() {
    const colors = [];
    const colorPickers = document.querySelectorAll('.color-picker');
    colorPickers.forEach(picker => {
        const colorInput = picker.querySelector('input[type="color"]');
        const colorName = picker.querySelector('span').textContent;
        if (colorInput) {
            colors.push({
                value: colorInput.value,
                name: colorName
            });
        }
    });
    return colors;
}

// الحصول على أسعار الكميات
function getQuantityPricing() {
    const pricing = [];
    const rows = document.querySelectorAll('.quantity-pricing-row:not(.header)');
    rows.forEach(row => {
        const inputs = row.querySelectorAll('input');
        if (inputs.length === 3) {
            pricing.push({
                label: inputs[0].value,
                price: inputs[1].value,
                saving: inputs[2].value
            });
        }
    });
    return pricing;
}

// تحميل بيانات الطلبات من API
async function loadOrders() {
    try {
        // في الإنتاج، استبدل هذا بطلب API حقيقي
        // const response = await fetch('https://api.mircon.com/orders');
        // const data = await response.json();
        
        // محاكاة بيانات الطلبات
        const orders = [
            {
                id: '1001',
                customer: 'أحمد محمد',
                product: 'مشد رجالي',
                size: 'L',
                price: '499.00 ج.م',
                date: '2023-06-15',
                status: 'تم التسليم'
            },
            {
                id: '1002',
                customer: 'محمود علي',
                product: 'مشد رجالي',
                size: 'XL',
                price: '499.00 ج.م',
                date: '2023-06-18',
                status: 'تم الشحن'
            },
            {
                id: '1003',
                customer: 'خالد أحمد',
                product: 'مشد رجالي',
                size: 'M',
                price: '499.00 ج.م',
                date: '2023-06-20',
                status: 'قيد الانتظار'
            }
        ];
        
        displayOrders(orders);
        updateOrdersCount(orders.length);
        
    } catch (error) {
        console.error('خطأ في تحميل الطلبات:', error);
        showNotification('حدث خطأ أثناء تحميل بيانات الطلبات', 'error');
    }
}

// عرض الطلبات في الجدول
function displayOrders(orders) {
    const tableBody = document.getElementById('ordersTableBody');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    if (orders.length === 0) {
        const emptyRow = document.createElement('tr');
        emptyRow.innerHTML = `<td colspan="8" class="text-center">لا توجد طلبات حالياً</td>`;
        tableBody.appendChild(emptyRow);
        return;
    }
    
    orders.forEach(order => {
        const row = document.createElement('tr');
        
        // تحديد فئة حالة الطلب
        let statusClass = '';
        if (order.status === 'قيد الانتظار') {
            statusClass = 'status-pending';
        } else if (order.status === 'تم الشحن') {
            statusClass = 'status-shipped';
        } else if (order.status === 'تم التسليم') {
            statusClass = 'status-delivered';
        }
        
        row.innerHTML = `
            <td>${order.id}</td>
            <td>${order.customer}</td>
            <td>${order.product}</td>
            <td>${order.size}</td>
            <td>${order.price}</td>
            <td>${formatDate(order.date)}</td>
            <td><span class="status-badge ${statusClass}">${order.status}</span></td>
            <td>
                <button class="action-btn view-order" data-id="${order.id}" title="عرض التفاصيل">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="action-btn edit-order" data-id="${order.id}" title="تعديل الطلب">
                    <i class="fas fa-edit"></i>
                </button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
    
    // إضافة مستمعي الأحداث لأزرار الإجراءات
    addOrderActionListeners();
}

// تحديث عدد الطلبات في بطاقة الإحصائيات
function updateOrdersCount(count) {
    const orderCountElement = document.querySelector('.stat-card:nth-child(4) .stat-value');
    if (orderCountElement) {
        orderCountElement.textContent = count;
    }
}

// إضافة مستمعي الأحداث لأزرار إجراءات الطلبات
function addOrderActionListeners() {
    // أزرار عرض تفاصيل الطلب
    const viewButtons = document.querySelectorAll('.view-order');
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const orderId = this.getAttribute('data-id');
            viewOrderDetails(orderId);
        });
    });
    
    // أزرار تعديل الطلب
    const editButtons = document.querySelectorAll('.edit-order');
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const orderId = this.getAttribute('data-id');
            editOrder(orderId);
        });
    });
}

// عرض تفاصيل الطلب
function viewOrderDetails(orderId) {
    // في الإنتاج، استبدل هذا بطلب API حقيقي للحصول على تفاصيل الطلب
    console.log(`عرض تفاصيل الطلب رقم: ${orderId}`);
    showNotification(`جاري عرض تفاصيل الطلب رقم ${orderId}`, 'info');
    
    // هنا يمكن إضافة كود لعرض نافذة منبثقة بتفاصيل الطلب
}

// تعديل الطلب
function editOrder(orderId) {
    // في الإنتاج، استبدل هذا بطلب API حقيقي لتعديل الطلب
    console.log(`تعديل الطلب رقم: ${orderId}`);
    showNotification(`جاري تحميل نموذج تعديل الطلب رقم ${orderId}`, 'info');
    
    // هنا يمكن إضافة كود لعرض نموذج تعديل الطلب
}

// تهيئة الرسوم البيانية
function initCharts() {
    initVisitsChart();
    initSalesChart();
}

// تهيئة رسم بياني للزيارات
function initVisitsChart() {
    const visitsCanvas = document.getElementById('visitsChart');
    if (!visitsCanvas) return;
    
    // بيانات الزيارات (محاكاة)
    const visitsData = {
        labels: ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'],
        datasets: [{
            label: 'عدد الزيارات',
            data: [65, 59, 80, 81, 56, 55, 40],
            backgroundColor: 'rgba(255, 107, 107, 0.2)',
            borderColor: '#ff6b6b',
            borderWidth: 2,
            tension: 0.4,
            pointBackgroundColor: '#ff6b6b'
        }]
    };
    
    new Chart(visitsCanvas, {
        type: 'line',
        data: visitsData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// تهيئة رسم بياني للمبيعات
function initSalesChart() {
    const salesCanvas = document.getElementById('salesChart');
    if (!salesCanvas) return;
    
    // بيانات المبيعات (محاكاة)
    const salesData = {
        labels: ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'],
        datasets: [{
            label: 'المبيعات (ج.م)',
            data: [0, 0, 0, 0, 0, 0, 0],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: '#36a2eb',
            borderWidth: 2
        }]
    };
    
    new Chart(salesCanvas, {
        type: 'bar',
        data: salesData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// إضافة مستمعي الأحداث للعناصر التفاعلية
function initEventListeners() {
    // زر إضافة منتج جديد
    const newProductButton = document.querySelector('.btn-new-product');
    if (newProductButton) {
        newProductButton.addEventListener('click', function() {
            showNotification('جاري تحميل نموذج إضافة منتج جديد', 'info');
            // هنا يمكن إضافة كود لعرض نموذج إضافة منتج جديد
        });
    }
    
    // عناصر القائمة الجانبية
    const sidebarItems = document.querySelectorAll('.sidebar-nav ul li a');
    sidebarItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Only prevent default if href is #
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
            }
            
            // إزالة الفئة النشطة من جميع العناصر
            sidebarItems.forEach(i => i.parentElement.classList.remove('active'));
            // إضافة الفئة النشطة للعنصر المحدد
            this.parentElement.classList.add('active');
            
            const sectionName = this.querySelector('span').textContent;
            
            // Only show notification if href is #, otherwise let normal navigation occur
            if (this.getAttribute('href') === '#') {
                showNotification(`جاري الانتقال إلى قسم ${sectionName}`, 'info');
            }
        });
    });
    
    // زر الإشعارات
    const notificationsButton = document.querySelector('.notifications');
    if (notificationsButton) {
        notificationsButton.addEventListener('click', function() {
            showNotification('لديك 3 إشعارات جديدة', 'info');
            // هنا يمكن إضافة كود لعرض قائمة الإشعارات
        });
    }
}

// عرض إشعار للمستخدم
function showNotification(message, type = 'info') {
    // التحقق من وجود عنصر الإشعارات
    let notificationsContainer = document.querySelector('.notifications-container');
    
    // إنشاء حاوية الإشعارات إذا لم تكن موجودة
    if (!notificationsContainer) {
        notificationsContainer = document.createElement('div');
        notificationsContainer.className = 'notifications-container';
        document.body.appendChild(notificationsContainer);
        
        // إضافة نمط CSS لحاوية الإشعارات
        const style = document.createElement('style');
        style.textContent = `
            .notifications-container {
                position: fixed;
                top: 20px;
                left: 20px;
                z-index: 9999;
                display: flex;
                flex-direction: column;
                gap: 10px;
            }
            
            .notification {
                background-color: white;
                padding: 15px 20px;
                border-radius: 5px;
                box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
                transform: translateX(-120%);
                transition: transform 0.3s ease;
                display: flex;
                align-items: center;
                gap: 10px;
                min-width: 300px;
            }
            
            .notification.show {
                transform: translateX(0);
            }
            
            .notification-icon {
                font-size: 20px;
            }
            
            .notification-content {
                flex: 1;
            }
            
            .notification-close {
                background: none;
                border: none;
                color: #64748b;
                cursor: pointer;
                font-size: 16px;
                padding: 0;
            }
            
            .notification.success .notification-icon {
                color: #15803d;
            }
            
            .notification.error .notification-icon {
                color: #b91c1c;
            }
            
            .notification.info .notification-icon {
                color: #0369a1;
            }
        `;
        document.head.appendChild(style);
    }
    
    // إنشاء عنصر الإشعار
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    // تحديد أيقونة الإشعار حسب النوع
    let icon = 'info-circle';
    if (type === 'success') icon = 'check-circle';
    if (type === 'error') icon = 'exclamation-circle';
    
    notification.innerHTML = `
        <div class="notification-icon">
            <i class="fas fa-${icon}"></i>
        </div>
        <div class="notification-content">
            ${message}
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // إضافة الإشعار إلى الحاوية
    notificationsContainer.appendChild(notification);
    
    // إظهار الإشعار بتأثير
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // إضافة مستمع حدث لزر الإغلاق
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // إزالة الإشعار تلقائياً بعد 5 ثوانٍ
    setTimeout(() => {
        if (notification.parentNode) {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}

// تنسيق التاريخ
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('ar-EG', options);
}

// دالة لربط API (ستستخدم في الإنتاج)
async function connectToApi(endpoint, method = 'GET', data = null) {
    try {
        const url = `https://api.mircon.com/${endpoint}`;
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer YOUR_API_TOKEN' // استبدل بطريقة الحصول على التوكن الخاص بك
            }
        };
        
        if (data && (method === 'POST' || method === 'PUT')) {
            options.body = JSON.stringify(data);
        }
        
        const response = await fetch(url, options);
        
        if (!response.ok) {
            throw new Error(`خطأ في الاتصال بالـ API: ${response.status}`);
        }
        
        return await response.json();
        
    } catch (error) {
        console.error('خطأ في الاتصال بالـ API:', error);
        throw error;
    }
}