import { products, getProduct } from "@/lib/products";
import ProductDetail from "@/components/ProductDetail";
import ClientProduct from "@/components/ClientProduct";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const product = getProduct(params.slug);
  if (!product) return { title: "Product | Praxis" };
  return {
    title: `${product.name} — ${product.gender}'s Running ${product.type} | Praxis`,
    description: product.headline,
  };
}

export default function ProductPage({ params }) {
  const product = getProduct(params.slug);
  if (!product) {
    // Custom products added via the admin panel live client-side
    return <ClientProduct slug={params.slug} />;
  }
  return <ProductDetail product={product} />;
}
