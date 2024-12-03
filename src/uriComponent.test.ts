import { getResourceNameFromFileName } from 'visualogic';

import { asSerialUriComponent, isSerialUriComponent } from './uriComponent';

describe(getResourceNameFromFileName(__filename), () => {
  it('should find a partially uri encoded string to not be a SerialUriComponent', () => {
    const partial = [
      asSerialUriComponent('this-part is $encoded!'),
      '& this! p@rt is not!',
    ].join(' ');
    expect(isSerialUriComponent(partial)).toEqual(false);
  });
  it('should find a fully uri encoded string to indeed be a SerialUriComponent', () => {
    const encoded = asSerialUriComponent('this-part is $encoded!');
    expect(isSerialUriComponent(encoded)).toEqual(true);
  });
  it('should find a non uri encoded string to indeed be a SerialUriComponent', () => {
    const encoded = '& this! p@rt is not!';
    expect(isSerialUriComponent(encoded)).toEqual(false);
  });
});
