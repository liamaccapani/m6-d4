// import Product from "./db/models/products.js";
// import Review from "./db/models/reviews.js";
import Category from "./categories.js";
import Product from "./products.js";
import ProductCategory from "./prodCatJoined.js";
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
// --> with model defined 
// --> unique: false => prevents pair id
Product.belongsToMany(Category, {
    through: {model: ProductCategory, unique: false}
})
Category.belongsToMany(Product, {
    through: {model: ProductCategory, unique: false}
})


export default { Category, Product, ProductCategory, Review, User }