import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: "sa-east-1_xKOYA8WKG",
    ClientId: "3v1449hsm63pdm68tancq2egrf"
}

export default new CognitoUserPool(poolData);