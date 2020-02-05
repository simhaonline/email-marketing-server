import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, Index } from 'typeorm';

@Entity()
export class Email extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  /** mailgun 的 message_id eg: 20200126124420.1.0E1349A012A89BBC@mail.yezhang.me */
  @Index()
  @Column({
    type: 'varchar',
    nullable: true
  })
  message_id: string;

  /** 消息详细信息 */
  @Column({
    type: 'text',
    nullable: true
  })
  message: string;

  /** 发信人姓名 */
  @Column({
    type: 'varchar',
    nullable: true
  })
  sender_name: string;

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

  /** 邮件主题 */
  @Column({
    type: 'varchar',
    nullable: true
  })
  subject: string;

  /** 邮件模板 */
  @Column({
    type: 'varchar',
    nullable: true
  })
  template: string;

  /** 模板变量 */
  @Column({
    type: 'text',
    nullable: true
  })
  template_variables: string;

  /** 发送邮件时间 */
  @Column({
    type: 'timestamp',
    nullable: true
  })
  deliver_time: Date;

  /** 打开邮件时间 */
  @Column({
    type: 'timestamp',
    nullable: true
  })
  open_time: Date;

  /** 点击 URL 时间 */
  @Column({
    type: 'timestamp',
    nullable: true
  })
  click_time: Date;

  /** 收到垃圾邮件投诉时间 */
  @Column({
    type: 'timestamp',
    nullable: true
  })
  complain_time: Date;

  /** 停留时长（ms） */
  @Column({
    type: 'int4',
    nullable: true
  })
  stay_time: number;

  /** 用户标记 */
  @Column({
    type: 'varchar',
    nullable: true
  })
  user_type: string;

  static findOneById(id: number) {
    return this.createQueryBuilder('email')
      .where('email.id = :id', { id })
      .getOne();
  }
}
