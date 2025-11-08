import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "customers" })
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "nama_pelanggan", length: 255 })
  namaPelanggan: string;

  @Column({ name: "nomor_telepon", length: 15 })
  nomorTelepon: string;

  @Column({ type: "text", nullable: true })
  alamat: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}

export type CustomerType = Omit<Customer, "id" | "createdAt" | "updatedAt">;
