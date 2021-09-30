// import Product from "./db/models/products.js";
// import Review from "./db/models/reviews.js";
import Product from "./products.js";
import Review from "./reviews.js";
import User from "./users.js"


// ********* RELATIONSHIP PRODUCT-REVIEW => 1:n
// hasMany --> model with fkey === target
Product.hasMany(Review)
// belongsTo --> model with fkey === source
Review.belongsTo(Product)

// ********* RELATIONSHIP USER-REVIEW => 1:n
User.hasMany(Review)
Review.belongsTo(User)


// ********* RELATIONSHIP CATEGORY-PRODUCT => n:m
// belongsToMany


export default { Product, Review, User }