// تهيئة البيانات
let orders = [];
let visits = [];
let sales = [];

// تهيئة لوحة التحكم عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    loadDashboardData();
    setupCharts();
    updateStatistics();
});

// تحميل بيانات لوحة التحكم
async function loadDashboardData() {
    try {
        // محاكاة بيانات الطلبات
        orders = [
            {
                id: '1001',
                customer: 'أحمد محمد',
                product: 'مشد رجالي',
                size: 'L',
                price: 499.00,
                date: '2024-01-15',
                status: 'جديد'
            },
            {
                id: '1002',
                customer: 'محمود علي',
                product: 'مشد رجالي',
                size: 'XL',
                price: 499.00,
                date: '2024-01-14',
                status: 'تم الشحن'
            },
            {
                id: '1003',
                customer: 'خالد أحمد',
                product: 'مشد رجالي',
                size: 'M',
                price: 499.00,
                date: '2024-01-13',
                status: 'قيد المعالجة'
            }
        ];
        
        updateOrdersTable();
    } catch (error) {
        console.error('خطأ في تحميل البيانات:', error);
    }
}

// تحديث جدول الطلبات
function updateOrdersTable() {
    const tableBody = document.getElementById('ordersTableBody');
    if (!tableBody) return;

    tableBody.innerHTML = orders.map(order => `
        <tr>
            <td>#${order.id}</td>
            <td>${order.customer}</td>
            <td>${order.product}</td>
            <td>${order.size}</td>
            <td>${order.price.toFixed(2)} ج.م</td>
            <td>${formatDate(order.date)}</td>
            <td><span class="status-badge ${getStatusClass(order.status)}">${order.status}</span></td>
            <td>
                <button class="btn-action" onclick="viewOrder('${order.id}')">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn-action" onclick="editOrder('${order.id}')">
                    <i class="fas fa-edit"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

// تحديث الإحصائيات
function updateStatistics() {
    // إجمالي المبيعات
    const totalSales = orders.reduce((sum, order) => sum + order.price, 0);
    document.querySelector('.stat-card:nth-child(1) .stat-value').textContent = `${totalSales.toFixed(2)} ج.م`;

    // مبيعات آخر أسبوع
    const lastWeekSales = calculateLastWeekSales();
    document.querySelector('.stat-card:nth-child(2) .stat-value').textContent = `${lastWeekSales.toFixed(2)} ج.م`;

    // مبيعات آخر شهر
    const lastMonthSales = calculateLastMonthSales();
    document.querySelector('.stat-card:nth-child(3) .stat-value').textContent = `${lastMonthSales.toFixed(2)} ج.م`;

    // عدد الطلبات الجديدة
    const newOrders = orders.filter(order => order.status === 'جديد').length;
    document.querySelector('.stat-card:nth-child(4) .stat-value').textContent = newOrders;
}

// إعداد الرسوم البيانية
function setupCharts() {
    setupVisitsChart();
    setupSalesChart();
}

// إعداد رسم بياني للزيارات
function setupVisitsChart() {
    const ctx = document.getElementById('visitsChart').getContext('2d');
    const labels = getLastSevenDays();
    const data = generateRandomData(7, 50, 200); // بيانات تجريبية

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'عدد الزيارات',
                data: data,
                borderColor: '#4CAF50',
                tension: 0.4,
                fill: false
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// إعداد رسم بياني للمبيعات
function setupSalesChart() {
    const ctx = document.getElementById('salesChart').getContext('2d');
    const labels = getLastSevenDays();
    const data = calculateDailySales(7); // حساب المبيعات اليومية

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'المبيعات (ج.م)',
                data: data,
                backgroundColor: '#2196F3',
                borderColor: '#1976D2',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// حساب المبيعات اليومية
function calculateDailySales(days) {
    const dailySales = new Array(days).fill(0);
    const today = new Date();
    
    orders.forEach(order => {
        const orderDate = new Date(order.date);
        const dayDiff = Math.floor((today - orderDate) / (1000 * 60 * 60 * 24));
        if (dayDiff >= 0 && dayDiff < days) {
            dailySales[days - 1 - dayDiff] += order.price;
        }
    });
    
    return dailySales;
}

// دوال مساعدة
function calculateLastWeekSales() {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    return orders
        .filter(order => new Date(order.date) >= oneWeekAgo)
        .reduce((sum, order) => sum + order.price, 0);
}

function calculateLastMonthSales() {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    return orders
        .filter(order => new Date(order.date) >= oneMonthAgo)
        .reduce((sum, order) => sum + order.price, 0);
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('ar-EG', options);
}

function getStatusClass(status) {
    switch (status) {
        case 'جديد': return 'status-new';
        case 'قيد المعالجة': return 'status-processing';
        case 'تم الشحن': return 'status-shipped';
        default: return '';
    }
}

function getLastSevenDays() {
    const days = [];
    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        days.push(date.toLocaleDateString('ar-EG', { weekday: 'short' }));
    }
    return days;
}

function generateRandomData(count, min, max) {
    return Array.from({ length: count }, () => 
        Math.floor(Math.random() * (max - min + 1)) + min
    );
}

// دوال معالجة الطلبات
function viewOrder(orderId) {
    console.log(`عرض الطلب رقم ${orderId}`);
    // هنا يمكن إضافة منطق عرض تفاصيل الطلب
}

function editOrder(orderId) {
    console.log(`تحرير الطلب رقم ${orderId}`);
    // هنا يمكن إضافة منطق تحرير الطلب
}

// تحديث البيانات كل 5 دقائق
setInterval(loadDashboardData, 5 * 60 * 1000);