import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, Index } from 'typeorm';

@Entity()
export class UserActivity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  /** 发件邮箱 */
  @Column({
    type: 'varchar',
    nullable: true
  })
  send_address: string;

  /** 收件邮箱 */
  @Column({
    type: 'varchar',
    nullable: true
  })
  recv_address: string;

  /** 用户行为类型 */
  @Column({
    type: 'varchar',
    nullable: true
  })
  action_type: string;

  /** 时间 */
  @Column({
    type: 'timestamp',
    nullable: true
  })
  time: Date;

  /** 停留时长（ms） */
  @Column({
    type: 'int4',
    nullable: true
  })
  stay_time: number;

  /** 唯一ID */
  @Column({
    type: 'varchar',
    nullable: true
  })
  uniqueid: string;
}
