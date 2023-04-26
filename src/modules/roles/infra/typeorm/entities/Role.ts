import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('roles')
class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}

export default Role;
