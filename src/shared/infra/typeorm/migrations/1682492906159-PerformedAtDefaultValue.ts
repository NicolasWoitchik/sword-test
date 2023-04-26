import {MigrationInterface, QueryRunner} from "typeorm";

export class PerformedAtDefaultValue1682492906159 implements MigrationInterface {
    name = 'PerformedAtDefaultValue1682492906159'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tasks\` CHANGE \`performedAt\` \`performedAt\` datetime NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tasks\` CHANGE \`performedAt\` \`performedAt\` datetime NOT NULL`);
    }

}
