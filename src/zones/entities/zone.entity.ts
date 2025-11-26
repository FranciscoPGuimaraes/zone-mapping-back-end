import { BeforeInsert, Column, Entity, PrimaryColumn } from 'typeorm';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const { nanoid } = require('nanoid');

@Entity()
export class Zone {

    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    type: string;

    @Column()
    geometry: string;

    @Column()
    createdAt: string;

    @BeforeInsert()
    generateId() {
        this.id = nanoid();
    }
}
