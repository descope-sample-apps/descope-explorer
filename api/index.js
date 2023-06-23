import DescopeClient from "@descope/node-sdk";
import * as dotenv from "dotenv";

dotenv.config();

export default async function handler(request, response) {
  const projectId = request.headers['x-project-id'] || process.env.REACT_APP_DESCOPE_PROJECT_ID;
  
  const header = request.headers['authorization'];
  const session_token = header?.split(" ")[1] ?? "";

  const descopeClient = DescopeClient({
    projectId: projectId,
    baseUrl: process.env.DESCOPE_BASE_URL
  });
  
  let roles = [];

  try {
    const jwt = await descopeClient.validateSession(session_token);
    Object.keys(jwt.token.tenants || []).forEach((tenantId) => {
      roles = roles.concat(jwt.token.tenants[tenantId].roles);
    });

    response.status(200).json({
      body: [],
      query: request.query,
      cookies: request.cookies,
    });
  } catch (error) {
    response.status(401).json({
      body: {},
      query: request.query,
      cookies: request.cookies,
    });
  }
  response.send();
}
