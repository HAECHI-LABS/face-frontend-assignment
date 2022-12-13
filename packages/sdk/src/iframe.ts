const overlayStyles: Partial<CSSStyleDeclaration> = {
  display: 'none',
  position: 'fixed',
  top: '0',
  right: '0',
  width: '100%',
  height: '100%',
  borderRadius: '0',
  border: 'none',
  zIndex: '2147483647',
};

function applyOverlayStyles(elem: HTMLElement) {
  for (const [cssProperty, value] of Object.entries(overlayStyles)) {
    (elem.style as any)[cssProperty as any] = value;
  }
}

class Ready {
  private _isCompleted = false;
  // Wait for resolve, resolve if iframe becomes ready state.
  private _eventListeners = Array<() => void>();
  complete = () => {
    this._isCompleted = true;
    this._eventListeners.forEach((eventListener) => eventListener());
  };

  add = (eventListener: () => void) => {
    this._eventListeners.push(eventListener);
  };

  isCompleted = () => {
    return this._isCompleted;
  };
}

export class Iframe {
  private readonly _iframe!: Promise<HTMLIFrameElement>;
  private readonly _ready = new Ready();
  private activeElement: any = null;
  private requestIndex = 1;

  constructor(iframeUrl: string) {
    if (document.getElementById('face-iframe')) {
      console.error('Face is already initialized, Face can be initialized once.');
      return;
    }

    window.addEventListener('message', async (e) => {
      if (e.origin !== iframeUrl) {
        return;
      }
      await this.handleMessageFromIframe(e.data);
    });

    this._iframe = new Promise((resolve) => {
      const onload = () => {
        if (!document.getElementById('face-iframe')) {
          const iframe = document.createElement('iframe');
          iframe.id = 'face-iframe';
          iframe.title = 'Secure Modal';
          iframe.src = new URL(`${iframeUrl}`).href;
          iframe.allow = 'clipboard-read; clipboard-write';
          iframe.onload = () => {
            this._ready.complete();
          };
          applyOverlayStyles(iframe);
          document.body.appendChild(iframe);
          resolve(iframe);
        }
      };

      if (['loaded', 'interactive', 'complete'].includes(document.readyState)) {
        onload();
      } else {
        window.addEventListener('load', onload, false);
      }
    });
  }

  async postMessage(data: any): Promise<string> {
    await this.ready();
    data.id = (this.requestIndex++).toString();
    (await this._iframe)?.contentWindow?.postMessage(data, '*');
    return data.id;
  }

  // todo: iframe과 통신하는 로직을 작성해주세요 (iframe의 request 메시지 처리)
  async handleMessageFromIframe(data: any): Promise<string> {
    throw new Error('implement me');
  }

  waitForMessage<T>(requestId?: string): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const listener = (event: MessageEvent) => {
        const response = event.data;
        if (requestId && response.id !== requestId) {
          return;
        }
        window.removeEventListener('message', listener);

        if (response.error) {
          reject(response.error);
        }
        resolve(response.result as T);
      };
      window.addEventListener('message', listener);
    });
  }

  async ready(): Promise<void> {
    return new Promise(async (resolve) => {
      if (this._ready.isCompleted()) {
        resolve();
        return;
      }

      this._ready.add(() => {
        resolve();
      });
    });
  }

  async showOverlay() {
    await this.ready();
    const iframe = await this._iframe;
    iframe.style.display = 'block';
    this.activeElement = document.activeElement;
    iframe.focus();
  }

  async hideOverlay() {
    await this.ready();
    const iframe = await this._iframe;
    iframe.style.display = 'none';
    if (this.activeElement?.focus) this.activeElement.focus();
    this.activeElement = null;
  }
}
