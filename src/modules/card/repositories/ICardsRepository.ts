import ICreateCardDTO from '../dtos/ICreateCardDTO';
import Cards from '../infra/typeorm/entities/Cards';
import IFindCardByFoodTypeDTO from '../dtos/IFindCardByFoodTypeDTO';
import IFindCardByPriceRangeDTO from '../dtos/IFindCardByPriceRangeDTO';
import IFindCardByTypeAndPriceRangeDTO from '../dtos/IFindCardByTypeAndPriceRangeDTO';

export default interface ICardsRepository {
  createAndSave(data: ICreateCardDTO): Promise<Cards>;

  listAllCards(): Promise<Cards[]>;

  listCardsByFoodType({
    option,
    type,
  }: IFindCardByFoodTypeDTO): Promise<Cards[] | undefined>;

  listCardsByPrice({
    option,
    minPrice,
    maxPrice,
  }: IFindCardByPriceRangeDTO): Promise<Cards[] | undefined>;

  listCardsByTypeAndPrice({
    option,
    type,
    minPrice,
    maxPrice,
  }: IFindCardByTypeAndPriceRangeDTO): Promise<Cards[] | undefined>;

  removeCard(id: string): Promise<void>;

  updateCard(card: Cards): Promise<Cards>;

  findCardById(id: string): Promise<Cards | undefined>;
}
