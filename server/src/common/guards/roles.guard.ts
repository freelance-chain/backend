import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
            context.getHandler(),
            context.getClass()
        ]);

        if (!requiredRoles) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        if (!request) {
            return false;
        }

        const token = request.headers['authorization']?.split(' ')[1];
        if (!token) {
            return false;
        }

        const role = await this.getRole(token)
        if (!role) {
            return false;
        }

        return requiredRoles.some(requiredRole => requiredRole === role);
    }

    private async getRole(token: string) {
        const arrayToken = token.split('.');
        const tokenPayload = JSON.parse(Buffer.from(arrayToken[1], 'base64').toString('utf-8'));
        return tokenPayload.roles
    }
}