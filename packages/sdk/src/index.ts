import { Iframe } from './iframe';

export class FaceSDK {
  private iframe: Iframe;

  constructor() {
    this.iframe = new Iframe('http://localhost:3001');
  }

  // todo: iframe을 활용하여 로그인 페이지를 띄우고 지갑을 생성하세요.
  // iframe안에서 private key를 랜덤으로 생성하고 iframe의 local storage에 저장하고 private key의 public address를 SDK에 전달합니다.
  // 만약 이미 local storage에 private key가 존재한다면 private key를 생성하지 않고 private key의 public address를 SDK에 전달합니다.
  async createWallet(): Promise<string> {
    this.iframe.showOverlay();
    throw new Error('implement me');
  }

  // todo: iframe을 활용하여 트랜잭션 전송 페이지를 띄우고 지갑을 생성하세요.
  // iframe안에서 private key가 local storage에 존재하지 않는다면 error를 발생시킵니다.
  // local storage에 저장된 private key를 활용하여 트랜잭션을 서명하고 전송합니다.
  // 트랜잭션이 채굴될때까지 기다린다음 TransactionReceipt을 리턴합니다.
  async sendTransaction(amount: string): Promise<void> {
    throw new Error('implement me');
  }
}
