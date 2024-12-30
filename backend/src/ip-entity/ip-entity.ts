import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('ip_analysis')
export class IpEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    ip: string;

    @Column()
    date: Date;

    @Column()
    method: string;

    @Column()
    endpoint: string;

    @Column()
    status: string;

    @Column()
    userAgent: string;

    @Column()
    abuseScore: number;

    @Column()
    country: string;

    @Column()
    usageType: string;

    // optional
    @Column({nullable: true})
    category: string;


}
