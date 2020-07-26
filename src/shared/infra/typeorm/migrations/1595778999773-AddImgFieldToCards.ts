import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddImgFieldToCards1595778999773
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'cards',
      new TableColumn({
        name: 'image',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('cards', 'image');
  }
}
