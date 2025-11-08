import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1762270399968 implements MigrationInterface {
    name = 'InitialSchema1762270399968'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "customers" ("id" SERIAL NOT NULL, "nama_pelanggan" character varying(255) NOT NULL, "nomor_telepon" character varying(15) NOT NULL, "alamat" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_133ec679a801fab5e070f73d3ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('Admin', 'Kasir')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "username" character varying(50) NOT NULL, "password" character varying(255) NOT NULL, "role" "public"."users_role_enum" NOT NULL DEFAULT 'Kasir', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."services_satuan_enum" AS ENUM('kg', 'pcs')`);
        await queryRunner.query(`CREATE TABLE "services" ("id" SERIAL NOT NULL, "nama_layananan" character varying(255) NOT NULL, "harga" numeric NOT NULL, "satuan" "public"."services_satuan_enum" NOT NULL DEFAULT 'kg', "deskripsi" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_7e4ab4330ef1e2486c0da5298e2" UNIQUE ("nama_layananan"), CONSTRAINT "PK_ba2d347a3168a296416c6c5ccb2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "transaction_details" ("id" SERIAL NOT NULL, "qty" integer NOT NULL, "harga_layanan" numeric NOT NULL, "subtotal" numeric NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id_transaksi" integer, "id_layanan" integer, CONSTRAINT "PK_b9397af1203ca3a78ca6631e4b7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."transactions_status_pesanan_enum" AS ENUM('Baru', 'Proses', 'Selesai', 'Diambil')`);
        await queryRunner.query(`CREATE TYPE "public"."transactions_status_pembayaran_enum" AS ENUM('Belum lunas', 'Lunas')`);
        await queryRunner.query(`CREATE TABLE "transactions" ("id" SERIAL NOT NULL, "kode_invoice" character varying NOT NULL, "tanggal_masuk" TIMESTAMP NOT NULL DEFAULT now(), "tanggal_selesai" TIMESTAMP DEFAULT now(), "total_bayar" numeric NOT NULL, "status_pesanan" "public"."transactions_status_pesanan_enum" NOT NULL DEFAULT 'Baru', "status_pembayaran" "public"."transactions_status_pembayaran_enum" NOT NULL DEFAULT 'Belum lunas', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id_pelanggan" integer, "id_user" integer, CONSTRAINT "UQ_496275308fa00d9b687748a4f14" UNIQUE ("kode_invoice"), CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "transaction_details" ADD CONSTRAINT "FK_7396567ad8151e670f2ea006fb4" FOREIGN KEY ("id_transaksi") REFERENCES "transactions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transaction_details" ADD CONSTRAINT "FK_d3e4538c3efa3a5b55edf97a913" FOREIGN KEY ("id_layanan") REFERENCES "services"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_9e920e0d938c1aa4e7a24b6e33c" FOREIGN KEY ("id_pelanggan") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_955a702007b66295d4be9834d33" FOREIGN KEY ("id_user") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_955a702007b66295d4be9834d33"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_9e920e0d938c1aa4e7a24b6e33c"`);
        await queryRunner.query(`ALTER TABLE "transaction_details" DROP CONSTRAINT "FK_d3e4538c3efa3a5b55edf97a913"`);
        await queryRunner.query(`ALTER TABLE "transaction_details" DROP CONSTRAINT "FK_7396567ad8151e670f2ea006fb4"`);
        await queryRunner.query(`DROP TABLE "transactions"`);
        await queryRunner.query(`DROP TYPE "public"."transactions_status_pembayaran_enum"`);
        await queryRunner.query(`DROP TYPE "public"."transactions_status_pesanan_enum"`);
        await queryRunner.query(`DROP TABLE "transaction_details"`);
        await queryRunner.query(`DROP TABLE "services"`);
        await queryRunner.query(`DROP TYPE "public"."services_satuan_enum"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`DROP TABLE "customers"`);
    }

}
