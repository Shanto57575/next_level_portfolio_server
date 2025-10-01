import { IUser } from "./auth.interface";
export declare const AuthService: {
    loginService: (payload: Partial<IUser>) => Promise<{
        userTokens: {
            accessToken: string;
        };
        user: {
            id: number;
            email: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    getMeService: (email: string) => Promise<{
        id: number;
        email: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
};
//# sourceMappingURL=auth.service.d.ts.map