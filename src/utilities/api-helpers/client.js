import { generateClient } from "aws-amplify/api";
const client = generateClient({ authMode: 'apiKey' });
export default client;
