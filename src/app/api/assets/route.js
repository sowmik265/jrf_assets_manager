import pool from "@/lib/db";

export async function POST(req) {
  try {
    const {
      asset_name,
      asset_type,
      price,
      model,
      buying_date,
      warranty_available,
    } = await req.json();

    if (!asset_name || !asset_type || !price || !buying_date) {
      return new Response(
        JSON.stringify({ message: "Required fields are missing" }),
        { status: 400 }
      );
    }

    const [result] = await pool.execute(
      "INSERT INTO assets (asset_name, asset_type, price, model, buying_date, warranty_available) VALUES (?, ?, ?, ?, ?, ?)",
      [
        asset_name,
        asset_type,
        price,
        model || null,
        buying_date,
        warranty_available ? 1 : 0,
      ]
    );

    return new Response(
      JSON.stringify({
        message: "Asset added successfully",
        asset_id: result.insertId,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding asset:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const sortBy = searchParams.get("sortBy") || "asset_name"; // Default to 'asset_name'
    const order = searchParams.get("order") || "ASC";
  
    // Validate that the sortBy field is a valid column to prevent SQL injection
    const validSortColumns = ["asset_name", "asset_type", "price", "buying_date"];
    if (!validSortColumns.includes(sortBy)) {
      return new Response(
        JSON.stringify({ message: "Invalid sort column" }),
        { status: 400 }
      );
    }
  
    const offset = (page - 1) * limit;
  
    try {
      // Use raw query with parameterized LIMIT and OFFSET
      const sqlQuery = `
        SELECT * 
        FROM assets 
        ORDER BY ${sortBy} ${order} 
        LIMIT ${limit} OFFSET ${offset}`;
  
      // Execute the query with no parameters since LIMIT and OFFSET are directly embedded
      const [assets] = await pool.execute(sqlQuery);
  
      // Fetch total number of assets to calculate total pages
      const [totalAssets] = await pool.execute('SELECT COUNT(*) AS total FROM assets');
      const totalPages = Math.ceil(totalAssets[0].total / limit);
  
      return new Response(
        JSON.stringify({
          assets,
          totalPages
        }),
        { status: 200 }
      );
    } catch (error) {
      console.error("Error fetching assets:", error);
      return new Response(
        JSON.stringify({ message: "Error fetching assets" }),
        { status: 500 }
      );
    }
  }