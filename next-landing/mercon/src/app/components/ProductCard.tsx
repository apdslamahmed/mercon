'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

interface ProductCardProps {
  name: string;
  originalPrice: number;
  currentPrice: number;
  discountPercentage: number;
  sizes: string[];
  colors: { value: string }[];
  images: string[];
  shipping: {
    price: number;
    freeShippingThreshold: number;
  };
}

export default function ProductCard({
  name,
  originalPrice,
  currentPrice,
  discountPercentage,
  sizes,
  colors,
  images,
  shipping
}: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showNotification, setShowNotification] = useState(false);

  const handleQuantityChange = (increment: boolean) => {
    setQuantity(prev => {
      const newValue = increment ? prev + 1 : prev - 1;
      return Math.min(Math.max(newValue, 1), 10);
    });
  };

  const addToCart = () => {
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* صور المنتج */}
        <div className="space-y-4">
          <img
            src={images[selectedImage]}
            alt={name}
            className="w-full h-auto rounded-lg"
          />
          <div className="flex gap-2 overflow-x-auto">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`w-20 h-20 rounded-md ${selectedImage === index ? 'ring-2 ring-blue-500' : ''}`}
              >
                <img
                  src={image}
                  alt={`${name} ${index + 1}`}
                  className="w-full h-full object-cover rounded-md"
                />
              </button>
            ))}
          </div>
        </div>

        {/* تفاصيل المنتج */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold">{name}</h2>
            <div className="mt-2 space-y-1">
              <span className="text-gray-500 line-through">{originalPrice} ريال</span>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-blue-600">{currentPrice} ريال</span>
                <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-sm">
                  خصم {discountPercentage}%
                </span>
              </div>
            </div>
          </div>

          {/* المقاسات */}
          <div>
            <h3 className="font-semibold mb-2">المقاس</h3>
            <div className="flex gap-2">
              {sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 rounded-md ${selectedSize === size
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200'}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* الألوان */}
          <div>
            <h3 className="font-semibold mb-2">اللون</h3>
            <div className="flex gap-2">
              {colors.map((color, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedColor(index)}
                  className={`w-8 h-8 rounded-full ${selectedColor === index ? 'ring-2 ring-blue-500' : ''}`}
                  style={{ backgroundColor: color.value }}
                />
              ))}
            </div>
          </div>

          {/* الكمية */}
          <div>
            <h3 className="font-semibold mb-2">الكمية</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center border rounded-md">
                <button
                  onClick={() => handleQuantityChange(false)}
                  className="px-3 py-1 hover:bg-gray-100"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="px-4 py-1 border-x">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(true)}
                  className="px-3 py-1 hover:bg-gray-100"
                  disabled={quantity >= 10}
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* معلومات الشحن */}
          <div className="text-sm text-gray-600">
            <p>الشحن العادي: {shipping.price} ريال</p>
            <p className="text-green-600 font-semibold">
              {quantity >= shipping.freeShippingThreshold
                ? 'الشحن مجاني!'
                : `شحن مجاني للطلبات أكثر من ${shipping.freeShippingThreshold - 1} قطعة!`}
            </p>
          </div>

          {/* أزرار الشراء */}
          <div className="flex gap-4">
            <button
              onClick={() => window.location.href = '#order'}
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              اطلب الآن
            </button>
            <button
              onClick={addToCart}
              className="flex-1 bg-gray-100 text-gray-800 py-3 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <FontAwesomeIcon icon={faShoppingCart} className="ml-2" />
              أضف للسلة
            </button>
          </div>
        </div>
      </div>

      {/* إشعار إضافة المنتج للسلة */}
      {showNotification && (
        <div className="fixed bottom-4 left-4 bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-slide-up">
          <FontAwesomeIcon icon={faCheckCircle} />
          <span>تمت إضافة المنتج إلى سلة التسوق</span>
        </div>
      )}
    </div>
  );
}