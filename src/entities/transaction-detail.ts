import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Transaction } from "./transaction";
import { Service } from "./service";

@Entity({ name: "transaction_details" })
export class TransactionDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Transaction, (transaction) => transaction.transactionDetails)
  @JoinColumn({ name: "id_transaksi" })
  transaction: Transaction;

  @ManyToOne(() => Service)
  @JoinColumn({ name: "id_layanan" })
  service: Service;

  @Column({ type: "integer" })
  qty: number;

  @Column({ type: "decimal" })
  harga_layanan: number;

  @Column({ type: "decimal" })
  subtotal: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
