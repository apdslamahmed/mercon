document.addEventListener('DOMContentLoaded', function() {
    // تحميل بيانات المنتج من التخزين المحلي
    loadProductData();
    
    // تهيئة قسم المنتج
    initProductSection();
    
    // تهيئة نماذج الطلب
    initOrderForms();
});

// تحميل بيانات المنتج من التخزين المحلي
function loadProductData() {
    const productDataString = localStorage.getItem('productData');
    if (productDataString) {
        try {
            const productData = JSON.parse(productDataString);
            
            // تحديث اسم المنتج
            const productNameElements = document.querySelectorAll('.product-header h3');
            productNameElements.forEach(element => {
                element.textContent = productData.name;
            });
            
            // تحديث الأسعار
            const originalPriceElement = document.querySelector('.original-price');
            if (originalPriceElement && productData.originalPrice) {
                originalPriceElement.textContent = productData.originalPrice + ' ريال';
            }
            
            const currentPriceElement = document.querySelector('.current-price');
            if (currentPriceElement && productData.currentPrice) {
                currentPriceElement.textContent = productData.currentPrice + ' ريال';
            }
            
            // تحديث نسبة الخصم
            const discountBadgeElement = document.querySelector('.discount-badge');
            if (discountBadgeElement && productData.discountPercentage) {
                discountBadgeElement.textContent = 'خصم ' + productData.discountPercentage + '%';
            }
            
            // تحديث خيارات المقاسات
            if (productData.sizes && productData.sizes.length > 0) {
                const sizeOptionsContainer = document.querySelector('.size-options');
                if (sizeOptionsContainer) {
                    sizeOptionsContainer.innerHTML = '';
                    productData.sizes.forEach(size => {
                        const sizeButton = document.createElement('button');
                        sizeButton.className = 'size-option';
                        sizeButton.textContent = size;
                        if (size === 'M') { // افتراضياً نجعل المقاس M هو النشط
                            sizeButton.classList.add('active');
                        }
                        sizeOptionsContainer.appendChild(sizeButton);
                    });
                }
            }
            
            // تحديث خيارات الألوان
            if (productData.colors && productData.colors.length > 0) {
                const colorOptionsContainer = document.querySelector('.color-options');
                if (colorOptionsContainer) {
                    colorOptionsContainer.innerHTML = '';
                    productData.colors.forEach((color, index) => {
                        const colorButton = document.createElement('button');
                        colorButton.className = 'color-option';
                        colorButton.style.backgroundColor = color.value;
                        if (index === 0) { // افتراضياً نجعل اللون الأول هو النشط
                            colorButton.classList.add('active');
                        }
                        colorOptionsContainer.appendChild(colorButton);
                    });
                }
            }
            
            // تحديث أسعار الكميات
            if (productData.quantityPricing && productData.quantityPricing.length > 0) {
                const quantityPricingContainer = document.querySelector('.quantity-pricing');
                if (quantityPricingContainer) {
                    quantityPricingContainer.innerHTML = '';
                    productData.quantityPricing.forEach((option, index) => {
                        const optionDiv = document.createElement('div');
                        optionDiv.className = 'quantity-option';
                        if (index === 0) { // افتراضياً نجعل الخيار الأول هو النشط
                            optionDiv.classList.add('active');
                        }
                        optionDiv.setAttribute('data-price', option.price);
                        
                        const labelSpan = document.createElement('span');
                        labelSpan.className = 'quantity-label';
                        labelSpan.textContent = option.label;
                        
                        const priceSpan = document.createElement('span');
                        priceSpan.className = 'quantity-price';
                        priceSpan.textContent = option.price + ' ريال';
                        
                        optionDiv.appendChild(labelSpan);
                        optionDiv.appendChild(priceSpan);
                        
                        if (option.saving > 0) {
                            const saveSpan = document.createElement('span');
                            saveSpan.className = 'quantity-save';
                            saveSpan.textContent = 'توفير ' + option.saving + ' ريال';
                            optionDiv.appendChild(saveSpan);
                        }
                        
                        quantityPricingContainer.appendChild(optionDiv);
                    });
                }
            }
            
            // تحديث معلومات الشحن
            if (productData.shipping) {
                const shippingPriceElement = document.querySelector('.shipping-option p');
                if (shippingPriceElement && productData.shipping.price) {
                    shippingPriceElement.textContent = 'الشحن العادي: ' + productData.shipping.price + ' ريال';
                }
                
                const freeShippingElement = document.querySelector('.free-shipping');
                if (freeShippingElement && productData.shipping.freeShippingThreshold) {
                    freeShippingElement.textContent = 'شحن مجاني للطلبات أكثر من ' + (productData.shipping.freeShippingThreshold - 1) + ' قطعة!';
                }
            }
            
            // إعادة تهيئة الأحداث بعد تحديث العناصر
            initProductSection();
            
        } catch (error) {
            console.error('خطأ في تحميل بيانات المنتج:', error);
        }
    }
}

// تهيئة قسم المنتج
function initProductSection() {
    // تبديل الصور المصغرة
    const thumbnails = document.querySelectorAll('.product-thumbnails img');
    const mainImage = document.querySelector('.product-main-image');
    
    if (thumbnails.length && mainImage) {
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', function() {
                // إزالة الفئة النشطة من جميع الصور المصغرة
                thumbnails.forEach(t => t.classList.remove('active'));
                // إضافة الفئة النشطة للصورة المحددة
                this.classList.add('active');
                // تحديث الصورة الرئيسية
                mainImage.src = this.src;
            });
        });
    }
    
    // خيارات المقاس
    const sizeOptions = document.querySelectorAll('.size-option');
    if (sizeOptions.length) {
        sizeOptions.forEach(option => {
            option.addEventListener('click', function() {
                sizeOptions.forEach(o => o.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }
    
    // خيارات اللون
    const colorOptions = document.querySelectorAll('.color-option');
    if (colorOptions.length) {
        colorOptions.forEach(option => {
            option.addEventListener('click', function() {
                colorOptions.forEach(o => o.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }
    
    // خيارات الكمية (قطعة واحدة، قطعتين، ثلاث قطع)
    const quantityOptions = document.querySelectorAll('.quantity-option');
    if (quantityOptions.length) {
        quantityOptions.forEach(option => {
            option.addEventListener('click', function() {
                quantityOptions.forEach(o => o.classList.remove('active'));
                this.classList.add('active');
                
                // تحديث السعر الحالي
                const price = this.getAttribute('data-price');
                const currentPrice = document.querySelector('.current-price');
                if (currentPrice) {
                    currentPrice.textContent = price + ' ريال';
                }
                
                // تحديث حالة الشحن المجاني
                const freeShipping = document.querySelector('.free-shipping');
                if (freeShipping) {
                    if (this.querySelector('.quantity-label').textContent !== 'قطعة واحدة') {
                        freeShipping.textContent = 'الشحن مجاني!';
                        freeShipping.style.fontWeight = 'bold';
                    } else {
                        freeShipping.textContent = 'شحن مجاني للطلبات أكثر من قطعة!';
                    }
                }
            });
        });
    }
    
    // زيادة ونقصان الكمية
    const minusBtn = document.querySelector('.quantity-btn.minus');
    const plusBtn = document.querySelector('.quantity-btn.plus');
    const quantityInput = document.querySelector('.quantity-input');
    
    if (minusBtn && plusBtn && quantityInput) {
        minusBtn.addEventListener('click', function() {
            const currentValue = parseInt(quantityInput.value);
            if (currentValue > 1) {
                quantityInput.value = currentValue - 1;
            }
        });
        
        plusBtn.addEventListener('click', function() {
            const currentValue = parseInt(quantityInput.value);
            if (currentValue < 10) {
                quantityInput.value = currentValue + 1;
            }
        });
    }
    
    // أزرار الشراء وإضافة للسلة
    const buyNowBtn = document.querySelector('.btn-order');
    const addToCartBtn = document.querySelector('.btn-cart');
    
    if (buyNowBtn) {
        buyNowBtn.addEventListener('click', function() {
            // الانتقال إلى قسم الطلب
            document.querySelector('#order').scrollIntoView({ behavior: 'smooth' });
            
            // نقل بيانات المنتج المحددة إلى نموذج الطلب
            const selectedSize = document.querySelector('.size-option.active').textContent;
            const selectedQuantity = document.querySelector('.quantity-input').value;
            
            // تعبئة نموذج الطلب بالبيانات المحددة
            if (document.querySelector('#size')) {
                document.querySelector('#size').value = selectedSize;
            }
            
            if (document.querySelector('#quantity')) {
                document.querySelector('#quantity').value = selectedQuantity;
            }
        });
    }
    
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function() {
            // إظهار رسالة إضافة المنتج للسلة
            showCartNotification();
        });
    }
}

// إظهار إشعار إضافة المنتج للسلة
function showCartNotification() {
    // التحقق من وجود إشعار سابق وإزالته
    const existingNotification = document.querySelector('.cart-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // إنشاء عنصر الإشعار
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <p>تمت إضافة المنتج إلى سلة التسوق</p>
    `;
    
    // إضافة الإشعار للصفحة
    document.body.appendChild(notification);
    
    // إظهار الإشعار
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // إخفاء الإشعار بعد 3 ثواني
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// تهيئة نماذج الطلب
function initOrderForms() {
    const orderForm = document.getElementById('orderForm');
    
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // هنا يمكن إضافة كود للتحقق من صحة البيانات وإرسالها للخادم
            
            // عرض رسالة نجاح الطلب
            alert('تم استلام طلبك بنجاح! سنتواصل معك قريباً.');
            
            // إعادة تعيين النموذج
            this.reset();
        });
    }
}

// معالجة تقديم نموذج الطلب
async function handleOrderSubmission(e) {
    e.preventDefault();
    
    // الحصول على بيانات النموذج
    const formData = new FormData(e.target);
    const orderData = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        address: formData.get('address'),
        size: formData.get('size'),
        quantity: formData.get('quantity')
    };

    try {
        // محاكاة إرسال البيانات إلى API
        // في الإنتاج، استبدل هذا برابط API الحقيقي
        // const response = await fetch('https://api.mircon.com/orders', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(orderData)
        // });
        // const result = await response.json();

        // محاكاة استجابة ناجحة
        console.log('تم إرسال الطلب:', orderData);
        
        // عرض رسالة نجاح
        showNotification('تم استلام طلبك بنجاح! سنتواصل معك قريباً.', 'success');
        
        // إعادة تعيين النموذج
        e.target.reset();
        
    } catch (error) {
        console.error('خطأ في إرسال الطلب:', error);
        showNotification('حدث خطأ أثناء إرسال طلبك. يرجى المحاولة مرة أخرى.', 'error');
    }
}

// عرض إشعار للمستخدم
function showNotification(message, type = 'info') {
    // إنشاء عنصر الإشعار
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // إضافة الإشعار إلى الصفحة
    document.body.appendChild(notification);
    
    // إظهار الإشعار بتأثير
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // إزالة الإشعار بعد 5 ثوانٍ
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// تهيئة شريط التمرير لآراء العملاء
function initTestimonialSlider() {
    const slider = document.querySelector('.testimonials-slider');
    if (!slider) return;
    
    // إضافة المزيد من الشهادات للعرض التوضيحي
    const testimonials = [
        {
            content: "المشد الرجالي من ميركون ساعدني على تحسين مظهري بشكل كبير. أنصح به بشدة لكل رجل يهتم بمظهره.",
            author: "سامي العلي",
            stars: 5
        },
        {
            content: "جودة المنتج ممتازة والخامة مريحة جداً. أرتديه يومياً ولا أشعر بأي إزعاج.",
            author: "محمد الأحمد",
            stars: 4
        }
    ];
    
    // إضافة الشهادات الإضافية إلى الشريط
    testimonials.forEach(testimonial => {
        const testimonialElement = createTestimonialElement(testimonial);
        slider.appendChild(testimonialElement);
    });
}

// إنشاء عنصر شهادة
function createTestimonialElement(testimonial) {
    const testimonialDiv = document.createElement('div');
    testimonialDiv.className = 'testimonial';
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'testimonial-content';
    
    const contentP = document.createElement('p');
    contentP.textContent = testimonial.content;
    
    const authorDiv = document.createElement('div');
    authorDiv.className = 'testimonial-author';
    
    const authorName = document.createElement('h4');
    authorName.textContent = testimonial.author;
    
    const starsDiv = document.createElement('div');
    starsDiv.className = 'stars';
    
    // إضافة النجوم
    for (let i = 0; i < 5; i++) {
        const star = document.createElement('i');
        if (i < Math.floor(testimonial.stars)) {
            star.className = 'fas fa-star';
        } else if (i < testimonial.stars) {
            star.className = 'fas fa-star-half-alt';
        } else {
            star.className = 'far fa-star';
        }
        starsDiv.appendChild(star);
    }
    
    authorDiv.appendChild(authorName);
    authorDiv.appendChild(starsDiv);
    
    contentDiv.appendChild(contentP);
    contentDiv.appendChild(authorDiv);
    
    testimonialDiv.appendChild(contentDiv);
    
    return testimonialDiv;
}

// محاكاة لوحة التحكم (ميركون)
function initDashboardSimulation() {
    // إنشاء زر للوصول إلى لوحة التحكم
    const dashboardButton = document.createElement('div');
    dashboardButton.className = 'dashboard-button';
    dashboardButton.innerHTML = '<i class="fas fa-tachometer-alt"></i> لوحة التحكم';
    document.body.appendChild(dashboardButton);
    
    // إضافة نمط CSS للزر
    const style = document.createElement('style');
    style.textContent = `
        .dashboard-button {
            position: fixed;
            bottom: 20px;
            left: 20px;
            background-color: #ff6b6b;
            color: white;
            padding: 10px 15px;
            border-radius: 5px;
            cursor: pointer;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
            z-index: 1000;
            display: flex;
            align-items: center;
            gap: 8px;
            font-weight: bold;
            transition: all 0.3s ease;
        }
        
        .dashboard-button:hover {
            background-color: #ff5252;
            transform: translateY(-2px);
        }
        
        .dashboard-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 2000;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        
        .dashboard-modal.show {
            opacity: 1;
            visibility: visible;
        }
        
        .dashboard-content {
            background-color: white;
            width: 90%;
            max-width: 1200px;
            height: 90%;
            border-radius: 10px;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            box-shadow: 0 5px 30px rgba(0, 0, 0, 0.3);
        }
        
        .dashboard-header {
            background-color: #333;
            color: white;
            padding: 15px 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .dashboard-header h2 {
            margin: 0;
            font-size: 20px;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .dashboard-close {
            background: none;
            border: none;
            color: white;
            font-size: 24px;
            cursor: pointer;
        }
        
        .dashboard-body {
            flex: 1;
            overflow: auto;
            padding: 20px;
            display: flex;
            flex-direction: column;
            gap: 20px;
        }
        
        .dashboard-stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
        }
        
        .stat-card {
            background-color: #f8f9fa;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
        }
        
        .stat-card h3 {
            margin: 0 0 10px;
            color: #666;
            font-size: 16px;
        }
        
        .stat-card .value {
            font-size: 28px;
            font-weight: bold;
            color: #333;
        }
        
        .stat-card .icon {
            font-size: 24px;
            color: #ff6b6b;
            margin-bottom: 15px;
        }
        
        .orders-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        
        .orders-table th, .orders-table td {
            padding: 12px 15px;
            text-align: right;
            border-bottom: 1px solid #ddd;
        }
        
        .orders-table th {
            background-color: #f8f9fa;
            font-weight: bold;
            color: #333;
        }
        
        .orders-table tr:hover {
            background-color: #f8f9fa;
        }
        
        .status-badge {
            display: inline-block;
            padding: 5px 10px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: bold;
        }
        
        .status-pending {
            background-color: #ffeeba;
            color: #856404;
        }
        
        .status-shipped {
            background-color: #b8daff;
            color: #004085;
        }
        
        .status-delivered {
            background-color: #c3e6cb;
            color: #155724;
        }
        
        .notification {
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%) translateY(-100px);
            background-color: white;
            padding: 15px 25px;
            border-radius: 5px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            z-index: 3000;
            transition: transform 0.3s ease;
        }
        
        .notification.show {
            transform: translateX(-50%) translateY(0);
        }
        
        .notification.success {
            border-right: 4px solid #28a745;
        }
        
        .notification.error {
            border-right: 4px solid #dc3545;
        }
        
        .notification.info {
            border-right: 4px solid #17a2b8;
        }
        
        @media (max-width: 768px) {
            .dashboard-stats {
                grid-template-columns: 1fr;
            }
            
            .orders-table {
                font-size: 14px;
            }
            
            .orders-table th, .orders-table td {
                padding: 8px 10px;
            }
        }
    `;
    document.head.appendChild(style);
    
    // إنشاء نافذة لوحة التحكم
    const dashboardModal = document.createElement('div');
    dashboardModal.className = 'dashboard-modal';
    dashboardModal.innerHTML = `
        <div class="dashboard-content">
            <div class="dashboard-header">
                <h2><i class="fas fa-tachometer-alt"></i> لوحة تحكم ميركون</h2>
                <button class="dashboard-close">&times;</button>
            </div>
            <div class="dashboard-body">
                <div class="dashboard-stats">
                    <div class="stat-card">
                        <div class="icon"><i class="fas fa-shopping-cart"></i></div>
                        <h3>إجمالي المبيعات</h3>
                        <div class="value">0.00 ج.م</div>
                    </div>
                    <div class="stat-card">
                        <div class="icon"><i class="fas fa-chart-line"></i></div>
                        <h3>إجمالي مبيعات آخر أسبوع</h3>
                        <div class="value">0.00 ج.م</div>
                    </div>
                    <div class="stat-card">
                        <div class="icon"><i class="fas fa-chart-bar"></i></div>
                        <h3>إجمالي مبيعات آخر شهر</h3>
                        <div class="value">0.00 ج.م</div>
                    </div>
                    <div class="stat-card">
                        <div class="icon"><i class="fas fa-clipboard-list"></i></div>
                        <h3>طلبات جديدة</h3>
                        <div class="value">0</div>
                    </div>
                </div>
                
                <h3>آخر الطلبات</h3>
                <div class="table-responsive">
                    <table class="orders-table">
                        <thead>
                            <tr>
                                <th>رقم الطلب</th>
                                <th>اسم العميل</th>
                                <th>المنتج</th>
                                <th>المقاس</th>
                                <th>السعر</th>
                                <th>تاريخ الطلب</th>
                                <th>الحالة</th>
                            </tr>
                        </thead>
                        <tbody id="ordersTableBody">
                            <!-- سيتم إضافة الطلبات هنا -->
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(dashboardModal);
    
    // فتح لوحة التحكم عند النقر على الزر
    dashboardButton.addEventListener('click', () => {
        dashboardModal.classList.add('show');
        loadDashboardData();
    });
    
    // إغلاق لوحة التحكم
    const closeButton = dashboardModal.querySelector('.dashboard-close');
    closeButton.addEventListener('click', () => {
        dashboardModal.classList.remove('show');
    });
    
    // إغلاق لوحة التحكم عند النقر خارجها
    dashboardModal.addEventListener('click', (e) => {
        if (e.target === dashboardModal) {
            dashboardModal.classList.remove('show');
        }
    });
}

// تحميل بيانات لوحة التحكم
async function loadDashboardData() {
    // في الإنتاج، استبدل هذا بطلب API حقيقي
    // محاكاة تأخير طلب الشبكة
    await new Promise(resolve => setTimeout(resolve, 500));
    
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
    
    // عرض الطلبات في الجدول
    const tableBody = document.getElementById('ordersTableBody');
    if (tableBody) {
        tableBody.innerHTML = '';
        
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
            `;
            
            tableBody.appendChild(row);
        });
    }
}

// تنسيق التاريخ
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('ar-EG', options);
}