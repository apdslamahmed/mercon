// بيانات الطلبات (محاكاة لبيانات API)
const ordersData = [
    {
        id: "ORD-001",
        customer: {
            name: "أحمد محمد",
            phone: "0501234567",
            address: "الرياض، حي النزهة، شارع الأمير سلطان"
        },
        date: "2023-06-15",
        status: "delivered",
        total: 750,
        products: [
            { name: "سماعة بلوتوث", quantity: 1, price: 350 },
            { name: "شاحن لاسلكي", quantity: 2, price: 200 }
        ]
    },
    {
        id: "ORD-002",
        customer: {
            name: "سارة عبدالله",
            phone: "0557891234",
            address: "جدة، حي الروضة، شارع فلسطين"
        },
        date: "2023-06-18",
        status: "shipped",
        total: 1200,
        products: [
            { name: "حامل هاتف للسيارة", quantity: 1, price: 120 },
            { name: "سماعة بلوتوث", quantity: 1, price: 350 },
            { name: "باور بانك", quantity: 1, price: 230 },
            { name: "كابل شحن", quantity: 5, price: 100 }
        ]
    },
    {
        id: "ORD-003",
        customer: {
            name: "خالد العتيبي",
            phone: "0534567890",
            address: "الدمام، حي الشاطئ، شارع الخليج"
        },
        date: "2023-06-20",
        status: "processing",
        total: 450,
        products: [
            { name: "حافظة هاتف", quantity: 3, price: 150 }
        ]
    },
    {
        id: "ORD-004",
        customer: {
            name: "نورة السالم",
            phone: "0567891234",
            address: "الرياض، حي الملقا، شارع أنس بن مالك"
        },
        date: "2023-06-22",
        status: "new",
        total: 1800,
        products: [
            { name: "سماعة رأس", quantity: 1, price: 800 },
            { name: "لوحة مفاتيح لاسلكية", quantity: 1, price: 350 },
            { name: "ماوس لاسلكي", quantity: 1, price: 200 },
            { name: "حامل شاشة", quantity: 1, price: 450 }
        ]
    },
    {
        id: "ORD-005",
        customer: {
            name: "فهد الشمري",
            phone: "0512345678",
            address: "مكة، حي العزيزية، شارع الملك فهد"
        },
        date: "2023-06-25",
        status: "cancelled",
        total: 350,
        products: [
            { name: "سماعة بلوتوث", quantity: 1, price: 350 }
        ]
    },
    {
        id: "ORD-006",
        customer: {
            name: "ليلى القحطاني",
            phone: "0523456789",
            address: "الرياض، حي الياسمين، شارع عثمان بن عفان"
        },
        date: "2023-06-28",
        status: "new",
        total: 580,
        products: [
            { name: "حامل هاتف للسيارة", quantity: 1, price: 120 },
            { name: "شاحن سيارة", quantity: 1, price: 90 },
            { name: "باور بانك", quantity: 1, price: 230 },
            { name: "كابل شحن", quantity: 2, price: 70 }
        ]
    },
    {
        id: "ORD-007",
        customer: {
            name: "عبدالرحمن الغامدي",
            phone: "0534567891",
            address: "جدة، حي السلامة، شارع التحلية"
        },
        date: "2023-07-01",
        status: "processing",
        total: 1500,
        products: [
            { name: "سماعة رأس", quantity: 1, price: 800 },
            { name: "حامل شاشة", quantity: 1, price: 450 },
            { name: "كابل HDMI", quantity: 1, price: 250 }
        ]
    },
    {
        id: "ORD-008",
        customer: {
            name: "منى الدوسري",
            phone: "0545678912",
            address: "الرياض، حي الورود، شارع العليا"
        },
        date: "2023-07-05",
        status: "shipped",
        total: 920,
        products: [
            { name: "لوحة مفاتيح لاسلكية", quantity: 1, price: 350 },
            { name: "ماوس لاسلكي", quantity: 1, price: 200 },
            { name: "حامل لابتوب", quantity: 1, price: 180 },
            { name: "كابل شحن", quantity: 3, price: 90 },
            { name: "محول USB", quantity: 1, price: 100 }
        ]
    },
    {
        id: "ORD-009",
        customer: {
            name: "سلطان المالكي",
            phone: "0556789123",
            address: "الدمام، حي الفيصلية، شارع الأمير محمد"
        },
        date: "2023-07-08",
        status: "delivered",
        total: 670,
        products: [
            { name: "باور بانك", quantity: 1, price: 230 },
            { name: "شاحن لاسلكي", quantity: 1, price: 200 },
            { name: "كابل شحن", quantity: 4, price: 120 },
            { name: "محول USB", quantity: 1, price: 120 }
        ]
    },
    {
        id: "ORD-010",
        customer: {
            name: "هدى العنزي",
            phone: "0567891235",
            address: "الرياض، حي الربيع، شارع الملك عبدالله"
        },
        date: "2023-07-10",
        status: "processing",
        total: 1250,
        products: [
            { name: "سماعة رأس", quantity: 1, price: 800 },
            { name: "حامل هاتف للسيارة", quantity: 1, price: 120 },
            { name: "شاحن لاسلكي", quantity: 1, price: 200 },
            { name: "كابل شحن", quantity: 2, price: 65 },
            { name: "محول USB", quantity: 1, price: 65 }
        ]
    }
];

// متغيرات عامة
let currentPage = 1;
const ordersPerPage = 5;
let filteredOrders = [...ordersData];
let selectedOrderId = null;

// تحميل البيانات عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // تهيئة عناصر التصفية
    initFilters();
    
    // عرض الطلبات
    renderOrders();
    
    // تهيئة نافذة التفاصيل
    initOrderDetailsModal();
});

// تهيئة عناصر التصفية
function initFilters() {
    // تصفية حسب الحالة
    document.getElementById('status-filter').addEventListener('change', applyFilters);
    
    // تصفية حسب التاريخ
    document.getElementById('date-filter').addEventListener('change', applyFilters);
    
    // تصفية حسب البحث
    document.getElementById('search-filter').addEventListener('input', applyFilters);
}

// تطبيق التصفية
function applyFilters() {
    const statusFilter = document.getElementById('status-filter').value;
    const dateFilter = document.getElementById('date-filter').value;
    const searchFilter = document.getElementById('search-filter').value.trim().toLowerCase();
    
    // تصفية البيانات
    filteredOrders = ordersData.filter(order => {
        // تصفية حسب الحالة
        if (statusFilter !== 'all' && order.status !== statusFilter) {
            return false;
        }
        
        // تصفية حسب التاريخ
        if (dateFilter && !order.date.includes(dateFilter)) {
            return false;
        }
        
        // تصفية حسب البحث (اسم العميل أو رقم الطلب)
        if (searchFilter && !order.customer.name.toLowerCase().includes(searchFilter) && 
            !order.id.toLowerCase().includes(searchFilter)) {
            return false;
        }
        
        return true;
    });
    
    // إعادة تعيين الصفحة الحالية
    currentPage = 1;
    
    // إعادة عرض الطلبات
    renderOrders();
}

// عرض الطلبات
function renderOrders() {
    const container = document.getElementById('orders-table-container');
    
    // حساب الطلبات للصفحة الحالية
    const startIndex = (currentPage - 1) * ordersPerPage;
    const endIndex = startIndex + ordersPerPage;
    const currentOrders = filteredOrders.slice(startIndex, endIndex);
    
    // التحقق من وجود طلبات
    if (currentOrders.length === 0) {
        container.innerHTML = `
            <div class="no-orders">
                <i class="fas fa-shopping-cart"></i>
                <p>لا توجد طلبات متطابقة مع معايير البحث</p>
            </div>
        `;
    } else {
        // إنشاء جدول الطلبات
        let tableHTML = `
            <table class="orders-table">
                <thead>
                    <tr>
                        <th>رقم الطلب</th>
                        <th>العميل</th>
                        <th>التاريخ</th>
                        <th>الإجمالي</th>
                        <th>الحالة</th>
                        <th>الإجراءات</th>
                    </tr>
                </thead>
                <tbody>
        `;
        
        // إضافة صفوف الطلبات
        currentOrders.forEach(order => {
            tableHTML += `
                <tr>
                    <td>${order.id}</td>
                    <td>${order.customer.name}</td>
                    <td>${formatDate(order.date)}</td>
                    <td>${order.total} ر.س</td>
                    <td><span class="status-badge status-${order.status}">${getStatusText(order.status)}</span></td>
                    <td>
                        <button class="action-btn" onclick="viewOrderDetails('${order.id}')"><i class="fas fa-eye"></i></button>
                        <button class="action-btn" onclick="printOrder('${order.id}')"><i class="fas fa-print"></i></button>
                    </td>
                </tr>
            `;
        });
        
        tableHTML += `
                </tbody>
            </table>
        `;
        
        container.innerHTML = tableHTML;
    }
    
    // تحديث ترقيم الصفحات
    renderPagination();
}

// عرض ترقيم الصفحات
function renderPagination() {
    const paginationContainer = document.getElementById('pagination');
    const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
    
    // إذا كان هناك صفحة واحدة فقط، لا داعي لعرض ترقيم الصفحات
    if (totalPages <= 1) {
        paginationContainer.innerHTML = '';
        return;
    }
    
    let paginationHTML = '';
    
    // زر الصفحة السابقة
    paginationHTML += `
        <button onclick="changePage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>
            <i class="fas fa-chevron-right"></i>
        </button>
    `;
    
    // أزرار الصفحات
    for (let i = 1; i <= totalPages; i++) {
        paginationHTML += `
            <button onclick="changePage(${i})" class="${currentPage === i ? 'active' : ''}">
                ${i}
            </button>
        `;
    }
    
    // زر الصفحة التالية
    paginationHTML += `
        <button onclick="changePage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>
            <i class="fas fa-chevron-left"></i>
        </button>
    `;
    
    paginationContainer.innerHTML = paginationHTML;
}

// تغيير الصفحة
function changePage(page) {
    // التحقق من صحة رقم الصفحة
    const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
    if (page < 1 || page > totalPages) {
        return;
    }
    
    // تحديث الصفحة الحالية
    currentPage = page;
    
    // إعادة عرض الطلبات
    renderOrders();
}

// تهيئة نافذة تفاصيل الطلب
function initOrderDetailsModal() {
    // زر إغلاق النافذة
    document.getElementById('closeModal').addEventListener('click', function() {
        document.getElementById('orderDetailsModal').style.display = 'none';
    });
    
    // زر تحديث الحالة
    document.getElementById('updateStatusBtn').addEventListener('click', updateOrderStatus);
    
    // إغلاق النافذة عند النقر خارجها
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('orderDetailsModal');
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// عرض تفاصيل الطلب
function viewOrderDetails(orderId) {
    // البحث عن الطلب
    const order = ordersData.find(order => order.id === orderId);
    if (!order) return;
    
    // تحديث المعرف المحدد
    selectedOrderId = orderId;
    
    // تحديث بيانات النافذة
    document.getElementById('orderIdDisplay').textContent = order.id;
    document.getElementById('customerName').textContent = order.customer.name;
    document.getElementById('customerPhone').textContent = order.customer.phone;
    document.getElementById('customerAddress').textContent = order.customer.address;
    document.getElementById('orderDate').textContent = formatDate(order.date);
    document.getElementById('orderStatus').textContent = getStatusText(order.status);
    document.getElementById('orderTotal').textContent = `${order.total} ر.س`;
    
    // تحديث قائمة المنتجات
    const productsContainer = document.getElementById('orderProducts');
    let productsHTML = '';
    
    order.products.forEach(product => {
        productsHTML += `
            <div class="product-item">
                <div class="product-details">
                    <strong>${product.name}</strong>
                    <div>${product.quantity} × ${product.price} ر.س</div>
                </div>
                <div>${product.quantity * product.price} ر.س</div>
            </div>
        `;
    });
    
    productsContainer.innerHTML = productsHTML;
    
    // تحديث قائمة الحالات
    document.getElementById('updateStatusSelect').value = order.status;
    
    // عرض النافذة
    document.getElementById('orderDetailsModal').style.display = 'flex';
}

// تحديث حالة الطلب
function updateOrderStatus() {
    // التحقق من وجود طلب محدد
    if (!selectedOrderId) return;
    
    // الحصول على الحالة الجديدة
    const newStatus = document.getElementById('updateStatusSelect').value;
    
    // تحديث حالة الطلب
    const orderIndex = ordersData.findIndex(order => order.id === selectedOrderId);
    if (orderIndex !== -1) {
        ordersData[orderIndex].status = newStatus;
        
        // تحديث القائمة المصفاة
        filteredOrders = applyCurrentFilters();
        
        // إعادة عرض الطلبات
        renderOrders();
        
        // تحديث نص الحالة في النافذة
        document.getElementById('orderStatus').textContent = getStatusText(newStatus);
        
        // عرض رسالة نجاح
        alert('تم تحديث حالة الطلب بنجاح');
    }
}

// تطبيق التصفية الحالية
function applyCurrentFilters() {
    const statusFilter = document.getElementById('status-filter').value;
    const dateFilter = document.getElementById('date-filter').value;
    const searchFilter = document.getElementById('search-filter').value.trim().toLowerCase();
    
    return ordersData.filter(order => {
        // تصفية حسب الحالة
        if (statusFilter !== 'all' && order.status !== statusFilter) {
            return false;
        }
        
        // تصفية حسب التاريخ
        if (dateFilter && !order.date.includes(dateFilter)) {
            return false;
        }
        
        // تصفية حسب البحث (اسم العميل أو رقم الطلب)
        if (searchFilter && !order.customer.name.toLowerCase().includes(searchFilter) && 
            !order.id.toLowerCase().includes(searchFilter)) {
            return false;
        }
        
        return true;
    });
}

// طباعة الطلب
function printOrder(orderId) {
    // البحث عن الطلب
    const order = ordersData.find(order => order.id === orderId);
    if (!order) return;
    
    // إنشاء نافذة طباعة
    const printWindow = window.open('', '_blank');
    
    // إنشاء محتوى الطباعة
    let printContent = `
        <!DOCTYPE html>
        <html lang="ar" dir="rtl">
        <head>
            <meta charset="UTF-8">
            <title>طباعة الطلب ${order.id}</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    padding: 20px;
                }
                .header {
                    text-align: center;
                    margin-bottom: 20px;
                    padding-bottom: 10px;
                    border-bottom: 1px solid #ddd;
                }
                .order-info {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 15px;
                    margin-bottom: 20px;
                }
                .products-table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-bottom: 20px;
                }
                .products-table th, .products-table td {
                    border: 1px solid #ddd;
                    padding: 8px;
                    text-align: right;
                }
                .products-table th {
                    background-color: #f2f2f2;
                }
                .total {
                    text-align: left;
                    font-weight: bold;
                    margin-top: 10px;
                }
                .footer {
                    margin-top: 30px;
                    text-align: center;
                    color: #777;
                    font-size: 0.9em;
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>ميركون - تفاصيل الطلب</h1>
                <p>رقم الطلب: ${order.id}</p>
            </div>
            
            <div class="order-info">
                <div>
                    <h3>معلومات العميل</h3>
                    <p><strong>الاسم:</strong> ${order.customer.name}</p>
                    <p><strong>الهاتف:</strong> ${order.customer.phone}</p>
                    <p><strong>العنوان:</strong> ${order.customer.address}</p>
                </div>
                <div>
                    <h3>معلومات الطلب</h3>
                    <p><strong>التاريخ:</strong> ${formatDate(order.date)}</p>
                    <p><strong>الحالة:</strong> ${getStatusText(order.status)}</p>
                </div>
            </div>
            
            <h3>المنتجات</h3>
            <table class="products-table">
                <thead>
                    <tr>
                        <th>المنتج</th>
                        <th>الكمية</th>
                        <th>السعر</th>
                        <th>الإجمالي</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    // إضافة المنتجات
    order.products.forEach(product => {
        printContent += `
            <tr>
                <td>${product.name}</td>
                <td>${product.quantity}</td>
                <td>${product.price} ر.س</td>
                <td>${product.quantity * product.price} ر.س</td>
            </tr>
        `;
    });
    
    // إضافة الإجمالي والتذييل
    printContent += `
                </tbody>
            </table>
            
            <div class="total">
                <p>الإجمالي: ${order.total} ر.س</p>
            </div>
            
            <div class="footer">
                <p>شكراً لتسوقك من ميركون</p>
                <p>للاستفسارات: support@mercon.com | 920001234</p>
            </div>
        </body>
        </html>
    `;
    
    // كتابة المحتوى وطباعة النافذة
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.onload = function() {
        printWindow.print();
        printWindow.onafterprint = function() {
            printWindow.close();
        };
    };
}

// تنسيق التاريخ
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('ar-SA', options);
}

// الحصول على نص الحالة
function getStatusText(status) {
    const statusMap = {
        'new': 'جديد',
        'processing': 'قيد المعالجة',
        'shipped': 'تم الشحن',
        'delivered': 'تم التوصيل',
        'cancelled': 'ملغي'
    };
    
    return statusMap[status] || status;
}