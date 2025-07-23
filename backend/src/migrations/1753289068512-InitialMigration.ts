import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class InitialMigration1753289068512 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "users",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: "email",
                    type: "varchar",
                    isUnique: true,
                },
                {
                    name: "password",
                    type: "varchar",
                },
                {
                    name: "createdat",
                    type: "timestamp",
                    default: "now()",
                },
            ],
        }), true);

        await queryRunner.createTable(new Table({
            name: "tasks",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: "title",
                    type: "varchar",
                },
                {
                    name: "description",
                    type: "text",
                    isNullable: true,
                },
                {
                    name: "completed",
                    type: "boolean",
                    default: false,
                },
                {
                    name: "userId",
                    type: "int",
                },
                {
                    name: "createdat",
                    type: "timestamp",
                    default: "now()",
                },
                {
                    name: "updatedat",
                    type: "timestamp",
                    default: "now()",
                },
            ],
        }), true);

        await queryRunner.createForeignKey("tasks", new TableForeignKey({
            columnNames: ["userId"],
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            referencedTableName: "users",
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("tasks", "FK_tasks_users"); // Assuming FK_tasks_users is the default name
        await queryRunner.dropTable("tasks");
        await queryRunner.dropTable("users");
    }

}
