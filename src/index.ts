import { withAssure } from 'type-fns';

export type Serializable = any; // todo: narrow type

/**
 * data serialized as json
 */
export type SerialJSON = string & { _json: undefined }; // note: we add _json to inform typescript that this is a distinct type, and should not be reduced to `string` onhover in ides

export const isSerialJSON = withAssure((input: string): input is SerialJSON => {
  if (typeof input !== 'string') return false;
  try {
    JSON.parse(input);
    return true;
  } catch {
    return false;
  }
});

export const asSerialJSON = (input: Serializable): SerialJSON =>
  isSerialJSON.assure(JSON.stringify(input));

export const deSerialJSON = <T>(input: SerialJSON): T => JSON.parse(input);

// todo: support TySON; https://github.com/jetify-com/tyson
