import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";

const options: swaggerJSDoc.Options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        tags: [{
            name: 'Products',
            descprition: 'APÏ operations related to products'
        }],
        info: {
            title: 'REST API Node.js / Express / TypeScript',
            version: '1.0.0',
            description: 'API Docs for Products'
        }
    },
    apis: ['./src/router.ts']
}

const swaggerSpec = swaggerJSDoc(options)
const swaggerUIiOptions: SwaggerUiOptions = {
    customCss:
        `.topbar-wrapper .link {
            content: url('https://thumbs.dreamstime.com/b/icono-o-logotipo-superior-de-documento-en-la-l%C3%ADnea-estilo-97715806.jpg');
            height: 120px;
            width: 50px;
        }`,
    customSiteTitle: 'Documentation REST API Express / Typescript'
}

export default swaggerSpec
export {
    swaggerUIiOptions
}