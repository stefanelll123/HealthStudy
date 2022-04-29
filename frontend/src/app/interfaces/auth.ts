export interface ILoginPayload {
    email: string;
    password: string;
}

export interface IRegisterPayload {
    firstName: string;
    lastName: string;
    cnp: string;
    email: string;
    password: string;
    confirmPassword: string;
    acceptTermsAndConditions: boolean;
}