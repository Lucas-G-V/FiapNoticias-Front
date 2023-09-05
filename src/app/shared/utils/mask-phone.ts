export class MaskPhone{
    static onPhoneNumberChange(telefoneValue : string) {
        const telefone = telefoneValue;
      
        if (telefone.length > 3  &&  telefone[2] === '9') {
            return `(00) 00000-0000`;
        } else {
            return `(00) 0000-0000`;
        }
      }
}