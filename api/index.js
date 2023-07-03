import DescopeClient from "@descope/node-sdk"


export default async function getFlows(request, response) {
  const projectId = process.env.REACT_APP_DESCOPE_PROJECT_ID
  const managementKey = process.env.MANAGEMENT_KEY

  const descopeClient = DescopeClient({
    projectId: projectId,
    managementKey: managementKey,
  });
  
  try {
    const getFlowData = await descopeClient.management.flow.list()
    const sendFlowData = []

    console.log(getFlowData)

    getFlowData.data.flows.forEach((flowMetadata) => {
      console.log(flowMetadata)
      if (!flowMetadata.disabled) {
        console.log(flowMetadata)
        sendFlowData.push(flowMetadata)
      }
    });

    console.log(sendFlowData)
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

  response.send();
}
