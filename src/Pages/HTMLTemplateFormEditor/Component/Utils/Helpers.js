export class GenerateInputOption {
  constructor() {
    this.generateInputs = [];
    this.keyGenerateInputs = [];
    this.keyBase64GenerateInputs = [];
    this.nameGenerateInputs = [];
  }

  _matchAll(text, eachMatch = value => {}) {
    const re = /{{[^}]*}}/g;

    let m;

    do {
      m = re.exec(text);
      if (m) eachMatch(m[0]);
    } while (m);
  }

  formText(text) {
    this._matchAll(text, keyGenerateInput => {
      this.keyGenerateInputs.push(keyGenerateInput);
      this.keyBase64GenerateInputs.push(btoa(keyGenerateInput));
      try {
        const generateInput = JSON.parse(
          keyGenerateInput.substring(1, keyGenerateInput.length - 1)
        );
        this.generateInputs.push(generateInput);
        this.nameGenerateInputs.push(generateInput?.name);
      } catch (error) {
        // this.generateInputs.push(null);
        // this.nameGenerateInputs.push(null);
      }
    });

    return this;
  }

  static formText(text) {
    return new GenerateInputOption().formText(text);
  }
}

export function htmlToGenerateInputOption(html) {
  return GenerateInputOption.formText(html);
}
