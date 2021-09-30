// import Product from "./db/models/products.js";
// import Review from "./db/models/reviews.js";
import Product from "./products.js";
import Review from "./reviews.js";

// hasMany --> model with fkey === target
Product.hasMany(Review)

// belongsTo --> model with fkey === source
Review.belongsTo(Product)



export default { Product, Review }