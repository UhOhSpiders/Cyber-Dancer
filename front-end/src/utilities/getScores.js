import { get } from "aws-amplify/api";
export async function getScores() {
  try {
    const restOperation = get({ 
      apiName: 'scoresapi',
      path: '/track/1' 
    });
    const response = await restOperation.response;
    const jsonData = await response.body.json();
    console.log('GET call succeeded: ', jsonData);
  } catch (e) {
    console.log('GET call failed: ', e);
  }
}


