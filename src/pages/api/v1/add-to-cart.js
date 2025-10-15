// pages/api/v1/add-to-cart.js

// This function will handle POST requests to /api/v1/add-to-cart
export async function POST({ request }) {
  // Cloudflare Rate Limiting will apply to this request based on the URL path.
  
  try {
    // 1. Parse the JSON body from the client-side fetch request
    const body = await request.json();
    const { productId, quantity = 1 } = body;

    if (!productId) {
      return new Response(JSON.stringify({ message: "Missing product ID" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    // 2. Add your actual server-side cart/inventory logic here
    //    (e.g., checking inventory in a KV store or D1 database, updating a session)
    
    // Log the successful processing (for debugging)
    console.log(`Successfully processed addition of product ${productId} (Qty: ${quantity})`);

    // 3. Send a success response back to the client
    return new Response(JSON.stringify({ 
        status: 'success', 
        message: 'Item processed and added to cart.',
        // Optionally, send back the updated cart state
    }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    console.error("API Error:", error);
    return new Response(JSON.stringify({ message: "Internal server error." }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
    });
  }
}

// Optional: Prevent other methods (GET, PUT, etc.) from being used here
export const GET = () => new Response(null, { status: 405 });
