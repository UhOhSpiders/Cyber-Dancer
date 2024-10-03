

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    console.log(event)
    // use this to query database for the associated scores table
    // https://2vt8x0jgok.execute-api.eu-west-2.amazonaws.com/dev
    const trackId = event.pathParameters.trackId;
    const customer = {'trackId': trackId, 'trackName': "Track " + trackId };
    const response = {
        statusCode: 200,
    //  Uncomment below to enable CORS requests
     headers: {
         "Access-Control-Allow-Origin": "*",
         "Access-Control-Allow-Headers": "*"
     }, 
        body: JSON.stringify(customer),
    };
    return response;
};

