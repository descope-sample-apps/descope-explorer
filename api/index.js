import DescopeClient from "@descope/node-sdk"


export default async function handler(request, response) {
  const projectId = process.env.REACT_APP_DESCOPE_PROJECT_ID
  const managementKey = process.env.MANAGEMENT_KEY

  const descopeClient = DescopeClient({
    projectId: projectId,
    managementKey: managementKey,
  });
  
  try {

    var flow_res = { flow: null };

    var flowArr = []
    const curr_flow_data = await descopeClient.management.flow.list()
    curr_flow_data.flows.forEach((flowMetadata) => {
      flowArr.push(flowMetadata)
    });

    flow_res.flow = flowArr
    console.log(flow_res.flow)

    response.status(200).json({
      body: flow_res,
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
