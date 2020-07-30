import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import FoodType from '@modules/foodType/infra/typeorm/entities/FoodType';

import { Expose } from 'class-transformer';

@Entity('cards')
class Cards {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => FoodType, { eager: true, cascade: true })
  @JoinColumn({ name: 'foodType_id' })
  type: FoodType;

  @Column()
  price: number;

  @Column()
  image: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'img_url' })
  getImageUrl(): string | null {
    if (!this.image) {
      return null;
    }

    return `${process.env.APP_API_URL}/files/${this.image}`;
  }
}

export default Cards;
