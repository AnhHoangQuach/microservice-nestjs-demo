import { JwtOptionsFactory, JwtModuleOptions } from '@nestjs/jwt';

export class JwtConfigService implements JwtOptionsFactory {
  createJwtOptions(): JwtModuleOptions {
    return {
      secret: 'secretkey',
    };
  }
}
