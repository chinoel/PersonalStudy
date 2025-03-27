// src/utils/routes.ts
import { useRouter } from 'next/navigation';

export const useAppRouter = () => {
  const router = useRouter();

  return {
    home: () => router.push('/'),
    login: () => router.push('/login'),
    signup: () => router.push('/signup'),
    products: () => router.push('/products'),
    productDetail: (id: string) => router.push(`/products/${id}`),
    back: () => router.back(),
    refresh: () => router.refresh(),
  };
};