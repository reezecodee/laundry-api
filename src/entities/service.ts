import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

export enum Unit {
  KG = "kg",
  PCS = "pcs",
}

@Entity({ name: "services" })
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "nama_layanan", length: 255, unique: true })
  namaLayananan: string;

  @Column({ type: "decimal" })
  harga: number;

  @Column({ type: "enum", enum: Unit, default: Unit.KG })
  satuan: Unit;

  @Column({ type: "text", nullable: true })
  deskripsi: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}

export type ServiceType = Omit<Service, "id" | "createdAt" | "updatedAt">;
