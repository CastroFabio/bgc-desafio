import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: "sa-east-1_ilbYoIYMd",
    ClientId: "cqripe2v9q4ovbcahh2g97afp"
}

export default new CognitoUserPool(poolData);