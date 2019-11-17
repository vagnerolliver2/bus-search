import { Itinerary } from 'src/app/model/itinerary.model';

export default {

  reduceByCoordenates() {
    const isCoordenate = this.validaCoordenate;

    return (value: string, index: number) => {
      if (isCoordenate(value)) return true;

      return false;
    };
  },

  validaCoordenate(value: string) {
    const textRegex = /^[a-zA-Z]+$/;

    if (textRegex.test(value)) return false;

    return true;
  },

  mountArrayCoordenates(valuesPayload: any) {
    return (coordinates: any, index: number) => {
      coordinates.push(valuesPayload[index]);

      return coordinates;
    };
  },

  parse(payload: any): Itinerary {
    const keysPayload =  Object.keys(payload);
    const valuesPayload = Object.values(payload);
    const { nome, idlinha, codigo } = payload;

    const coordinates = keysPayload
    .filter(this.reduceByCoordenates())
    .reduce(this.mountArrayCoordenates(valuesPayload), []);


    return {
      nome,
      id: idlinha,
      codigo,
      coordinates
    };
  }
};
