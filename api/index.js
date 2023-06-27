import DescopeClient from "@descope/node-sdk"


export default async function getFlows(request, response) {
  const projectId = process.env.REACT_APP_DESCOPE_PROJECT_ID
  const managementKey = process.env.MANAGEMENT_KEY

  const descopeClient = DescopeClient({
    projectId: projectId,
    managementKey: managementKey,
  });
  
  try {
    const curr_flow_data = await descopeClient.management.flow.list()

    response.status(200).json({
      body: curr_flow_data,
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
