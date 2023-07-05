import DescopeClient from "@descope/node-sdk"


export default async function getFlows(request, response) {
  const projectId = process.env.REACT_APP_DESCOPE_PROJECT_ID
  const managementKey = process.env.MANAGEMENT_KEY

  const descopeClient = DescopeClient({
    projectId: projectId,
    managementKey: managementKey,
  });
  
  if (request.method === 'POST') {
    try {
      const requestFlowID = request.headers.flowid
      const res = await descopeClient.management.flow.export(requestFlowID);

      const exportData = {"screens": res.data.screens, "flow": res.data.flow}

      response.status(200).json({
        exportData: exportData,
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
  } else {
    try {
      const getFlowData = await descopeClient.management.flow.list()
      const sendFlowData = []

      getFlowData.data.flows.forEach((flowMetadata) => {
        if (!flowMetadata.disabled) {
          sendFlowData.push(flowMetadata)
        }
      });

      response.status(200).json({
        body: sendFlowData,
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
  }

  response.send();
}
