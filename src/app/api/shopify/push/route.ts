import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { product, config } = await req.json();

    if (!config?.shopDomain || !config?.adminAccessToken) {
      return NextResponse.json(
        { success: false, message: "Missing Shopify domain or Admin Access Token" },
        { status: 400 }
      );
    }

    const domain = config.shopDomain.replace(/^https?:\/\//, "").replace(/\/$/, "");
    const url = `https://${domain}/admin/api/${config.apiVersion || "2024-01"}/products.json`;

    const shopifyPayload = {
      product: {
        title: product.name,
        body_html: `<strong>${product.description}</strong><br><p>Key Ingredients: ${product.ingredients?.join(", ")}</p>`,
        vendor: "ROLLIN. Artisan Bakery",
        product_type: product.category,
        tags: [product.category, "Fresh Daily", "ROLLIN Bakery", product.badge || ""].filter(Boolean).join(", "),
        variants: [
          {
            price: product.price.toString(),
            compare_at_price: product.originalPrice ? product.originalPrice.toString() : null,
            sku: `ROLLIN-${product.id.toUpperCase()}`,
            inventory_management: "shopify",
            inventory_policy: "continue",
            requires_shipping: true,
          },
        ],
      },
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": config.adminAccessToken,
      },
      body: JSON.stringify(shopifyPayload),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          message: data?.errors ? JSON.stringify(data.errors) : "Shopify Admin API returned an error",
        },
        { status: response.status }
      );
    }

    const createdProduct = data.product;
    return NextResponse.json({
      success: true,
      message: `Product "${createdProduct.title}" successfully created on Shopify!`,
      shopifyProductId: `gid://shopify/Product/${createdProduct.id}`,
      shopifyProductUrl: `https://${domain}/admin/products/${createdProduct.id}`,
    });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { success: false, message: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}
