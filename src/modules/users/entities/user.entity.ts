import { ObjectType, Field, Int } from '@nestjs/graphql';
import { GenericEntity } from 'src/modules/generic-entity';
import { Role } from 'src/modules/roles/roles.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { compareSync } from 'bcrypt';
import { GenericStaus } from 'src/modules/generic-enums';
import { MonthlyChargesPaid } from 'src/modules/monthly-charges-paid/entities/monthly-charges-paid.entity';
import { ContributionsPaid } from 'src/modules/contributions-paid/entities/contributions-paid.entity';
import { Attendance } from 'src/modules/attendance/entities/attendance.entity';

@ObjectType()
@Entity({ name: 'users' })
export class User extends GenericEntity {
  @Column({ unique: true })
  @Field()
  email: string;

  @Column()
  @Field()
  displayName: string;

  @Column()
  password: string;

  @Column({ default: GenericStaus.ACTIVE, enum: GenericStaus })
  @Field()
  status: GenericStaus;

  @Column()
  @Field((type) => Int)
  roleId: number;

  @ManyToOne(() => Role, (role) => role.users)
  @Field((type) => Role)
  role: Role;

  @OneToMany(() => MonthlyChargesPaid, (mcp) => mcp.user, { cascade: true })
  monthlyChargePaids: MonthlyChargesPaid[];

  @OneToMany(() => ContributionsPaid, (cp) => cp.user, { cascade: true })
  contributionsPaid: ContributionsPaid[];

  @OneToMany(() => Attendance, (attendance) => attendance.user, {
    cascade: true,
  })
  attendances: Attendance[];

  authenticate(password: string) {
    return compareSync(password, this.password);
  }
}
