import { withAssure } from 'type-fns';

/**
 * data serialized as base64
 */
export type SerialBase64 = string & { _base64: undefined }; // note: we add _json to inform typescript that this is a distinct type, and should not be reduced to `string` onhover in ides

export const isSerialBase64 = withAssure(
  (input: string): input is SerialBase64 => {
    if (typeof input !== 'string') return false;
    return /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$/.test(
      input,
    );
  },
);

export const asSerialBase64 = (input: string): SerialBase64 =>
  isSerialBase64.assure(btoa(unescape(encodeURIComponent(input)))); // todo: make this work on node

export const deSerialBase64 = (input: SerialBase64): string =>
  decodeURIComponent(escape(window.atob(input)));
