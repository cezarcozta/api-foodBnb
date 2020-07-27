interface IFoodType {
  name: string;
}

export default interface ICreateCardDTO {
  name: string;
  image: string;
  type: IFoodType;
  price: number;
}
