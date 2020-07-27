interface IFoodType {
  name: string;
}

export default interface ICreateCardDTO {
  name: string;
  type: IFoodType;
  price: number;
}
