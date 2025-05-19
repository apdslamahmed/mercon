'use client';

import { useEffect, useState } from 'react';
import ProductCard from './components/ProductCard';

interface ProductData {
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

export default function Home() {
  const [productData, setProductData] = useState<ProductData | null>(null);

  useEffect(() => {
    // محاكاة تحميل بيانات المنتج من التخزين المحلي
    const storedData = localStorage.getItem('productData');
    if (storedData) {
      try {
        const data = JSON.parse(storedData);
        setProductData(data);
      } catch (error) {
        console.error('خطأ في تحميل بيانات المنتج:', error);
      }
    } else {
      // بيانات افتراضية للعرض
      const defaultData: ProductData = {
        name: 'مشد ميركون الرجالي',
        originalPrice: 299,
        currentPrice: 199,
        discountPercentage: 33,
        sizes: ['S', 'M', 'L', 'XL'],
        colors: [
          { value: '#000000' },
          { value: '#FFFFFF' },
          { value: '#1E40AF' }
        ],
        images: [
          '/images/product-1.jpg',
          '/images/product-2.jpg',
          '/images/product-3.jpg'
        ],
        shipping: {
          price: 30,
          freeShippingThreshold: 2
        }
      };
      setProductData(defaultData);
      localStorage.setItem('productData', JSON.stringify(defaultData));
    }
  }, []);

  if (!productData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <ProductCard {...productData} />
    </main>
  );
}
