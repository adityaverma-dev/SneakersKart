const express = require('express');
const authRoute = require('./auth.route');
const router = express.Router();
const brandsRoute= require('./brands.route')
const productRoute = require('./product.route');
const usersRoute = require('./user.route')
const siteRoute = require('./site.route')

const routesIndex = [
    {
        path: '/auth',
        route: authRoute
    },
    {
    path: '/users',
    route: usersRoute
},
{
    path: '/brands',
    route: brandsRoute
},
{
    path: '/products',
    route: productRoute
},
{
    path: '/site',
    route: siteRoute
}
]

routesIndex.forEach((route) => {
    router.use(route.path, route.route);
})



module.exports = router;