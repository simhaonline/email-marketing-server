import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, Index } from 'typeorm';

@Entity()
export class Email extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  /** mailgun 的 message_id eg: 20200126124420.1.0E1349A012A89BBC@mail.xxx.com */
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


  /** 收件人性别 */
  @Column({
    type: 'varchar',
    nullable: true
  })
  gender: string;

  /** 收信人姓 */
  @Column({
    type: 'varchar',
    nullable: true
  })
  first_name: string;

  /** 收信人姓 */
  @Column({
    type: 'varchar',
    nullable: true
  })
  last_name: string;

  /** 发信人名 */
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

  /** 唯一ID */
  @Column({
    type: 'varchar',
    nullable: true
  })
  uniqueid: string;

  @Column({
    type: 'int',
    nullable: true
  })
  assignedid: number;

  /** 网站链接 */
  @Column({
    type: 'varchar',
    nullable: true
  })
  website: string;

  @Column({
    type: 'varchar',
    nullable: true
  })
  foundername: string;

  @Column({
    type: 'varchar',
    nullable: true
  })
  advantage1: string;

  @Column({
    type: 'varchar',
    nullable: true
  })
  advantage2: string;

  @Column({
    type: 'varchar',
    nullable: true
  })
  university1: string;

  @Column({
    type: 'varchar',
    nullable: true
  })
  university2: string;


  static findOneById(id: number) {
    return this.createQueryBuilder('email')
      .where('email.id = :id', { id })
      .getOne();
  }
}
