import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { Customer } from "./customer";
import { User } from "./user";
import { TransactionDetail } from "./transaction-detail";

export enum OrderStatus {
  BARU = "Baru",
  PROSES = "Proses",
  SELESAI = "Selesai",
  DIAMBIL = "Diambil",
}

export enum PaymentStatus {
  BELUM_LUNAS = "Belum lunas",
  LUNAS = "Lunas",
}

@Entity({ name: "transactions" })
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Customer)
  @JoinColumn({ name: "id_pelanggan" })
  customer: Customer;

  @ManyToOne(() => User)
  @JoinColumn({ name: "id_user" })
  user: User;

  @OneToMany(
    () => TransactionDetail,
    (transactionDetail) => transactionDetail.transaction,
    { cascade: true }
  )
  transactionDetails: TransactionDetail[];

  @Column({ unique: true })
  kode_invoice: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  tanggal_masuk: Date;

  @UpdateDateColumn({ type: "timestamp", nullable: true })
  tanggal_selesai: Date;

  @Column({ type: "decimal" })
  total_bayar: number;

  @Column({
    type: "enum",
    enum: OrderStatus,
    default: OrderStatus.BARU,
  })
  status_pesanan: OrderStatus;

  @Column({
    type: "enum",
    enum: PaymentStatus,
    default: PaymentStatus.BELUM_LUNAS,
  })
  status_pembayaran: PaymentStatus;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
