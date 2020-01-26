declare module 'express-validation' {
    import { RequestHandler } from 'express';

    interface IErrorJSON {
        status: string,
        statusText: string,
        errors: any[]
    }

    export class ValidationError extends Error {
        constructor (errors: any[], options: Record<string, any>);
        public message: string;
        public errors: any;
        public flatten: any;
        public status: string;
        public statusText: string;

        public toString(): string;
        public toJSON(): IErrorJSON;
    }

    export default function Validation(schema: any): RequestHandler;
}