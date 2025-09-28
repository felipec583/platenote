import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Platenote",
      version: "1.0.0",
    },
  },
  apis: ["./docs/*docs.js"],
  //customCss: ".swagger-ui .topbar { display: none }",
  customSiteTitle: "New Title",
  securitySchemes: {
    BearerAuth: {
      type: "http",
      scheme: "bearer",
      bearerFormat: "jwt",
    },
  },
};

const openapiSpecification = swaggerJSDoc(options);

const swaggerUiSetup = swaggerUi.setup(openapiSpecification);

export { swaggerUiSetup };
