import { Parameter } from "aws-sdk/clients/ssm";

export const getParameterValue = (parameters: Parameter[], path: string): string => {
    return parameters.filter(parameter => parameter.Name == path)[0].Value;
}