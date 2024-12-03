import { withAssure } from 'type-fns';

/**
 * data serialized as a uri component
 *
 * usecase
 * - safe to use in a uri
 *
 * ref
 * - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent
 */
export type SerialUriComponent = string & { _base64: undefined }; // note: we add _json to inform typescript that this is a distinct type, and should not be reduced to `string` onhover in ides

export const isSerialUriComponent = withAssure(
  (input: string): input is SerialUriComponent => {
    // see what the encoded string would have looked like
    const encodedExpected = asSerialUriComponent(deSerialUriComponent(input));

    // if its different to current state, then it must not have been encoded
    const encodedClaimed = input;
    if (encodedClaimed !== encodedExpected) return false;

    // otherwise, we were able to decode and re-encode and get the same result -> it was fully encoded
    return true;
  },
);

export const asSerialUriComponent = (input: string): SerialUriComponent =>
  encodeURIComponent(input) as SerialUriComponent;

export const deSerialUriComponent = (
  input: SerialUriComponent | string,
): string => decodeURIComponent(input);
