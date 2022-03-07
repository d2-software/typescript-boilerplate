import { Algorithm, JwtPayload, sign, SignOptions, verify, VerifyOptions } from 'jsonwebtoken';
import { configuration } from '../config';

export interface TokenPayload extends JwtPayload {
  username: string;
}

export class Token {
  public static generate(payload: object): string {
    const {token: tokenConfig} = configuration;

    const signOptions: SignOptions = {
      expiresIn: tokenConfig.expiresIn,
      algorithm: <Algorithm>tokenConfig.algorithm
    };

    return sign(payload, tokenConfig.keys.private, signOptions);
  }

  public static verify(token): TokenPayload {
    const {token: tokenConfig} = configuration;

    const verifyOptions: VerifyOptions = {
      algorithms: <Algorithm[]>[tokenConfig.algorithm]
    };

    return <TokenPayload>verify(token, tokenConfig.keys.public, verifyOptions);
  }

}
