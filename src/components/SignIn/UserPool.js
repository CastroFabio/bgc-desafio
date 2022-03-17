import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: "sa-east-1_sqYp44h3A",
    ClientId: "3qn94s73u3oo64u70sle3h0m5u"
}

export default new CognitoUserPool(poolData);